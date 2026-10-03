import type { CommandIntent, EstateEvent, WorkPacket } from '../contracts.js';
import { compileGovernedSDLCPrompt } from '../sdlc/compiler.js';
import { event, id } from '../lib.js';

export interface ControlPlaneResult {
  packet: WorkPacket;
  events: EstateEvent[];
}

export function routeCommand(runId: string, correlationId: string, intent: CommandIntent): ControlPlaneResult {
  const events: EstateEvent[] = [];
  events.push(event(runId, correlationId, 'ARCHITECT', 'command.accepted', 'architect', intent));

  const promptProgram = compileGovernedSDLCPrompt(intent);
  events.push(event(runId, correlationId, 'ATLAS_MIND', 'command.interpreted', 'atlas-mind', {
    objective: intent.command,
    definitionOfDone: intent.definitionOfDone,
    promptProgramId: promptProgram.programId,
    promptProgramVersion: promptProgram.version,
    lifecycle: promptProgram.lifecycle,
  }));

  events.push(event(runId, correlationId, 'JANUS', 'command.authorized', 'janus', {
    authorized: true,
    route: 'PACKET_OS',
    promptProgramId: promptProgram.programId,
  }));

  const packet: WorkPacket = {
    packetId: id('pkt'),
    correlationId,
    objective: intent.command,
    acceptanceCriteria: intent.definitionOfDone,
    owner: 'workforce-spine',
    promptProgram,
  };

  events.push(event(runId, correlationId, 'PACKET_OS', 'packet.created', 'packet-os', packet));
  events.push(event(runId, correlationId, 'WORKFORCE_SPINE', 'packet.dispatched', 'workforce-spine', {
    packetId: packet.packetId,
    destination: 'METAFORGE',
    promptProgramId: promptProgram.programId,
  }));
  return { packet, events };
}
