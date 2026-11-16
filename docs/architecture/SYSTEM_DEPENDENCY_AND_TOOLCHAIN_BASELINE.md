# System Dependency and Toolchain Baseline

## 1. Dependency law

The estate uses one approved dependency registry. A tool is not approved merely because it is popular or easy to install. Each dependency record must include owner, purpose, source, license, pinned version/digest, supported architecture, configuration path, network requirement, data class, install verification, upgrade procedure, rollback, and proof receipt.

Do not install duplicate services. Do not add a database, queue, cache, service mesh, container runtime, or model server if an existing canonical owner already provides the required capability.

## 2. Target node roles

| Node | Role | Required software | Excluded responsibility |
|---|---|---|---|
| ASUS Ascent GX10 target | Independent inference node | DGX OS / supported Linux ARM64 stack, NVIDIA driver, Ollama, model store, authenticated gateway | Build execution, public Git hosting, production deployment |
| EDEN/Cali runtime host | Build and execution body | Supported Linux, Git, Node.js, Python, container runtime if approved, MetaForge, Packet OS adapters, DevOS, observability | Model ownership unless colocated is explicitly approved |
| Local Git host/service | Independent source authority | Forgejo candidate, SSH, persistent volume, backup | Model inference or unrestricted worker execution |
| Operator client | Command/approval/proof surface | Browser or existing mobile/desktop client, authenticated network | Privileged execution |
| External services | Optional mirror/failover | GitHub mirror, approved cloud model fallback | Silent data egress |

## 3. Canonical monorepo toolchain and donor toolchain

Ghost Atlas OS root toolchain baseline is Node.js 22, pnpm 10.15.1, Turborepo 2.5.6, TypeScript 5.9.2, Vitest 3.2.4, ESLint 9.35.0, Python 3.13, Ruff 0.16.6, pytest 8.4.2, and Docker/Compose as recorded in the canonical root package and scaffold. The external Software Factory donor has a separate Node.js 20+ / npm / TypeScript 5.7.2 toolchain. Do not conflate the donor lockfile with the canonical monorepo toolchain.

## 4. Existing Software Factory donor dependencies

The current canonical Software Factory repository declares:
- Node.js engine requirement: version 20 or newer.
- TypeScript 5.7.2.
- Node type definitions 22.10.0.
- npm scripts: build, test, demo, check, and sof.

Use the repository's package manifest and lockfile as the authority. Do not independently upgrade TypeScript or Node without running the complete CI suite. The existing factory is TypeScript/ESM. This architecture does not require a second language runtime for the control plane.

## 4. Host prerequisites

### GX10 inference node
- ARM64 / AArch64 Linux.
- NVIDIA GB10 driver/runtime stack compatible with the installed DGX OS release.
- Ollama ARM64 build and supported NVIDIA backend.
- 128 GB unified memory target and 2 TB storage target.
- Persistent model directory with capacity monitoring.
- Private 10 GbE or other private LAN path to the EDEN host.
- Firewall and authenticated inference gateway.
- Time synchronization and durable logs.

### EDEN/Cali host
- Linux distribution and architecture confirmed by host inventory.
- Git and SSH.
- Node.js 20+ for the current Software Factory.
- Python 3 only for existing automation scripts that require it.
- One container engine, Docker or Podman, only if approved by the runtime owner.
- Durable repository, workspace, artifact, log, and proof storage.
- A non-root worker identity and isolated workspaces.
- Existing Packet OS persistence and Workforce queue; do not duplicate.

## 5. Toolchain matrix

| Layer | Candidate tool | Purpose | Gate |
|---|---|---|---|
| Source control | Git | Local clone, branch, diff, commit, tag | Required |
| Local Git service | Forgejo | Private self-hosted GitHub-like UI/API/SSH | Target candidate; host census first |
| Runtime language | Node.js 20+ | Existing Software Factory | Required by current package |
| TypeScript | 5.7.2 baseline | Existing factory source | Existing package baseline |
| Automation | Python 3 | Existing build/forensic scripts | Only where repo requires it |
| Container runtime | Docker or Podman | Isolated execution and Forgejo service | Choose one based on existing host |
| Local inference | Ollama | Model serving | Required for local coding-agent target |
| Model candidates | PROMETHEUS-selected Ollama models | Coding and reasoning | Benchmark and digest pin required |
| API gateway | Existing CrownGrid/estate gateway or authenticated reverse proxy | Inference/tool access control | Reuse canonical owner |
| Security | Gitleaks, Semgrep, Trivy, Syft/Grype or existing equivalents | Secrets, SAST, image/dependency, SBOM/vulnerability | Tool approval and CI integration |
| Browser tests | Playwright | UX end-to-end tests | Only if UI is browser-based |
| Observability | Existing Ghost Atlas Runtime Observatory / OpenTelemetry-compatible pipeline | Logs, metrics, traces | Reuse existing observability owner |
| Design | Existing Figma workspace and DaVinci UI design source | UI/UX design | Reuse, no parallel design tool stack |
| Diagram source | Mermaid or PlantUML in Git | Architecture diagrams | Text source is versioned |

Security scanner names above are candidate implementations. Check existing canonical security tooling and licensing before adoption.

## 6. Install order

1. Inventory host, OS, architecture, memory, accelerator, disk, network, services, and ports.
2. Verify time synchronization, storage mount, and service identity.
3. Verify Git and Node toolchain for the Software Factory.
4. Verify the existing container runtime, if any.
5. Verify EDEN/Cali runtime and Packet OS persistence.
6. Verify or deploy local Git service only after owner reconciliation.
7. Install or validate Ollama on the GX10 ARM64 host.
8. Pull only benchmark-approved model candidates.
9. Connect Atlas Mind to Ollama through a private authenticated gateway.
10. Connect tool gateway to JANUS and Packet OS.
11. Enable Workforce dispatch with one worker.
12. Enable MetaForge actual workspace build.
13. Add DevOS, PROMETHEUS, SECA, Medusa, ProofGrid, and Thoth evidence adapters.
14. Run the MVP proof scenario.
15. Add concurrency only after resource and isolation tests pass.

## 7. GX10 / Ollama bootstrap commands

These commands are a target procedure for the GX10 Linux host, not commands for Android PRoot or the EDEN execution host. Confirm the host is the intended GX10 and check existing Ollama before installing.

    uname -m
    cat /etc/os-release
    free -h
    df -h
    nvidia-smi
    ollama --version
    ollama list
    ss -ltnp | grep 11434 || true

Expected architecture is aarch64. Confirm GB10 is visible through the NVIDIA driver stack. Ollama publishes an ARM64 Linux package and its current GPU support table lists GB10 (DGX Spark) compute capability 12.1. The installed driver and runtime must still be tested.

Official Linux installer:

    curl -fsSL https://ollama.com/install.sh | sh

Then:

    sudo systemctl status ollama --no-pager
    ollama --version
    curl --fail --silent http://127.0.0.1:11434/api/tags

The API must remain loopback-bound during initial validation. Ollama binds to 127.0.0.1 by default. Do not set 0.0.0.0 as a shortcut. For remote Atlas Mind access, expose a private-interface endpoint only behind an authenticated gateway and firewall allowlist. The Ollama API itself should be treated as unauthenticated unless wrapped by an authenticated gateway.

Model candidate pull is deliberately omitted until PROMETHEUS completes the hardware benchmark and the exact digest, license, quantization, and storage budget are approved.

## 8. Model candidate benchmark set

Initial candidate set for PROMETHEUS evaluation:
- qwen3-coder:30b — agentic coding candidate with tool support and a published 256K context profile.
- devstral:24b — coding-agent candidate with tool support and a published 128K context profile.
- qwen3.8:27b — current general/reasoning candidate in the Ollama library; test coding tool reliability before assigning it as primary.
- ripple-preview:65b — larger agentic coding candidate; test sustained memory, latency, and thermal behavior before considering production use.

Do not treat model library context length as a safe context setting for the whole system. Context KV cache, concurrent sessions, model quantization, and runtime overhead consume memory. Start with a conservative context budget and raise it only from measured results. Select one primary coding model and one fallback only after identical PROMETHEUS tasks and scorecards.

The qwen3-coder 480B local variant is excluded from the single GX10 target because its published local minimum memory requirement is above the 128 GB node's capacity.

## 9. Verification checklist

- Host identity and architecture recorded.
- GPU/accelerator detected and GB10 support confirmed.
- Ollama service version and process owner recorded.
- API listening only on approved interface.
- Model name, digest, quantization, license, and storage path recorded.
- Model load, prompt, tool-call, concurrency, and restart tests pass.
- Inference endpoint reachable only from approved Atlas Mind host/gateway.
- No unapproved cloud model or internet egress in local-only mode.
- CPU, unified memory, storage, latency, tokens/sec, and thermal metrics archived.
