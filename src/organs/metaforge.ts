import type { BuildArtifact, EstateEvent, WorkPacket } from '../contracts.js';
import { digest, event, id, now } from '../lib.js';

export interface MetaForgeResult {
  artifact: BuildArtifact;
  event: EstateEvent;
}

/**
 * The current in-process vertical slice does not write source files or produce
 * a distributable package. Mark its output as simulated so downstream gates
 * cannot mistake a synthetic packet digest for a real software artifact.
 */
export function build(runId: string, correlationId: string, packet: WorkPacket): MetaForgeResult {
  const artifact: BuildArtifact = {
    artifactId: id('artifact'),
    packetId: packet.packetId,
    kind: 'software-artifact',
    uri: `simulation://${packet.packetId}/not-a-package`,
    digest: digest(JSON.stringify(packet)),
    provenance: 'SIMULATED',
    builtAt: now(),
  };

  return {
    artifact,
    event: event(runId, correlationId, 'METAFORGE', 'artifact.simulated', 'metaforge', artifact),
  };
}
