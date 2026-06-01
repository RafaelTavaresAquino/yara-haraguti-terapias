import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Brain, Zap, Scale, Users, Briefcase, ArrowRight } from "lucide-react";
import yaraFoto from "@/assets/yara-foto.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TestimonialsList from "@/components/TestimonialsList";
import SEO from "@/components/SEO";

const services = [
  {
    icon: Brain,
    title: "Psicanálise & Energético",
    description: "Atendimento que une a escuta psicanalítica com técnicas energéticas para uma transformação profunda.",
    path: "/psicanalise-energetico",
  },
  {
    icon: Zap,
    title: "Atendimentos Energéticos",
    description: "Sessões quinzenais focadas na liberação de bloqueios e restauração do equilíbrio energético.",
    path: "/atendimentos-energeticos",
  },
  {
    icon: Scale,
    title: "Harmonização Judicial",
    description: "Terapia energética aplicada a processos judiciais para harmonizar e destravar andamentos.",
    path: "/harmonizacao-judicial",
  },
  {
    icon: Users,
    title: "Ponto de Conexão",
    description: "Campo mensal de manutenção energética para terapeutas e facilitadores.",
    path: "/ponto-de-conexao",
  },
  {
    icon: Briefcase,
    title: "Pró-Terapeuta",
    description: "Consultoria jurídica e administrativa exclusiva para terapeutas.",
    path: "/pro-terapeuta",
  },
];

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const sobreRef = useRef<HTMLDivElement>(null);
  const servicosRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: sobreScroll } = useScroll({
    target: sobreRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: servicosScroll } = useScroll({
    target: servicosRef,
    offset: ["start end", "end start"],
  });

  // Hero parallax
  const heroTextY = useTransform(heroScroll, [0, 1], [0, -80]);
  const heroImageY = useTransform(heroScroll, [0, 1], [0, -40]);
  const heroImageScale = useTransform(heroScroll, [0, 1], [1, 1.1]);
  const heroBgY = useTransform(heroScroll, [0, 1], [0, 60]);

  // Sobre parallax
  const sobreY = useTransform(sobreScroll, [0, 1], [60, -60]);

  // Serviços parallax
  const servicosTitleY = useTransform(servicosScroll, [0, 0.5], [40, 0]);

  return (
    <div className="overflow-hidden">
      <SEO
        title="Yara Haraguti | Psicanalista & Terapeuta Energética"
        description="Psicanálise, atendimentos energéticos, harmonização judicial e consultoria para terapeutas. Atendimento online em todo o Brasil."
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Yara Haraguti",
          jobTitle: "Psicanalista e Terapeuta Energética",
          url: "https://yara-haraguti-terapias.lovable.app/",
          telephone: "+55-11-95876-6162",
          sameAs: ["https://instagram.com/yaraharaguti.terapias"],
        }}
      />
      {/* Hero */}
      <section ref={heroRef} className="relative gradient-hero overflow-hidden">
        {/* Floating decorative elements */}
        <motion.div
          style={{ y: heroBgY }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-10 right-20 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-primary/5 blur-2xl" />
        </motion.div>

        <div className="container mx-auto px-4 py-12 md:py-32">
          <div className="flex flex-col-reverse gap-8 md:grid md:grid-cols-2 md:gap-12 items-center">
            <motion.div
              style={{ y: heroTextY }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm text-primary mb-6">
                <Sparkles className="h-4 w-4" />
                Psicanalista & Terapeuta Energética
              </div>
              <h1 className="font-display text-3xl md:text-6xl font-semibold text-foreground leading-tight mb-4 md:mb-6">
                Yara <span className="text-gradient-gold">Haraguti</span>
                <span className="block text-xl md:text-2xl font-normal text-muted-foreground mt-2">
                  Psicanalista & Terapeuta Energética
                </span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 md:mb-8 max-w-lg">
                Transforme sua vida através do autoconhecimento e da cura energética. 
                Um espaço de acolhimento, escuta e renovação para você se reconectar com sua essência.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link to="/contato">
                  <Button size="lg" className="gap-2">
                    Agendar Sessão
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/psicanalise-energetico">
                  <Button variant="outline" size="lg">
                    Conhecer Serviços
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              style={{ y: heroImageY }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex justify-center"
            >
              <motion.div
                style={{ scale: heroImageScale }}
                className="relative w-48 h-48 md:w-96 md:h-96 rounded-full overflow-hidden border-2 border-primary/20 shadow-lg"
              >
                <img
                  src={yaraFoto}
                  alt="Yara Haraguti - Psicanalista e Terapeuta Energética"
                  width={384}
                  height={384}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sobre Mim */}
      <section ref={sobreRef} className="py-12 md:py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            style={{ y: sobreY }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-display text-2xl md:text-4xl font-semibold mb-4 md:mb-6">Sobre Mim</h2>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              Sou Yara Haraguti, Psicanalista e Terapeuta Energética. Minha missão é guiar você em uma jornada 
              de autoconhecimento e cura, unindo a profundidade da psicanálise com a potência das terapias energéticas. 
              Acredito que cada pessoa carrega dentro de si a capacidade de se transformar — e estou aqui para 
              acompanhar você nesse caminho com acolhimento, respeito e dedicação.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Serviços */}
      <section ref={servicosRef} className="py-12 md:py-24 gradient-spiritual relative">
        <div className="container mx-auto px-4">
          <motion.div
            style={{ y: servicosTitleY }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-2xl md:text-4xl font-semibold mb-3 md:mb-4">Meus Serviços</h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
              Conheça as formas de atendimento que ofereço para apoiar sua transformação.
            </p>
          </motion.div>

          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.path}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
              >
                <Link to={service.path}>
                  <Card className="h-full border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:border-primary/30 transition-all group cursor-pointer">
                    <CardContent className="p-6">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <service.icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-display text-xl font-semibold mb-2">{service.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                      <div className="mt-4 flex items-center gap-1 text-sm text-primary font-medium">
                        Saiba mais <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Depoimentos */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-2xl md:text-4xl font-semibold mb-3">Depoimentos</h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
              Veja o que meus clientes dizem sobre suas experiências.
            </p>
          </motion.div>
          <div className="max-w-4xl mx-auto">
            <TestimonialsList />
          </div>
          <div className="text-center mt-8">
            <Link to="/depoimentos">
              <Button variant="outline" className="gap-2">
                Deixar meu depoimento <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
