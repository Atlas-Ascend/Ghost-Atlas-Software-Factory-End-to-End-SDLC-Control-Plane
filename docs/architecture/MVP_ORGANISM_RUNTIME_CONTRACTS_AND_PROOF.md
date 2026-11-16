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

## 3. Frozen organism map and 23-capability reconciliation

The operator's target is a lightweight MVP that exposes 23 operational capabilities. The frozen 2026-09-10 Ghost Atlas / EDEN AGI Organism Map is authoritative, but the retrieved canonical excerpts do **not** define a formal roster of 23 organ IDs. The frozen map names 14 central nodes in one view — EDEN AGI, JANUS/ODIN, Atlas Mind, Universal CaseGraph, Packet OS, Workforce Spine, MetaForge, THOTH, CrownGrid, Hypernet, Medusa, SECA/DevOS, ProofGrid, and ServerForge — and also identifies Resident GARI, PROMETHEUS, the universal data/intelligence layer, VIBE/operator surfaces, infrastructure, public surfaces, and Rainbow Council/Omnitheon governance as part of the wider organism map.

Two other sources must not be silently promoted to canonical truth:
- The Ghost-Atlas-Distributed-Agentic-Organism topology seed currently contains 16 entries.
- VISHVARUPA-TECHNICAL-STACK-SINGULARITY.md enumerates a 23-item candidate list, but that is not proof that the frozen September 10 map defined those as 23 independent organs.

Therefore the registry records a **23-capability target**, not a verified 23-organ canonical roster. Each capability must map to an existing frozen organ, control-plane surface, governance layer, rail, runtime, or campaign. Do not create or rename organs to make the count reach 23. Mothership/OmniMind control-plane status, Hydra/Reverse Uno healing loop, PROMETHEUS bounded evolution/evidence loop, BodyForge resource governor, and CTHULU Omega Workforce Spine capability must remain correctly classified rather than counted as independent organs without source authority.

## 4. Activation and proof rule

The MVP can have a subset ACTIVE while the remainder are PAUSED, ARCHIVED, or EXPERIMENTAL. The phrase all 23 working is valid only when every organ has an implemented adapter or verified native capability, passing contract tests, health signal, and end-to-end invocation proof. A name in a registry is not a running organ. Record for every organ: exact manifest ID/name, repository owner, mission/non-goals, runtime owner, API/event/packet contracts, state, dependencies, privilege class, health check, tests, proof requirement, deployment profile, last verified commit, and verification timestamp.

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
