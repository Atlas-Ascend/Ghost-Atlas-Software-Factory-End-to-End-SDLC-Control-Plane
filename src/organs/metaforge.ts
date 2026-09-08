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
    kind: 'software-artifact',
    uri: `artifact://${packet.packetId}/build`,
    digest: digest(JSON.stringify(packet)),
    builtAt: now(),
  };

  return {
    artifact,
    event: event(runId, correlationId, 'METAFORGE', 'artifact.produced', 'metaforge', artifact),
  };
}
