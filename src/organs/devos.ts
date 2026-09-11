import type { BuildArtifact, DevOSVerificationReceipt, EstateEvent, ExecutionReceipt } from '../contracts.js';
import { event, now } from '../lib.js';

export interface DevOSResult {
  receipt: DevOSVerificationReceipt;
  event: EstateEvent;
}

export function verify(runId: string, correlationId: string, artifact: BuildArtifact, execution: ExecutionReceipt): DevOSResult {
  const observed = execution.evidenceClass !== 'none';
  const testsPassed = execution.status === 'SUCCEEDED' && observed;
  const buildPassed = artifact.digest.length === 64;
  const integrationPassed =
    observed &&
    execution.artifactDigestVerified &&
    Boolean(execution.proofUri) &&
    Boolean(execution.telemetry.observedExecution);

  const findings: string[] = [
    testsPassed ? 'observed runtime execution succeeded' : `runtime execution not proven: ${execution.status}`,
    buildPassed ? 'artifact digest valid' : 'artifact digest invalid',
    integrationPassed ? 'artifact/runtime integration receipt verified' : 'artifact/runtime integration evidence incomplete',
  ];
  if (execution.blocker) findings.push(`execution blocker: ${execution.blocker}`);

  const receipt: DevOSVerificationReceipt = {
    artifactId: artifact.artifactId,
    executionId: execution.executionId,
    testsPassed,
    buildPassed,
    integrationPassed,
    findings,
    verifiedAt: now(),
  };

  return {
    receipt,
    event: event(runId, correlationId, 'DEVOS', 'engineering-truth.verified', 'devos', receipt),
  };
}
