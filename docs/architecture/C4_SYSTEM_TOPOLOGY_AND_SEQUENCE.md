# C4 System Topology and Command-to-Proof Sequence

## 1. System context

The Architect is the only sovereign command source. The Architect interacts with Atlas Mind through an operator client. Atlas Mind uses NHCM/OmniMind context orchestration; GA-NIF is the authenticated inference ingress and routes to local Ollama. JANUS decides authorization. Packet OS creates the work contract. Workforce Spine dispatches. MetaForge creates software changes. EDEN/Cali execute. DevOS, PROMETHEUS, SECA, Medusa, ProofGrid, and Thoth independently perform their truth and evidence responsibilities. The local Git service stores source. The GX10 inference node is isolated from the execution host.

    ARCHITECT
      |
      v
    OPERATOR CLIENT -----> ATLAS MIND / NHCM / OMNIMIND
                                  |
                                  v
                           OLLAMA NODE (GX10)
                                  |
                                  v
                           TOOL / POLICY GATEWAY
                                  |
                                  v
                              JANUS PRIME
                                  |
                                  v
                              PACKET OS CRF
                                  |
                                  v
                     WORKFORCE SPINE / CTHULU OMEGA
                                  |
                                  v
                               METAFORGE
                                  |
                       +----------+----------+
                       |                     |
                       v                     v
                  LOCAL GIT              EDEN / CALI
                       |                     |
                       +----------+----------+
                                  |
                                  v
                                DEVOS
                                  |
                                  v
                             PROMETHEUS
                                  |
                                  v
                                SECA
                                  |
                                  v
                               MEDUSA
                                  |
                                  v
                              PROOFGRID
                                  |
                                  v
                                THOTH
                                  |
                                  v
                           PROMOTION GATE

Mothership and OmniMind coordinate the control plane. Hydra/Reverse Uno is the healing loop. BodyForge governs resources. PROMETHEUS is the evolution/evidence/promotion loop, not an additional organ.

## 2. Container view

| Container | Deployment | Responsibilities | Trust boundary |
|---|---|---|---|
| Operator UI | Existing client / Office Fabric | Conversation, status, approvals, proof inspection | User authentication |
| Atlas Mind API | EDEN/office host | Session, context, model router, streaming | Service identity |
| Ollama | Dedicated GX10 | Local model inference | Private inference network |
| Inference gateway | Existing CrownGrid or approved gateway | Auth, rate limits, request policy, audit | Only Atlas Mind may call |
| JANUS adapter | Existing Janus/Odin | Authorization receipt | Executive authority |
| Packet OS adapter | Existing Packet OS | Packet lifecycle and state | Work-state authority |
| Workforce dispatcher | Existing Workforce Spine | Queue, leases, retries, bounded workers | Worker capability boundary |
| MetaForge worker | Isolated workspace | Repository inspection, code patch, build, package | Filesystem and tool allowlist |
| Local Git | Forgejo target or existing service | Local repositories, branches, PRs, mirror | Source authority |
| EDEN executor | Existing runtime host | Sandboxed commands/processes | Execution boundary |
| Cali adapter | Existing Cali-CRF runtime | CRF-governed specialized execution | Separate runtime policy |
| DevOS | Existing verification owner | Build/test/lint/type/security checks | Engineering truth |
| PROMETHEUS | Existing competition/evidence owner | Benchmarks, evidence synthesis | Evidence truth |
| SECA | Existing acceptance owner | Criterion-level PASS/FAIL/INDETERMINATE | Acceptance authority |
| Medusa | Existing security owner | Security and release policy | Release boundary |
| ProofGrid | Existing proof owner | Evidence bundle and manifest | Proof publication |
| Thoth | Existing archive owner | Immutable source lineage | Historical truth |

## 3. Sequence: one coding command

    Architect -> Atlas Mind: natural-language build request
    Atlas Mind -> Thoth: retrieve approved project context and prior proof
    Atlas Mind -> NHCM/OmniMind: classify, plan, specialist routing
    Atlas Mind -> Ollama: local inference request
    Ollama -> Atlas Mind: structured plan and tool proposals
    Atlas Mind -> SAMI: intake completeness and operator handoff
    Atlas Mind -> JANUS: authorization request with scope/risk
    JANUS -> Atlas Mind: approve / deny / defer receipt
    Atlas Mind -> Packet OS: create versioned CRF packet
    Packet OS -> Workforce Spine: dispatch authorized packet
    Workforce Spine -> MetaForge: lease bounded implementation task
    MetaForge -> Local Git: checkout immutable base, create branch
    MetaForge -> EDEN/Cali: submit sandboxed build/test job
    EDEN/Cali -> DevOS: process and test receipts
    DevOS -> PROMETHEUS: engineering evidence
    PROMETHEUS -> SECA: evidence graph and criterion mapping
    SECA -> Medusa: acceptance decision and security evidence
    Medusa -> ProofGrid: release boundary decision
    ProofGrid -> Thoth: proof manifest and lineage
    Thoth -> Promotion Gate: archive receipt
    Promotion Gate -> Atlas Mind: candidate promotion decision
    Atlas Mind -> Architect: changed files, commit, package, proof, limitations

If any stage fails, create a repair packet with original run ID, correlation ID, failed evidence references, bounded change scope, and retry identity. Never delete or rewrite the failed attempt.

## 4. Data and trust boundaries

- User command is untrusted input until normalized.
- Repository content, issue descriptions, documentation, web pages, and tool output are untrusted data and may contain prompt injection.
- Model output is a proposal, not authority.
- Tool arguments are schema-validated and capability-checked.
- Workers receive path-limited workspaces and short-lived capabilities.
- Secrets are referenced by opaque IDs and injected only into the process that needs them.
- Ollama is not directly exposed to the public internet.
- GitHub mirroring is a separate egress permission and never silently occurs.
- Proof artifacts are append-only; superseded or failed receipts remain addressable.

## 5. Event envelope

Every event should carry:
- event_id
- event_type
- schema_version
- occurred_at
- actor / producer
- run_id
- correlation_id
- packet_id
- parent_event_id where applicable
- repository and commit reference where applicable
- policy version
- payload digest
- evidence references

This allows one timeline to be reconstructed across independent services without making a chat transcript the source of truth.
