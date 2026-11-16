# Implementation Roadmap and Exit Criteria

## Phase 0 — Reconcile Build Truth (no runtime changes)

**Objective:** bind this architecture to the frozen September 10 estate truth.

Tasks:
- Import the exact canonical 23-organ IDs and names from the frozen Organism Map.
- Reconcile the 81-repository census against live GitHub and local disk state.
- Confirm canonical owners for software design, software scaffold, toolchain/design registry, UX design, UX scaffold, local Git, NHCM, OmniMind, Atlas Mind, EDEN, and Cali.
- Identify all existing service endpoints, ports, process supervisors, databases, queues, storage, secrets stores, and observability.
- Record the actual host OS, architecture, CPU, RAM, GPU/accelerator, disk, network, and thermal constraints.

Exit: signed inventory and owner map; no unresolved duplicate authority; no speculative repository creation.

## Phase 1 — Make the existing Software Factory honest and executable

**Objective:** replace simulated success with real MetaForge and runtime adapters.

Tasks:
- Preserve the existing typed contracts and 16-state lifecycle.
- Implement MetaForge workspace adapter: checkout immutable base SHA, create run branch, apply patch, run formatter/type/lint/unit checks, produce package, record digest.
- Implement EDEN executor adapter with isolated workspace, capability allowlist, CPU/memory/disk/time limits, network policy, logs, exit code, cleanup receipt.
- Implement Cali adapter only against its canonical CRF runtime contract.
- Extend DevOS to consume actual command results and test reports, not booleans inferred from a digest.
- Ensure PROMETHEUS evidence IDs point to raw logs/reports and not synthetic labels.
- Ensure SECA evaluates each requirement against evidence IDs and returns INDETERMINATE when evidence is missing.
- Require Medusa security decision and ProofGrid/Thoth receipts before promotion.

Exit: a small real CLI project is built from source in a sandbox; clean-checkout rebuild passes; DevOS/SECA/Medusa pass from actual evidence.

## Phase 2 — Local Git and artifact durability

**Objective:** make source control and package storage independent of public GitHub.

Tasks:
- Confirm whether RepoForge/ServerForge already owns local Git. If yes, wire to it. If not, choose one service (Forgejo or Gitea) after architecture review.
- Configure private-only access, SSH keys, users/teams, repository permissions, protected branches, hooks, and optional GitHub mirror.
- Store artifacts and SBOMs in durable local storage with checksums.
- Configure backup of repositories, database/config, LFS, artifact store, SSH host keys, and build truth.
- Perform an isolated restore and clone/build test.

Exit: unplugged/offline clone, branch, commit, build, package, archive, restore all succeed.

## Phase 3 — Ollama and Atlas Mind

**Objective:** local conversational coding agent with bounded tools.

Tasks:
- Inspect hardware and existing Ollama before installation.
- Select model candidates and benchmark with PROMETHEUS on the same task suite.
- Pin model digest, license, quantization, context, and resource budget.
- Deploy Ollama locally or on a dedicated private node; restrict listener to loopback/private network.
- Connect Atlas Mind through an authenticated model gateway.
- Implement schema-validated tool proposals and a separate execution gateway.
- Connect NHCM/OmniMind context and specialist routing only through verified contracts.
- Keep JANUS authorization and Packet OS packet creation outside the model.
- Add conversation streaming, tool progress, diff review, approval, cancellation, resume, and proof display.

Exit: local-only conversation can build and verify the benchmark project without external model egress or unbounded shell access.

## Phase 4 — Workforce and organ adapters

**Objective:** connect the existing organs rather than simulate them.

Tasks:
- Wire SAMI intake and status events.
- Wire JANUS approval/denial receipts.
- Wire Packet OS CRF packet creation, transitions, leases, retries, idempotency, and cancellation.
- Wire Workforce Spine / CTHULHU Omega bounded dispatch and worker result receipts.
- Wire MetaForge to actual repository workspaces.
- Wire EDEN/Cali runtime adapters.
- Wire DevOS, PROMETHEUS, SECA, Medusa, ProofGrid, and Thoth to actual evidence and persistence.
- Add health checks and contract tests for each adapter.

Exit: one command crosses every critical organ through real interfaces and leaves a complete inspectable proof chain.

## Phase 5 — Activate the complete 23-organ MVP registry

**Objective:** bring all 23 canonical organs to honest, measurable MVP states.

For each canonical organ:
- Match exact manifest ID/name.
- Identify owning repository and runtime.
- Implement or verify its contract adapter.
- Add health endpoint or equivalent health signal.
- Add unit and contract tests.
- Add at least one end-to-end invocation proof where applicable.
- Declare ACTIVE, PAUSED, ARCHIVED, or EXPERIMENTAL based on evidence.
- Record dependencies, privilege class, resource budget, owner, last verified commit, and proof reference.

Exit: all 23 are registered with no invented identities; every organ marked ACTIVE has passing health/contract tests and invocation proof. Any organ without proof remains PAUSED or EXPERIMENTAL.

## Phase 6 — Reliability, security and operational readiness

Tasks:
- Threat model and penetration test the tool gateway and local Git service.
- Test prompt injection through repository files, issue content, and tool output.
- Test secrets redaction and workspace isolation.
- Test worker crash, process restart, cancellation, timeout, disk-full, model OOM, network loss, and rollback.
- Test backup restore and disaster recovery.
- Measure model latency, tool latency, end-to-end lead time, failure rate, queue depth, resource use, and proof completeness.
- Add SLOs and operational runbooks.

Exit: signed reliability/security report, successful restore, known rollback, and no unresolved release-blocking findings.

## Release gates

| Gate | Required evidence | Decision owner |
|---|---|---|
| Architecture baseline | frozen map, repository owner map, ADRs | JANUS / Architect |
| Runtime ready | host inventory, runtime health, sandbox test | EDEN / Cali owner |
| Model ready | model digest, benchmark, offline test | Atlas Mind / PROMETHEUS |
| Source control ready | local clone/commit/backup/restore proof | local Git owner |
| Work orchestration ready | packet/lease/retry/cancel proof | Packet OS / Workforce |
| Engineering ready | build/test/package/SBOM evidence | DevOS |
| Acceptance ready | criterion-level PASS | SECA |
| Release safe | security/privacy ALLOW | Medusa |
| Proof ready | complete proof manifest | ProofGrid |
| Archive ready | immutable lineage receipt | Thoth |
| Canonical | all required receipts present | Promotion Gate |

## Immediate next action

Run Phase 0 discovery against the actual EDEN/Cali host and frozen Build Truth. Do not install packages or deploy a second Git/Ollama service until inventory confirms the correct host, canonical owners, and resource budget.
