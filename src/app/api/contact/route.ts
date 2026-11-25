/**
 * Contact form endpoint: validates the message and emails it to Suman through Resend
 * (https://resend.com — plain HTTPS call, no SDK).
 *
 * Environment variables (set them in Vercel → Project → Settings → Environment Variables):
 * - RESEND_API_KEY      required — without it the form falls back to opening the visitor's mail app
 * - CONTACT_TO_EMAIL    optional — where messages go (default: suman.debnath.web@gmail.com)
 * - CONTACT_FROM_EMAIL  optional — sender, e.g. "Portfolio <hello@yourdomain.com>" once a domain is
 *                       verified in Resend (default: Resend's test sender, which can only deliver to
 *                       the email address of the Resend account owner)
 */

const TO = process.env.CONTACT_TO_EMAIL || "suman.debnath.web@gmail.com";
const FROM = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort rate limit per IP (resets when the serverless instance recycles).
const recent = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export async function POST(request: Request) {
  let body: { name?: unknown; email?: unknown; message?: unknown; company?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  // Honeypot filled in → pretend success so bots learn nothing.
  if (typeof body.company === "string" && body.company.trim() !== "") return Response.json({ ok: true });

  if (!name || name.length > 100) return Response.json({ error: "Please enter your name." }, { status: 400 });
  if (!EMAIL_RE.test(email) || email.length > 200)
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (message.length < 10 || message.length > 5000)
    return Response.json({ error: "Please write a message of at least 10 characters." }, { status: 400 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const hits = (recent.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW)
    return Response.json({ error: "Too many messages — please try again in a few minutes." }, { status: 429 });
  hits.push(now);
  recent.set(ip, hits);

  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ error: "Email sending is not set up.", code: "not_configured" }, { status: 503 });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: `${message}\n\n— ${name} <${email}>`,
      html: `<p style="white-space:pre-wrap">${escapeHtml(message)}</p><p>— ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>`,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text().catch(() => ""));
    return Response.json({ error: "Your message couldn't be sent right now. Please email me directly." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
