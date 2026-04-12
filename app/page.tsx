"use client";

import { useMemo, useState } from "react";
import {
  AtSign,
  CheckCircle2,
  Cpu,
  HardDrive,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";
import Image from "next/image";

export default function SasaTechHomepage() {
  const services = [
    {
      title: "Formatação",
      description:
        "Instalação limpa ou otimizada do sistema, configuração inicial e organização para devolver mais leveza ao computador.",
      icon: HardDrive,
    },
    {
      title: "Limpeza interna",
      description:
        "Remoção de poeira e sujeira para reduzir aquecimento e aumentar a durabilidade do equipamento.",
      icon: Sparkles,
    },
    {
      title: "Troca de pasta térmica",
      description:
        "Aplicação correta para melhorar a dissipação de calor e ajudar no desempenho diário.",
      icon: Cpu,
    },
    {
      title: "Upgrades",
      description:
        "Indicação e troca de componentes como armazenamento, memória e processador para deixar o sistema muito mais rápido.",
      icon: Wrench,
    },
    {
      title: "Montagem de PCs",
      description:
        "Montagem completa com foco em desempenho, organização e compatibilidade.",
      icon: ShieldCheck,
    },
    {
      title: "Backup e programas",
      description:
        "Proteção dos seus arquivos e instalação dos softwares essenciais para o dia a dia.",
      icon: CheckCircle2,
    },
  ];

  const steps = [
    "Você entra em contato pelo WhatsApp, Instagram ou e-mail.",
    "Eu entendo o problema e explico a melhor solução.",
    "Passo o orçamento antes de iniciar.",
    "Executo o serviço com cuidado e organização.",
  ];

  const faqs = [
    {
      q: "Quais serviços a SASA TECH faz?",
      a: "Formatação, limpeza interna, troca de pasta térmica, upgrades, montagem de PCs, backup e instalação de programas.",
    },
    {
      q: "Você atende em Joinville?",
      a: "Sim. O foco é Joinville/SC, com atendimento pensado para quem busca agilidade e confiança na região.",
    },
    {
      q: "Como funciona o orçamento?",
      a: "Você informa o serviço e o problema, eu avalio o cenário e explico o que será feito antes de qualquer procedimento.",
    },
    {
      q: "Atende notebook e PC?",
      a: "Sim, tanto notebooks quanto computadores de mesa.",
    },
  ];

  const contactLinks = {
    whatsappBase: "5547999609562",
    instagram: "https://instagram.com/sasatech.br",
    email: "mailto:contato@sasatech.com.br",
  };

  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    service: "Formatação",
    equipment: "Notebook",
    urgency: "Normal",
    neighborhood: "",
    details: "",
  });

  const whatsappHref = useMemo(() => {
    const message = [
      "Olá, quero solicitar um orçamento pela SASA TECH.",
      "",
      `Nome: ${form.name || "Não informado"}`,
      `WhatsApp: ${form.whatsapp || "Não informado"}`,
      `Serviço desejado: ${form.service}`,
      `Equipamento: ${form.equipment}`,
      `Urgência: ${form.urgency}`,
      `Bairro/Região: ${form.neighborhood || "Não informado"}`,
      `Detalhes: ${form.details || "Não informado"}`,
    ].join("\n");

    return `https://wa.me/${contactLinks.whatsappBase}?text=${encodeURIComponent(message)}`;
  }, [form]);

  function updateForm(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleQuoteSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.open(whatsappHref, "_blank", "noopener,noreferrer");
    setIsQuoteOpen(false);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-400 selection:text-zinc-950">
      <a
        href={`https://wa.me/${contactLinks.whatsappBase}?text=${encodeURIComponent(
          "Olá, quero solicitar um orçamento."
        )}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-zinc-950 shadow-2xl shadow-emerald-950/40 transition hover:scale-[1.02] md:bottom-5 md:right-5 md:gap-3 md:px-5 md:py-3"
      >
        <MessageCircle className="h-5 w-5" />
        WhatsApp
      </a>

      {isQuoteOpen && (
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm md:flex md:items-center md:justify-center md:px-4">
          <div className="h-[100dvh] w-full overflow-y-auto border-x border-white/10 bg-zinc-950 px-4 pb-8 pt-5 shadow-2xl shadow-black/40 md:h-auto md:max-h-[90vh] md:max-w-2xl md:rounded-[2rem] md:border md:px-8 md:pb-8 md:pt-6">
            <div className="sticky top-0 z-10 mb-5 flex items-start justify-between gap-4 border-b border-white/10 bg-zinc-950 pb-4 md:static md:border-b-0 md:bg-transparent md:pb-0">
              <div>
                <div className="font-[var(--font-space)] text-xl font-semibold text-white md:text-3xl">
                  Solicitar orçamento
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Preencha os dados abaixo. Ao enviar, o WhatsApp já abre com a
                  mensagem pronta e personalizada.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsQuoteOpen(false)}
                className="rounded-full border border-white/10 p-2 text-zinc-400 transition hover:bg-white/5 hover:text-white"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleQuoteSubmit} className="space-y-4 pb-6 md:space-y-5 md:pb-0">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm text-zinc-300">
                    Seu nome
                  </span>
                  <input
                    value={form.name}
                    onChange={(e) => updateForm("name", e.target.value)}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-400/40 md:py-3"
                    placeholder="Ex.: Matheus"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm text-zinc-300">
                    Seu WhatsApp
                  </span>
                  <input
                    value={form.whatsapp}
                    onChange={(e) => updateForm("whatsapp", e.target.value)}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-400/40 md:py-3"
                    placeholder="Ex.: 47 99999-9999"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <label className="block">
                  <span className="mb-2 block text-sm text-zinc-300">
                    Serviço
                  </span>
                  <select
                    value={form.service}
                    onChange={(e) => updateForm("service", e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-400/40 md:py-3"
                  >
                    {services.map((service) => (
                      <option
                        key={service.title}
                        value={service.title}
                        className="bg-zinc-900"
                      >
                        {service.title}
                      </option>
                    ))}
                    <option value="Diagnóstico" className="bg-zinc-900">
                      Diagnóstico
                    </option>
                    <option value="Outro" className="bg-zinc-900">
                      Outro
                    </option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm text-zinc-300">
                    Equipamento
                  </span>
                  <select
                    value={form.equipment}
                    onChange={(e) => updateForm("equipment", e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-400/40 md:py-3"
                  >
                    <option value="Notebook" className="bg-zinc-900">
                      Notebook
                    </option>
                    <option value="PC" className="bg-zinc-900">
                      PC
                    </option>
                    <option value="PC Gamer" className="bg-zinc-900">
                      PC Gamer
                    </option>
                    <option value="Não sei informar" className="bg-zinc-900">
                      Não sei informar
                    </option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm text-zinc-300">
                    Urgência
                  </span>
                  <select
                    value={form.urgency}
                    onChange={(e) => updateForm("urgency", e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-400/40 md:py-3"
                  >
                    <option value="Normal" className="bg-zinc-900">
                      Normal
                    </option>
                    <option value="Urgente" className="bg-zinc-900">
                      Urgente
                    </option>
                    <option value="Posso aguardar" className="bg-zinc-900">
                      Posso aguardar
                    </option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm text-zinc-300">
                  Bairro ou região
                </span>
                <input
                  value={form.neighborhood}
                  onChange={(e) => updateForm("neighborhood", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-400/40 md:py-3"
                  placeholder="Ex.: Centro, América, Joinville/SC"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-zinc-300">
                  Explique o problema ou o que você precisa
                </span>
                <textarea
                  value={form.details}
                  onChange={(e) => updateForm("details", e.target.value)}
                  rows={3}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-400/40 md:py-3"
                  placeholder="Ex.: notebook muito lento, preciso formatar e instalar programas; quero upgrade para SSD; preciso montar um PC completo..."
                />
              </label>

              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-100">
                A mensagem será enviada para o WhatsApp da SASA TECH já com seus
                dados preenchidos.
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsQuoteOpen(false)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Fechar
                </button>
                <button
                  type="submit"
                  className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:opacity-90"
                >
                  Enviar para WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <a href="#inicio" className="group flex items-center gap-3">
            <Image
              src="/logo-v2.png"
              alt="SASA TECH"
              width={44}
              height={44}
              className="h-9 w-9 object-contain transition group-hover:opacity-80 md:h-11 md:w-11"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-[var(--font-space)] text-xs font-semibold tracking-[0.18em] text-emerald-400 transition group-hover:text-emerald-300 md:text-sm md:tracking-[0.22em]">
                SASA TECH
              </span>
              <span className="text-[11px] text-zinc-400 md:text-xs">
                PERFORMANCE QUE VOCÊ CONFIA
              </span>
            </div>
          </a>

          <nav className="hidden gap-6 text-sm text-zinc-300 md:flex">
            <a href="#servicos" className="transition hover:text-white">
              Serviços
            </a>
            <a href="#como-funciona" className="transition hover:text-white">
              Como funciona
            </a>
            <a href="#sobre" className="transition hover:text-white">
              Sobre
            </a>
            <a href="#faq" className="transition hover:text-white">
              FAQ
            </a>
            <a href="#contato" className="transition hover:text-white">
              Contato
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setIsQuoteOpen(true)}
            className="cursor-pointer rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-xs font-medium text-emerald-300 transition hover:bg-emerald-400/20 md:px-4 md:text-sm"
          >
            Solicitar orçamento
          </button>
        </div>
      </header>

      <main id="inicio">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.18),transparent_28%),radial-gradient(circle_at_left,rgba(16,185,129,0.10),transparent_25%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />

          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 md:px-6 md:py-28">
            <div className="flex flex-col justify-center">
              <div className="mb-4 inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-zinc-300 md:text-xs">
                Atendimento local • Joinville/SC
              </div>

              <h1 className="font-[var(--font-space)] max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
                Manutenção e suporte de TI com atendimento{" "}
                <span className="text-emerald-400">
                  rápido, claro e confiável
                </span>
                .
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-300 md:mt-6 md:text-lg">
                Formatação, limpeza, montagem, upgrade, backup e suporte técnico
                para computadores e notebooks em Joinville. Sem enrolação, com
                orçamento antes do serviço e contato direto.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setIsQuoteOpen(true)}
                  className="cursor-pointer rounded-2xl bg-emerald-400 px-5 py-2.5 text-center text-sm font-semibold text-zinc-950 transition hover:opacity-90 md:px-6 md:py-3"
                >
                  Solicitar orçamento
                </button>
                <a
                  href="#servicos"
                  className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-white/10 md:px-6 md:py-3"
                >
                  Ver serviços
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  "Atendimento em Joinville",
                  "Orçamento antes do serviço",
                  "Suporte direto e claro",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-full max-w-xl rounded-[1.5rem] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/30 md:rounded-[2rem] md:p-6">
                <div className="rounded-[1.25rem] border border-emerald-400/20 bg-zinc-900 p-5 md:rounded-[1.5rem] md:p-8">
                  <div className="mb-6 flex items-center gap-3 md:mb-8">
                    <div className="h-3 w-3 rounded-full bg-emerald-400" />
                    <div className="h-3 w-3 rounded-full bg-white/30" />
                    <div className="h-3 w-3 rounded-full bg-white/15" />
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-zinc-950 p-4 md:p-5">
                      <div className="text-sm text-zinc-400">Atendimento</div>
                      <div className="mt-1 flex items-center gap-2 text-lg font-semibold text-white md:text-xl">
                        <MapPin className="h-5 w-5 text-emerald-400" />
                        Joinville / SC
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-zinc-950 p-4 md:p-5">
                        <div className="text-sm text-zinc-400">
                          Contato rápido
                        </div>
                        <div className="mt-1 font-medium text-white">
                          WhatsApp direto
                        </div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-zinc-950 p-4 md:p-5">
                        <div className="text-sm text-zinc-400">Foco</div>
                        <div className="mt-1 font-medium text-white">
                          Rapidez + confiança
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-100 md:p-5">
                      Ideal para clientes que querem resolver lentidão,
                      aquecimento, upgrade ou montagem sem cair em atendimento
                      genérico.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-4 md:px-6">
          <div className="grid gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 md:rounded-[2rem] md:p-6 md:grid-cols-3">
            {[
              {
                title: "Atendimento honesto",
                text: "Explicação clara, orçamento antes da execução e foco no que realmente resolve.",
              },
              {
                title: "Visual profissional",
                text: "Marca premium, presença forte e estrutura pronta para crescer junto com o negócio.",
              },
              {
                title: "Contato fácil",
                text: "WhatsApp, Instagram e e-mail posicionados para converter visita em orçamento.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[1.25rem] border border-white/10 bg-zinc-900/70 p-5 md:rounded-[1.5rem]"
              >
                <h3 className="font-[var(--font-space)] text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="servicos" className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <div className="mb-10 max-w-2xl md:mb-12">
            <div className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-400">
              Serviços
            </div>
            <h2 className="font-[var(--font-space)] mt-3 text-2xl font-semibold tracking-tight text-white md:text-4xl">
              Soluções para quem quer o computador funcionando bem de novo.
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-400 md:text-base">
              Estrutura pensada para deixar claro, logo na primeira visita, o
              que a SASA TECH faz e como entrar em contato.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/[0.07] md:rounded-[1.75rem] md:p-6"
                >
                  <div className="mb-5 inline-flex rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-emerald-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-[var(--font-space)] text-xl font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="como-funciona" className="border-y border-white/10 bg-white/[0.03]">
          <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
            <div className="mb-10 max-w-2xl md:mb-12">
              <div className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-400">
                Como funciona
              </div>
              <h2 className="font-[var(--font-space)] mt-3 text-2xl font-semibold tracking-tight text-white md:text-4xl">
                Processo simples, direto e profissional.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className="rounded-[1.5rem] border border-white/10 bg-zinc-900 p-5 md:rounded-[1.75rem] md:p-6"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/15 text-sm font-semibold text-emerald-300">
                    0{index + 1}
                  </div>
                  <p className="text-sm leading-6 text-zinc-300">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="sobre" className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:gap-10">
            <div>
              <div className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-400">
                Sobre a SASA TECH
              </div>
              <h2 className="font-[var(--font-space)] mt-3 text-2xl font-semibold tracking-tight text-white md:text-4xl">
                Atendimento de TI com presença premium e comunicação simples.
              </h2>
              <p className="mt-6 max-w-2xl text-sm leading-8 text-zinc-300 md:text-base">
                Trabalho com manutenção e montagem de computadores com foco em
                atendimento honesto, rápido e profissional. A SASA TECH foi
                pensada para transmitir confiança logo no primeiro contato, com
                linguagem clara e foco em resultado.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-zinc-400 md:text-base">
                O objetivo é oferecer um serviço de TI confiável, com
                atendimento direto, orçamento claro e soluções pensadas para
                quem quer praticidade no dia a dia.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 md:rounded-[2rem] md:p-8">
              <h3 className="font-[var(--font-space)] text-xl font-semibold text-white">
                Diferenciais
              </h3>
              <div className="mt-6 space-y-4 text-sm leading-6 text-zinc-300">
                {[
                  "Explicação clara, sem linguagem complicada",
                  "Orçamento antes de executar o serviço",
                  "Atendimento local com resposta rápida",
                  "Busca e entrega do PC, quando combinado",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-zinc-900 p-4"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="border-y border-white/10 bg-white/[0.03]">
          <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
            <div className="mb-10 max-w-2xl md:mb-12">
              <div className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-400">
                Perguntas frequentes
              </div>
              <h2 className="font-[var(--font-space)] mt-3 text-2xl font-semibold tracking-tight text-white md:text-4xl">
                Dúvidas que o cliente costuma ter antes de chamar.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {faqs.map((item) => (
                <div
                  key={item.q}
                  className="rounded-[1.5rem] border border-white/10 bg-zinc-900 p-5 md:rounded-[1.75rem] md:p-6"
                >
                  <h3 className="font-[var(--font-space)] text-lg font-semibold text-white">
                    {item.q}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <div className="rounded-[1.5rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/15 to-zinc-900 p-5 md:rounded-[2rem] md:p-12">
            <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:gap-10">
              <div>
                <div className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-300">
                  Contato
                </div>
                <h2 className="font-[var(--font-space)] mt-3 text-2xl font-semibold tracking-tight text-white md:text-5xl">
                  Pronto para transformar visita em orçamento.
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-200 md:text-base">
                  Fale direto pelos canais abaixo. O foco aqui é facilitar o
                  contato rápido para orçamento, atendimento e dúvidas sobre
                  manutenção, upgrade ou montagem.
                </p>
              </div>

              <div className="space-y-4 rounded-[1.5rem] border border-white/10 bg-zinc-950/70 p-5 md:rounded-[1.75rem] md:p-6">
                <a
                  href={`https://wa.me/${contactLinks.whatsappBase}?text=${encodeURIComponent(
                    "Olá, quero solicitar um orçamento."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 transition hover:bg-white/10 md:py-4"
                >
                  <MessageCircle className="h-5 w-5 text-emerald-400" />
                  WhatsApp
                </a>
                <a
                  href={contactLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 transition hover:bg-white/10 md:py-4"
                >
                  <AtSign className="h-5 w-5 text-emerald-400" />
                  @sasatech.br
                </a>
                <a
                  href={contactLinks.email}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 transition hover:bg-white/10 md:py-4"
                >
                  <Mail className="h-5 w-5 text-emerald-400" />
                  contato@sasatech.com.br
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-4 py-6 text-center text-sm text-zinc-500 md:px-6 md:py-8">
        © 2026 SASA TECH • Joinville / SC • sasatech.com.br
      </footer>
    </div>
  );
}