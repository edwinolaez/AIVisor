"use client";

import { useRef, useState } from "react";
import type { ChatMessage, StudentProfile } from "@/types";

const STARTERS = [
  "What soft skills should I focus on this year?",
  "How do I ladder from my diploma to a degree?",
  "Help me prepare for a co-op interview",
  "Should I pursue a master's or go to industry?",
  "What if I want to switch programs?",
];

export function ChatTab({ profile }: { profile: StudentProfile }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Hi ${profile.name}! I'm AIVisor, your guide for ${profile.programId.replace(/-/g, " ")}. Ask me about your roadmap, soft skills, switching programs, co-op prep, or grad school paths. I'll reference ALIS resources when helpful.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = { role: "user", content: text.trim() };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, messages: nextMessages }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message ?? "Sorry, I couldn't respond." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }

  return (
    <div className="flex h-[calc(100vh-280px)] min-h-[400px] flex-col">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Ask AIVisor</h2>
        <p className="text-sm text-slate-500">
          AI assistant with your program, year, and pathway context · ALIS-aware
        </p>
      </div>

      <div className="my-3 flex flex-wrap gap-2">
        {STARTERS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => sendMessage(s)}
            disabled={loading}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-50"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-indigo-600 text-white"
                  : "border border-slate-200 bg-white text-slate-800"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-400">
              Thinking…
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your pathway, skills, co-op, or grad school…"
          disabled={loading}
          className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
