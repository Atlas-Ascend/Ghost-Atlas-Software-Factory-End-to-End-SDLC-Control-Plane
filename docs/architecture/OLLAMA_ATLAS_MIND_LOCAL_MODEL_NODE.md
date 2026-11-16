# Ollama + Atlas Mind Local Model Node

## 1. Responsibility boundary

Ollama is the local inference server. It is not the entire agent, OS, memory system, or tool executor. Atlas Mind is the conversational application around the model. NHCM / OmniMind is the cognitive orchestration direction, subject to verified repository contracts. A model may propose a tool call; a separate gateway validates and executes it. JANUS and Packet OS remain outside model self-authorization.

## 2.1 Selected independent inference-node target

The selected direction is a dedicated ASUS Ascent GX10 node with NVIDIA GB10 Grace Blackwell and 128 GB unified memory, using the 2 TB SSD configuration. This is a target configuration, not proof that the machine has been purchased, received, or deployed. ASUS documents the 128 GB unified-memory configuration and 1/2/4 TB storage choices. Ollama's current NVIDIA support table explicitly lists GB10 (DGX Spark) at compute capability 12.1, and its Linux distribution includes an ARM64 package. Therefore the intended GX10/Ollama pairing is technically aligned at the published hardware-support level; actual driver, DGX OS, Ollama build, model, thermals, and sustained throughput still require acceptance tests.

Role separation:
- GX10: dedicated local inference/model node; Ollama, model weights, model evaluation, embedding/reranking only if benchmarked.
- EDEN/Cali host: packet execution, MetaForge workspaces, build/test workers, runtime adapters, and artifact production.
- Operator device: conversational client, command capture, approval, status, and proof inspection.
- Git service: local source authority on the private estate network; may be hosted on the EDEN host or another existing infrastructure node after resource review.

Do not combine all roles on the GX10 merely because it has unified memory. Preserve the independent inference boundary so model load spikes do not starve execution, packet processing, or evidence generation.

## 2. Deployment profiles

**Colocated MVP:** Ollama on the EDEN host if memory, GPU/accelerator, thermal, and concurrency budgets permit. Bind to loopback.

**Independent inference node:** dedicated Linux compute node with persistent model storage and a private network interface. Atlas Mind connects through an authenticated gateway or VPN. Never expose unauthenticated Ollama directly to the public internet.

**Failover profile:** primary coding model plus smaller fallback for classification/summarization. Routing must be explicit, versioned, and measured. Do not claim high availability until failover is tested.

## 3. Model selection contract

Select models through PROMETHEUS evaluation, not reputation. Record exact model name and immutable digest, parameter size, quantization, license, supported context, tool-call reliability, code quality on estate tasks, planning accuracy, instruction adherence, refusal behavior, hallucination rate, tokens/sec, time-to-first-token, peak RAM/VRAM, thermal/power behavior, long-context retrieval, cold-start, and offline restart behavior.

Benchmark candidates on the same task set, prompts, tool schemas, context, hardware, and scoring rubric. Pin the selected digest in build truth. A moving tag such as latest is not reproducible.

## 4. Host inspection before install

Inspect OS/version, kernel, CPU architecture, RAM/swap, GPU/driver/runtime/VRAM, storage, network interfaces, firewall, existing Ollama process/version/model inventory/service unit/API binding, and current EDEN/Cali/Atlas Mind topology. Do not install a second daemon over a managed one.

## 5. Installation and verification

Use official Ollama installation instructions for the target OS and pin the installer/source according to supply-chain policy. Then verify binary/version, service status, listening interface, localhost API, approved model pull, digest, storage location, deterministic prompt, tool-call schema through Atlas Mind, concurrency/memory pressure, restart persistence, and offline inference.

Read-only diagnostics on Linux:

    ollama --version
    ollama list
    ollama ps
    ss -ltnp | grep 11434
    curl --fail --silent http://127.0.0.1:11434/api/tags
    systemctl status ollama --no-pager
    journalctl -u ollama -n 100 --no-pager

Do not bind to 0.0.0.0 until private-network controls, authentication gateway, and firewall are verified.

## 6. Agent architecture

Chat UI -> Atlas Mind conversation API -> NHCM/OmniMind context planner -> model router -> Ollama -> structured response/tool proposal -> schema and policy validator -> JANUS authorization -> Packet OS packet -> tool gateway -> MetaForge/EDEN/Cali capability -> event stream/artifacts/evidence -> Atlas Mind response.

A tool call contains tool name, schema-validated arguments, run/packet/correlation IDs, requested capability, risk class, idempotency key, timeout/resource budget, expected outputs, and evidence requirements. Never provide raw unrestricted shell access to the model. Prefer task-scoped tools such as inspect repository, read file, propose patch, apply patch in workspace, run approved test, create branch, commit, package, and inspect logs.

## 7. Memory

- Working context: active conversation and packet, bounded by token budget.
- Project context: approved manifests, architecture, ADRs, build truth.
- Episodic history: run summaries and receipts indexed by Thoth.
- Retrieval: exact file/commit/packet references where possible.
- Promotion: only verified decisions and approved durable facts become canonical memory.
- Privacy: exclude secrets, private keys, tokens, and unrelated personal data.

## 8. Security

Bind Ollama to loopback. Run GA-NIF on the same GX10 host as the authenticated private-network front door. Put authenticated gateway in front of remote inference. Separate inference identity from tool execution identity. Restrict filesystem to approved workspaces. Sanitize tool outputs and defend against prompt injection in repositories/issues/documents. Redact secrets. Enforce per-run token/time/memory/tool budgets. Log model digest, prompt template version, tool calls, decisions, and outcomes. Keep an emergency tool-execution kill switch independent of the model.

## 9. Acceptance

The local coding agent passes only when local inference is confirmed, no unapproved external model calls occur, repository ownership is validated, JANUS approval and Packet OS packet exist, tool calls are bounded, source is committed, build/tests pass, DevOS report exists, SECA accepts, ProofGrid bundle and Thoth archive exist, audit trace is complete, and restart/offline behavior is verified.
