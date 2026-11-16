# Ghost Atlas Organism — Lightweight Coding MVP and Proof Contract

## 1. MVP boundary

The MVP is one reliable command-to-proof path on the existing host and repositories. It is not a distributed AGI claim and does not require every experimental subsystem to be active. Keep it light: one host process topology, one local inference node, one bounded worker pool, one packet ledger, one local Git service, one artifact store, and one evidence/archive path.

## 2. Critical organ contracts

| Organ | MVP responsibility | Inputs | Outputs | Hard boundary |
|---|---|---|---|---|
| Atlas Mind | Conversational coding interface and plan synthesis | command, project context | normalized request, plan, tool proposals | no self-authorization |
| JANUS PRIME | Executive authorization and risk disposition | plan, scope, risk, identity | approve/deny/defer receipt | cannot waive SECA/Medusa |
| SAMI | Administrative intake and coordination | request, missing context, run state | intake record, status, handoff | not executive authority |
| Packet OS CRF | Atomic work and state machine | approved requirements | packet, dependency graph, state receipts | no untracked execution |
| Workforce Spine / CTHULU Omega | Dispatch bounded workers | authorized packets | leases, outputs, retry receipts | no scope expansion |
| MetaForge | Code construction and packaging | packet, repo, toolchain | patch, tests, branch, package | no promotion |
| EDEN | Main execution fabric | authorized job and capabilities | runtime result | least privilege, sandbox |
| Cali | CRF-governed runtime profile | Cali-compatible packet | execution result | not interchangeable by assumption |
| DevOS | Engineering verification | source/build/test/runtime | verification report | not acceptance authority |
| PROMETHEUS | Evidence and benchmark analysis | verification and telemetry | evaluation report | not release authority |
| SECA | Independent acceptance | requirements + evidence | PASS/FAIL/INDETERMINATE | fail closed |
| Medusa | Security/release boundary | findings, classification | ALLOW/DENY/RESTRICT | no silent exception |
| ProofGrid | Proof bundle publication | lineage and receipts | proof ID and manifest | cannot invent evidence |
| Thoth | Immutable archive | source/evidence references | archive ID and lineage | preserve failed attempts |

## 3. The 23-organ truth rule

The exact 23 canonical organ names and IDs must be imported verbatim from the frozen September 10, 2026 Organism Map. Do not manufacture 23 names by splitting, renaming, or promoting subsystems. The estate registry must record for each canonical organ: ID/name, repository owner, mission/non-goals, runtime owner, API/event/packet contracts, state (ACTIVE/PAUSED/ARCHIVED/EXPERIMENTAL), dependencies, privilege class, health check, tests, proof requirement, deployment profile, last verified commit, and verification timestamp.

The MVP can have a subset ACTIVE while the remainder are PAUSED or EXPERIMENTAL. The phrase all 23 working is valid only when every organ has an implemented adapter, passing contract tests, health signal, and end-to-end invocation proof. A name in a registry is not a running organ.

## 4. Lightweight deployment

- Existing host process supervisor.
- Atlas Mind conversation service.
- Ollama inference.
- JANUS authorization adapter.
- SAMI intake/admin.
- Packet OS CRF ledger/state adapter.
- Workforce dispatcher with a small capped worker pool, initially one to three.
- MetaForge worker in an isolated workspace.
- EDEN executor; Cali only for workloads whose CRF contract requires it.
- DevOS runner, PROMETHEUS evaluator, SECA acceptance, Medusa policy check.
- ProofGrid evidence writer and Thoth archive writer.
- Local Git and artifact directory.
- Minimal structured logs and health endpoints.

Avoid a separate database, queue, cache, and service mesh for every organ. Use existing persistence and event contracts. A single-host transactional ledger is acceptable only if it is not duplicating the existing Packet OS source of truth.

## 5. Packet contract minimum

Packet includes schema version, packet/run/correlation IDs, parent/dependency IDs, request/requirement IDs, repo identity/base commit, target branch/workspace, owner/worker capability, allowed tools and path allowlist, risk/data classification, expected outputs, acceptance criteria/test mapping, timeout/retry/idempotency rules, cancellation/rollback, required receipts, and archive policy.

Packet OS validates state transitions. Workers cannot write arbitrary state changes.

## 6. Runtime contract

EDEN/Cali job request includes run/packet identity, runtime profile/version, immutable source/artifact reference, capabilities, CPU/memory/disk/time limits, network policy, secret references (never raw secrets), output destinations, and health/termination policy.

Runtime receipt includes exit status, resource usage, timestamps, artifact digests, log/trace references, security policy result, and cleanup status. Privileged execution requires JANUS authorization and the security path required by canonical EDEN policy.

## 7. MVP proof scenario

Command: "Build a small CLI that parses a JSON file and prints a validated summary."

Required evidence:
1. Atlas Mind records command and selected repository.
2. JANUS approves the bounded scope.
3. Packet OS creates packet and state trace.
4. Workforce dispatches one MetaForge worker.
5. MetaForge creates branch, source, and unit tests.
6. EDEN executes build/tests in sandbox.
7. DevOS records build/test/lint/type outcomes.
8. PROMETHEUS creates evidence summary and baseline measurements.
9. SECA evaluates every acceptance criterion.
10. Medusa evaluates source, dependencies, and data boundaries.
11. ProofGrid stores manifest, logs, test results, hashes, and decisions.
12. Thoth stores immutable archive lineage.
13. Promotion gate updates state only if every mandatory gate passes.
14. Atlas Mind returns repository, commit, package, proof ID, and limitations.

## 8. Acceptance thresholds

No unapproved tool call; no write outside declared workspace; no external model call in local-only mode; reproducible clean-checkout build; actor/timestamp on every state transition; cryptographic digest for every artifact; every criterion maps to evidence; security fail-closed; worker crash/cancel does not corrupt packet state; restart restores run records; offline benchmark succeeds after dependencies/models are cached; human can inspect command-to-proof without trusting model narration.

## 9. Not yet proven

This architecture patch does not assert Ollama is installed, a model is selected, local Git is deployed, all 23 organs are active, Android/Linux can host the complete runtime, or the coding agent is operational. These are deployment facts requiring host inventory and test receipts.
