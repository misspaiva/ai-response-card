// Traduzido para português por misspaiva

import StreamingResponseCard from "@/components/StreamingResponseCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { LogOut, Send } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [activePrompt, setActivePrompt] = useState<string | null>(null);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setActivePrompt(input.trim());
  };

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Assistente de IA
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Como podemos ajudar?
              {user?.name ? ` Bem-vindo(a), ${user.name}.` : ""}
            </h1>
          </div>
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer gap-2 self-start"
            onClick={handleSignOut}
          >
            <LogOut className="size-4" />
            Sair
          </Button>
        </header>

        {/* campo de pergunta */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pergunte qualquer coisa ao assistente…"
            className="flex-1 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-[var(--rc-cyan)]/40"
          />
          <Button type="submit" className="cursor-pointer gap-2">
            <Send className="size-4" />
            Perguntar
          </Button>
        </form>

        {/* card de resposta */}
        {activePrompt ? (
          <StreamingResponseCard key={activePrompt} prompt={activePrompt} />
        ) : (
          <p className="text-sm text-muted-foreground">
            Digite uma pergunta acima para receber uma resposta real do
            assistente.
          </p>
        )}
      </div>
    </main>
  );
}
