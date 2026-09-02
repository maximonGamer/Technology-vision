import { createFileRoute } from "@tanstack/react-router";
import React, { memo, useEffect, useRef, useState } from "react";
import hero3d from "@/assets/hero-3d.jpg";
import ronny1 from "@/assets/ronny-1.jpg";
import ronny2 from "@/assets/ronny-2.jpg";
import claudio1 from "@/assets/claudio-1.jpg";
import claudio2 from "@/assets/claudio-2.jpg";
import ryan1 from "@/assets/ryan-1.jpg";
import ryan2 from "@/assets/ryan-2.jpg";
import { Reveal } from "@/components/Reveal";
import { TeamSlide } from "@/components/TeamSlide";

const title = "Tecnologia Vision | Apresentações Empresariais e Presença Digital";
const description =
  "Transformamos empresas em apresentações que geram percepção de valor: identidade visual, materiais digitais e presença digital estratégica.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      // Preload apenas da imagem crítica (hero)
      { rel: "preload", as: "image", href: hero3d, type: "image/jpeg" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Tecnologia Vision",
          slogan: "Inovação | Tecnologia | Compreensão",
          description,
          areaServed: "BR",
          employee: [
            { "@type": "Person", name: "Ronny", jobTitle: "Gestor de Tráfego e Comunicação" },
            { "@type": "Person", name: "Claudio", jobTitle: "Analista de Desenvolvimento de Sistemas" },
            { "@type": "Person", name: "Ryan", jobTitle: "Prospector de Qualificação Moderna" },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});

// Hook para detectar se elemento está na viewport
function useInViewport(ref: React.RefObject<HTMLElement | null>) {
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsInViewport(entry.isIntersecting);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      observer.disconnect();
    };
  }, [ref]);

  return isInViewport;
}

// Componente de seção otimizada com lazy loading
const OptimizedSection = memo(({ 
  id, 
  className, 
  children 
}: { 
  id?: string; 
  className?: string; 
  children: React.ReactNode;
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInViewport = useInViewport(sectionRef);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    if (isInViewport) {
      setHasBeenVisible(true);
    }
  }, [isInViewport]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={className}
      style={{
        contentVisibility: hasBeenVisible ? "visible" : "auto",
        containIntrinsicSize: "500px",
      }}
    >
      {children}
    </section>
  );
});

// TeamSlide otimizado com memo
const OptimizedTeamSlide = memo(TeamSlide);

// Componente de imagem otimizado
const OptimizedImage = memo(({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  style,
  priority = false 
}: { 
  src: string; 
  alt: string; 
  width: number; 
  height: number; 
  className?: string; 
  style?: React.CSSProperties;
  priority?: boolean;
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "low"}
      className={className}
      style={style}
    />
  );
});

const steps = [
  {
    n: "01",
    t: "O começo — Como trabalhamos",
    d: "Começamos entendendo cada empresa: sua história, seus objetivos, seus diferenciais e o público que deseja alcançar. Nosso trabalho não é apenas criar uma apresentação bonita, é transformar a essência do negócio em uma comunicação clara, profissional e estratégica.",
  },
  {
    n: "02",
    t: "O processo — O que entregamos",
    d: "Apresentações empresariais, identidade visual, materiais digitais e conteúdos que mostram quem a empresa é, o que faz e por que merece ser escolhida. Cada detalhe é cuidado e cada projeto é personalizado.",
  },
  {
    n: "03",
    t: "O portfólio — O que construímos",
    d: "Nosso portfólio é uma coleção de histórias. Cada projeto representa uma empresa, seus desafios, sua personalidade e a forma como deseja ser percebida — a prova da nossa capacidade de transformar negócios em marcas mais claras e memoráveis.",
  },
  {
    n: "04",
    t: "O mundo digital — Por que isso importa",
    d: "Hoje não basta ter uma boa empresa: é preciso ser encontrado, reconhecido e compreendido. O digital virou uma extensão do negócio, e uma apresentação profissional pode ser o primeiro contato entre a marca e um cliente, parceiro ou investidor.",
  },
  {
    n: "05",
    t: "O resultado — Visibilidade e credibilidade",
    d: "Uma boa presença digital gera visibilidade, fortalece a credibilidade e ajuda a empresa a ocupar seu espaço no mercado. Se a sua empresa tem valor, o mundo precisa conseguir enxergá-lo.",
  },
  {
    n: "06",
    t: "Encerramento — Nossa missão",
    d: "Ajudamos empresas a contar suas histórias, apresentar seu valor e conquistar mais espaço no mundo digital. Sua história já existe. Seu valor já existe. Nós fazemos o mundo enxergá-los.",
  },
];

const faq = [
  {
    q: "Minha empresa realmente precisa de uma apresentação profissional?",
    a: "Seu cliente não conhece a sua história como você conhece. Ele precisa entender rapidamente quem é a sua empresa, o que você oferece, quais são seus diferenciais e por que deve confiar em você. Uma apresentação empresarial estratégica organiza tudo isso.",
  },
  {
    q: "E se eu não souber o que colocar?",
    a: "Nós ajudamos você a encontrar as informações certas e transformar tudo isso em uma apresentação clara, profissional e alinhada ao posicionamento da sua empresa.",
  },
  {
    q: "E se minha empresa for pequena?",
    a: "Tamanho não determina profissionalismo. Uma empresa pequena também pode — e deve — apresentar sua marca de maneira profissional para conquistar novos clientes, parceiros e oportunidades.",
  },
  {
    q: "E se eu já tiver um site ou redes sociais?",
    a: "Melhor ainda. Uma apresentação empresarial complementa seus canais digitais e funciona como ferramenta prática em reuniões, propostas comerciais, negociações e novos contatos.",
  },
  {
    q: "Será que vale a pena investir nisso agora?",
    a: "Quando alguém conhecer sua empresa pela primeira vez, a imagem que encontrar precisa transmitir todo o valor que você entrega. Se a resposta ainda não for sim, é hora de mudar a forma como sua empresa se apresenta.",
  },
];

function Index() {
  const mainRef = useRef<HTMLElement | null>(null);

  // Pausar animações quando a aba não está visível
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.body.classList.add('animations-paused');
      } else {
        document.body.classList.remove('animations-paused');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="tech-waves" aria-hidden="true">
        <div className="tech-grid" />
        <div className="tech-glow tech-glow-a" />
        <div className="tech-glow tech-glow-b" />
        <div className="tech-scanline" />
      </div>
      
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="text-lg font-extrabold tracking-tight" aria-label="Tecnologia Vision — página inicial">
            TECNOLOGIA <span className="text-gradient">VISION</span>
          </a>
          
          <nav className="hidden gap-7 text-sm text-muted-foreground md:flex">
            <a href="#processo" className="hover:text-foreground">Processo</a>
            <a href="#equipe" className="hover:text-foreground">Equipe</a>
            <a href="#trabalho" className="hover:text-foreground">Como trabalhamos</a>
            <a href="#duvidas" className="hover:text-foreground">Dúvidas</a>
          </nav>
          <a
            href="#contato"
            className="rounded-full px-5 py-2 text-sm font-semibold text-primary-foreground"
            style={{ backgroundImage: "var(--gradient-brand)", boxShadow: "var(--shadow-glow)" }}
          >
            Falar com a Vision
          </a>
        </div>
      </header>

      <main ref={mainRef}>
        {/* HERO - Carrega imediatamente */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 lg:grid-cols-2 lg:py-32">
            <div className="animate-rise">
              <p className="mb-8 text-2xl font-extrabold tracking-tight sm:text-3xl">
                TECNOLOGIA <span className="text-gradient">VISION</span>
                <span className="mt-2 block text-xs font-normal uppercase tracking-[0.28em] text-muted-foreground">
                  Inovação | Tecnologia | Compreensão
                </span>
              </p>
              <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
                Sua empresa tem valor.{" "}
                <span className="text-gradient">Mas o mundo digital consegue enxergar isso?</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Transformamos empresas em apresentações que geram percepção de valor.
                Comunicação clara, profissional e estratégica — do primeiro contato ao fechamento.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#contato"
                  className="rounded-full px-7 py-3.5 font-semibold text-primary-foreground"
                  style={{ backgroundImage: "var(--gradient-brand)", boxShadow: "var(--shadow-glow)" }}
                >
                  Apresente sua empresa
                </a>
                <a
                  href="#processo"
                  className="glass-card rounded-full px-7 py-3.5 font-semibold"
                >
                  Ver como trabalhamos
                </a>
              </div>
            </div>

            <div className="perspective">
              <div className="animate-float will-change-transform">
                <OptimizedImage
                  src={hero3d}
                  alt="Composição 3D de esferas em degradê violeta representando inovação tecnológica"
                  width={1600}
                  height={1200}
                  priority={true}
                  className="glass-card w-full rounded-[2rem] object-cover"
                  style={{ 
                    transform: "rotateY(-10deg) rotateX(6deg)", 
                    boxShadow: "var(--shadow-glow)",
                    transition: "transform 0.3s ease"
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* PROCESSO 1-6 */}
        <OptimizedSection id="processo" className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gradient">
              Nosso método
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
              Do entendimento à visibilidade, em seis etapas
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <article className="glass-card h-full rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-2">
                  <span
                    className="text-5xl font-black text-gradient"
                    aria-hidden="true"
                  >
                    {s.n}
                  </span>
                  <h3 className="mt-4 text-xl font-bold">{s.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </OptimizedSection>

        {/* EQUIPE */}
        <OptimizedSection id="equipe" className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gradient">
              Quem faz acontecer
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
              A equipe Tecnologia Vision
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Cada perfil apresenta dois momentos em slide animado: a identificação e a função em ação.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Reveal>
              <OptimizedTeamSlide
                name="Ronny"
                role="Gestor de tráfego e comunicação"
                description="Planeja e gerencia campanhas, distribui a mensagem certa para o público certo e traduz dados em decisões de comunicação."
                slides={[
                  { src: ronny1, caption: "Identificação — Ronny, Gestor de Tráfego" },
                  { src: ronny2, caption: "Em ação — gestão de campanhas e métricas" },
                ]}
              />
            </Reveal>
            <Reveal delay={120}>
              <OptimizedTeamSlide
                name="Claudio"
                role="Analista de desenvolvimento de sistemas"
                description="Constrói as soluções digitais: sites, sistemas e integrações que sustentam a presença da sua empresa com performance e segurança."
                slides={[
                  { src: claudio1, caption: "Identificação — Claudio, Analista de Sistemas" },
                  { src: claudio2, caption: "Em ação — desenvolvimento e integrações" },
                ]}
                interval={4800}
              />
            </Reveal>
            <Reveal delay={240}>
              <OptimizedTeamSlide
                name="Ryan"
                role="Prospector de qualificação moderna"
                description="Identifica e qualifica oportunidades reais, conectando a empresa a clientes e parceiros com abordagem consultiva."
                slides={[
                  { src: ryan1, caption: "Identificação — Ryan, Prospecção e Qualificação" },
                  { src: ryan2, caption: "Em ação — qualificação de oportunidades" },
                ]}
                interval={5200}
              />
            </Reveal>
          </div>
        </OptimizedSection>

        {/* COMO TRABALHAMOS */}
        <OptimizedSection id="trabalho" className="relative py-24">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <div className="glass-card rounded-[2rem] p-8 sm:p-14">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Como trabalhamos
                </h2>
                <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
                  <p>
                    Hoje, ter uma boa empresa não é suficiente. É preciso saber se apresentar. Antes de
                    entrar em contato, comprar ou fechar uma parceria, seu cliente provavelmente vai
                    pesquisar quem você é, o que sua empresa faz e como ela se posiciona no mercado. É
                    nesse primeiro contato que muitas oportunidades são perdidas.
                  </p>
                  <p>
                    Uma empresa pode ter anos de experiência, excelentes produtos e serviços, uma equipe
                    qualificada e uma história incrível — mas, se sua presença digital não transmite tudo
                    isso, seu potencial cliente pode nunca chegar a descobrir. Por isso transformamos
                    empresas em apresentações que geram percepção de valor.
                  </p>
                  <p>
                    Nosso trabalho começa entendendo quem é a sua empresa, o que ela representa e onde
                    deseja chegar. A partir disso, desenvolvemos apresentações empresariais, materiais
                    digitais e conteúdos personalizados que comunicam seus diferenciais, fortalecem sua
                    imagem e conquistam mais visibilidade.
                  </p>
                  <p className="text-foreground">
                    Porque no mundo digital, quem não é visto dificilmente é lembrado. E quem não consegue
                    comunicar seu valor pode acabar sendo comparado apenas pelo preço.
                  </p>
                </div>
                <p className="mt-8 text-2xl font-bold tracking-tight">
                  <span className="text-gradient">
                    Apresente sua empresa. Mostre seu valor. Ganhe visibilidade.
                  </span>
                </p>
              </div>
            </Reveal>
          </div>
        </OptimizedSection>

        {/* DÚVIDAS */}
        <OptimizedSection id="duvidas" className="mx-auto max-w-4xl px-6 py-24">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gradient">Dúvidas</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
              Ainda tem dúvidas sobre como apresentar sua empresa no mundo digital?
            </h2>
          </Reveal>

          <div className="mt-12 space-y-4">
            {faq.map((f, i) => (
              <Reveal key={f.q} delay={i * 70}>
                <details className="glass-card group rounded-2xl p-6">
                  <summary className="cursor-pointer list-none text-lg font-semibold marker:hidden">
                    <span className="text-gradient mr-3">+</span>
                    {f.q}
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </OptimizedSection>

        {/* CTA */}
        <OptimizedSection id="contato" className="mx-auto max-w-6xl px-6 pb-28">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-[2rem] p-10 text-center sm:p-16"
              style={{ backgroundImage: "var(--gradient-brand)", boxShadow: "var(--shadow-glow)" }}
            >
              <h2 className="text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-5xl">
                Sua empresa merece causar uma boa primeira impressão.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-primary-foreground/90">
                Sua história já existe. Seu valor já existe. Agora, precisamos fazer o mundo enxergá-los.
              </p>
              <a
                href="https://www.instagram.com/technologyvisionn/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-flex rounded-full bg-background px-8 py-4 font-semibold text-foreground transition-transform duration-300 hover:scale-105"
              >
                Solicitar apresentação
              </a>
            </div>
          </Reveal>
        </OptimizedSection>
      </main>

      <footer className="border-t border-border/60 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <span className="text-base font-extrabold tracking-tight text-foreground">
            TECNOLOGIA <span className="text-gradient">VISION</span>
          </span>
          <p>© {new Date().getFullYear()} Tecnologia Vision — Inovação | Tecnologia | Compreensão</p>
        </div>
      </footer>
    </div>
  );
}