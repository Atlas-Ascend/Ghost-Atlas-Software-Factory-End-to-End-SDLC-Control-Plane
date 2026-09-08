# Ghost Atlas Software Factory

**Technical class:** End-to-End Software Delivery Control Plane  
**Repository topology:** Modular monorepo  
**Operating model:** Command → Build → Execute → Verify → Prove → Accept → Secure → Archive → Promote

This repository is the canonical software-production and promotion machinery for the Ghost Atlas estate. It does **not** replace Ghost Atlas OS or the resident organs. It composes them behind explicit contracts and preserves each organ as a bounded subsystem.

## Canonical command-to-proof spine

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

## Truth law

- **DevOS** — engineering truth: did the artifact actually work?
- **Prometheus** — evidence truth: what does the collected evidence prove?
- **SECA** — acceptance truth: does the result satisfy the declared contract?
- **Medusa** — release boundary: is promotion safe and permissible?
- **ProofGrid** — proof publication: can the chain be independently inspected?
- **Thoth** — historical truth: preserve the immutable lineage and receipts.
- **Promotion Gate** — make only a fully qualified result canonical.

## Runnable vertical slice

The current v1 executes the entire control-plane sequence in-process while preserving production-grade boundaries through typed contracts and Estate Event lineage. Resident services can later replace stage implementations without changing those contracts.

```bash
npm install
npm run check
npm run demo -- "Build a flashlight application"
```

The demo returns a run ID, correlation ID, artifact ID, ProofGrid proof ID, Thoth archive ID, promotion state, and the ordered stage trace.

## Repository map

```text
src/
├── contracts.ts
├── factory.ts
├── cli.ts
├── lib.ts
└── organs/
    ├── control-plane.ts
    ├── metaforge.ts
    ├── execution.ts
    ├── devos.ts
    ├── prometheus.ts
    ├── seca.ts
    ├── medusa.ts
    ├── proofgrid.ts
    ├── thoth.ts
    └── promotion.ts

tests/
└── factory.test.ts

docs/
└── ARCHITECTURE.md

build-truth/
└── SYSTEM_REGISTRY.json

.github/workflows/
└── ci.yml
```

## Production extension path

The same contracts are intended to back the production topology already being built across Ghost Atlas:

- Runtime Gateway / Estate Event Gateway
- Neon run ledger
- dispatcher / queue workers
- Render execution workers
- SSE runtime observability
- resident EDEN adapters
- GitHub build/deployment evidence
- ProofGrid and Thoth persistence

## Status

`SOFTWARE_FACTORY_V1 = IMPLEMENTED_ON_FEATURE_BRANCH`

Promotion to `main` requires CI build/test/smoke proof.
