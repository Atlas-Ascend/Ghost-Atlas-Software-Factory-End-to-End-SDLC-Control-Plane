import test from 'node:test';
import assert from 'node:assert/strict';
import { runSoftwareFactory } from '../src/factory.js';
import type { ExecutionAdapter } from '../src/contracts.js';
import { review } from '../src/organs/medusa.js';
import { promote } from '../src/organs/promotion.js';

const intent = {
  command: 'Build a verified demonstration artifact',
  requestedBy: 'ARCHITECT',
  definitionOfDone: ['build', 'execute', 'verify', 'prove', 'accept', 'secure', 'archive'],
};

const residentAdapter: ExecutionAdapter = (artifact) => ({
  executor: 'ODIN',
  evidenceClass: 'resident-observed',
  outcome: 'SUCCEEDED',
  exitCode: 0,
  artifactDigest: artifact.digest,
  proofUri: `proof://resident/${artifact.artifactId}`,
  observedAt: new Date().toISOString(),
  telemetry: { physicalNode: true },
});

test('full factory promotes only after command-to-proof completes with observed execution', () => {
  const result = runSoftwareFactory(intent, residentAdapter);
  assert.equal(result.execution.status, 'SUCCEEDED');
  assert.equal(result.execution.evidenceClass, 'resident-observed');
  assert.equal(result.execution.artifactDigestVerified, true);
  assert.equal(result.devos.testsPassed, true);
  assert.equal(result.prometheus.contradictions.length, 0);
  assert.equal(result.seca.decision, 'PASS');
  assert.equal(result.medusa.allowed, true);
  assert.equal(result.promotion.promoted, true);

  const stages = result.events.map((entry) => entry.stage);
  assert.deepEqual(stages, [
    'ARCHITECT',
    'ATLAS_MIND',
    'JANUS',
    'PACKET_OS',
    'WORKFORCE_SPINE',
    'METAFORGE',
    'EXECUTION_FABRIC',
    'DEVOS',
    'PROMETHEUS',
    'SECA',
    'MEDUSA',
    'PROOFGRID',
    'THOTH',
    'PROMOTE',
  ]);
});

test('factory blocks promotion when no observed executor receipt exists', () => {
  const result = runSoftwareFactory(intent);
  assert.equal(result.execution.status, 'BLOCKED');
  assert.equal(result.execution.evidenceClass, 'none');
  assert.equal(result.execution.blocker, 'missing_observed_execution_evidence');
  assert.equal(result.devos.testsPassed, false);
  assert.equal(result.seca.decision, 'FAIL');
  assert.equal(result.medusa.allowed, false);
  assert.equal(result.promotion.promoted, false);
});

test('factory rejects mismatched resident artifact evidence', () => {
  const mismatchAdapter: ExecutionAdapter = (artifact) => ({
    executor: 'EDEN',
    evidenceClass: 'resident-observed',
    outcome: 'SUCCEEDED',
    exitCode: 0,
    artifactDigest: `wrong-${artifact.digest}`,
    proofUri: `proof://resident/${artifact.artifactId}`,
    observedAt: new Date().toISOString(),
  });
  const result = runSoftwareFactory(intent, mismatchAdapter);
  assert.equal(result.execution.status, 'FAILED');
  assert.equal(result.execution.blocker, 'artifact_digest_mismatch');
  assert.equal(result.promotion.promoted, false);
});

test('promotion gate blocks a failed SECA decision', () => {
  const seca = {
    artifactId: 'artifact-test',
    decision: 'FAIL' as const,
    satisfiedCriteria: [],
    unsatisfiedCriteria: ['acceptance'],
    decidedAt: new Date().toISOString(),
  };
  const medusa = review('run-test', 'corr-test', seca).decision;
  const thoth = {
    archiveId: 'archive-test',
    artifactId: 'artifact-test',
    proofId: 'proof-test',
    lineageKey: 'corr-test:artifact-test',
    archivedAt: new Date().toISOString(),
  };

  assert.equal(medusa.allowed, false);
  assert.equal(promote('run-test', 'corr-test', seca, medusa, thoth).receipt.promoted, false);
});
