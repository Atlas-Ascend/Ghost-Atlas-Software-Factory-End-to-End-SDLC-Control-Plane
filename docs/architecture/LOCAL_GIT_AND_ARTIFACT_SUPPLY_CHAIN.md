# Independent Local Git and Artifact Supply Chain

## 1. Objective

The organism must create, version, inspect, build, package, and recover software when GitHub or the public internet is unavailable. Local Git is the source authority for offline work. GitHub can remain an optional mirror/collaboration surface, not the only copy.

## 2. Service choice

Inspect existing RepoForge, ServerForge, DevOS, and infrastructure repositories for a selected local Git service first. If one exists, use it. If none exists, evaluate Forgejo and Gitea; select one, not both. The decision record covers target architecture support, SSH/HTTPS, LFS, permissions, backup/restore, migration, API/webhook compatibility, runner model, storage, memory, license, and security maintenance.

## 3. Topology

Run the local Git service on the private host. Store repository data on durable storage separate from ephemeral container/runtime storage. Use SSH keys and disable password SSH where feasible. Bind the web UI to loopback/private network behind authenticated access. Maintain local bare repositories and working clones. Configure GitHub mirrors only when explicitly enabled. Back up repository data, database/config, LFS/artifacts, SSH host keys, and service manifests.

## 4. Source-of-truth rules

- Local origin is authoritative for offline-first projects unless repository build truth declares another authority.
- A mirror is replication, not a second authority.
- Mirror divergence requires explicit reconciliation; never auto-overwrite a divergent branch.
- Every build records remote URL, branch, base SHA, resulting commit SHA, and dirty-tree status.
- Release builds use immutable commit SHAs, never moving branch names.
- Large model and binary artifacts belong in an artifact/model store unless Git policy explicitly permits them.

## 5. Build/package lifecycle

1. Clone/fetch canonical local repository.
2. Verify branch protection and clean worktree.
3. Create a run-specific branch.
4. Resolve dependencies from approved local cache or allowlisted source.
5. Build in a sandbox with pinned toolchain.
6. Run DevOS tests and scanners.
7. Generate SBOM and package metadata.
8. Hash artifacts with SHA-256.
9. Commit source and tag/version package only after gates pass.
10. Store artifact and proof bundle durably.
11. Mirror source/metadata to GitHub only if authorized.
12. Archive lineage in Thoth.

## 6. Portable Git diagnostics

    git --version
    git status --short --branch
    git remote -v
    git rev-parse HEAD
    git diff --check
    git diff --stat
    git status --porcelain=v1
    git log -1 --format='%H%n%an%n%ad%n%s'

Before package completion, record the exact commit SHA and artifact digest. Commands requiring a packet ID or artifact path must receive real values from the run; placeholders are not executable commands.

## 7. Recovery acceptance

Restore to a clean host or isolated volume. Verify repository count, refs, commit reachability, LFS objects, users/permissions, and successful clone/build of a representative project. A backup that has never been restored is not proven.
