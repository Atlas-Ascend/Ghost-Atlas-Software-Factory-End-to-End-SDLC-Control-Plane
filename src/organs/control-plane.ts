import type { CommandIntent, EstateEvent, WorkPacket } from '../contracts.js';
import { event, id } from '../lib.js';

export interface ControlPlaneResult {
  packet: WorkPacket;
  events: EstateEvent[];
}

export function routeCommand(runId: string, correlationId: string, intent: CommandIntent): ControlPlaneResult {
  const events: EstateEvent[] = [];
  events.push(event(runId, correlationId, 'ARCHITECT', 'command.accepted', 'architect', intent));
  events.push(event(runId, correlationId, 'ATLAS_MIND', 'command.interpreted', 'atlas-mind', {
    objective: intent.command,
    definitionOfDone: intent.definitionOfDone,
  }));
  events.push(event(runId, correlationId, 'JANUS', 'command.authorized', 'janus', {
    authorized: true,
    route: 'PACKET_OS',
  }));

  const packet: WorkPacket = {
    packetId: id('pkt'),
    correlationId,
    objective: intent.command,
    acceptanceCriteria: intent.definitionOfDone,
    owner: 'workforce-spine',
  };

  events.push(event(runId, correlationId, 'PACKET_OS', 'packet.created', 'packet-os', packet));
  events.push(event(runId, correlationId, 'WORKFORCE_SPINE', 'packet.dispatched', 'workforce-spine', {
    packetId: packet.packetId,
    destination: 'METAFORGE',
  }));
  return { packet, events };
}
