"use node";

// Created by misspaiva
//
// Convex action that calls the Anthropic API to generate a real AI
// response for the StreamingResponseCard. This replaces the mock
// text/typewriter demo with an actual model call.
//
// Requires an ANTHROPIC_API_KEY environment variable to be set on the
// Convex deployment:
//   npx convex env set ANTHROPIC_API_KEY sk-ant-...

import { v } from "convex/values";
import { action } from "./_generated/server";

export const generateResponse = action({
  args: {
    prompt: v.string(),
  },
  handler: async (_ctx, { prompt }) => {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      throw new Error(
        "ANTHROPIC_API_KEY is not set. Run `npx convex env set ANTHROPIC_API_KEY sk-ant-...`",
      );
    }

    const trimmed = prompt.trim();
    if (!trimmed) {
      throw new Error("Prompt cannot be empty.");
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system:
          "Responda sempre em português do Brasil, de forma clara e natural, independente do idioma da pergunta.",
        messages: [{ role: "user", content: trimmed }],
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `Anthropic API error (${response.status}): ${errorBody}`,
      );
    }

    const data = await response.json();

    const text = (data.content ?? [])
      .filter((block: { type: string }) => block.type === "text")
      .map((block: { text: string }) => block.text)
      .join("\n")
      .trim();

    if (!text) {
      throw new Error("Model returned an empty response.");
    }

    return { text };
  },
});
