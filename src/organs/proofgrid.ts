import type { EstateEvent, MedusaReleaseDecision, ProofGridReceipt, PrometheusProofPacket, SECAAcceptanceDecision } from '../contracts.js';
import { event, id, now } from '../lib.js';

export interface ProofGridResult {
  receipt: ProofGridReceipt;
  event: EstateEvent;
}

export function publish(runId: string, correlationId: string, proof: PrometheusProofPacket, seca: SECAAcceptanceDecision, medusa: MedusaReleaseDecision): ProofGridResult {
  const receipt: ProofGridReceipt = {
    proofId: id('proof'),
    artifactId: proof.artifactId,
    correlationId,
    evidenceChain: [
      ...proof.evidenceIds,
      `seca:${seca.decision}`,
      `medusa:${medusa.allowed ? 'ALLOW' : 'BLOCK'}`,
    ],
    publishedAt: now(),
  };

  return {
    receipt,
    event: event(runId, correlationId, 'PROOFGRID', 'proof.published', 'proofgrid', receipt),
  };
}
