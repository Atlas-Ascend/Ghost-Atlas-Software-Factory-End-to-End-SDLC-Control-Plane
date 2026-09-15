import type { DevOSVerificationReceipt, EstateEvent, ExecutionReceipt, PrometheusProofPacket } from '../contracts.js';
import { event, now } from '../lib.js';

export interface PrometheusResult {
  packet: PrometheusProofPacket;
  event: EstateEvent;
}

export function synthesize(runId: string, correlationId: string, execution: ExecutionReceipt, devos: DevOSVerificationReceipt): PrometheusResult {
  const contradictions: string[] = [];
  if (execution.status === 'BLOCKED') contradictions.push('execution blocked: no observed runtime evidence');
  if (execution.evidenceClass === 'none') contradictions.push('execution has no admissible evidence class');
  if (execution.status === 'SUCCEEDED' && !devos.testsPassed) contradictions.push('execution succeeded but DevOS tests failed');
  if (devos.buildPassed && !devos.integrationPassed) contradictions.push('build passed but runtime integration failed');
  if (!execution.artifactDigestVerified && execution.evidenceClass !== 'none') contradictions.push('runtime evidence artifact digest does not match build artifact');

  const allPass =
    execution.status === 'SUCCEEDED' &&
    execution.evidenceClass !== 'none' &&
    devos.testsPassed &&
    devos.buildPassed &&
    devos.integrationPassed &&
    contradictions.length === 0;
  const packet: PrometheusProofPacket = {
    artifactId: devos.artifactId,
    evidenceIds: [
      execution.executionId,
      ...(execution.proofUri ? [execution.proofUri] : []),
      `devos:${devos.artifactId}`,
    ],
    contradictions,
    confidence: allPass ? 1 : contradictions.length ? 0.35 : 0.6,
    conclusion: allPass
      ? 'Observed evidence supports a verified, integrated software artifact.'
      : 'Observed evidence does not fully support promotion.',
    synthesizedAt: now(),
  };

  return {
    packet,
    event: event(runId, correlationId, 'PROMETHEUS', 'evidence-truth.synthesized', 'prometheus', packet),
  };
}
