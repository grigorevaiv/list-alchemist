# List Alchemist

Angular frontend for **List Alchemist**: turns a rough description of a second-hand item into a
listing title, search tags and an estimated price range.

Backend repo: [list alchemist api](https://github.com/grigorevaiv/list-alchemist-api)

---

## Quick start

```bash
npm install
```

```bash
npm start
```

Opens on `http://localhost:4200`.

**The backend has to be running too.** By default this app points at `http://localhost:3000`
(`src/environments/environment.ts`). Start the API in mock mode — no API key needed:

[backend README](https://github.com/grigorevaiv/list-alchemist-api#quick-start-mock-mode)

If you'd rather not run the backend at all, point `environment.ts` at the deployed API instead:
`https://list-alchemist-api.onrender.com`. Note it sleeps when idle, so the first request can take
30–60 seconds.

### If you don't want to start backend locally, both frontend and backend are deployed and connected
To run the whole app against the real model, go [here](https://list-alchemist.onrender.com/)

### Environments

| File | Used by | API URL |
|---|---|---|
| `src/environments/environment.ts` | `npm start` (development) | `http://localhost:3000` |
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
Around 3-4 hours.
The layout was only ever looked at on a desktop screen, not adapted for mobiles.
Haven't finished with the "magical" themed design, for product to feel more wholesome.
Technically - a request in process can't be cancelled, only prevented from starting a second time.

