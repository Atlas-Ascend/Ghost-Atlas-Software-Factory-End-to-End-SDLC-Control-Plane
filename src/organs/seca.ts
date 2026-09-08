import type { EstateEvent, PrometheusProofPacket, SECAAcceptanceDecision, WorkPacket } from '../contracts.js';
import { event, now } from '../lib.js';

export interface SECAResult {
  decision: SECAAcceptanceDecision;
  event: EstateEvent;
}

export function accept(runId: string, correlationId: string, work: WorkPacket, proof: PrometheusProofPacket): SECAResult {
  const proofSupportsAcceptance = proof.confidence === 1 && proof.contradictions.length === 0;
  const satisfiedCriteria = proofSupportsAcceptance ? [...work.acceptanceCriteria] : [];
  const unsatisfiedCriteria = proofSupportsAcceptance ? [] : [...work.acceptanceCriteria];
  const decision: SECAAcceptanceDecision = {
    artifactId: proof.artifactId,
    decision: proofSupportsAcceptance ? 'PASS' : 'FAIL',
    satisfiedCriteria,
    unsatisfiedCriteria,
    decidedAt: now(),
  };

  return {
    decision,
    event: event(runId, correlationId, 'SECA', 'acceptance-truth.decided', 'seca', decision),
  };
}
