import type { EstateEvent, MedusaReleaseDecision, PromotionReceipt, SECAAcceptanceDecision, ThothArchiveReceipt } from '../contracts.js';
import { event, id, now } from '../lib.js';

export interface PromotionResult {
  receipt: PromotionReceipt;
  event: EstateEvent;
}

export function promote(runId: string, correlationId: string, seca: SECAAcceptanceDecision, medusa: MedusaReleaseDecision, thoth: ThothArchiveReceipt): PromotionResult {
  const promoted = seca.decision === 'PASS' && medusa.allowed;
  const receipt: PromotionReceipt = {
    promotionId: id('promotion'),
    artifactId: thoth.artifactId,
    archiveId: thoth.archiveId,
    promoted,
    promotedAt: now(),
  };

  return {
    receipt,
    event: event(runId, correlationId, 'PROMOTE', promoted ? 'artifact.promoted' : 'artifact.promotion-blocked', 'promotion-gate', receipt),
  };
}
