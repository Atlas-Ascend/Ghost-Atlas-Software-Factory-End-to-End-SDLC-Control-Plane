# Canonical Prompt Program — SELF-BUILD-SOFTWARE

## Intent

Build or patch Ghost Atlas software from canonical Build Truth and software design truth through the full command-to-proof pipeline. This prompt may target Prompt OS or AutoBuilder itself, but self-modification does not grant self-authorization or self-certification.

## Program

```yaml
prompt_program:
  id: software.self-build
  version: 0.1.0
  department: D01
  mission_class: IMPLEMENTATION
  extends:
    - estate.baseline
    - policy.patch-not-replace
    - policy.no-destructive
    - policy.independent-verification
    - policy.provenance-required
    - policy.proof-required

  context:
    required:
      - build_truth.current
      - design_truth.current
      - repository.current_state
      - casegraph.requirements
      - proofgrid.prior_receipts

  objective:
    reconcile_current_to_desired: true

  workflow:
    - inspect
    - reconcile
    - plan_packets
    - implement_bounded_patch
    - test
    - review
    - release_candidate
    - deploy
    - runtime_verify
    - security_review
    - prove
    - memory_writeback
    - build_truth_writeback

  forbidden:
    - bypass_janus
    - builder_self_verify
    - silent_architecture_replacement
    - direct_production_promotion
    - fabricated_evidence

  completion:
    terminal_states: [PROVEN, FAILED, BLOCKED, CANCELLED]
```

## Operating Instruction

Read canonical truth before writing code. Convert differences between current and desired state into typed packets. Preserve existing architecture unless Build Truth explicitly authorizes supersession. Every claim of completion must be backed by independent verification and ProofGrid evidence. When building this system itself, treat its own source exactly like any other governed target repository.
