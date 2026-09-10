# Prompt OS Self-Build / Workforce AutoBuilder Architecture

## Purpose

This design defines the governed path by which Ghost Atlas Build Truth and software design truth become executable software delivery work through Prompt OS, Packet OS, Workforce Spine, MetaForge, GitHub, CI, deployment, verification, ProofGrid, and Thoth.

The AutoBuilder is not a new control plane. It is a bounded Workforce Spine execution profile owned by the existing Software Factory.

## Canonical Flow

```text
ARCHITECT / BUILD TRUTH / DESIGN TRUTH
        ↓
ATLAS PROMPT OS
  intent + context + policy + flow compilation
        ↓
PROMPTPACKET
        ↓
JANUS AUTHORIZATION
        ↓
UNIVERSAL CASEGRAPH
        ↓
PACKET OS DECOMPOSITION
        ↓
WORKFORCE SPINE
        ↓
AUTOBUILDER SUPERVISOR
        ├── requirements worker
        ├── architecture worker
        ├── implementation worker
        ├── test worker
        ├── integration worker
        ├── release worker
        └── documentation worker
        ↓
METAFORGE / GITHUB
        ↓
CI
        ↓
DEPLOYMENT CONTROL PLANE
        ↓
RENDER / VERCEL
        ↓
SECA + DEVOS + MEDUSA
        ↓
PROOFGRID
        ↓
THOTH WRITEBACK
        ↓
BUILD TRUTH DELTA
        ↓
PROMOTION GATE
```

## Self-Build Rule

Prompt OS may participate in building Prompt OS and its execution machinery, but it may never bypass the independent gates that govern any other build.

The self-build loop is therefore recursive in specification, not recursive in authority.

`Prompt OS → proposes/compiles work about Prompt OS → JANUS authorizes → independent workers execute → independent verifiers verify → ProofGrid proves → promotion gate promotes.`

## Source Inputs

The AutoBuilder consumes four explicit source classes:

1. `BUILD_TRUTH` — canonical current system truth.
2. `DESIGN_TRUTH` — intended architecture and implementation contracts.
3. `CASEGRAPH` — normalized requirement/problem/dependency graph.
4. `PROMPT_PROGRAM` — cognitive program selecting roles, policies, workflow, outputs, and proof.

Chat history alone is not an authoritative build input.

## Execution Invariants

- PATCH_NOT_REPLACE by default.
- No destructive operation without JANUS authorization and recovery plan.
- No builder self-certification.
- No direct production promotion from an implementation worker.
- Every packet has `run_id`, `packet_id`, explicit inputs, outputs, capabilities, retry bounds, and proof contract.
- Every deployment must emit deployment evidence and runtime verification.
- Every completed run must write a Build Truth delta and Thoth memory delta.

## Definition of Done

A software mission is complete only when the required artifact exists and all declared acceptance gates pass. Typical P8 software proof requires: commit SHA, tests, lint/typecheck/build where applicable, deployment ID/URL, runtime probe, browser verification where applicable, provenance, and replay instructions.
