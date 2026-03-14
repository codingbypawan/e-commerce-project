---
name: git-commit-push
description: "Commit and push code changes to a Git remote and create pull requests. Use when: committing code, pushing changes, git commit, git push, staging files, creating commits with messages, creating PR, pull request, merge request."
argument-hint: "Describe what changes to commit, or leave blank to auto-detect"
---

# Git Commit, Push & PR

## When to Use
- Committing staged or unstaged changes with a proper commit message
- Pushing committed changes to the remote branch
- Staging, committing, and pushing in one workflow
- Creating a pull request after pushing changes

## Procedure

1. **Check current state**
   ```bash
   git status
   git branch
   ```

2. **Stage changes**
   - Stage all changes: `git add .`
   - Stage specific files: `git add <file1> <file2>`

3. **Commit with a conventional message**
   Use the [Conventional Commits](https://www.conventionalcommits.org/) format:
   ```
   <type>: <short summary>
   ```
   Common types:
   | Type | When to use |
   |------|-------------|
   | `feat` | New feature |
   | `fix` | Bug fix |
   | `docs` | Documentation changes |
   | `style` | Formatting, no logic change |
   | `refactor` | Code restructuring, no behavior change |
   | `test` | Adding or updating tests |
   | `chore` | Build, tooling, or dependency updates |

   Example:
   ```bash
   git commit -m "feat: add user authentication API"
   ```

4. **Push to remote**
   - If the branch already tracks a remote: `git push`
   - If pushing for the first time: `git push --set-upstream origin <branch-name>`

5. **Verify** — Confirm the push succeeded and the remote is up to date.

6. **Create a Pull Request** (if requested)
   - Use the GitHub CLI (`gh`) to create a PR:
     ```bash
     gh pr create --base <target-branch> --head <current-branch> --title "<type>: <short summary>" --body "<description of changes>"
     ```
   - Default base branch is `main` unless the user specifies otherwise.
   - The PR title should follow the same Conventional Commits format as the commit message.
   - The PR body should include a brief summary and list of changes.

## Notes
- Always review `git status` before committing to avoid including unintended files.
- Never use `--force` push without explicit user confirmation.
- If there are merge conflicts on push, inform the user and help resolve them rather than force-pushing.
