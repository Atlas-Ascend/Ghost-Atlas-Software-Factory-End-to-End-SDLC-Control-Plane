import type { EstateEvent, ProofGridReceipt, ThothArchiveReceipt } from '../contracts.js';
import { event, id, now } from '../lib.js';

export interface ThothResult {
  receipt: ThothArchiveReceipt;
  event: EstateEvent;
}

export function archive(runId: string, correlationId: string, proof: ProofGridReceipt): ThothResult {
  const receipt: ThothArchiveReceipt = {
    archiveId: id('archive'),
    artifactId: proof.artifactId,
    proofId: proof.proofId,
    packetId: proof.packetId,
    runId,
    correlationId,
    proofReceiptDigest: proof.receiptDigest,
    lineageKey: `${correlationId}:${proof.packetId}:${proof.proofId}`,
    archivedAt: now(),
  };

  return {
    receipt,
    event: event(runId, correlationId, 'THOTH', 'lineage.archived', 'thoth', receipt),
  };
}
