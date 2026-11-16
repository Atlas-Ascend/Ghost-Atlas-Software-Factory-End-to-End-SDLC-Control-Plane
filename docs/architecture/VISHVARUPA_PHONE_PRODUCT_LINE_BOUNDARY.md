# Product Line Boundary — Vishvarupa Phone vs Vishvarupa Phone Sovereign Supreme

**Authority:** Architect clarification, 2026-11-16  
**Disposition:** Binding product-line and phase boundary  
**Current mission:** Vishvarupa Phone  
**Next mission:** Vishvarupa Phone Sovereign Supreme

## 1. Why this boundary exists

The names refer to two distinct builds and must not be collapsed into one architecture.

### A. Vishvarupa Phone — current mission

This is the architecture currently being designed and documented in this workstream. Its purpose is to establish the phone-oriented Vishvarupa architecture, SDLC/DevOps lifecycle, organism topology, contracts, repository ownership, dependencies, and command-to-proof process.

This architecture may use the connected Ghost Atlas estate as architectural provenance and may map its organs to existing repositories, runtimes, and services. That mapping is design lineage; it does not prove those components are installed on the phone or operating locally.

**Current truth:** architecture documentation is being assembled and implementation remains unverified.

### B. Vishvarupa Phone Sovereign Supreme — next mission

This is a separate, subsequent sovereign software factory. It will be built as one new monorepo physically located in Android internal shared storage and operated from Termux on the phone.

Its core execution loop must be independent of:
- GitHub.
- Cloud-hosted services.
- EDEN runtime.
- Cali runtime.
- Remote Workforce services.
- Remote Ollama/model endpoints.
- Network connectivity for the core build/test/package path.

The phone and its internal storage become the source and execution authority. Termux is the operator-controlled command environment. The monorepo contains the local software factory, its specifications, scaffolds, tools registry, tests, package pipeline, and proof records.

A local Ollama instance is a desired component only if device hardware, Android constraints, storage, memory, and performance testing establish that it can run reliably. The sovereign build must still have a deterministic local workflow when local inference is unavailable: generated scripts can be reviewed, staged, executed, tested, packaged, and proven without requiring a model call.

## 2. First sovereign use case

The first job is deliberately narrow and practical:

1. MetaForge authors a script or small software project from a conversational task.
2. The operator reviews the plan, scope, script, and permissions.
3. The operator feeds the approved script into Termux.
4. Termux executes it within a controlled project workspace.
5. The local factory runs tests, static checks, package validation, and security checks available on-device.
6. The factory packages the result as an installable or exportable artifact appropriate to the target platform.
7. A command-to-proof receipt records inputs, source hash, tool versions, command transcript, test results, package hash, and outcome.
8. The completed artifact is exported from the build workspace.
9. Temporary workspaces, caches, and intermediate artifacts are cleaned according to retention policy; source, release artifact, and proof are retained.
10. The operator can repeat this process daily without cluttering Android internal storage.

The system must never equate a generated script with a completed software product. Completion requires a reproducible build, test evidence, package validation, and a proof receipt.

## 3. Sovereign repository design law

The next mission will create exactly one new monorepo in Android internal shared storage. It will not create a constellation of new repositories.

The monorepo will contain clearly separated domains, at minimum:
- build-truth and architecture contracts;
- software-design specifications;
- software scaffold templates;
- UX design specifications and UX scaffold;
- local toolchain and dependency registry;
- Termux bootstrap and environment validation;
- MetaForge task planning and code generation interfaces;
- Packet OS / CRF local work ledger;
- JANUS authorization and policy checks;
- SAMI operator intake and handoff;
- bounded local worker execution (CTHULU Omega capability);
- local model adapter (optional Ollama);
- local Git operations and repository history;
- DevOS verification;
- PROMETHEUS benchmark/evidence scoring;
- SECA acceptance;
- Thoth local archive and lineage;
- packaging, export, cleanup, backup, and restore;
- tests, fixtures, sample projects, and proof receipts.

Names and concepts from the wider estate may be preserved where useful, but they must become locally implemented contracts or adapters. They must not become hidden network dependencies.

## 4. Storage and cleanliness contract

The future monorepo must live under Android internal shared storage at a user-confirmed path, for example a dedicated directory under `/storage/emulated/0/`. Do not assume a path or run storage mutations before confirming the actual Termux storage permission and mount.

Use one canonical workspace root, one artifact export directory, and one bounded cache directory. Never scatter build outputs across Downloads, Documents, home, and arbitrary project directories.

Cleanup is policy-driven:
- retain source, release packages, manifests, and proof receipts;
- retain the last known-good toolchain lock and restore point;
- expire temporary workspaces and disposable build intermediates;
- never delete an unverified artifact or the only copy of source;
- show a dry-run cleanup report before destructive cleanup;
- maintain a bounded cache size and explicit cache eviction policy.

## 5. Offline and sovereignty acceptance criteria

The Sovereign Supreme MVP is not accepted until all of the following are demonstrated:

- Airplane-mode build/test/package proof succeeds after all required dependencies are staged.
- No GitHub, cloud, EDEN, Cali, or remote worker endpoint is contacted during the core scenario.
- A local repository can be initialized, branched, committed, inspected, and restored without a hosted service.
- A reviewed script can be executed by Termux through the local policy/approval path.
- The system builds a real sample artifact, not a simulated artifact.
- Tests execute and produce machine-readable results.
- Package integrity and output hash are verified.
- The release artifact is exported to the designated output directory.
- The workspace cleanup dry-run is reviewed and safe cleanup succeeds.
- The proof receipt can be reopened after Termux is closed and the phone is restarted.
- A restore test reconstructs the project from retained source, lockfiles, and required local dependencies.
- A second identical build produces an equivalent artifact or a documented reproducibility variance.

## 6. Explicit non-goals for the first sovereign MVP

- Recreating all 23 estate organs as heavyweight services.
- Running a full cloud-scale distributed workforce on a phone.
- Exposing a public Git server from the phone.
- Requiring an Ollama model to be resident in RAM continuously.
- Building a general-purpose Android desktop environment as a prerequisite.
- Replacing or migrating the connected Ghost Atlas estate.
- Automatic execution of arbitrary model-generated shell commands without review.

The 23-organ vision is represented as lightweight local capabilities, contracts, and adapters. The first MVP proves the software factory loop before expanding organism coverage.

## 7. Transition gate

The current Vishvarupa Phone mission remains active until its architecture, owner maps, dependencies, SDLC lifecycle, and proof criteria are closed. Only then does the next mission begin by creating the Sovereign Supreme monorepo on the phone.

**No Sovereign Supreme repository has been created by this document.**
