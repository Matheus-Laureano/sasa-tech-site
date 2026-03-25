import { AtSign, CheckCircle2, Cpu, HardDrive, Mail, MapPin, MessageCircle, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import Image from "next/image";

export default function SasaTechHomepage() {
  const services = [
    {
      title: "Formatação",
      description:
        "Instalação limpa do sistema ou otimizada, configuração inicial e organização para devolver mais leveza ao computador.",
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
        "Indicação e troca de componentes como: armazenamento, memória, processador e placa de vídeo. Para deixar o sistema muito mais rápido e responsivo.",
      icon: Wrench,
    },
    {
      title: "Montagem de PCs",
      description:
        "Montagem completa para trabalho, estudos ou jogos, com organização, compatibilidade e performance.",
      icon: ShieldCheck,
    },
    {
      title: "Backup e instalação de programas",
      description:
        "Proteção dos seus arquivos e instalação dos softwares essenciais para o dia a dia.",
      icon: CheckCircle2,
    },
  ];

  const steps = [
    "Você entra em contato pelo WhatsApp, Instagram ou e-mail.",
    "Eu entendo o problema e explico a melhor solução de forma simples.",
    "Passo o orçamento antes de iniciar o serviço.",
    "Executo o atendimento com cuidado, clareza e organização.",
  ];

  const faqs = [
    {
      q: "Quais serviços a SASA TECH faz?",
      a: "Formatação, limpeza interna, troca de pasta térmica, upgrade, montagem de PCs, backup e instalação de programas.",
    },
    {
      q: "Você atende em Joinville?",
      a: "Sim. O foco é Joinville/SC, com atendimento pensado para quem busca agilidade e confiança na região.",
    },
    {
      q: "Como funciona o orçamento?",
      a: "O objetivo é sempre deixar claro o que será feito sem compromisso financeiro algum antes de começar qualquer procedimento.",
    },
    {
      q: "Atende notebook e PC?",
      a: "Sim, tanto notebooks quanto computadores de mesa.",
    },
  ];

  const contactLinks = {
    whatsapp: "https://wa.me/5547999609562?text=Olá,%20quero%20um%20orçamento",
    instagram: "https://instagram.com/sasa.tech",
    email: "mailto:contato@sasatech.com.br",
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-400 selection:text-zinc-950">
      <a
        href={contactLinks.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-3 rounded-full border border-emerald-400/30 bg-emerald-400 px-5 py-3 text-sm font-semibold text-zinc-950 shadow-2xl shadow-emerald-950/40 transition hover:scale-[1.02]"
      >
        <MessageCircle className="h-5 w-5" />
        WhatsApp
      </a>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#inicio" className="group flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="SASA TECH"
              width={44}
              height={44}
              className="h-11 w-11 object-contain transition group-hover:opacity-80"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-[0.22em] text-emerald-400 transition group-hover:text-emerald-300">
                SASA TECH
              </span>
              <span className="text-xs text-zinc-400">Joinville • SC</span>
            </div>
          </a>

          <nav className="hidden gap-6 text-sm text-zinc-300 md:flex">
            <a href="#servicos" className="transition hover:text-white">Serviços</a>
            <a href="#como-funciona" className="transition hover:text-white">Como funciona</a>
            <a href="#sobre" className="transition hover:text-white">Sobre</a>
            <a href="#faq" className="transition hover:text-white">FAQ</a>
            <a href="#contato" className="transition hover:text-white">Contato</a>
          </nav>

          <a
            href={contactLinks.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300 transition hover:bg-emerald-400/20"
          >
            Solicitar orçamento
          </a>
        </div>
      </header>

      <main id="inicio">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.18),transparent_28%),radial-gradient(circle_at_left,rgba(16,185,129,0.10),transparent_25%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />

          <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
            <div className="flex flex-col justify-center">
              <div className="mb-4 inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                Atendimento local • Joinville/SC
              </div>

              <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-white md:text-6xl">
                Manutenção e suporte de TI com visual profissional e atendimento <span className="text-emerald-400">rápido, claro e confiável</span>.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-zinc-300 md:text-lg">
                Formatação, limpeza, montagem, upgrade, backup e suporte técnico para computadores e notebooks em Joinville. Sem enrolação, com orçamento antes do serviço e contato direto.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={contactLinks.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-emerald-400 px-6 py-3 text-center text-sm font-semibold text-zinc-950 transition hover:opacity-90"
                >
                  Solicitar orçamento
                </a>
                <a
                  href="#servicos"
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
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
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30">
                <div className="rounded-[1.5rem] border border-emerald-400/20 bg-zinc-900 p-8">
                  <div className="mb-8 flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-emerald-400" />
                    <div className="h-3 w-3 rounded-full bg-white/30" />
                    <div className="h-3 w-3 rounded-full bg-white/15" />
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-zinc-950 p-5">
                      <div className="text-sm text-zinc-400">Atendimento</div>
                      <div className="mt-1 flex items-center gap-2 text-xl font-semibold text-white">
                        <MapPin className="h-5 w-5 text-emerald-400" />
                        Joinville / SC
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-zinc-950 p-5">
                        <div className="text-sm text-zinc-400">Contato rápido</div>
                        <div className="mt-1 font-medium text-white">WhatsApp direto</div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-zinc-950 p-5">
                        <div className="text-sm text-zinc-400">Foco</div>
                        <div className="mt-1 font-medium text-white">Rapidez + confiança</div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5 text-sm leading-6 text-emerald-100">
                      Ideal para clientes que querem resolver lentidão, aquecimento, upgrade ou montagem sem cair em atendimento genérico.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-4">
          <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:grid-cols-3">
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
              <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-zinc-900/70 p-5">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="servicos" className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-12 max-w-2xl">
            <div className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-400">
              Serviços
            </div>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
              Soluções para quem quer o computador funcionando bem de novo.
            </h2>
            <p className="mt-4 text-zinc-400">
              Estrutura pensada para deixar claro, logo na primeira visita, o que a SASA TECH faz e como entrar em contato.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/[0.07]"
                >
                  <div className="mb-5 inline-flex rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-emerald-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{service.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="como-funciona" className="border-y border-white/10 bg-white/[0.03]">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="mb-12 max-w-2xl">
              <div className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-400">
                Como funciona
              </div>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                Processo simples, direto e profissional.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {steps.map((step, index) => (
                <div key={step} className="rounded-[1.75rem] border border-white/10 bg-zinc-900 p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/15 text-sm font-semibold text-emerald-300">
                    0{index + 1}
                  </div>
                  <p className="text-sm leading-6 text-zinc-300">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="sobre" className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-400">
                Sobre a SASA TECH
              </div>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                Atendimento de TI com presença premium e comunicação simples.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300">
                Trabalho com manutenção e montagem de computadores com foco em atendimento honesto, rápido e profissional. A SASA TECH foi pensada para transmitir confiança logo no primeiro contato, com linguagem clara e foco em resultado.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-400">
                 
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold text-white">Diferenciais</h3>
              <div className="mt-6 space-y-4 text-sm leading-6 text-zinc-300">
                {[
                  "Explicação clara, sem linguagem complicada",
                  "Orçamento antes de executar o serviço",
                  "Atendimento AJUSTAR ESSE TEXTO",
                  "Busca e entrega seu PC",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-zinc-900 p-4">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="border-y border-white/10 bg-white/[0.03]">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="mb-12 max-w-2xl">
              <div className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-400">
                Perguntas frequentes
              </div>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                Dúvidas que o cliente costuma ter antes de chamar.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {faqs.map((item) => (
                <div key={item.q} className="rounded-[1.75rem] border border-white/10 bg-zinc-900 p-6">
                  <h3 className="text-lg font-semibold text-white">{item.q}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="mx-auto max-w-7xl px-6 py-20">
          <div className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/15 to-zinc-900 p-8 md:p-12">
            <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr]">
              <div>
                <div className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-300">
                  Contato
                </div>
                <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">
                  Pronto para transformar visita em orçamento.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-200">
                  Fale direto pelos canais abaixo. O foco aqui é facilitar o contato rápido para orçamento, atendimento e dúvidas sobre manutenção, upgrade ou montagem.
                </p>
              </div>

              <div className="space-y-4 rounded-[1.75rem] border border-white/10 bg-zinc-950/70 p-6">
                <a
                  href={contactLinks.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-zinc-200 transition hover:bg-white/10"
                >
                  <MessageCircle className="h-5 w-5 text-emerald-400" />
                  WhatsApp
                </a>
                <a
                  href={contactLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-zinc-200 transition hover:bg-white/10"
                >
                  <AtSign className="h-5 w-5 text-emerald-400" />
                  @sasa.tech
                </a>
                <a
                  href={contactLinks.email}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-zinc-200 transition hover:bg-white/10"
                >
                  <Mail className="h-5 w-5 text-emerald-400" />
                  contato@sasatech.com.br
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-zinc-500">
        © 2026 SASA TECH • Joinville / SC • sasatech.com.br
      </footer>
    </div>
  );
}
