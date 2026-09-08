# List Alchemist

Angular frontend for **List Alchemist**: turns a rough description of a second-hand item into a
listing title, search tags and an estimated price range.

Backend repo: [list alchemist api](https://github.com/grigorevaiv/list-alchemist-api)

---

## Quick start

```bash
npm install
npm start
```

Opens on `http://localhost:4200`, pointing at the deployed backend by default — works with zero
setup. Note the backend sleeps when idle, so the first request can take 30–60 seconds.

To run against a local backend instead (e.g. mock mode, no API key needed), change `apiUrl` in
`src/environments/environment.ts` to `http://localhost:3000` and start the API separately — see
[backend README](https://github.com/grigorevaiv/list-alchemist-api).

Just want to see it without installing anything?
[list-alchemist.onrender.com](https://list-alchemist.onrender.com/)

### Environments

| File | Used by | API URL |
|---|---|---|
| `src/environments/environment.ts` | `npm start` (development) | deployed API by default |
| `src/environments/environment.prod.ts` | `npm run build` (production) | deployed API |

---

## How it works

One screen, one form. Just paste or insert your description in the text field.
The description must be **20–500 characters after trimming**.
It either returns a listing with title, tags and price range (sometimes with a note asking for more
detail to sharpen the estimate), or an error message if the model or the connection has a problem.

---

## Tests

```bash
npm test
```

**`trimmedStringLengthValidator`** — has to match the backend's
20–500 limit exactly, including treating whitespace-only input as empty, not just short.

**`ListingService`** — checks the actual outgoing request (URL, method, body field name) — not to fail silently.

**`ListingFormComponent`** — submit/clear/invalid-form paths, including that a failed request shows
the generic error and that pressing submit twice only sends one request.

---

## Time spent and possible gaps

Around 3–4 hours.
No mobile/responsive check — only ever looked at on a desktop screen. The "alchemist" theme isn't
fully carried through — it's there in name and palette, but doesn't yet deliver the full sense of
magic the product is going for. A request in flight can't be cancelled, only prevented from starting
a second time.

