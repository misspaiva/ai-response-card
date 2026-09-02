// Created by misspaiva
// Traduzido para português por misspaiva

import { useAction } from "convex/react";
import { useEffect, useRef, useState } from "react";
import { api } from "@/convex/_generated/api";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type ResponseState = "loading" | "text" | "error";

export interface StreamingResponseCardProps {
  /** The prompt to send to the AI. When this changes, a new request fires. */
  prompt: string;
  /** Optional class-name extension on the outer wrapper. */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Typewriter hook                                                    */
/* ------------------------------------------------------------------ */

function useTypewriter(text: string, speed = 18) {
  const [visible, setVisible] = useState("");
  const index = useRef(0);

  useEffect(() => {
    index.current = 0;
    setVisible("");

    if (!text) return;

    const id = setInterval(() => {
      index.current += 1;
      if (index.current <= text.length) {
        setVisible(text.slice(0, index.current));
      } else {
        clearInterval(id);
      }
    }, speed);

    return () => clearInterval(id);
  }, [text, speed]);

  return { visible, complete: visible.length === text.length };
}

/* ------------------------------------------------------------------ */
/*  Pulse dots (loading indicator)                                     */
/* ------------------------------------------------------------------ */

function PulseDots() {
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block size-1.5 rounded-full bg-[var(--rc-cyan)]"
          style={{
            animation: "rc-pulse 1.4s ease-in-out infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function StreamingResponseCard({
  prompt,
  className = "",
}: StreamingResponseCardProps) {
  const generateResponse = useAction(api.ai.generateResponse);

  const [state, setState] = useState<ResponseState>("loading");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [elapsedMs, setElapsedMs] = useState<number | null>(null);

  useEffect(() => {
    if (!prompt.trim()) return;

    let cancelled = false;
    setState("loading");
    setAnswer("");
    setError(null);
    setElapsedMs(null);

    const startedAt = performance.now();

    generateResponse({ prompt })
      .then((result) => {
        if (cancelled) return;
        setAnswer(result.text);
        setElapsedMs(performance.now() - startedAt);
        setState("text");
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Algo deu errado.");
        setState("error");
      });

    return () => {
      cancelled = true;
    };
  }, [prompt, generateResponse]);

  const retry = () => {
    setState("loading");
    setError(null);
    generateResponse({ prompt })
      .then((result) => {
        setAnswer(result.text);
        setState("text");
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Algo deu errado.");
        setState("error");
      });
  };

  /* ---- typewriter for text state ---- */
  const { visible, complete } = useTypewriter(state === "text" ? answer : "");

  /* ---- local cursor blink reset on state change ---- */
  const [cursorOn, setCursorOn] = useState(true);
  useEffect(() => {
    setCursorOn(true);
    const id = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(id);
  }, [state]);

  return (
    <>
      {/* Keyframe styles – injected once */}
      <style>{STYLE}</style>

      <div
        className={[
          "rc-card",
          "relative w-full max-w-2xl overflow-hidden rounded-2xl",
          "border border-white/[0.06] shadow-2xl",
          className,
        ].join(" ")}
      >
        {/* ---- ambient glow ---- */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.04]" />

        {/* ---- header bar ---- */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3">
          {/* status dot */}
          <span
            className={[
              "inline-block size-2 rounded-full",
              state === "error"
                ? "bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.6)]"
                : "bg-[var(--rc-cyan)] shadow-[0_0_8px_var(--rc-cyan-glow)]",
              state === "loading" ? "rc-dot-pulse" : "",
            ].join(" ")}
          />{" "}
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-[var(--rc-muted)]">
            {state === "loading"
              ? "Pensando"
              : state === "text"
                ? "Respondido"
                : "Problema"}
          </span>

          {/* product tag */}
          <span className="ml-auto rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-0.5 font-mono text-[10px] text-[var(--rc-muted)]">
            Assistente
          </span>
        </div>

        {/* ---- body ---- */}
        <div className="min-h-[12rem] px-5 py-5">
          {state === "loading" && (
            <div className="flex flex-col gap-3">
              {/* skeleton shimmer lines */}
              <div className="rc-skeleton h-3 w-3/4 rounded-full" />
              <div className="rc-skeleton h-3 w-full rounded-full" />
              <div className="rc-skeleton h-3 w-5/6 rounded-full" />
              <div className="rc-skeleton h-3 w-2/3 rounded-full" />

              <div className="mt-4 flex items-center gap-2 text-xs text-[var(--rc-muted)]">
                <PulseDots />
                <span>Preparando sua resposta…</span>
              </div>
            </div>
          )}

          {state === "text" && (
            <div className="flex flex-col gap-4">
              <p className="text-sm leading-relaxed text-[var(--rc-text)]">
                {visible}
                {!complete && cursorOn && (
                  <span className="rc-cursor ml-px inline-block h-4 w-[2px] align-middle" />
                )}
              </p>

              {/* footer meta */}
              {complete && elapsedMs !== null && (
                <div className="flex items-center gap-3 border-t border-white/[0.04] pt-3 text-[10px] uppercase tracking-wider text-[var(--rc-muted)]">
                  <span>Respondido em {(elapsedMs / 1000).toFixed(1)} s</span>
                </div>
              )}
            </div>
          )}

          {state === "error" && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-red-400">
                {/* alert icon */}
                <svg
                  className="mt-px size-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span className="text-xs font-semibold">INDISPONÍVEL</span>
              </div>

              <p className="text-sm leading-relaxed text-red-300/80">
                {error ??
                  "Não conseguimos processar sua solicitação agora. Tente novamente em instantes."}
              </p>

              {/* botão de tentar novamente */}
              <button
                type="button"
                onClick={retry}
                className="rc-retry-btn mt-1 w-fit rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-[var(--rc-cyan)] transition-all hover:border-[var(--rc-cyan)]/30 hover:bg-[var(--rc-cyan)]/[0.06] hover:shadow-[0_0_12px_var(--rc-cyan-glow)]"
              >
                Tentar novamente
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Scoped CSS                                                         */
/* ------------------------------------------------------------------ */

const STYLE = `
  :root {
    --rc-cyan: #00FFD1;
    --rc-cyan-glow: rgba(0,255,209,0.35);
    --rc-bg: #090A0F;
    --rc-text: #c8d0dc;
    --rc-muted: #4a5264;
  }

  .rc-card {
    background: var(--rc-bg);
    color: var(--rc-text);
    font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas,
      "Liberation Mono", monospace;
  }

  /* skeleton shimmer */
  .rc-skeleton {
    background: linear-gradient(
      90deg,
      rgba(255,255,255,0.03) 25%,
      rgba(255,255,255,0.06) 50%,
      rgba(255,255,255,0.03) 75%
    );
    background-size: 200% 100%;
    animation: rc-shimmer 1.8s ease-in-out infinite;
  }

  @keyframes rc-shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* pulse dots */
  @keyframes rc-pulse {
    0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
    40%           { opacity: 1;   transform: scale(1);   }
  }

  /* blinking cursor */
  .rc-cursor {
    background: var(--rc-cyan);
    box-shadow: 0 0 6px var(--rc-cyan-glow);
  }

  /* status-dot pulse */
  .rc-dot-pulse {
    animation: rc-dot-glow 2s ease-in-out infinite;
  }
  @keyframes rc-dot-glow {
    0%, 100% { box-shadow: 0 0 4px var(--rc-cyan-glow); }
    50%      { box-shadow: 0 0 12px var(--rc-cyan-glow); }
  }

  /* retry hover ripple */
  .rc-retry-btn:active {
    transform: scale(0.97);
  }
`;
