
# Welvox GENESIS

**Turn an idea into a product blueprint. Then take it to your coding agent.**

Welvox GENESIS is a mobile-first, browser-based creation studio paired with a reusable cross-agent coding skill.

**Release:** V0.1.0  
**License:** MIT  
**Website:** GitHub Pages  
**Build requirement:** No local build step for the initial website


<p align="center">
  <img src="assets/welvox-genesis.png" 
</p>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/piyush2707/)

[![Release](https://img.shields.io/github/v/release/piyush2707/welvox-genesis?style=for-the-badge&color=8b5cf6)](https://github.com/piyush2707/welvox-genesis/releases/latest)

[![Releases](https://img.shields.io/badge/Releases-View%20All-8b5cf6?style=for-the-badge&logo=github)](https://github.com/piyush2707/welvox-genesis/releases)

## What it does

Enter a plain-language idea and generate a structured starting point for a software project.

The website includes:

- A mobile-first creation interface.
- A rule-based idea-to-blueprint generator.
- Product briefs, suggested features, screens, and roadmaps.
- An implementation prompt for a compatible coding agent.
- Markdown and JSON export.
- Local project saving through browser storage.
- Example ideas to help new users get started.

The companion `idea-to-reality` skill guides compatible coding agents through product discovery, MVP scoping, repository inspection, implementation, validation, and handoff.

## Quick start

1. Open the deployed website.
2. Describe the product you want to create.
3. Select **Create blueprint**.
4. Review the suggested features, screens, and roadmap.
5. Copy the agent prompt into your coding agent, or export the blueprint.
6. Refine the plan and implement it in your chosen development environment.

## Important scope note

Version 0.1.0 uses built-in browser logic to create structured blueprints. It does not call a live AI model.

The website does not execute arbitrary code, provision servers, connect to private repositories, or deploy generated applications automatically.

Actual implementation depends on the coding agent and tools available to the user. A future AI integration would require a suitable backend or another secure provider-supported architecture.

## Repository structure

```text
welvox-genesis/
├── index.html
├── styles.css
├── app.js
├── README.md
├── LICENSE
├── AGENTS.md
└── skills/
    └── idea-to-reality/
        ├── SKILL.md
        └── references/
            ├── product-blueprint.md
            └── quality-checklist.md
```

## Publish with GitHub Pages

You can publish the website without installing packages or running a local build.

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and the `/(root)` folder.
5. Select **Save**.
6. Wait for the deployment to finish, then open the published URL shown in Pages settings.

The website's entry point is `index.html`, and its CSS and JavaScript files are referenced directly. No build command is required.

## Use the skill with Claude Code

For project-level installation, copy the contents of `skills/idea-to-reality/` into:

```text
.claude/skills/idea-to-reality/
```

Keep `SKILL.md` and the `references/` directory together.

## Use the skill with OpenAI Codex

For a project-level installation, copy the same skill folder into:

```text
.agents/skills/idea-to-reality/
```

Keep `SKILL.md` and the `references/` directory together.

## Other coding agents

The skill follows the open Agent Skills format, but support and discovery paths vary by agent and version.

Consult the documentation for your agent. If it supports compatible `SKILL.md` directories, install the folder at its documented location.

## Mobile development

The repository can be created and edited using GitHub's mobile app or a mobile browser.

For a small change:

1. Open the target file.
2. Select Edit.
3. Make the change.
4. Commit it to the branch used by GitHub Pages.
5. Wait for the updated website to deploy.

## Data and privacy

The initial website stores saved projects in the browser's local storage on the device and browser being used.

Saved projects are not synchronised across devices or users. Clearing browser data can remove them. Export important projects as Markdown or JSON backups.

Do not enter passwords, API keys, private customer information, or other secrets into project ideas. The initial application has no authentication or server-side data storage.

## Roadmap

### V0.1.0 — Initial MVP

- [x] Static mobile-first interface.
- [x] Rule-based blueprint generation.
- [x] Agent implementation prompt.
- [x] Browser-based project saving.
- [x] Markdown and JSON exports.
- [x] Cross-agent skill and references.

### Future releases

- Live AI generation through a secure integration.
- More specialised blueprint templates.
- A richer visual screen and user-flow planner.
- Improved project organisation and import.
- Optional shared projects and server-backed persistence.
- Automated validation and deployment workflows.

These are planned opportunities, not features included in V0.1.0.

## Contributing

Issues, feature suggestions, documentation improvements, and pull requests are welcome.

Please describe the user problem a proposed feature solves and how its success could be verified.

## License

Released under the MIT License. See `LICENSE`.
