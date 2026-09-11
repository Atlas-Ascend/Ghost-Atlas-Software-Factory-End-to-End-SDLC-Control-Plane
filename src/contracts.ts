export type Stage =
  | 'ARCHITECT'
  | 'ATLAS_MIND'
  | 'JANUS'
  | 'PACKET_OS'
  | 'WORKFORCE_SPINE'
  | 'METAFORGE'
  | 'EXECUTION_FABRIC'
  | 'DEVOS'
  | 'PROMETHEUS'
  | 'SECA'
  | 'MEDUSA'
  | 'PROOFGRID'
  | 'THOTH'
  | 'PROMOTE';

export type Decision = 'PASS' | 'FAIL' | 'CONDITIONAL';
export type ExecutionStatus = 'SUCCEEDED' | 'FAILED' | 'BLOCKED';
export type ExecutionEvidenceClass =
  | 'resident-observed'
  | 'runtime-observed'
  | 'external-observed'
  | 'none';

export interface EstateEvent<T = unknown> {
  eventId: string;
  correlationId: string;
  runId: string;
  stage: Stage;
  type: string;
  occurredAt: string;
  producer: string;
  payload: T;
}

export interface CommandIntent {
  command: string;
  requestedBy: string;
  definitionOfDone: string[];
}

export interface WorkPacket {
  packetId: string;
  correlationId: string;
  objective: string;
  acceptanceCriteria: string[];
  owner: string;
}

export interface BuildArtifact {
  artifactId: string;
  packetId: string;
  kind: 'software-artifact';
  uri: string;
  digest: string;
  builtAt: string;
}

export interface ExecutionEvidence {
  executor: string;
  evidenceClass: Exclude<ExecutionEvidenceClass, 'none'>;
  outcome: 'SUCCEEDED' | 'FAILED';
  exitCode: number;
  artifactDigest: string;
  proofUri: string;
  observedAt: string;
  telemetry?: Record<string, number | string | boolean>;
}

export type ExecutionAdapter = (artifact: BuildArtifact) => ExecutionEvidence;

export interface ExecutionReceipt {
  executionId: string;
  artifactId: string;
  status: ExecutionStatus;
  executor: string;
  evidenceClass: ExecutionEvidenceClass;
  proofUri: string | null;
  artifactDigestVerified: boolean;
  blocker: string | null;
  startedAt: string;
  completedAt: string;
  telemetry: Record<string, number | string | boolean>;
}

export interface DevOSVerificationReceipt {
  artifactId: string;
  executionId: string;
  testsPassed: boolean;
  buildPassed: boolean;
  integrationPassed: boolean;
  findings: string[];
  verifiedAt: string;
}

export interface PrometheusProofPacket {
  artifactId: string;
  evidenceIds: string[];
  contradictions: string[];
  confidence: number;
  conclusion: string;
  synthesizedAt: string;
}

export interface SECAAcceptanceDecision {
  artifactId: string;
  decision: Decision;
  satisfiedCriteria: string[];
  unsatisfiedCriteria: string[];
  decidedAt: string;
}

export interface MedusaReleaseDecision {
  artifactId: string;
  allowed: boolean;
  blockers: string[];
  decidedAt: string;
}

export interface ProofGridReceipt {
  proofId: string;
  artifactId: string;
  correlationId: string;
  evidenceChain: string[];
  publishedAt: string;
}

export interface ThothArchiveReceipt {
  archiveId: string;
  artifactId: string;
  proofId: string;
  lineageKey: string;
  archivedAt: string;
}

export interface PromotionReceipt {
  promotionId: string;
  artifactId: string;
  archiveId: string;
  promoted: boolean;
  promotedAt: string;
}

export interface FactoryRunResult {
  runId: string;
  correlationId: string;
  packet: WorkPacket;
  artifact: BuildArtifact;
  execution: ExecutionReceipt;
  devos: DevOSVerificationReceipt;
  prometheus: PrometheusProofPacket;
  seca: SECAAcceptanceDecision;
  medusa: MedusaReleaseDecision;
  proofgrid: ProofGridReceipt;
  thoth: ThothArchiveReceipt;
  promotion: PromotionReceipt;
  events: EstateEvent[];
}
