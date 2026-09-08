import type { BuildArtifact, DevOSVerificationReceipt, EstateEvent, ExecutionReceipt } from '../contracts.js';
import { event, now } from '../lib.js';

export interface DevOSResult {
  receipt: DevOSVerificationReceipt;
  event: EstateEvent;
}

export function verify(runId: string, correlationId: string, artifact: BuildArtifact, execution: ExecutionReceipt): DevOSResult {
  const testsPassed = execution.status === 'SUCCEEDED';
  const buildPassed = artifact.digest.length === 64;
  const integrationPassed = Boolean(execution.telemetry.artifactDigestPresent);

  const receipt: DevOSVerificationReceipt = {
    artifactId: artifact.artifactId,
    executionId: execution.executionId,
    testsPassed,
    buildPassed,
    integrationPassed,
    findings: [
      testsPassed ? 'runtime execution succeeded' : 'runtime execution failed',
      buildPassed ? 'artifact digest valid' : 'artifact digest invalid',
      integrationPassed ? 'artifact/runtime integration verified' : 'artifact/runtime integration failed',
    ],
    verifiedAt: now(),
  };

  return {
    receipt,
    event: event(runId, correlationId, 'DEVOS', 'engineering-truth.verified', 'devos', receipt),
  };
}
