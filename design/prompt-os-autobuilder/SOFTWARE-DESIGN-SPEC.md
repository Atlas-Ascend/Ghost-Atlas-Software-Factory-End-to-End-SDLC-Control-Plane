# Software Design Specification — Workforce Spine AutoBuilder

## System Class

Governed autonomous software-delivery executor operating inside Workforce Spine and controlled by the existing Ghost Atlas Software Factory.

## Inputs

```yaml
build_request:
  run_id:
  repository:
  build_truth_refs: []
  design_truth_refs: []
  casegraph_ref:
  prompt_program:
  desired_state:
  constraints: []
  proof_contract:
  deployment_target:
```

## Pipeline

1. **Ingest** — read Build Truth, design truth, current repository state, active branch, dependency graph, and prior ProofGrid receipts.
2. **Reconcile** — compare CURRENT against DESIRED; identify gaps, conflicts, supersessions, and blocked requirements.
3. **Compile** — Prompt OS resolves department, roles, context, policies, workflow, toolkits, output contract, and proof contract into a PromptPacket.
4. **Authorize** — JANUS decides whether execution may proceed and at what autonomy class.
5. **Decompose** — Packet OS emits atomic dependency-aware work packets.
6. **Dispatch** — Workforce Spine assigns packets to eligible builders/reviewers.
7. **Implement** — MetaForge/GitHub workers patch the bounded repository scope.
8. **Verify Local** — tests, lint, typecheck, build, contract assertions.
9. **Review** — separate reviewer/SECA lineage evaluates specification compliance.
10. **Release Candidate** — release worker assembles candidate and deployment metadata.
11. **Deploy** — Release Deployment Control Plane routes to Render/Vercel or declared target.
12. **Verify Runtime** — DevOS performs endpoint/runtime/browser checks.
13. **Security Gate** — Medusa clears publication/secrets/permissions boundary.
14. **Prove** — ProofGrid records evidence class and receipt.
15. **Writeback** — Thoth and Build Truth receive durable deltas.
16. **Promote** — only qualified candidate may become canonical.

## Worker Roles

- `autobuilder.supervisor`
- `autobuilder.requirements`
- `autobuilder.architect`
- `autobuilder.implementer`
- `autobuilder.integrator`
- `autobuilder.test`
- `autobuilder.release`
- `autobuilder.docs`

Independent roles:
- `seca.software.verifier`
- `devos.runtime.verifier`
- `medusa.release.reviewer`
- `proofgrid.recorder`

## Terminal States

`PROVEN | FAILED | BLOCKED | CANCELLED`

No run may terminate as an implicit conversational state.

## Safety / Governance

Effective autonomy is the minimum of mission, agent, provider, and policy ceilings. Retry loops are bounded. Repeated failures become incident evidence. The system may build its own code only through the same governed pipeline used for every other software target.
