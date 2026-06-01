import { Zap, Waves, Leaf, RefreshCw, Star, Sun } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import SEO from "@/components/SEO";

const AtendimentosEnergeticos = () => {
  return (
    <>
    <SEO
      title="Atendimentos Energéticos | Yara Haraguti"
      description="Sessões quinzenais de terapia energética online. Florais de Bach e DNB para liberar bloqueios e restaurar seu equilíbrio."
      path="/atendimentos-energeticos"
      type="service"
    />
    <ServicePageLayout
      title="Atendimentos Energéticos"
      subtitle="Sessões quinzenais dedicadas à liberação de bloqueios energéticos e restauração do seu equilíbrio interior."
      icon={<Zap className="h-8 w-8" />}
    >
      <div className="space-y-8">
        <div>
          <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">O que são Bloqueios Energéticos?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Nosso corpo não é feito apenas de matéria — somos também energia. Quando passamos por situações difíceis, 
            traumas, estresse prolongado ou emoções reprimidas, essa energia pode ficar "travada" em determinadas regiões 
            do nosso corpo energético.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Esses bloqueios podem se manifestar como ansiedade inexplicável, cansaço constante, dificuldade de tomar 
            decisões, problemas de sono, dores sem causa aparente, ou aquela sensação persistente de que "algo não está bem".
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">Como Funciona o Atendimento?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Os atendimentos energéticos são realizados quinzenalmente, permitindo que seu corpo e sua energia tenham tempo 
            de processar e integrar as mudanças entre cada sessão. Cada encontro é único e direcionado às suas necessidades 
            do momento.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            O atendimento é feito de forma online, o que permite que você esteja no conforto da sua casa, em um ambiente 
            seguro e tranquilo. A energia não conhece distância — funciona com a mesma eficácia independentemente 
            de onde você esteja.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">Técnicas Utilizadas</h2>
          <div className="space-y-4">
            <div className="p-5 rounded-xl border border-border/50 bg-card">
              <div className="flex items-center gap-3 mb-2">
                <Leaf className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Florais de Bach</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Criados pelo Dr. Edward Bach, os Florais de Bach são essências naturais extraídas de flores silvestres 
                que atuam nos estados emocionais. Cada floral trabalha uma emoção específica — como medo, insegurança, 
                solidão ou desânimo — promovendo equilíbrio emocional de forma suave e natural.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border/50 bg-card">
              <div className="flex items-center gap-3 mb-2">
                <RefreshCw className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">DNB — Desprogramação Neurobiológica</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A DNB é uma técnica avançada que atua na desprogramação de padrões neurológicos e biológicos 
                que mantêm comportamentos limitantes. Através dela, é possível identificar e liberar programações 
                inconscientes que foram gravadas ao longo da vida — em experiências de infância, relações familiares, 
                ou até em memórias ancestrais.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">Benefícios</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: Waves, text: "Aliviar tensões emocionais acumuladas" },
              { icon: RefreshCw, text: "Libertar-se de padrões limitantes" },
              { icon: Sun, text: "Encontrar equilíbrio e clareza mental" },
              { icon: Star, text: "Recuperar a vitalidade e disposição" },
              { icon: Leaf, text: "Harmonizar corpo, mente e espírito" },
              { icon: Zap, text: "Restaurar o fluxo natural de energia" },
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
                <benefit.icon className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ServicePageLayout>
    </>
  );
};

export default AtendimentosEnergeticos;
