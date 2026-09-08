import type { EstateEvent, MedusaReleaseDecision, SECAAcceptanceDecision } from '../contracts.js';
import { event, now } from '../lib.js';

export interface MedusaResult {
  decision: MedusaReleaseDecision;
  event: EstateEvent;
}

export function review(runId: string, correlationId: string, seca: SECAAcceptanceDecision): MedusaResult {
  const blockers = seca.decision === 'PASS' ? [] : ['SECA acceptance gate did not pass'];
  const decision: MedusaReleaseDecision = {
    artifactId: seca.artifactId,
    allowed: blockers.length === 0,
    blockers,
    decidedAt: now(),
  };

  return {
    decision,
    event: event(runId, correlationId, 'MEDUSA', 'release-boundary.decided', 'medusa', decision),
  };
}
