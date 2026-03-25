export default function SasaTechHomepage() {
  const services = [
    {
      title: "Formatação",
      description:
        "Instalação limpa do sistema, remoção de arquivos desnecessários e configuração inicial para melhor desempenho.",
    },
    {
      title: "Limpeza interna",
      description:
        "Limpeza completa de poeira e sujeira, ajudando a reduzir aquecimento e melhorar a vida útil do equipamento.",
    },
    {
      title: "Troca de pasta térmica",
      description:
        "Aplicação de pasta térmica de qualidade para melhorar a dissipação de calor do processador.",
    },
    {
      title: "Instalação de SSD e RAM",
      description:
        "Upgrade de armazenamento e memória para deixar o computador muito mais rápido.",
    },
    {
      title: "Montagem de PCs",
      description:
        "Montagem completa de computadores para uso geral, trabalho ou jogos.",
    },
    {
      title: "Backup de arquivos",
      description:
        "Cópia segura dos seus dados importantes antes de qualquer procedimento.",
    },
    {
      title: "Instalação de programas",
      description:
        "Instalação e configuração de softwares essenciais para uso no dia a dia.",
    },
    {
      title: "Otimização de sistema",
      description:
        "Ajustes para melhorar desempenho, remover lentidão e deixar o sistema mais leve.",
    },
  ];

  const steps = [
    "Você entra em contato pelo WhatsApp, Instagram ou e-mail.",
    "Eu entendo o problema e te explico a melhor solução.",
    "Passo o orçamento antes de executar o serviço.",
    "Faço o atendimento com cuidado, clareza e organização.",
  ];

  const faqs = [
    {
      q: "Quais serviços a SASA TECH faz?",
      a: "Formatação, limpeza, montagem, upgrade e suporte técnico em geral para computadores e notebooks.",
    },
    {
      q: "Você atende em Joinville?",
      a: "Sim. O foco é Joinville/SC, com atendimento pensado para a região.",
    },
    {
      q: "Faz orçamento antes do serviço?",
      a: "Sim. A ideia é sempre deixar claro o que será feito antes de começar.",
    },
    {
      q: "Atende notebook e PC?",
      a: "Sim, tanto notebooks quanto computadores de mesa.",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-lg font-semibold tracking-[0.25em] text-emerald-400">
              SASA TECH
            </div>
            <div className="text-xs text-zinc-400">Joinville • SC</div>
          </div>

          <nav className="hidden gap-6 text-sm text-zinc-300 md:flex">
            <a href="#servicos" className="transition hover:text-white">Serviços</a>
            <a href="#como-funciona" className="transition hover:text-white">Como funciona</a>
            <a href="#sobre" className="transition hover:text-white">Sobre</a>
            <a href="#contato" className="transition hover:text-white">Contato</a>
          </nav>

          <a
            href="#contato"
            className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300 transition hover:bg-emerald-400/20"
          >
            Pedir orçamento
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.18),transparent_30%),radial-gradient(circle_at_left,rgba(16,185,129,0.12),transparent_25%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
            <div className="flex flex-col justify-center">
              <div className="mb-4 inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                Manutenção • Montagem • Upgrade • Suporte
              </div>
              <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-white md:text-6xl">
                Seu serviço de TI em <span className="text-emerald-400">Joinville</span>, com visual profissional e atendimento direto.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-zinc-300 md:text-lg">
                A SASA TECH oferece formatação, limpeza, montagem, upgrade e suporte técnico para quem quer resolver problemas com rapidez, clareza e confiança.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contato"
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
                    <div className="rounded-2xl border border-white/10 bg-zinc-950 p-4">
                      <div className="text-sm text-zinc-400">Atendimento</div>
                      <div className="mt-1 text-xl font-semibold text-white">Joinville / SC</div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-zinc-950 p-4">
                        <div className="text-sm text-zinc-400">Foco</div>
                        <div className="mt-1 font-medium text-white">Rapidez + confiança</div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-zinc-950 p-4">
                        <div className="text-sm text-zinc-400">Contato</div>
                        <div className="mt-1 font-medium text-white">WhatsApp, Insta, e-mail</div>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-100">
                      Visual premium, comunicação simples e foco total em transformar visitantes em pedidos de orçamento.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="servicos" className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-12 max-w-2xl">
            <div className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-400">
              Serviços
            </div>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
              Tudo o que o cliente espera de um atendimento de TI local.
            </h2>
            <p className="mt-4 text-zinc-400">
              Estrutura pensada para deixar claro, logo na primeira visita, o que você faz e como o cliente pode entrar em contato.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/[0.07]"
              >
                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="como-funciona" className="border-y border-white/10 bg-white/[0.03]">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="mb-12 max-w-2xl">
              <div className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-400">
                Como funciona
              </div>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                Um processo simples, direto e profissional.
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
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-400">
                Sobre a marca
              </div>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                SASA TECH com presença premium, limpa e confiável.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300">
                Trabalho com manutenção e montagem de computadores com foco em atendimento honesto, rápido e profissional. A SASA TECH busca oferecer soluções claras, sem enrolação, com qualidade e transparência para clientes em Joinville/SC.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold text-white">Pilares do site</h3>
              <div className="mt-6 space-y-4 text-sm leading-6 text-zinc-300">
                <div className="rounded-2xl border border-white/10 bg-zinc-900 p-4">
                  Visual premium e clean
                </div>
                <div className="rounded-2xl border border-white/10 bg-zinc-900 p-4">
                  Botões de contato sempre visíveis
                </div>
                <div className="rounded-2xl border border-white/10 bg-zinc-900 p-4">
                  Linguagem simples para o cliente entender rápido
                </div>
                <div className="rounded-2xl border border-white/10 bg-zinc-900 p-4">
                  Estrutura pronta para publicar na Vercel
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.03]">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="mb-12 max-w-2xl">
              <div className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-400">
                Perguntas frequentes
              </div>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                Dúvidas que o cliente costuma ter.
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
            <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-300">
                  Contato
                </div>
                <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">
                  Pronto para transformar visita em orçamento.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-200">
                  Aqui entram seus links reais de WhatsApp, Instagram e e-mail. Essa é a área mais importante do site para converter clientes.
                </p>
              </div>

              <div className="space-y-4 rounded-[1.75rem] border border-white/10 bg-zinc-950/70 p-6">
                <a href="https://wa.me/5547999609562?text=Olá,%20quero%20um%20orçamento" className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-zinc-200 transition hover:bg-white/10">
                  WhatsApp
                </a>
                <a href="https://instagram.com/sasatech" className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-zinc-200 transition hover:bg-white/10">
                  Instagram
                </a>
                <a href="mailto:contato@sasatech.com.br" className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-zinc-200 transition hover:bg-white/10">
                  E-mail
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-zinc-500">
        © 2026 SASA TECH • Joinville / SC
      </footer>
    </div>
  );
}
