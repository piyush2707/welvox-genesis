
# Repository Instructions

## Project purpose

Welvox GENESIS is a mobile-first idea-to-blueprint web application and a repository of reusable coding-agent instructions.

## Development constraints

- Keep the static website deployable through GitHub Pages from the repository root.
- Do not introduce a package manager, framework, or build step without a clear reason.
- Keep HTML, CSS, and JavaScript in separate files.
- Preserve support for narrow mobile screens.
- Avoid dependencies that make editing from GitHub mobile difficult.

## Implementation rules

- Inspect existing files before changing them.
- Make small, focused changes.
- Keep user-visible behaviour connected to real functionality.
- Validate inputs and display useful errors.
- Use safe DOM APIs such as `textContent` for user-provided content.
- Never use `eval` or execute user-provided idea text as code.
- Do not place secrets in frontend files.
- Explain any feature that requires a backend or external service.

## Quality checks

- Verify the primary idea-to-blueprint flow.
- Verify empty and invalid inputs.
- Check project saving and deletion.
- Check Markdown and JSON exports.
- Check responsive layout and keyboard accessibility.
- Verify relative asset paths and GitHub Pages compatibility.
- Report which checks were actually performed.

## Documentation

Update `README.md` when user-visible features, setup steps, limitations, or deployment requirements change.

Keep the portable skill in `skills/idea-to-reality/`. Do not silently duplicate it into agent-specific installation directories unless the user requests that change.
