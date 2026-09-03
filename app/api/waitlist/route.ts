import { NextRequest, NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let email: unknown;
  try {
    ({ email } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const normalized = email.trim().toLowerCase();
  const timestamp = new Date().toISOString();
  let captured = false;

  // Forward to a webhook (Google Apps Script / Zapier / Slack) when configured.
  // This is the persistence path on Vercel, where the filesystem is ephemeral.
  const webhookUrl = process.env.WAITLIST_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalized, timestamp, source: "apollo-cohort-2-waitlist" }),
      });
      // Apps Script web apps return HTTP 200 even on script errors, so
      // also check the response body's ok flag when it parses as JSON.
      const body = await res.json().catch(() => null);
      captured = res.ok && body?.ok !== false;
    } catch (err) {
      console.error("waitlist webhook failed:", err);
    }
  }

  // Local capture: append to data/waitlist.csv (works in dev / self-hosted).
  try {
    const dataDir = path.join(process.cwd(), "data");
    await mkdir(dataDir, { recursive: true });
    await appendFile(
      path.join(dataDir, "waitlist.csv"),
      `${timestamp},${normalized}\n`,
      "utf8"
    );
    captured = true;
  } catch (err) {
    console.error("waitlist file write failed:", err);
  }

  if (!captured) {
    return NextResponse.json(
      { error: "Could not save your email right now. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
