// Traduzido para português por misspaiva

import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Clock } from "lucide-react";
import { Link } from "react-router";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

const FEATURES = [
  {
    icon: Zap,
    title: "Respostas instantâneas",
    description:
      "Pergunte qualquer coisa sobre sua conta, cobrança ou nossos produtos e receba uma resposta clara e precisa em segundos.",
  },
  {
    icon: Shield,
    title: "Sempre disponível",
    description:
      "Nosso assistente está pronto 24 horas por dia. Sem espera, sem horário comercial — só ajuda quando você precisa.",
  },
  {
    icon: Clock,
    title: "Mantém o contexto",
    description:
      "Ele lembra das suas perguntas anteriores durante a conversa, para você nunca precisar se repetir.",
  },
];

const STEPS = [
  {
    number: "1",
    title: "Entre na sua conta",
    description: "Crie uma conta ou faça login com seu e-mail em segundos.",
  },
  {
    number: "2",
    title: "Faça uma pergunta",
    description:
      "Digite o que você precisa — detalhes da conta, orientação sobre produtos ou suporte geral.",
  },
  {
    number: "3",
    title: "Receba sua resposta",
    description:
      "Receba uma resposta clara e personalizada instantaneamente. Continue perguntando quantas vezes precisar.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ---- Nav ---- */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <span className="text-lg font-bold tracking-tight">
          Assistente<span className="text-primary">.</span>
        </span>
        <Link
          to="/auth"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Começar
          <ArrowRight className="size-4" />
        </Link>
      </nav>

      {/* ---- Hero ---- */}
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-20 text-center sm:pt-28">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
        >
          <span className="mb-6 inline-block rounded-full border border-border bg-muted/50 px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Feito com IA
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
        >
          Respostas, não música de espera
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
        >
          Nosso assistente de IA ajuda você a gerenciar sua conta, encontrar
          informações e resolver problemas — instantaneamente. Sem tickets,
          sem espera.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={3}
        >
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Iniciar uma conversa
            <ArrowRight className="size-4" />
          </Link>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Ver como funciona
          </a>
        </motion.div>
      </section>

      {/* ---- Features ---- */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto grid max-w-6xl gap-px sm:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="flex flex-col gap-4 px-8 py-14"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              custom={i}
            >
              <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-background">
                <feature.icon className="size-5 text-muted-foreground" />
              </div>
              <h3 className="text-base font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---- How it works ---- */}
      <section id="how-it-works" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Como funciona
          </p>
          <h2 className="mt-4 text-center text-3xl font-bold tracking-tight">
            Três passos até a resposta
          </h2>

          <div className="mt-14 grid gap-12 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                className="flex flex-col gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
                custom={i}
              >
                <span className="flex size-8 items-center justify-center rounded-full border border-border bg-background text-sm font-bold text-muted-foreground">
                  {step.number}
                </span>
                <h3 className="text-base font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Final CTA ---- */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Pronto para ter ajuda instantânea?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Entre na sua conta e comece sua primeira conversa. Leva menos de
            um minuto.
          </p>
          <Link
            to="/auth"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Entrar agora
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* ---- Footer ---- */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-muted-foreground">
          <span>
            &copy; {new Date().getFullYear()} Assistente. Todos os direitos
            reservados.
          </span>
          <span>Feito com carinho por misspaiva</span>
        </div>
      </footer>
    </div>
  );
}
