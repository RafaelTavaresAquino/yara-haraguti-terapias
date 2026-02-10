import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Brain, Zap, Scale, Users, Briefcase, ArrowRight } from "lucide-react";
import yaraFoto from "@/assets/yara-foto.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
  return (
    <div>
      {/* Hero */}
      <section className="relative gradient-hero overflow-hidden">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm text-primary mb-6">
                <Sparkles className="h-4 w-4" />
                Psicanalista & Terapeuta Energética
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground leading-tight mb-6">
                Yara <span className="text-gradient-gold">Haraguti</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                Transforme sua vida através do autoconhecimento e da cura energética. 
                Um espaço de acolhimento, escuta e renovação para você se reconectar com sua essência.
              </p>
              <div className="flex flex-wrap gap-4">
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
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-2 border-primary/20 shadow-lg">
                <img src={yaraFoto} alt="Yara Haraguti - Psicanalista e Terapeuta Energética" className="w-full h-full object-cover object-top" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sobre Mim */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">Sobre Mim</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Sou Yara Haraguti, Psicanalista e Terapeuta Energética. Minha missão é guiar você em uma jornada 
              de autoconhecimento e cura, unindo a profundidade da psicanálise com a potência das terapias energéticas. 
              Acredito que cada pessoa carrega dentro de si a capacidade de se transformar — e estou aqui para 
              acompanhar você nesse caminho com acolhimento, respeito e dedicação.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-16 md:py-24 gradient-spiritual">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">Meus Serviços</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Conheça as diferentes formas de atendimento que ofereço para apoiar sua transformação.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.path}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={service.path}>
                  <Card className="h-full border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-md hover:border-primary/30 transition-all group cursor-pointer">
                    <CardContent className="p-6">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <service.icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-display text-xl font-semibold mb-2">{service.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                      <div className="mt-4 flex items-center gap-1 text-sm text-primary font-medium">
                        Saiba mais <ArrowRight className="h-3 w-3" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
