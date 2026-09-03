# Cohort 2 Waitlist — Email Capture Setup

How the waitlist emails flow:

```
Waitlist dialog → POST /api/waitlist → ┬→ Google Sheet (via Apps Script webhook, production)
                                       └→ data/waitlist.csv (local dev fallback, gitignored)
```

## Where emails land

- **Google Sheet**: [Apollo Cohort 2 Waitlist](https://docs.google.com/spreadsheets/d/1fAJgYkBq30TRQVy9WwhmumIoK4Pl_xxEHsAoOBvGxLA/edit)
  — columns: Timestamp, Email, Source. Owned by udhaykumar@0g.ai.
- **Local dev**: also appended to `data/waitlist.csv` (not committed).

On Vercel the filesystem is ephemeral, so the Sheet webhook is the only
persistence path in production — `WAITLIST_WEBHOOK_URL` **must** be set there.

## One-time deploy of the Apps Script webhook

1. Open the Sheet → **Extensions → Apps Script**.
2. Paste the contents of `scripts/waitlist-webhook.gs`, save.
3. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone** (required so the Vercel serverless function can POST; the URL is unguessable and the script only appends validated emails)
4. Authorize when prompted, copy the **Web app URL** (ends in `/exec`).
5. Set the env var:
   - Locally: `echo 'WAITLIST_WEBHOOK_URL=<url>' >> .env.local` and restart `npm run dev`.
   - Vercel: Project → Settings → Environment Variables → `WAITLIST_WEBHOOK_URL` (Production + Preview), then redeploy.

## Verify end-to-end

```bash
curl -s -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"smoke-test@0g.ai"}'
# → {"ok":true} and a new row in the Sheet
```

## Notes

- The API route normalizes emails to lowercase and validates format on both
  ends; duplicates are not filtered at capture time — dedupe in the Sheet
  when sending the announcement (Data → Data cleanup → Remove duplicates).
- If the webhook is down, the route still returns success when the local CSV
  write works (dev); in production a webhook failure returns a 500 so the
  user sees "try again".
