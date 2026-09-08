# Ghost Atlas Software Factory Architecture

## System class

Ghost Atlas Software Factory is an **end-to-end software delivery control plane** implemented as a modular monorepo. It composes existing Ghost Atlas organs into one command-to-proof production pipeline while preserving each organ's authority boundary.

## Canonical flow

```text
ARCHITECT
   ↓
ATLAS MIND
   ↓
JANUS
   ↓
PACKET OS
   ↓
WORKFORCE SPINE
   ↓
METAFORGE
   ↓
EDEN / EXECUTION FABRIC
   ↓
DEVOS
   ↓
PROMETHEUS
   ↓
SECA
   ↓
MEDUSA
   ↓
PROOFGRID
   ↓
THOTH
   ↓
PROMOTE
```

## Authority boundaries

| Organ | Technical role | Output |
|---|---|---|
| Architect | sovereign command source | command intent |
| Atlas Mind | interpretation and synthesis | interpreted objective |
| Janus | authorization and routing | authorized route |
| Packet OS | atomic work definition | WorkPacket |
| Workforce Spine | dispatch bloodstream | dispatched packet |
| MetaForge | software factory / builder | BuildArtifact |
| EDEN / Execution Fabric | runtime execution | ExecutionReceipt |
| DevOS | engineering verification | DevOSVerificationReceipt |
| Prometheus | evidence synthesis | PrometheusProofPacket |
| SECA | independent acceptance authority | SECAAcceptanceDecision |
| Medusa | security/privacy/release boundary | MedusaReleaseDecision |
| ProofGrid | evidence publication | ProofGridReceipt |
| Thoth | archive and lineage memory | ThothArchiveReceipt |
| Promotion Gate | canonical state transition | PromotionReceipt |

## Truth pipeline

```text
DEVOS       → engineering truth
PROMETHEUS  → evidence truth
SECA        → acceptance truth
MEDUSA      → release boundary
PROOFGRID   → inspectable proof
THOTH       → permanent lineage
PROMOTE     → canonical state
```

## Promotion invariant

An artifact may be promoted only when all of the following are true:

1. Runtime execution succeeded.
2. DevOS verification passed.
3. Prometheus found no contradictions and emitted full-confidence evidence truth.
4. SECA returned PASS against the Packet OS acceptance criteria.
5. Medusa returned ALLOW.
6. ProofGrid published the evidence chain.
7. Thoth archived the proof lineage.

The Promotion Gate has no authority to override any upstream decision.

## Current implementation scope

`src/factory.ts` provides the first runnable vertical slice of the control plane. It is intentionally adapter-friendly: resident services can later replace in-process stage implementations without changing the contracts in `src/contracts.ts`.

This keeps the first implementation demonstrable while preserving the intended production topology: Runtime Gateway/Event Gateway, Neon run ledger, queue/dispatcher, Render workers, SSE observability, and external resident organ adapters can be mounted behind the same event and receipt contracts.
