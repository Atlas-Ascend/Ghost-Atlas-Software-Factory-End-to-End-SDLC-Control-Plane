# UX System and Operator Workbench Specification

## 1. Product principle

The operator is not watching a generic chatbot. The operator is commanding a governed software-production organism. The interface must make command, ownership, authority, execution, evidence, and state visible. The model's prose is never the system of record.

## 2. UX source lineage

- DaVinci UI System is the existing visual reference: EDEN cockpit target, dark-glass language, prototype shell, and state language.
- EDEN 3.0 source material defines UX wiremap, interface map, operator journeys, visual system, design tokens, and reusable components.
- Ghost-Atlas-Command-Center is an existing operator/control-fabric surface.
- EDEN-Resident-Office-Fabric is an existing office-fabric implementation with runtime/publication/dispatch proof still requiring closure.
- nextjs-ai-chatbot and related Next.js lineage are scaffold sources to preserve and salvage, not a replacement UI project.
- No new UX repository is created by this architecture patch.

## 3. Information architecture

Primary routes / surfaces:
- Dashboard / current organism health.
- Organism layers / 23-organ status.
- Executive office / JANUS decisions and pending approvals.
- SAMI intake / request normalization and handoffs.
- Packet OS / packet graph, state, owner, dependencies, retries.
- MetaForge / repo selection, plan, diff, build, package.
- Workforce Spine / CTHULU Omega queue, workers, leases, capacity.
- EDEN and Cali / runtime health, execution history, sandbox state.
- Atlas Mind / conversation, model profile, context provenance.
- Thoth archive / lineage and historical receipts.
- Medusa / security findings, data classification, release boundaries.
- DevOS / test/build/verification reports.
- PROMETHEUS / benchmark, evidence synthesis, competition scores.
- SECA / criterion-level acceptance and blockers.
- ProofGrid / evidence graph and bundle.
- Release Forge / candidate, approval, deployment, rollback.
- Repair Bay / failed packet, diagnosis, bounded repair.
- Toolchain registry / tools, versions, licenses, dependencies.
- Settings / model, privacy, network, access, storage.
- Health / services, ports, resource budgets, backups, last proof.

## 4. Main dashboard

The first screen should answer:
1. Is the organism healthy?
2. Which run is active?
3. What is blocked and who owns the next action?
4. Which packets are waiting for JANUS approval?
5. Which workers are executing?
6. What is MetaForge building?
7. What is Ollama doing and which model digest is loaded?
8. What did DevOS verify?
9. What did PROMETHEUS conclude?
10. What did SECA accept or reject?
11. What is Medusa blocking?
12. Where is the ProofGrid bundle and Thoth archive?
13. What can be promoted, and why?

No aggregate green badge may hide a failed subgate. Display state by source of truth, timestamp, and evidence link.

## 5. Conversation workspace

The Atlas Mind workspace has:
- Conversation stream with user/model turns.
- Current intent and normalized command.
- Current project/repository/branch/base SHA.
- Plan and acceptance criteria.
- Packet ID and state.
- Tool execution events and redacted output.
- Changed files and diff.
- Build and test results.
- Security and acceptance decisions.
- Proof bundle and archive references.

Conversation states: IDLE, THINKING, STREAMING, TOOL_PROPOSED, WAITING_FOR_JANUS, PACKET_CREATED, WORKER_RUNNING, BUILDING, VERIFYING, BLOCKED, NEEDS_INPUT, FAILED, CANCELLED, COMPLETED.

The UI must distinguish model-generated narration from signed/typed system receipts.

## 6. Approval and action UX

Every approval prompt shows:
- Exact action and target.
- Repository, branch, file scope, or runtime target.
- Data classification and network egress.
- Risk tier.
- Expected effect.
- Rollback path.
- Evidence expected.
- Approving authority and expiry.

High-risk actions are not approved by a generic chat confirmation when policy requires JANUS or human approval. Deletion, credentials, public release, money, and production deployment remain per-action approval boundaries.

## 7. Design tokens and component system

Use the existing DaVinci dark-glass visual language and canonical design tokens. The UI should prioritize legibility and dense operational data over decorative effects. Tokens cover color, typography, spacing, border, elevation, motion, focus, density, status semantics, and responsive breakpoints.

Reusable components:
- Organ status card with owner and proof state.
- Packet card and dependency graph.
- Worker lease/status row.
- Repository selector with canonical owner warning.
- Diff viewer.
- Build/test result table.
- Security finding panel.
- Acceptance criterion checklist.
- Evidence-chain viewer.
- Timeline/event trace.
- Approval modal.
- Runtime health panel.
- Model and tool configuration panel.
- Backup/restore status panel.

## 8. UX acceptance tests

- A new user can identify the active run and its owner within five seconds.
- A failed gate is visually distinct from a pending gate.
- Every status can be opened to its underlying receipt.
- A user can inspect a proposed diff before any commit.
- A user can cancel a running packet and see cancellation evidence.
- A user can see whether inference is local or external.
- A user can see the model digest and tool permissions.
- A user can trace one requirement to code, test, SECA decision, proof bundle, and archive.
- The interface remains usable on phone and desktop.
- Keyboard navigation, screen-reader labels, focus order, contrast, and reduced-motion behavior pass accessibility checks.
