# Enterprise SDLC / DevOps — Command to Proof

## 1. Operating model

This is a corporate software-delivery lifecycle spanning product intake, architecture, engineering, QA, SRE, security, release management, and audit. Every stage has an accountable owner, required inputs, outputs, and exit criteria. No stage may be skipped by conversational instruction or model confidence.

| # | State | Accountable owner | Required exit evidence |
|---:|---|---|---|
| 01 | INTAKE | SAMI / Product intake | Request, requester, business outcome, priority, constraints |
| 02 | FORENSIC_DISCOVERY | MetaForge + repo owners | Existing-system inventory, dependencies, risks, reuse analysis |
| 03 | CANONICALIZATION | JANUS + architecture owner | Canonical owner, duplicate check, disposition |
| 04 | REQUIREMENTS_LOCK | Product owner + Architect | Functional/NFR baseline, acceptance criteria, exclusions |
| 05 | DESIGN_LOCK | Systems architect + UX lead | C4 views, data/API contracts, threat model, UX flows, ADRs |
| 06 | IMPLEMENTATION_READY | JANUS + Packet OS | Approved packet graph, worker plan, tool allowlist, test plan |
| 07 | BUILDING | MetaForge + Workforce | Code, tests, branch, build logs, package metadata |
| 08 | INTEGRATING | MetaForge + EDEN/Cali | Integrated artifact and contract-test evidence |
| 09 | VERIFYING | DevOS | Build, test, lint, type, security, smoke, reproducibility results |
| 10 | SECURITY_REVIEW | Medusa + SECA inputs | Threat review, secret/dependency findings, data-boundary decision |
| 11 | RELEASE_READY | SECA | Criterion-level acceptance decision |
| 12 | DEPLOYING | EDEN/Cali release executor | Deployment transaction, version, target, rollback pointer |
| 13 | RUNTIME_VERIFICATION | DevOS / SRE | Health, behavior, latency, logs, metrics, resource checks |
| 14 | PROOF_GENERATION | PROMETHEUS + ProofGrid | Evidence graph, benchmark report, provenance |
| 15 | DOCUMENTING | MetaForge + Thoth | Runbook, changelog, SBOM, API docs, operator notes |
| 16 | ARCHIVED | Thoth | Immutable run record and source-to-proof lineage |

## 2. Gate 0 — Intake and command normalization

SAMI captures the request without silently broadening it. Atlas Mind classifies it as new product, feature, defect, refactor, security issue, research, or operations. It identifies the expected artifact and asks only for missing decisions that materially change architecture, risk, cost, data handling, or acceptance. JANUS assigns priority and risk class.

Evidence: original and normalized command, actor, timestamp, scope, constraints, risk, unresolved questions.

## 3. Gate 1 — Forensic discovery and canonicalization

MetaForge searches repositories, files, services, APIs, package registries, prior packets, and Thoth history. It produces a reuse disposition: keep, patch, merge, archive, or experimental. A new repository requires an explicit decision record and evidence that no canonical owner exists. Read existing code before proposing generated changes.

Evidence: repository census, commit SHAs, service inventory, dependency inventory, ownership map, duplicate analysis.

## 4. Gate 2 — Requirements lock

Every requirement has an ID, priority, rationale, owner, test method, and acceptance threshold. NFRs cover security, privacy, performance, reliability, accessibility, maintainability, offline behavior, portability, and recovery. Out-of-scope work is explicit.

Evidence: requirements baseline, traceability matrix, acceptance tests, risk register, exclusions, contract version.

## 5. Gate 3 — Architecture and UX design lock

Architecture defines system context, process topology, component ownership, data flows, trust boundaries, APIs, failure modes, observability, backup, restore, and migration. UX defines personas, journeys, interaction states, accessibility, content hierarchy, and responsive behavior. Record consequential decisions as ADRs.

Evidence: C4 context/container/component views, sequence diagrams, API schemas, data model, threat model, UX flows, design tokens, ADRs, dependency decisions.

## 6. Gate 4 — Implementation readiness

Packet OS compiles design into atomic packets. Each packet contains owner, prerequisites, inputs, outputs, allowed tools, repository/path scope, security class, acceptance tests, timeout/retry/idempotency policy, rollback plan, and evidence obligations. JANUS authorizes the plan. Workforce receives least-privilege capabilities.

Evidence: packet IDs, dependency graph, worker roster, permission grant, plan hash, approval receipt.

## 7. Gate 5 — Build and integrate

MetaForge checks out an immutable base commit, creates a run-specific branch, applies a minimal patch, runs format/lint/type checks and tests, builds the package, and records exact toolchain versions. Integrations use versioned contracts and compatibility tests. Every generated change is reviewable as a diff.

Evidence: base SHA, branch, changed paths, patch hash, commit SHA, lockfile hash, build logs, package digest, test results.

## 8. Gate 6 — Verify

DevOS executes the test pyramid:
- Unit tests for deterministic logic.
- Component tests for organ adapters.
- Contract tests for Packet OS, runtime, model, and tool gateway.
- Integration tests for service composition.
- End-to-end command-to-proof tests.
- Security tests: SAST, dependency scan, secret scan, container scan, policy tests.
- Performance tests for latency, throughput, memory, CPU/GPU, queue depth.
- Resilience tests for restart, timeout, worker crash, disk pressure, network loss, cancellation, and recovery.
- Reproducibility tests from clean checkout with pinned inputs.

Evidence: test report, coverage, logs, exit codes, environment fingerprint, SBOM, scan report, benchmark data.

## 9. Gate 7 — Independent acceptance and release safety

PROMETHEUS synthesizes evidence and benchmark comparisons; it cannot waive requirements. SECA evaluates each acceptance criterion and returns PASS, FAIL, or INDETERMINATE. Medusa evaluates security, privacy, provenance, exposure, data classification, and release scope. Missing evidence is INDETERMINATE and blocks release.

Evidence: PROMETHEUS report, criterion-level SECA decision, Medusa release decision, exceptions and sign-offs.

## 10. Gate 8 — Deploy and runtime verify

EDEN/Cali deploy only a versioned artifact to a declared target. The deployment transaction is preflight, backup/snapshot, deploy, health check, limited rollout/canary where applicable, observe, accept or rollback. Runtime verification checks readiness, liveness, core journeys, logs, metrics, traces, error rate, latency, and resource budgets.

Evidence: artifact digest, target identity, deployment receipt, config version, health report, smoke tests, rollback pointer, SLO window.

## 11. Gate 9 — Proof, archive, promotion

ProofGrid publishes a manifest linking command, packet, design, source, commit, build, tests, security, deployment, runtime, acceptance, and release decision. Thoth archives the source/evidence lineage. Promotion gate checks mandatory receipts and moves candidate -> accepted -> canonical. No organ promotes itself.

## 12. Failure and recovery

- Build failure: repair packet returns to BUILDING; retain failed logs.
- Verification failure: return to BUILDING with failing test IDs and bounded repair scope.
- Security failure: block; remediate or process an explicitly authorized exception.
- Acceptance failure: SECA rejects with criterion IDs; requirements change only through a new baseline revision.
- Deployment failure: rollback to last known-good artifact and retain evidence.
- Runtime regression: stop rollout, rollback, open incident packet, preserve traces.
- Evidence gap: remain INDETERMINATE; do not promote.
- Worker crash: lease expires, packet remains recoverable, retry is idempotent.
- Model unavailable: pause inference-dependent planning; safe deterministic execution may continue.

## 13. Definition of Done

DONE requires canonical repository ownership, versioned requirements, committed reproducible source, passing build/tests, policy-compliant security results, verified runtime behavior, SECA acceptance, Medusa allowance, ProofGrid bundle, Thoth archive, rollback/operator documentation, and promotion receipt.

Generated, compiled, merged, or deployed are not synonyms for DONE.

## 14. Operating cadence

Daily: queue health, failed packets, worker capacity, model availability, security findings, proof backlog.  
Per change: risk-proportional design review, code review, automated checks, acceptance, proof.  
Weekly: dependency updates, model evaluation, restore test, performance trend, architecture drift.  
Monthly: access recertification, disaster-recovery exercise, SBOM refresh, retention review.  
Per release: signed manifest, rollback verification, operator handoff, Thoth archive.
