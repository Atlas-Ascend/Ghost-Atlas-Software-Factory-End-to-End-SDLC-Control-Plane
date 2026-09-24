import type { BuildArtifact, EstateEvent, ExecutionReceipt, MedusaReleaseDecision, ProofGridReceipt, PrometheusProofPacket, SECAAcceptanceDecision } from '../contracts.js';
import { digest, event, id, now } from '../lib.js';

export interface ProofGridResult {
  receipt: ProofGridReceipt;
  event: EstateEvent;
}

export function publish(
  runId: string,
  correlationId: string,
  artifact: BuildArtifact,
  proof: PrometheusProofPacket,
  execution: ExecutionReceipt,
  seca: SECAAcceptanceDecision,
  medusa: MedusaReleaseDecision,
): ProofGridResult {
  const receiptBody: Omit<ProofGridReceipt, 'receiptDigest'> = {
    proofId: id('proof'),
    artifactId: proof.artifactId,
    packetId: artifact.packetId,
    artifactDigest: artifact.digest,
    buildOrderId: artifact.buildOrderId,
    sourceOwner: artifact.sourceOwner,
    runId,
    correlationId,
    executionId: execution.executionId,
    executionProofUri: execution.proofUri,
    handoffOwner: 'THOTH',
    handoffRequired: true,
    evidenceChain: [
      ...proof.evidenceIds,
      `seca:${seca.decision}`,
      `medusa:${medusa.allowed ? 'ALLOW' : 'BLOCK'}`,
    ],
    publishedAt: now(),
    governance: artifact.governance,
  };
  const receipt: ProofGridReceipt = {
    ...receiptBody,
    receiptDigest: digest(JSON.stringify(receiptBody)),
  };

  return {
    receipt,
    event: event(runId, correlationId, 'PROOFGRID', 'proof.published', 'proofgrid', receipt),
  };
}
