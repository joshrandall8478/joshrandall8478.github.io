---
title: 'RepoGhost'
date: "4/16/26"
originalDate: "4/16/26"
subtitle: "Your Agentic Development SideCar"
image:
    url: '/assets/repoghost.png'
    alt: 'Image Description'
layout: ../../layouts/ProjectLayout.astro
tools: ["python", "js", "html", "css", "github", "docker"]
draft: false
unlisted: false
---

<a class="button" href="https://repo-ghost.com">Visit repo-ghost.com</a>
<a class="button" href="https://github.com/Async-Avengers/assets/repoghost">Visit Repository</a>
<a class="button" href="https://devpost.com/software/assets/repoghost?ref_content=my-projects-tab&ref_feature=my_projects">Visit DevPost</a>

> The repoGhost live demo may be brought down to save money on hosting costs.

## The problem

Every developer has been there: you resurface from three hours of deep work, jump on a standup call, and suddenly have to recall what you changed, why, and what's left. Or you wrap up a meeting full of action items and have to manually cross-reference them against what's actually in the codebase. That context-switching tax adds up fast.

repoGhost is our answer to that problem — an agentic developer sidecar that bridges your repository and your meetings, so you always know where things stand.

## What it does

repoGhost scans a repository and does three things:

- **Surfaces next tasks** — given the current state of the codebase, it infers what work logically comes next.
- **Summarizes meeting notes** — paste in raw notes from a standup or planning session and it produces a structured summary.
- **Prompts AI with full context** — instead of copy-pasting snippets into ChatGPT, you can ask questions about your codebase and meetings in a single interface, with the repo as grounding context.

The intended workflow is simple: point it at a repo, run your meeting notes through it, and let the agents connect the dots.

## Built at JacHacks in 24 hours

repoGhost was built by four of us — [Long Le](https://www.linkedin.com/in/long-nguyen-thanh-le/), [Vas Anbukumar](https://www.linkedin.com/in/vasanth-anbukumar/), Nate Rupard, and me — at the [JacHacks Hackathon](https://jachacks.org) at University of Michigan. We had 24 hours, no sleep, and one hard constraint: the entire application had to be written in [Jaseci](https://www.jaseci.org) (also called Jac), an experimental agentic programming language developed at UMich.

![IMG_6262.jpeg](/assets/repoghost/IMG_6262.jpeg)
![IMG_6265.jpeg](/assets/repoghost/IMG_6265.jpeg)
![IMG_6270.jpeg](/assets/repoghost/IMG_6270.jpeg)

## Architecture

The core of repoGhost is an agent graph — a set of Jac nodes that each own a slice of responsibility. When a user submits a repo URL, the graph kicks off roughly like this:

1. A **repo ingestion agent** clones the repository and walks the file tree, extracting meaningful structure (file names, module boundaries, docstrings, recent commits).
2. A **context assembly agent** distills that raw data into a compressed representation the LLM can reason about effectively.
3. A **task inference agent** takes the assembled context and surfaces actionable next steps, ranked by likely priority.
4. A **meeting synthesis agent** accepts raw meeting notes and maps action items against the repo context — flagging what's already done, what's blocked, and what hasn't been started.

Each of these agents is a node in the Jac graph. Edges define what data flows where. The LLM is called at the leaves, not the root — agents are responsible for structuring the problem before the model ever sees it.

## Why Jaseci?

Jaseci's design goal is ambitious: one language that compiles to frontend, backend, and native binaries simultaneously. Here's what that looks like in practice — this is a canonical Jac todo app that shows the full-stack model:

```jac
node Todo {
    has title: str, category: str = "other", done: bool = False;
}

enum Category { WORK, PERSONAL, SHOPPING, HEALTH, OTHER }

def categorize(title: str) -> Category by llm();

def:pub add_todo(title: str) -> Todo {
    try {
        result = categorize(title);
        category = str(result).split(".")[-1].lower();
    } except Exception {
        category = "other (setup AI key)";
    }
    todo = Todo(title=title, category=category);
    root() ++> todo;
    return todo;
}

def:pub get_todos -> list[Todo] {
    return [root()-->][?:Todo];
}

cl def:pub app -> JsxElement {
    has todos: list[Todo] = [], text: str = "";
    async can with entry { todos = await get_todos(); }
    async def add {
        if text.strip() {
            todos = todos + [await add_todo(text.strip())];
            text = "";
        }
    }
    return <div>
        <input value={text}
            onChange={lambda e: ChangeEvent { text = e.target.value; }}
            onKeyPress={lambda e: KeyboardEvent { if e.key == "Enter" { add(); } }}
            placeholder="Add a todo..." />
        <button onClick={add}>Add</button>
        {[<p key={jid(t)}>{t.title} ({t.category})</p> for t in todos]}
    </div>;
}
```

The key thing to notice: `def:pub add_todo` is a server-side function. `cl def:pub app` is a client-side React component. They live in the same file, call each other directly, and compile to the appropriate target. The `by llm()` annotation on `categorize` is how Jac handles LLM calls — you define a function signature and let the runtime figure out the prompt.

![d91c20e13324b21ac3cc516f2c50ef0d.png](/assets/repoghost/d91c20e13324b21ac3cc516f2c50ef0d.png)
<figcaption>Jac's compilation model: a single source file targets frontend, backend, and native binaries simultaneously. <a href="https://docs.jaseci.org/quick-guide/what-makes-jac-different/#1-how-can-one-language-target-frontends-backends-and-native-binaries-at-the-same-time">Source</a></figcaption>

Jaseci also supports Kubernetes deployment out of the box, with no additional tooling required. We ended up using Docker anyway — our original goal was a single static binary that users could just run, and we successfully compiled the app to that form. But it became clear that the binary would still pull in unnecessary runtime dependencies and likely require Jac itself to be installed. We pivoted to two Docker images (amd64 and aarch64/ARM) and exposed those as the primary distribution method. We had a live public demo running against open repositories, but took it down to keep hosting costs manageable.

## Takeaways

Shipping something coherent in 24 hours with a language none of us had used before was genuinely hard. Jac's syntax is expressive once it clicks, but the toolchain is still maturing — we hit a few rough edges around the compiler and had to work around some missing documentation.

That said, the experience crystallized something for me about where development is headed. There's a lot of conversation about "vibe coding" right now, but I think the more meaningful shift is at a higher level: **agentic development** — organizing AI agents into well-scoped roles, letting them hand off context to each other, and treating LLMs as components in a graph rather than a chat interface you paste code into. That's the pattern repoGhost is built on, and it's a pattern I expect to see a lot more of.

If that framing resonates, [give the repo a look](https://github.com/Async-Avengers/assets/repoghost).