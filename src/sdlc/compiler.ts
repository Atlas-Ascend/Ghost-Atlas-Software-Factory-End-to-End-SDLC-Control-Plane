import type {
  CommandIntent,
  CompiledPromptProgram,
  SDLCState,
} from '../contracts.js';
import { SDLC_LIFECYCLE, validateSDLCPath } from './lifecycle.js';

const PROGRAM_ID = 'software.full-build';
const PROGRAM_VERSION = '1.0.0';

const policies = [
  'CONVERGENCE_ONLY',
  'PATCH_NOT_REPLACE',
  'NO_DESTRUCTIVE_WITHOUT_AUTHORIZATION',
  'INDEPENDENT_VERIFICATION',
  'PROVENANCE_REQUIRED',
  'PROOF_REQUIRED',
  'NO_FABRICATED_EVIDENCE',
] as const;

export function compileGovernedSDLCPrompt(intent: CommandIntent): CompiledPromptProgram {
  const lifecycle = [...SDLC_LIFECYCLE] as SDLCState[];
  validateSDLCPath(lifecycle);

  const definitionOfDone = intent.definitionOfDone.length
    ? intent.definitionOfDone.map((item, index) => `${index + 1}. ${item}`).join('\n')
    : '1. Requested behavior exists and is independently verified.';

  const prompt = `# GHOST ATLAS / EDEN AGI — ONE-STOP GOVERNED SDLC BUILD

PROGRAM: ${PROGRAM_ID}@${PROGRAM_VERSION}
MODE: CONVERGENCE_ONLY
REQUESTED_BY: ${intent.requestedBy}

## SOFTWARE OBJECTIVE
${intent.command}

## DEFINITION OF DONE
${definitionOfDone}

## PRIMARY DIRECTIVE
Carry this objective through the complete governed software-development lifecycle. Do not stop at planning when implementation is possible. Do not create replacement systems when an existing canonical owner exists. Do not claim completion without evidence.

## OPERATING LAW
- Reuse over invention.
- Patch over replacement.
- Integration over duplication.
- Canonicalization over proliferation.
- Execution over brainstorming.
- Proof over claims.
- Read Build Truth and current repository state before writing code.
- Preserve JANUS authorization, Packet OS work grammar, Workforce Spine dispatch, MetaForge build ownership, EDEN execution, DevOS/SECA verification, Medusa release review, ProofGrid evidence, and Thoth lineage.
- Agents may assist but may not self-authorize, self-verify, fabricate evidence, silently expand scope, or self-promote.

## CANONICAL RUN LAW
Treat the complete software build as one canonical Run. Bind requirements, design decisions, packets, code changes, artifacts, tests, deployment evidence, proof receipts, blockers, and final state to the Run. No floating artifacts.

## REQUIRED SDLC LIFECYCLE
${lifecycle.join(' -> ')}

Legal recovery paths:
VERIFYING -> BUILDING
SECURITY_REVIEW -> BUILDING
RELEASE_READY -> BUILDING
DEPLOYING -> BUILDING
RUNTIME_VERIFICATION -> DEPLOYING

Reject illegal state jumps.

## PHASE CONTRACT

### 1. INTAKE
Translate the request into an executable objective, scope, acceptance criteria, exclusions, runtime expectations, and definition of done.

### 2. FORENSIC_DISCOVERY
Inspect the real repository, branches, architecture, modules, APIs, schemas, tests, CI/CD, deployment configuration, Build Truth, prior implementations, and proof receipts. Classify findings as EXISTS, PARTIAL, MISSING, DUPLICATED, BROKEN, STALE, ARCHIVED, EXPERIMENTAL, or CANONICAL.

### 3. CANONICALIZATION
Map FEATURE -> SYSTEM -> REPOSITORY -> PACKAGE -> MODULE -> SERVICE -> DATA OWNER -> RUNTIME -> DEPLOYMENT TARGET. Patch the existing canonical owner.

### 4. REQUIREMENTS_LOCK
For every requested capability define actor, trigger, preconditions, inputs, behavior, outputs, state mutation, failure behavior, permissions, persistence, observability, and verification criteria. Separate MUST, SHOULD, COULD, and NOT_IN_THIS_RUN.

### 5. DESIGN_LOCK
Define only the design necessary to implement: system context, component map, contracts, data model, state model, error model, permission model, observability, runtime, deployment, and recovery model. Every design element must map to executable code or a declared external dependency.

### 6. IMPLEMENTATION_READY
Compile dependency-aware implementation packets with packet ID, objective, owner, files affected, dependencies, code/schema changes, tests, acceptance criteria, and proof requirement.

### 7. BUILDING
Implement actual code, schemas, migrations, services, APIs, workers, adapters, UI, routes, validation, permissions, configuration, logging, metrics, tests, deployment files, and documentation required by scope.

### 8. INTEGRATING
Wire producer -> contract -> consumer boundaries. Verify package imports, service boundaries, runtime configuration, database connectivity, events, APIs, authentication, secrets handling, frontend/backend connectivity, and deployment configuration.

### 9. VERIFYING
Run applicable format, lint, typecheck, unit, integration, end-to-end, regression, production build, and runtime smoke checks. Record commands and results. Never report PASS for a test that did not run.

### 10. SECURITY_REVIEW
Run Medusa-grade review for authentication, authorization, secret exposure, injection, XSS/CSRF where relevant, path traversal, unsafe file handling, arbitrary execution, dependency vulnerabilities, public/private leakage, excessive privilege, unsafe tool permissions, and dangerous logging. Blocking findings stop release.

### 11. RELEASE_READY
Require source attribution, clean build, tests, migration verification, security clearance, governance alignment, documentation, deployment configuration, rollback path, and proof-capture readiness.

### 12. DEPLOYING
Deploy through the existing declared provider/control plane. Record repository, commit SHA, provider, environment, deployment/release ID, endpoint, and deployment state. A started build is not a completed deployment.

### 13. RUNTIME_VERIFICATION
Verify the deployed runtime itself: endpoint, process health, database connectivity, migrations, critical route/API, auth where applicable, persistence, logs, and deployed commit identity. Perform at least one real end-to-end action.

### 14. PROOF_GENERATION
Generate a ProofGrid-ready receipt including Run ID, objective, repository, branch, baseline SHA, final SHA, files changed, canonical owner, features, schema changes, tests, security, DevOS/SECA, deployment, runtime verification, blockers, and final state. Distinguish CLAIMED, OBSERVED, and VERIFIED.

### 15. DOCUMENTING
Update only the permanent documentation required to keep runtime truth aligned: README, architecture, setup, migrations, API, deployment, runbook, troubleshooting, rollback, and Build Truth references.

### 16. ARCHIVED
Write durable lineage to Thoth and Build Truth delta. Preserve the original request, requirements, decisions, packet graph, code refs, commit SHAs, deployment IDs, test evidence, proof receipts, blockers, and terminal state.

## FAILURE LAW
On failure: diagnose -> identify root cause -> apply minimum repair -> retest -> continue from the legal lifecycle state. Preserve successful work. Do not restart or replace by default.

## TERMINAL RESULT
Return exactly one truthful terminal outcome:
- VERIFIED COMPLETE
- IMPLEMENTATION COMPLETE — EXTERNAL BLOCKER
- PARTIAL

## COMMAND-TO-PROOF CHAIN
REQUEST -> RUN -> REQUIREMENT -> CANONICAL OWNER -> PACKET -> CODE -> STATE CHANGE -> ARTIFACT -> TEST -> GOVERNANCE -> VERIFICATION -> RELEASE -> DEPLOYMENT -> RUNTIME -> PROOF -> ARCHIVE

Every arrow requires evidence.

## EXECUTION DIRECTIVE
Inspect first. Reuse existing architecture. Lock requirements. Design only what is necessary. Implement. Integrate. Test. Secure. Audit. Deploy when in scope. Verify the actual runtime. Generate proof. Update canonical documentation. Archive the Run. Continue until the requested software crosses the command-to-proof chain or a concrete external blocker prevents further execution.
`;

  return {
    programId: PROGRAM_ID,
    version: PROGRAM_VERSION,
    compiledBy: 'ATLAS_MIND',
    lifecycle,
    policies: [...policies],
    prompt,
  };
}
