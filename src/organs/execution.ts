import type {
  BuildArtifact,
  EstateEvent,
  ExecutionAdapter,
  ExecutionReceipt,
} from '../contracts.js';
import { event, id, now } from '../lib.js';

export interface ExecutionResult {
  receipt: ExecutionReceipt;
  event: EstateEvent;
}

export function execute(
  runId: string,
  correlationId: string,
  artifact: BuildArtifact,
  adapter?: ExecutionAdapter,
): ExecutionResult {
  const startedAt = now();

  if (!adapter) {
    const receipt: ExecutionReceipt = {
      executionId: id('exec'),
      artifactId: artifact.artifactId,
      status: 'BLOCKED',
      executor: 'UNBOUND',
      evidenceClass: 'none',
      proofUri: null,
      artifactDigestVerified: false,
      blocker: 'missing_observed_execution_evidence',
      startedAt,
      completedAt: now(),
      telemetry: {
        runtime: 'UNBOUND',
        artifactDigestPresent: artifact.digest.length > 0,
        observedExecution: false,
      },
    };

    return {
      receipt,
      event: event(
        runId,
        correlationId,
        'EXECUTION_FABRIC',
        'artifact.execution-blocked',
        'eden-execution-fabric',
        receipt,
      ),
    };
  }

  const evidence = adapter(artifact);
  const artifactDigestVerified = evidence.artifactDigest === artifact.digest;
  const proofPresent = evidence.proofUri.trim().length > 0;
  const succeeded =
    evidence.outcome === 'SUCCEEDED' &&
    evidence.exitCode === 0 &&
    artifactDigestVerified &&
    proofPresent;

  const receipt: ExecutionReceipt = {
    executionId: id('exec'),
    artifactId: artifact.artifactId,
    status: succeeded ? 'SUCCEEDED' : 'FAILED',
    executor: evidence.executor,
    evidenceClass: evidence.evidenceClass,
    proofUri: proofPresent ? evidence.proofUri : null,
    artifactDigestVerified,
    blocker: succeeded
      ? null
      : !artifactDigestVerified
        ? 'artifact_digest_mismatch'
        : !proofPresent
          ? 'proof_uri_missing'
          : evidence.outcome !== 'SUCCEEDED' || evidence.exitCode !== 0
            ? 'observed_execution_failed'
            : 'execution_evidence_invalid',
    startedAt,
    completedAt: evidence.observedAt || now(),
    telemetry: {
      runtime: evidence.executor,
      exitCode: evidence.exitCode,
      artifactDigestPresent: artifact.digest.length > 0,
      artifactDigestVerified,
      observedExecution: true,
      ...evidence.telemetry,
    },
  };

  return {
    receipt,
    event: event(
      runId,
      correlationId,
      'EXECUTION_FABRIC',
      succeeded ? 'artifact.executed' : 'artifact.execution-failed',
      'eden-execution-fabric',
      receipt,
    ),
  };
}
