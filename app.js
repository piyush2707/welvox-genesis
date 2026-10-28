
"use strict";

const $ = (id) => document.getElementById(id);
const STORAGE_KEY = "welvox-genesis-projects-v1";

let currentBlueprint = null;
let projects = readProjects();

function readProjects() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function writeProjects() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    updateProjectCount();
    return true;
  } catch {
    showFeedback("Storage is full or unavailable. Export your blueprint to keep it.");
    return false;
  }
}

function updateProjectCount() {
  $("project-count").textContent = String(projects.length);
}

function clean(text) {
  return String(text || "").replace(/\s+/g, " ").trim();
}

function titleCase(text) {
  return text.replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
}

function makeTitle(idea) {
  const words = clean(idea).replace(/[^\p{L}\p{N}\s'-]/gu, "")
    .split(/\s+/).filter(Boolean).slice(0, 6);
  return words.length ? titleCase(words.join(" ")) : "Untitled Idea";
}

function detectType(idea) {
  const s = idea.toLowerCase();
  if (/marketplace|sell|seller|buyer|booking|freelanc|client/.test(s)) return "marketplace";
  if (/learn|study|student|course|education|teach/.test(s)) return "learning";
  if (/finance|money|budget|expense|invest|payment/.test(s)) return "finance";
  if (/community|social|creator|content|share|network/.test(s)) return "community";
  if (/task|habit|plan|productiv|organis|schedule/.test(s)) return "productivity";
  if (/ai|assistant|automat|agent/.test(s)) return "assistant";
  return "general";
}

const featureSets = {
  marketplace: [
    ["Clear discovery", "Let users browse, search, and filter relevant listings."],
    ["Trustworthy profiles", "Show useful details, credentials, and reputation signals."],
    ["Core transaction flow", "Make the main booking, enquiry, or purchase action clear."],
    ["Status tracking", "Show the current state of each request or transaction."],
    ["Feedback and support", "Give users a way to report issues and share feedback."]
  ],
  learning: [
    ["Learning dashboard", "Show goals, active topics, and next steps."],
    ["Structured learning paths", "Break a subject into small, achievable modules."],
    ["Progress tracking", "Record completed lessons and milestones."],
    ["Practice activities", "Provide exercises with useful feedback."],
    ["Personal review", "Help users identify what to revisit next."]
  ],
  finance: [
    ["Overview dashboard", "Present the most useful financial information clearly."],
    ["Transaction records", "Allow users to add, review, and categorise entries."],
    ["Budgets and goals", "Set targets and compare progress against them."],
    ["Useful summaries", "Show trends and simple, understandable breakdowns."],
    ["Privacy and validation", "Validate inputs and avoid exposing sensitive data."]
  ],
  community: [
    ["Member profiles", "Let people describe their work, interests, or goals."],
    ["Publishing workflow", "Make creating and viewing contributions straightforward."],
    ["Discovery", "Help users find relevant people and content."],
    ["Interaction", "Support a meaningful action such as comments or reactions."],
    ["Safety controls", "Provide reporting, moderation, and respectful-use rules."]
  ],
  productivity: [
    ["Personal workspace", "Show the user's current priorities in one place."],
    ["Create and edit items", "Make the main task or planning workflow fast."],
    ["Progress states", "Track what is planned, active, and completed."],
    ["Reminders or review", "Help users decide what to do next."],
    ["Search and filters", "Make existing work easy to find."]
  ],
  assistant: [
    ["Task input", "Capture the user's request and desired outcome."],
    ["Context and constraints", "Record relevant preferences and boundaries."],
    ["Structured output", "Return an actionable result rather than vague prose."],
    ["Review and refine", "Let users revise results before using them."],
    ["Capability boundaries", "Explain what needs a connected model or external tool."]
  ],
  general: [
    ["Focused onboarding", "Explain the product's value and help users get started."],
    ["Core action", "Make the main job easy to discover and complete."],
    ["Useful dashboard", "Show the most relevant result or next step."],
    ["History and editing", "Allow users to revisit and refine their work."],
    ["Help and feedback", "Give users guidance and a way to report problems."]
  ]
};

function buildBlueprint(rawIdea) {
  const idea = clean(rawIdea);
  if (idea.length < 12) {
    throw new Error("Please describe your idea in at least 12 characters.");
  }

  const type = detectType(idea);
  const features = featureSets[type].map(([name, detail]) => ({ name, detail }));
  const title = makeTitle(idea);

  const audienceByType = {
    marketplace: "People offering services or products, and the people looking for them.",
    learning: "Learners who want a clearer, more manageable way to make progress.",
    finance: "People who need a clearer view of their money and financial habits.",
    community: "People who want to share, discover, and connect around a common interest.",
    productivity: "People who want to organise their work and make steady progress.",
    assistant: "People who want help completing a task with clear inputs and outputs.",
    general: "People who experience the problem this idea is intended to solve."
  };

  const promiseByType = {
    marketplace: "Help the right people find each other and complete the core transaction with less friction.",
    learning: "Turn a broad learning goal into clear next steps and visible progress.",
    finance: "Make the next useful financial decision easier to understand.",
    community: "Make relevant people and contributions easier to discover and engage with.",
    productivity: "Turn scattered intentions into a manageable sequence of actions.",
    assistant: "Turn a request into a structured result that users can review and act on.",
    general: "Help the intended user complete the main task with less effort and more clarity."
  };

  const screens = [
    { name: "Welcome / onboarding", detail: "Explain the promise and help the user start." },
    { name: "Main workspace", detail: "Support the product's most important action." },
    { name: "Results / details", detail: "Present the outcome and relevant next steps." },
    { name: "History / saved items", detail: "Let users return to previous work." },
    { name: "Settings / help", detail: "Offer basic preferences, guidance, and support." }
  ];

  const roadmap = [
    "Validate the problem with real target users.",
    "Build one complete happy-path workflow.",
    "Test mobile layouts, empty states, and invalid input.",
    "Add persistence and handle errors safely.",
    "Deploy, collect feedback, and prioritise improvements."
  ];

  const brief = `Build a focused first version of a product based on this idea: "${idea}". Start with one complete, useful workflow. Avoid unnecessary features until the core value is validated.`;

  const prompt = [
    "You are the implementation agent for this project.",
    "",
    "PRODUCT: " + title,
    "ORIGINAL IDEA: " + idea,
    "",
    "PRODUCT PROMISE: " + promiseByType[type],
    "TARGET AUDIENCE: " + audienceByType[type],
    "",
    "CORE FEATURES:",
    ...features.map((f, i) => `${i + 1}. ${f.name}: ${f.detail}`),
    "",
    "SUGGESTED SCREENS:",
    ...screens.map((s, i) => `${i + 1}. ${s.name}: ${s.detail}`),
    "",
    "IMPLEMENTATION RULES:",
    "- Inspect the existing repository before editing files.",
    "- State assumptions and identify missing requirements.",
    "- Propose a minimal architecture that fits the existing stack.",
    "- Implement one coherent end-to-end workflow before expanding scope.",
    "- Reuse existing conventions and avoid unnecessary dependencies.",
    "- Validate inputs, handle errors, and include loading and empty states.",
    "- Keep secrets out of source code and browser storage.",
    "- Test the result where tools are available; report tests not run.",
    "- Do not claim deployment or successful tests without evidence.",
    "- Summarise changed files, limitations, and the next steps.",
    "",
    "FIRST MILESTONES:",
    ...roadmap.map((item, i) => `${i + 1}. ${item}`),
    "",
    "Begin by inspecting the repository and presenting a concise plan. Then implement the smallest useful version."
  ].join("\n");

  return {
    id: makeId(),
    title,
    idea,
    type,
    brief,
    audience: audienceByType[type],
    promise: promiseByType[type],
    features,
    screens,
    roadmap,
    prompt,
    createdAt: new Date().toISOString()
  };
}

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function showFeedback(message) {
  $("feedback").textContent = message;
}

function addListItems(id, items, numbered = false) {
  const list = $(id);
  list.replaceChildren();

  items.forEach((item) => {
    const li = document.createElement("li");
    if (typeof item === "string") {
      li.textContent = item;
    } else {
      const strong = document.createElement("strong");
      strong.textContent = item.name;
      li.append(strong, document.createElement("br"), document.createTextNode(item.detail));
    }
    list.appendChild(li);
  });

  if (numbered) list.setAttribute("aria-label", "Build roadmap");
}

function renderBlueprint(bp) {
  currentBlueprint = bp;
  $("result-title").textContent = bp.title;
  $("result-subtitle").textContent = "Your idea, shaped into a first-release plan.";
  $("brief").textContent = bp.brief;
  $("audience").textContent = bp.audience;
  $("promise").textContent = bp.promise;
  addListItems("features", bp.features.map(f => ({
    name: f.name, detail: f.detail
  })));
  addListItems("screens", bp.screens);
  addListItems("roadmap", bp.roadmap, true);
  $("agent-prompt").value = bp.prompt;
  $("workspace").hidden = false;
  $("projects-section").hidden = true;
  showFeedback("");
  $("workspace").scrollIntoView({ behavior: "smooth", block: "start" });
}

function exportText(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function toMarkdown(bp) {
  return [
    "# " + bp.title,
    "",
    "**Created with Welvox GENESIS · V0.1.0**",
    "",
    "## Original idea",
    bp.idea,
    "",
    "## Product brief",
    bp.brief,
    "",
    "## Target audience",
    bp.audience,
    "",
    "## Core promise",
    bp.promise,
    "",
    "## Core features",
    ...bp.features.map((f, i) => `${i + 1}. **${f.name}:** ${f.detail}`),
    "",
    "## Suggested screens",
    ...bp.screens.map((s, i) => `${i + 1}. **${s.name}:** ${s.detail}`),
    "",
    "## Build roadmap",
    ...bp.roadmap.map((step, i) => `${i + 1}. ${step}`),
    "",
    "## Agent implementation prompt",
    "",
    "```text",
    bp.prompt.replace(/```/g, "'''"),
    "```",
    ""
  ].join("\n");
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const field = document.createElement("textarea");
  field.value = text;
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.appendChild(field);
  field.select();
  const success = document.execCommand("copy");
  field.remove();
  if (!success) throw new Error("Copy is unavailable. Select and copy the text manually.");
}

function renderProjects() {
  const container = $("saved-projects");
  container.replaceChildren();

  if (!projects.length) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "No saved projects yet. Generate a blueprint and choose Save project.";
    container.appendChild(empty);
    return;
  }

  projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "saved-item";

    const heading = document.createElement("h3");
    heading.textContent = project.title;
    const description = document.createElement("p");
    description.textContent = project.idea;
    const open = document.createElement("button");
    open.className = "secondary-button";
    open.textContent = "Open";
    open.addEventListener("click", () => renderBlueprint(project));

    const remove = document.createElement("button");
    remove.className = "secondary-button";
    remove.textContent = "Delete";
    remove.addEventListener("click", () => {
      projects = projects.filter(p => p.id !== project.id);
      if (writeProjects()) {
        renderProjects();
        showFeedback("Project deleted from this browser.");
      }
    });

    card.append(heading, description, open, remove);
    container.appendChild(card);
  });
}

$("idea").addEventListener("input", () => {
  $("char-count").textContent = `${$("idea").value.length} / 3000`;
});

$("generate-button").addEventListener("click", () => {
  try {
    const bp = buildBlueprint($("idea").value);
    renderBlueprint(bp);
  } catch (error) {
    $("feedback").textContent = error.message;
    $("idea").focus();
  }
});

document.querySelectorAll("[data-idea]").forEach(button => {
  button.addEventListener("click", () => {
    $("idea").value = button.dataset.idea;
    $("char-count").textContent = `${$("idea").value.length} / 3000`;
    $("idea").focus();
  });
});

$("new-button").addEventListener("click", () => {
  $("workspace").hidden = true;
  $("idea").focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

$("copy-button").addEventListener("click", async () => {
  if (!currentBlueprint) return;
  try {
    await copyText(currentBlueprint.prompt);
    showFeedback("Agent prompt copied. Paste it into your coding agent.");
  } catch (error) {
    showFeedback(error.message);
  }
});

$("markdown-button").addEventListener("click", () => {
  if (!currentBlueprint) return;
  exportText("genesis-blueprint.md", toMarkdown(currentBlueprint), "text/markdown;charset=utf-8");
  showFeedback("Markdown export prepared.");
});

$("json-button").addEventListener("click", () => {
  if (!currentBlueprint) return;
  exportText("genesis-blueprint.json", JSON.stringify(currentBlueprint, null, 2), "application/json;charset=utf-8");
  showFeedback("JSON export prepared.");
});

$("save-button").addEventListener("click", () => {
  if (!currentBlueprint) return;
  const index = projects.findIndex(p => p.id === currentBlueprint.id);
  if (index >= 0) projects[index] = currentBlueprint;
  else projects.unshift(currentBlueprint);

  if (writeProjects()) showFeedback("Project saved in this browser.");
});

$("projects-button").addEventListener("click", () => {
  $("projects-section").hidden = false;
  $("workspace").hidden = true;
  renderProjects();
  $("projects-section").scrollIntoView({ behavior: "smooth" });
});

$("close-projects").addEventListener("click", () => {
  $("projects-section").hidden = true;
});

updateProjectCount();
