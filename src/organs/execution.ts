import type { BuildArtifact, EstateEvent, ExecutionReceipt } from '../contracts.js';
import { event, id, now } from '../lib.js';

export interface ExecutionResult {
  receipt: ExecutionReceipt;
  event: EstateEvent;
}

export function execute(runId: string, correlationId: string, artifact: BuildArtifact): ExecutionResult {
  const startedAt = now();
  const receipt: ExecutionReceipt = {
    executionId: id('exec'),
    artifactId: artifact.artifactId,
    status: 'SUCCEEDED',
    startedAt,
    completedAt: now(),
    telemetry: {
      runtime: 'EDEN_EXECUTION_FABRIC',
      exitCode: 0,
      artifactDigestPresent: artifact.digest.length > 0,
    },
  };

  return {
    receipt,
    event: event(runId, correlationId, 'EXECUTION_FABRIC', 'artifact.executed', 'eden-execution-fabric', receipt),
  };
}
