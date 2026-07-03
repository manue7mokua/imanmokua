import { NextResponse } from "next/server";
import { Resend } from "resend";

const MAX_MESSAGE_LENGTH = 50;

type ContactRequestBody = {
  message?: unknown;
  website?: unknown;
};

export async function POST(request: Request) {
  let body: ContactRequestBody;

  try {
    body = (await request.json()) as ContactRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const message =
    typeof body.message === "string" ? body.message.trim() : "";
  const website = typeof body.website === "string" ? body.website.trim() : "";

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return NextResponse.json(
      { error: "Email is not configured" },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from,
      to,
      subject: "new note from imanmokua.me",
      text: `Message: ${message}\n\nSent at: ${new Date().toISOString()}`,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to send message" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
