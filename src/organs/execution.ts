import type { BuildArtifact, EstateEvent, ExecutionReceipt } from '../contracts.js';
import { event, id, now } from '../lib.js';

export interface ExecutionResult {
  receipt: ExecutionReceipt;
  event: EstateEvent;
}

/**
 * This adapter is a control-plane simulation, not an EDEN process executor.
 * It deliberately reports SIMULATED so DevOS and the promotion gate fail
 * closed until a real, sandboxed runtime adapter is connected.
 */
export function execute(runId: string, correlationId: string, artifact: BuildArtifact): ExecutionResult {
  const startedAt = now();
  const receipt: ExecutionReceipt = {
    executionId: id('exec'),
    artifactId: artifact.artifactId,
    status: 'SUCCEEDED',
    mode: 'SIMULATED',
    startedAt,
    completedAt: now(),
    telemetry: {
      runtime: 'SIMULATED_ONLY_NOT_EDEN',
      executionMode: 'SIMULATED',
      exitCode: 0,
      artifactDigestPresent: artifact.digest.length > 0,
    },
  };

  return {
    receipt,
    event: event(runId, correlationId, 'EXECUTION_FABRIC', 'execution.simulated', 'execution-simulator', receipt),
  };
}
