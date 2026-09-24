import type { BuildArtifact, EstateEvent, WorkPacket } from '../contracts.js';
import { digest, event, id, now } from '../lib.js';

export interface MetaForgeResult {
  artifact: BuildArtifact;
  event: EstateEvent;
}

export function build(runId: string, correlationId: string, packet: WorkPacket): MetaForgeResult {
  const artifact: BuildArtifact = {
    artifactId: id('artifact'),
    packetId: packet.packetId,
    buildOrderId: packet.buildOrderId,
    sourceOwner: packet.sourceOwner,
    runId,
    correlationId,
    kind: 'software-artifact',
    uri: `artifact://${packet.packetId}/build`,
    digest: digest(JSON.stringify({
      packetId: packet.packetId,
      buildOrderId: packet.buildOrderId,
      sourceOwner: packet.sourceOwner,
      correlationId,
      objective: packet.objective,
      acceptanceCriteria: packet.acceptanceCriteria,
      governance: packet.governance,
    })),
    builtAt: now(),
    governance: packet.governance,
  };

  return {
    artifact,
    event: event(runId, correlationId, 'METAFORGE', 'artifact.produced', 'metaforge', artifact),
  };
}
