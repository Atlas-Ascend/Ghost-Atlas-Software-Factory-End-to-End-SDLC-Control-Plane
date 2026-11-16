# Repository, Software Design, Scaffold, UX and Toolchain Topology

**Rule:** repositories are ownership boundaries, not folders to create by reflex. The live estate already contains specialized repositories. This document defines the target ownership map; reconcile each path against the frozen September 10 Build Truth and repository census before creating anything new.

## 1. Requested repository capabilities and disposition

| Requested capability | Target owner / disposition | Responsibility |
|---|---|---|
| Software design repo | Existing Software Factory plus architecture docs in owning repos | Requirements, ADRs, C4, APIs, data, threat models, deployment contracts |
| Software scaffold repo | MetaForge-owned templates in existing MetaForge repo | App/service/CLI/library/worker scaffolds, CI templates, packaging recipes |
| Design repo for tools, systems, apps | Existing Software Factory toolchain registry + estate system registry | Approved tools, versions, licenses, install methods, compatibility |
| UX design repo | Existing canonical UX/design owner; identify from frozen census | Journeys, wireframes, design tokens, accessibility, interaction specifications |
| UX scaffold | MetaForge template or existing UX scaffold owner | App shell, navigation, auth shell, error/loading states, tokens, component conventions |
| Runtime | EDEN and Cali-CRF repos | Execution fabric and runtime policy |
| Cognitive layer | Atlas-Mind-LLM plus verified NHCM/OmniMind owner | Model profiles, context assembly, tool routing, memory retrieval |
| Local Git | Existing RepoForge/ServerForge/DevOS owner if one exists | Offline source authority, mirrors, access, backups |
| Evidence | PROMETHEUS, SECA, ProofGrid, Thoth | Measurement, acceptance, proof publication, immutable lineage |

No new repository is created by this architecture patch. If design or UX ownership is not located, raise an architecture decision request and reconcile the census before considering a new repository.

## 2. Standard repository contract

Every software-producing repo should contain, where applicable:
- README with purpose, owner, state, runtime, and quick start.
- BUILD_TRUTH or build-truth with machine-readable owner, status, dependencies, interfaces, constraints, and evidence.
- Architecture docs with context/container/component views, data flows, and ADRs.
- Operations docs with install, configure, run, monitor, backup, restore, rollback.
- Security docs with threat model, classification, trust boundaries, and secrets policy.
- Development docs with contributor workflow, code style, tests, packaging.
- Versioned schemas for packets, APIs, config, and events.
- Unit, contract, integration, smoke, and end-to-end tests.
- Deterministic scripts for doctor, bootstrap, build, test, package, and verify.
- CI workflows, lockfiles, toolchain pins, and SBOM generation.

Each repo owns its own local truth. The estate registry indexes ownership, version, interfaces, and status; it must not become a copied manifest that drifts across repositories.

## 3. Software design ownership

The software design function owns product brief, problem statement, requirements and NFRs, C4 diagrams, ADRs, component/data models, API/event contracts, threat model, deployment topology, failure modes, observability, SLOs, capacity budgets, migration/rollback, and requirement-to-proof traceability.

## 4. Software scaffold ownership

MetaForge-owned templates should cover service/API, CLI, worker, UI/web app, local agent/tool adapter, test harness, contract test, packaging/release, and security/observability defaults. Generated code becomes ordinary source under version control. A scaffold is not a hidden runtime dependency.

## 5. UX design system

The UX owner maintains design tokens for color, typography, spacing, elevation, motion, focus, density; navigation and information architecture; user journeys; conversation states; artifact review; approvals; evidence inspection; accessibility; responsive behavior; and actionable error/recovery states.

Required conversation states: idle, streaming, tool-running, waiting-for-approval, blocked, failed, cancelled, completed. Required artifact states: uncommitted diff, committed change, build running, build failed, tests passed/failed, security blocked, accepted, archived, promoted.

Approval UX must show exact action, target, risk, effect, rollback, and required authority. The interface must never disguise an INDETERMINATE or failed gate as green.

## 6. UX scaffold minimum

Reusable shell includes conversation pane with streaming/cancel; run sidebar with state, owner, timestamps, blockers; repository/branch selector with canonical-owner warnings; file/diff viewer; redacted tool console; privileged-action approval dialog; test/proof inspector; model/privacy settings; and connection health for EDEN, Cali, Ollama, local Git, Packet OS, and evidence services.

## 7. Tool and system dependency registry

Every tool record includes name, purpose, owner, source URL, license, pinned version, checksum/signature, install method, configuration path, network requirements, data classification, upgrade policy, rollback, and verification command.

Separate host prerequisites, build toolchain, runtime dependencies, developer tools, security tools, operations tools, and optional remote services.

## 8. Candidate baseline — validate before pinning

- Git and SSH.
- Node.js LTS for the existing TypeScript Software Factory.
- Python 3 for automation and selected workers.
- Docker Engine or Podman only where host/runtime owners approve; rootless preferred.
- Ollama for local inference.
- Existing Packet OS persistence; do not create a duplicate ledger.
- Existing database/queue where present; do not add Redis, NATS, or PostgreSQL without measured need.
- OpenTelemetry-compatible traces, metrics, and logs.
- Secret scanning, SAST, dependency/image scanning, SBOM generation.
- Playwright for browser E2E if the UX is web-based.
- Mermaid or PlantUML for versioned diagrams.

Candidate tools are not approved dependencies until OS/architecture compatibility, license, security, offline behavior, version, checksum, and rollback are recorded.


## 9. Existing source-lineage mapping — do not rebuild

The estate source material establishes a strict boundary: **Design Repo = truth, architecture, specifications, and manifest. Software Scaffold Repo = implementation-ready code body.** MetaForge converts design truth into a folder body, manifest, repository plan, code handoff, runtime packet, audit, release, archive, and proof. These are separate responsibilities even when they are stored in related repositories.

| Layer | Existing source / candidate | Current evidence and disposition |
|---|---|---|
| Software design truth | Existing MetaForge design corpus under the GhostAtlas Compiler Runtime Estate v2 source inventory; includes the Design Repo vs Software Scaffold Repo law and build-realization pipeline | Source artifact located in Library inventory; physical local path and live Git binding still require host verification |
| General software factory | Atlas-Ascend/Ghost-Atlas-Software-Factory-End-to-End-SDLC-Control-Plane | Existing canonical command-to-proof control plane; this architecture pack is being added here |
| Specialized foundry lineage | GA-ATLAS-NATIVE-FOUNDRY, VULCAN-Agentic-Engineering-Foundry, Atlas-Company-9-Factory | Census disposition is general factory plus specialized foundries; salvage bounded capabilities into MetaForge, do not fork a competing factory |
| Software scaffold lineage | Atlas-Ascend/nextjs, Atlas-Ascend/nextjs-ai-chatbot, Atlas-Ascend/nextjs-boilerplate | Census identifies stock starter, upstream Chat SDK template, and evolved JANUS Office Fabric/ServerForge scaffold; preserve provenance and salvage unique deltas |
| UX design reference | DaVinci UI System in Ghost Atlas Estate Intelligence Suite 100-slide deck; EDEN cockpit target, dark-glass language, prototype shell, state language | Design reference artifact, not proof of a standalone canonical UX repository |
| UX specifications | EDEN 3.0 UX wiremap, interface map, operator journeys, visual system, design tokens and component library source | Existing design outputs are described in the EDEN 3.0 source material; bind to the frozen owner before implementation |
| Operator UI / office surfaces | Ghost-Atlas-Command-Center and EDEN-Resident-Office-Fabric | Bounded control-fabric and office-fabric contexts; preserve their separate responsibilities and close the existing runtime/publication/dispatch proof gaps |
| Chat scaffold / cognition interface | nextjs-ai-chatbot plus Atlas-Mind-LLM | Existing first-chat storage scenarios were reported as failing in the September 12 archaeology queue; do not call the chat-to-model binding complete until those scenarios pass |
| Toolchain and app catalog | Software Factory build-truth registry + MetaForge toolkit ecosystem | Canonical place to index tools, systems, apps, versions, licenses, install methods, dependencies, and verification commands; do not create another catalog |
| Local Git service | No independent local Git service deployment was proven by the connected repository census | Inspect the target host and existing RepoForge/ServerForge/DevOS contracts before choosing Forgejo/Gitea or any service |

The DaVinci deck describes a commercial/UI layer and names scaffold contents such as apps/eden-cockpit, apps/admin-console, services/registry-service, services/proof-service, and packages/ui. Treat those as design targets to reconcile with existing repositories, not permission to create a duplicate repository tree.

