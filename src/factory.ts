import type { CommandIntent, EstateEvent, ExecutionAdapter, FactoryRunResult } from './contracts.js';
import { id } from './lib.js';
import { routeCommand } from './organs/control-plane.js';
import { build } from './organs/metaforge.js';
import { execute } from './organs/execution.js';
import { verify } from './organs/devos.js';
import { synthesize } from './organs/prometheus.js';
import { accept } from './organs/seca.js';
import { review } from './organs/medusa.js';
import { publish } from './organs/proofgrid.js';
import { archive } from './organs/thoth.js';
import { promote } from './organs/promotion.js';

export function runSoftwareFactory(
  intent: CommandIntent,
  executionAdapter?: ExecutionAdapter,
): FactoryRunResult {
  const runId = id('run');
  const correlationId = id('corr');
  const events: EstateEvent[] = [];

  const control = routeCommand(runId, correlationId, intent);
  events.push(...control.events);

  const metaforge = build(runId, correlationId, control.packet);
  events.push(metaforge.event);

  const execution = execute(runId, correlationId, metaforge.artifact, executionAdapter);
  events.push(execution.event);

  const devos = verify(runId, correlationId, metaforge.artifact, execution.receipt);
  events.push(devos.event);

  const prometheus = synthesize(runId, correlationId, execution.receipt, devos.receipt);
  events.push(prometheus.event);

  const seca = accept(runId, correlationId, control.packet, prometheus.packet);
  events.push(seca.event);

  const medusa = review(runId, correlationId, seca.decision);
  events.push(medusa.event);

  const proofgrid = publish(runId, correlationId, prometheus.packet, seca.decision, medusa.decision);
  events.push(proofgrid.event);

  const thoth = archive(runId, correlationId, proofgrid.receipt);
  events.push(thoth.event);

  const promotion = promote(runId, correlationId, seca.decision, medusa.decision, thoth.receipt);
  events.push(promotion.event);

  return {
    runId,
    correlationId,
    packet: control.packet,
    artifact: metaforge.artifact,
    execution: execution.receipt,
    devos: devos.receipt,
    prometheus: prometheus.packet,
    seca: seca.decision,
    medusa: medusa.decision,
    proofgrid: proofgrid.receipt,
    thoth: thoth.receipt,
    promotion: promotion.receipt,
    events,
  };
}
