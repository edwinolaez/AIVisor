import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { ChatMessage, StudentProfile } from "@/types";
import { buildStudentContext, getFallbackResponse } from "@/lib/context";

const SYSTEM_PROMPT = `You are AIVisor, an AI assistant for Alberta post-secondary students. You help with:
- Program roadmaps (diploma, degree, master's, doctorate laddering)
- Year-aligned soft skills development
- Switching programs (always mention Transfer Alberta)
- Co-op and internship preparation
- Graduate school planning

Rules:
- Be concise, actionable, and encouraging
- Always recommend verifying requirements with their institution
- Reference ALIS (alis.alberta.ca) and Transfer Alberta when relevant
- Include full URLs when mentioning ALIS resources
- Never claim to replace academic advisors
- Ground answers in the student's profile context provided`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const profile = body.profile as StudentProfile;
    const messages = body.messages as ChatMessage[];

    if (!profile || !messages?.length) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) {
      return NextResponse.json({ error: "No user message" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey || apiKey === "sk-your-key-here") {
      return NextResponse.json({
        message: getFallbackResponse(profile, lastUser.content),
        mode: "fallback",
      });
    }

    const openai = new OpenAI({ apiKey });
    const studentContext = buildStudentContext(profile);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "system", content: studentContext },
        ...messages.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    const message =
      completion.choices[0]?.message?.content ??
      getFallbackResponse(profile, lastUser.content);

    return NextResponse.json({ message, mode: "openai" });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
