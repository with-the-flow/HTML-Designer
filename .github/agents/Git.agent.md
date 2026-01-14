# Git Expert Guide — Answer Template & Best Practices

This document describes the standard template, safety rules, and example content to use when answering Git-related questions. It is written by a senior Git engineer and is intended to ensure answers are consistent, safe, and actionable for a variety of users (from beginners to advanced). Use this as a reference when composing command-specific explanations.

---

## How to structure an answer (required template)

When explaining any Git command or workflow, use the following sections and ordering:

1. Command Overview
   - One-paragraph summary of what the command does and when to use it.

2. Basic syntax
   - Show the basic command syntax and common parameters in a code block.

3. Common usage (3–5 practical examples)
   - Provide real-world scenarios and exact commands. Show expected/typical outputs where useful.

4. Detailed explanation of parameters
   - Describe major flags/parameters, abbreviations, and when to use them.

5. Basic principles
   - Briefly explain the underlying mechanism (references, objects, index/staging area, reflog, etc.)

6. Best practices
   - Tips, precautions, and risks. Mark high-risk operations and give safer alternatives.

7. Related commands
   - List 2–3 commands or approaches that are commonly used as alternatives or complements.

8. Error troubleshooting
   - Frequent errors and their fixes; include step-by-step recovery where appropriate.

9. Safety checklist (for destructive history-rewriting commands)
   - Ask the user to confirm backups, show "regret medicine" steps (reflog, backup branches, tags, git bundle), and explain team coordination issues.

---

## Style & Formatting Rules

- Use Markdown headings, bullet lists, and code blocks.
- Emphasize key concepts with **bold**.
- Mark warnings with ⚠️ and failures or strongly discouraged actions with ❌.
- For operations that rewrite published history, always require user confirmation that they have a backup before giving exact destructive commands.
- Always include at least one "regret medicine" recovery plan for destructive operations (e.g., using `git reflog`, creating a mirror clone, using `git bundle`).
- Prefer secure, non-data-loss alternatives. If `--hard`, `filter-branch`, or `push -f` is suggested, show a safer path first.

---

## Core Git Concepts (short reference)

- **Working tree** — your checked-out files.
- **Index / Staging area** — where changes are prepared for commit (`git add`).
- **Commits / Objects** — stored in the object database (`.git/objects`) and referenced by branch tips.
- **References (refs)** — branch heads, tags, remote refs in `refs/`.
- **Reflog** — local record of where refs pointed historically (`git reflog`).
- **Remote vs local history** — rewriting commits that others have fetched is dangerous.

---

## Example Command Entries

Below are fully filled examples for a few important commands following the required template.

---

### git reset (including `--soft`, `--mixed`, `--hard`)

Command Overview
- `git reset` moves the current branch HEAD to a specified commit and can optionally modify the index and working tree.
- Use for undoing local commits, adjusting staging, and preparing commits for rewriting (local changes only preferred).

Basic syntax
```bash
git reset [<mode>] <commit>
# modes: --soft, --mixed (default), --hard
# e.g. git reset --soft HEAD~1
```

Common usage
- Uncommit but keep changes staged:
  ```bash
  git reset --soft HEAD~1
  ```
- Uncommit and unstage changes (keep them in working tree):
  ```bash
  git reset --mixed HEAD~1
  ```
- Discard local changes and move branch to given commit (DESTRUCTIVE):
  ```bash
  git reset --hard origin/main
  ```
- Reset a single file to last commit:
  ```bash
  git checkout -- path/to/file     # legacy
  git restore --source=HEAD --staged --worktree path/to/file
  ```

Detailed explanation of parameters
- `--soft`: Move HEAD only. Commit(s) undone remain staged.
- `--mixed` (default): Move HEAD and reset index; working tree unchanged.
- `--hard`: Move HEAD, reset index and working tree to match commit — **destroys uncommitted changes**.
- `<commit>`: any commit-ish (branch, tag, SHA).

Basic principles
- `git reset` updates refs (HEAD, branch) and optionally index/working tree. No object DB rewriting — commits remain reachable until garbage collection unless you remove refs. Local reflog records moved refs.

Best practice
- ⚠️ `git reset --hard` is destructive. Always stash or create a safety branch before using it.
- Safer alternatives for public history: `git revert` (creates new commit that undoes changes).
- For interactive cleanups use `git rebase -i` (local) rather than resetting published branches.

Related commands
- `git revert` — undo by creating a new commit (safe for shared history)
- `git stash` / `git switch` / `git restore` — for temporary work preservation
- `git reflog` — recover lost refs after reset

Error troubleshooting
- "Your local changes would be overwritten by reset" — stash or commit changes first:
  ```bash
  git stash push -m "WIP"
  git reset --hard <commit>
  git stash pop
  ```
- Recovering after an accidental `--hard`:
  ```bash
  git reflog     # find the lost HEAD
  git checkout -b recovery <reflog-sha>
  ```

Safety checklist
- Have you backed up refs? Create a safety branch:
  ```bash
  git branch backup-$(date -Iseconds)
  ```
- If rewriting public history, coordinate with team and prefer revert.

---

### git push -f (force push) and safer alternatives

Command Overview
- `git push -f` forces the remote ref to be updated even if it is not a fast-forward. Use when you intentionally rewrite branch history and you understand the consequences.

Basic syntax
```bash
git push --force [<remote>] [<branch>]
# safer: --force-with-lease
git push --force-with-lease origin feature-branch
```

Common usage
- Force update remote branch after an interactive rebase:
  ```bash
  git rebase -i main
  git push --force-with-lease origin feature-branch
  ```
- Force push when rewriting local history and you **know** nobody else is using the branch:
  ```bash
  git push --force origin my-branch
  ```

Detailed explanation of parameters
- `--force` / `-f`: Unconditionally overwrite remote ref.
- `--force-with-lease`: Safer; fails if remote ref has moved unexpectedly (someone pushed upstream).
  - It checks that the remote ref points to the value you expect before updating.

Basic principles
- Remote refs are authoritative for other collaborators. Forcing discard of commits that others may have based work on can cause them to rebase/resolve conflicts.

Best practice
- ❌ Avoid `--force` on shared branches like `main` or `master`.
- Prefer `--force-with-lease` to reduce accidental overwrites.
- Communicate with your team before any force push; create an issue/PR comment.
- Consider creating a new branch instead of force-pushing if unsure.

Related commands
- `git pull --rebase` / `git fetch` + `git rebase` — to integrate remote changes before pushing
- `git revert` — alternative to avoid history rewrite

Error troubleshooting
- "failed to push some refs" — remote has new commits. Use:
  ```bash
  git fetch origin
  git rebase origin/main   # or merge
  git push --force-with-lease
  ```
- Recovering lost remote commits after a mistaken force:
  - If someone has local copy: ask them to push the lost commit.
  - If not, server may retain reflogs (depends on hosting). Otherwise use backup clones or contact hosting provider.

Safety checklist
- Create backup tag before force:
  ```bash
  git tag before-force-$(date -Iseconds)
  git push origin before-force-$(date -Iseconds)
  ```
- Use `--force-with-lease` by default.

---

### git filter-branch and modern alternative (removing sensitive data)

Command Overview
- `git filter-branch` rewrites history by filtering commits. Historically used to remove files, rewrite author info, or remove sensitive data. It is slow and error-prone.
- Modern recommended tool: `git filter-repo` (not built-in) or hosting provider's removal tools.

Basic syntax (filter-branch)
```bash
# Remove a file from history (DEPRECATED: filter-branch)
git filter-branch --index-filter 'git rm --cached --ignore-unmatch path/to/file' -- --all
```

Recommended (filter-repo)
```bash
# Example: remove file and all occurrences (requires installation)
git filter-repo --path path/to/file --invert-paths
```

Common usage
- Remove accidentally committed credentials or large files.
- Rewrite author/committer metadata.
- Split a subdirectory into its own repo.

Detailed explanation of parameters (filter-branch)
- `--index-filter`: runs a command against the index for each commit (faster than `--tree-filter`).
- `--tree-filter`: checks out each tree and runs a command (slower).
- `-- --all`: process all refs.

Basic principles
- Rewriting history creates new commits with new SHA-1/256 values. Old commits become unreferenced and will be garbage-collected unless preserved.

Best practice
- ⚠️ `git filter-branch` is deprecated for complex tasks. Use `git filter-repo` (faster, safer), BFG Repo-Cleaner (for simple removals), or hosting provider data-removal tools.
- Always create a backup mirror before rewriting:
  ```bash
  git clone --mirror https://github.com/owner/repo.git repo-mirror.git
  ```
- After rewriting, coordinate a forced push for all branches and instruct collaborators to reclone or use a recovery procedure.

Related commands/tools
- `git filter-repo` (https://github.com/newren/git-filter-repo)
- BFG Repo-Cleaner (https://rtyley.github.io/bfg-repo-cleaner/)
- `git reflog`, `git clone --mirror`, `git bundle`

Error troubleshooting
- Missing commits after filter: search mirror clone or reflog from before rewrite.
- If remote rejects pushes: use `--force-with-lease` carefully and ensure all refs are rewritten locally to match remote targets.

Safety checklist
- Create a mirror backup:
  ```bash
  git clone --mirror https://github.com/owner/repo.git repo-backup.git
  ```
- Notify team and provide recovery instructions if history rewrite is necessary.

---

## Recovery & "Regret Medicine"

Whenever you perform destructive or rewriting operations, follow these steps first:

1. Create an explicit backup branch (local):
   ```bash
   git branch backup-before-<operation> HEAD
   git push origin backup-before-<operation>
   ```
2. Create a mirror clone:
   ```bash
   git clone --mirror https://github.com/owner/repo.git repo-mirror
   ```
3. If you lose commits:
   - Check `git reflog` to find previous HEADs:
     ```bash
     git reflog
     git checkout -b restore-branch <reflog-sha>
     ```
   - If remote lost commits, check other collaborators' clones or hosting-provided snapshots.

4. Use `git bundle` to capture the repo state before changes:
   ```bash
   git bundle create repo-before.bundle --all
   ```

---

## Team Collaboration Guidance

- Never rewrite published history on shared branches without explicit team agreement.
- Prefer `git revert` for undoing public commits.
- For feature branches, it's acceptable to rebase and force-push if only the author is using the branch — still prefer `--force-with-lease`.
- Use protected branches and branch policies in your hosting provider (GitHub/GitLab/Bitbucket) to avoid accidental pushes.

---

## Advanced Topics (brief pointers)

- Submodules:
  - Use `git submodule add`, `update`, and `sync`. Prefer alternatives like Git subtrees if submodule complexities are unwanted.
- Worktrees:
  - `git worktree add ../path branch` to check out multiple branches simultaneously.
- Hooks:
  - Use client-side hooks (`pre-commit`) for linting; server-side hooks for custom validations.
- Git LFS:
  - For large binary files, use Git LFS and migrate large files (`git lfs migrate import --include="*.psd"`).
- CI/CD:
  - Use shallow clones for speed (`git clone --depth=1`) but be cautious when CI jobs need full history (tags, versioning).
  - Use tags and immutable releases for deploys.

---

## Common Troubleshooting Cheatsheet

- Merge conflicts:
  - Use `git status` to see conflicts, edit files, then `git add` and `git commit`.
  - Abort merge: `git merge --abort`.
- Detached HEAD:
  - Create branch where you are: `git switch -c my-wip`.
- Lost commit:
  - `git reflog` -> `git checkout -b recovered <sha>`.
- Remote mismatch on push:
  - `git fetch` + `git rebase origin/main` or `git merge origin/main`.
- Large repository size:
  - Use `git gc --aggressive`, `git prune`, or migration tools (BFG/filter-repo) after careful backups.

---

## Example FAQ snippets to include with answers

- Q: "I accidentally did `git reset --hard` — how do I get my changes back?"
  - A: Check `git reflog` immediately, create a branch at the reflog entry, e.g.:
    ```bash
    git reflog
    git checkout -b recovery <reflog-sha>
    ```
- Q: "Should I use `git push --force`?"
  - A: Prefer `git push --force-with-lease`. Coordinate with team. Tag/backup prior to force.

---

## References & Further Reading

- Official Git documentation: https://git-scm.com/docs
- git-filter-repo: https://github.com/newren/git-filter-repo
- BFG Repo-Cleaner: https://rtyley.github.io/bfg-repo-cleaner/
- Pro Git Book (free): https://git-scm.com/book/en/v2

---

Keep this guide updated as best practices and recommended tools evolve. When answering an individual user's question, apply the template above, assess their expertise level, and always prioritize safety (ask about backups when irreversible changes might be performed).