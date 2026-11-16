import type { BuildArtifact, DevOSVerificationReceipt, EstateEvent, ExecutionReceipt } from '../contracts.js';
import { event, now } from '../lib.js';

export interface DevOSResult {
  receipt: DevOSVerificationReceipt;
  event: EstateEvent;
}

/**
 * Engineering truth requires real source provenance and real runtime execution.
 * Synthetic receipts remain visible for testing but can never satisfy DevOS.
 */
export function verify(runId: string, correlationId: string, artifact: BuildArtifact, execution: ExecutionReceipt): DevOSResult {
  const realExecution = execution.mode === 'REAL' && execution.status === 'SUCCEEDED';
  const realArtifact = artifact.provenance === 'REAL' && !artifact.uri.startsWith('simulation://');
  const testsPassed = realExecution && realArtifact && execution.telemetry.testsPassed === true;
  const buildPassed = realArtifact && execution.telemetry.buildPassed === true;
  const integrationPassed = realExecution && execution.telemetry.integrationPassed === true;

  const findings = [
    realArtifact ? 'artifact provenance is real' : 'BLOCKED: MetaForge output is simulated, not a source-built package',
    realExecution ? 'runtime execution is real' : 'BLOCKED: execution adapter is simulated, not an EDEN/Cali process receipt',
    testsPassed ? 'test suite passed' : 'BLOCKED: real test evidence is absent',
    buildPassed ? 'build evidence passed' : 'BLOCKED: real build evidence is absent',
    integrationPassed ? 'runtime integration evidence passed' : 'BLOCKED: real runtime integration evidence is absent',
  ];

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
