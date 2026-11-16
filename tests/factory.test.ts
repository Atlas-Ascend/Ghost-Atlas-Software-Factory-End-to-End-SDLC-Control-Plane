import test from 'node:test';
import assert from 'node:assert/strict';
import { runSoftwareFactory } from '../src/factory.js';
import { assertSDLCTransition, validateSDLCPath } from '../src/sdlc/lifecycle.js';
import { review } from '../src/organs/medusa.js';
import { promote } from '../src/organs/promotion.js';

const intent = {
  command: 'Build a verified demonstration artifact',
  requestedBy: 'ARCHITECT',
  definitionOfDone: ['build', 'execute', 'verify', 'prove', 'accept', 'secure', 'archive'],
};

test('simulation vertical slice preserves lineage but cannot claim software completion', () => {
  const result = runSoftwareFactory(intent);
  assert.equal(result.artifact.provenance, 'SIMULATED');
  assert.equal(result.execution.mode, 'SIMULATED');
  assert.equal(result.devos.testsPassed, false);
  assert.equal(result.devos.buildPassed, false);
  assert.equal(result.devos.integrationPassed, false);
  assert.equal(result.seca.decision, 'FAIL');
  assert.equal(result.medusa.allowed, false);
  assert.equal(result.promotion.promoted, false);
  assert.ok(result.devos.findings.some((finding) => finding.includes('simulated')));
  assert.ok(result.proofgrid.proofId);
  assert.ok(result.thoth.archiveId);

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

test('Packet OS work packet carries the governed one-stop SDLC prompt program', () => {
  const result = runSoftwareFactory(intent);
  const program = result.packet.promptProgram;

  assert.equal(program.programId, 'software.full-build');
  assert.equal(program.version, '1.0.0');
  assert.equal(program.compiledBy, 'ATLAS_MIND');
  assert.equal(program.lifecycle[0], 'INTAKE');
  assert.equal(program.lifecycle.at(-1), 'ARCHIVED');
  assert.match(program.prompt, /Build a verified demonstration artifact/);
  assert.match(program.prompt, /COMMAND-TO-PROOF CHAIN/);
  assert.match(program.prompt, /FORENSIC_DISCOVERY/);
  assert.match(program.prompt, /RUNTIME_VERIFICATION/);
  assert.match(program.prompt, /ProofGrid-ready receipt/);
  assert.ok(program.policies.includes('PATCH_NOT_REPLACE'));

  validateSDLCPath(program.lifecycle);
});

test('SDLC lifecycle rejects illegal state jumps and allows governed recovery', () => {
  assert.doesNotThrow(() => assertSDLCTransition('VERIFYING', 'BUILDING'));
  assert.doesNotThrow(() => assertSDLCTransition('DEPLOYING', 'RUNTIME_VERIFICATION'));
  assert.throws(
    () => assertSDLCTransition('INTAKE', 'DEPLOYING'),
    /Illegal SDLC transition/,
  );
  assert.throws(
    () => validateSDLCPath(['INTAKE', 'FORENSIC_DISCOVERY', 'DEPLOYING']),
    /Illegal SDLC transition/,
  );
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
