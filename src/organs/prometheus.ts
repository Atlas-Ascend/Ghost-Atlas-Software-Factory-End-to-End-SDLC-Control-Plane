import type { DevOSVerificationReceipt, EstateEvent, ExecutionReceipt, PrometheusProofPacket } from '../contracts.js';
import { event, now } from '../lib.js';

export interface PrometheusResult {
  packet: PrometheusProofPacket;
  event: EstateEvent;
}

export function synthesize(runId: string, correlationId: string, execution: ExecutionReceipt, devos: DevOSVerificationReceipt): PrometheusResult {
  const contradictions: string[] = [];
  if (execution.status === 'SUCCEEDED' && !devos.testsPassed) contradictions.push('execution succeeded but DevOS tests failed');
  if (devos.buildPassed && !devos.integrationPassed) contradictions.push('build passed but runtime integration failed');

  const allPass = devos.testsPassed && devos.buildPassed && devos.integrationPassed && contradictions.length === 0;
  const packet: PrometheusProofPacket = {
    artifactId: devos.artifactId,
    evidenceIds: [execution.executionId, `devos:${devos.artifactId}`],
    contradictions,
    confidence: allPass ? 1 : contradictions.length ? 0.35 : 0.6,
    conclusion: allPass
      ? 'Evidence supports a verified, integrated software artifact.'
      : 'Evidence does not fully support promotion.',
    synthesizedAt: now(),
  };

  return {
    packet,
    event: event(runId, correlationId, 'PROMETHEUS', 'evidence-truth.synthesized', 'prometheus', packet),
  };
}
