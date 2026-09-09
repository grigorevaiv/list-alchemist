# AI_JOURNEY.md

## Which AI assistants I used, and for what

Claude — for practically the entire development process: reasoning out
loud, discussing architectural decisions, prompt engineering for the AI
module itself, debugging, writing tests, and
writing the initial skeleton (first version) of the project. Worked in a
Socratic way — nearly every decision went through "why this way? what are
the alternatives?" — I asked, argued, and weighed pros and cons of
Claude's suggestions.

## Prompts that actually unlocked something

**1. What actually counts as a "better listing" for a seller?**

The first version of the prompt Claude wrote for the AI module included the
word "appealing" — focused on making the description sound more sales-y.
The problem: on minimal input, the model started adding buzzwords like
"stylish," "practical," "beautiful," none of which help a real buyer
searching for the item. I tried softening it first — "appealing, but only when there's enough detail" — and tested again; the model just rearranged the same facts into a different sentence order without becoming more useful. That's when the real question came up: what does "better" even mean here? For a secondhand marketplace, accurate and searchable beats persuasive — so the prompt was rewritten around that instead.

**2. What's the actual criterion for deciding what to test?**

I have almost no prior testing experience, so it mattered to settle on a
concrete rule for myself: what to test and what not to. I ended up with a rule —
layers that purely delegate to something else (thin layers) get at most a
smoke test (does it compile, does it not crash).

**3. The argument over how to hand errors to the frontend.**

Claude's initial version sent both logical and infrastructure-level errors
the same way — a 201 status with the error text in an error field,
regardless of the underlying cause. That meant "the network to the AI
provider is down" and "the model honestly said it couldn't understand the
description" looked identical to the client. We decided to split it:
infrastructure failures now return a real HTTP error status, logical
outcomes stay 201 with an error field.

## A time the AI got it wrong, and how I spotted it

Conceptually — the first version of the AI prompt. Exactly the kind of
thing that wasn't in the requirements and only surfaced through testing:
with the word "appealing" in place, vague inputs came back with a
noticeable amount of invented, unrequested detail.

More narrowly — the prompt told the model to return JSON, but the initial
version of the code never actually validated that the response was valid
JSON or had the expected shape and field types.

## Anything in my codebase I don't fully understand

The tests, specifically. The process was me specifying what I thought was worth testing, based on
the logic of the code, discussing it with Claude, and having Claude implement it. I understand why
each test exists, but more than once I looked at a generated test and genuinely didn't understand
what it was doing until I asked Claude to break it down for me — this file is honest that testing
is the part of this project I leaned on AI most directly.

## What I'd fix with another four hours

I'd add a bit more "magic" to the frontend — right now it doesn't fully
carry the "alchemist" feeling, the sense of wonder people associate with
how AI works. That would strengthen the overall product impression.

I'd want to properly learn testing and revisit the test suite as a
whole — this was my first time writing tests, and I suspect I both missed some real coverage gaps and
tested a few things that were too trivial to be worth it.