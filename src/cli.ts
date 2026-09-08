import { runSoftwareFactory } from './factory.js';

const command = process.argv.slice(2).join(' ').trim() || 'Build and verify a Ghost Atlas software artifact';
const result = runSoftwareFactory({
  command,
  requestedBy: 'ARCHITECT',
  definitionOfDone: [
    'artifact produced by MetaForge',
    'runtime execution succeeds',
    'DevOS engineering truth passes',
    'Prometheus evidence truth has no contradictions',
    'SECA acceptance passes',
    'Medusa release boundary allows promotion',
    'ProofGrid receipt published',
    'Thoth lineage archived',
  ],
});

const trace = result.events.map((entry) => ({
  stage: entry.stage,
  type: entry.type,
  at: entry.occurredAt,
}));

console.log(JSON.stringify({
  runId: result.runId,
  correlationId: result.correlationId,
  promoted: result.promotion.promoted,
  artifactId: result.artifact.artifactId,
  proofId: result.proofgrid.proofId,
  archiveId: result.thoth.archiveId,
  trace,
}, null, 2));

if (!result.promotion.promoted) process.exitCode = 1;
