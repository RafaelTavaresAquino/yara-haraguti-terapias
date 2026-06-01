import { Brain, Heart, Lightbulb, Shield, Star, Flower2 } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import SEO from "@/components/SEO";

const PsicanaliseEnergetico = () => {
  return (
    <>
    <SEO
      title="Psicanálise & Energético | Yara Haraguti"
      description="Atendimento que une psicanálise e técnicas energéticas: Magia Divina, DNB, Florais de Bach, Reiki e mais. Online, para todo o Brasil."
      path="/psicanalise-energetico"
      type="service"
    />
    <ServicePageLayout
      title="Psicanálise & Energético"
      subtitle="Uma abordagem integrativa que une a profundidade da psicanálise com o poder das terapias energéticas para uma transformação completa."
      icon={<Brain className="h-8 w-8" />}
    >
      <div className="space-y-8">
        <div>
          <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">O que é o Atendimento?</h2>
          <p className="text-muted-foreground leading-relaxed">
            O atendimento de Psicanálise & Energético é uma abordagem única que integra a escuta psicanalítica — onde 
            mergulhamos nos processos inconscientes, nas dores, traumas, medos, sonhos e crenças que moldam sua vida — 
            com técnicas energéticas poderosas que atuam diretamente no seu campo de energia.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Enquanto a psicanálise trabalha com a mente e os processos emocionais profundos, as terapias energéticas 
            complementam esse trabalho liberando bloqueios no corpo energético, promovendo uma cura que vai além das palavras.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">O que Esperar de uma Sessão?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Durante a sessão, você terá um espaço seguro e acolhedor para explorar seus sentimentos mais profundos. 
            Vamos trabalhar juntas questões como:
          </p>
          <ul className="mt-4 space-y-3">
            {[
              "Processos inconscientes que influenciam suas decisões e comportamentos",
              "Dores emocionais e traumas que ainda impactam sua vida",
              "Medos e inseguranças que limitam seu crescimento",
              "Sonhos e suas mensagens simbólicas",
              "Crenças limitantes que precisam ser transformadas",
              "Padrões repetitivos em relacionamentos e situações de vida",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <Star className="h-4 w-4 text-accent mt-1 shrink-0" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">Benefícios</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Lightbulb, title: "Autoconhecimento", desc: "Compreenda a si mesma em profundidade" },
              { icon: Heart, title: "Autoestima", desc: "Fortaleça o amor e respeito por si" },
              { icon: Shield, title: "Autoconfiança", desc: "Recupere a confiança em suas escolhas" },
              { icon: Flower2, title: "Transformação", desc: "Liberte-se de padrões que não servem mais" },
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                <benefit.icon className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">Técnicas Utilizadas</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Cada sessão é personalizada e pode incluir uma ou mais das seguintes técnicas, conforme sua necessidade:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { name: "Magia Divina", desc: "Trabalho energético profundo que atua na raiz dos bloqueios" },
              { name: "DNB", desc: "Desprogramação Neurobiológica para reprogramar padrões limitantes" },
              { name: "Florais de Bach", desc: "Essências florais que harmonizam estados emocionais" },
              { name: "Reiki", desc: "Canalização de energia universal para cura e equilíbrio" },
              { name: "Mesa Quântiônica", desc: "Técnica quântica que trabalha múltiplas dimensões energéticas" },
              { name: "Cartas Terapêuticas", desc: "Ferramenta intuitiva para acessar conteúdos inconscientes" },
            ].map((tech, i) => (
              <div key={i} className="p-4 rounded-xl border border-border/50 bg-card">
                <h3 className="font-semibold text-sm text-primary">{tech.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ServicePageLayout>
    </>
  );
};

export default PsicanaliseEnergetico;
