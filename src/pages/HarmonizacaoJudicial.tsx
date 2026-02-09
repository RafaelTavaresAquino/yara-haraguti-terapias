import { Scale, Zap, MapPin, Shield, Clock, Star } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

const HarmonizacaoJudicial = () => {
  return (
    <ServicePageLayout
      title="Harmonização de Processos Judiciais"
      subtitle="Uma abordagem energética única que pode harmonizar e destravar o andamento de processos judiciais."
      icon={<Scale className="h-8 w-8" />}
    >
      <div className="space-y-8">
        <div>
          <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">O que é?</h2>
          <p className="text-muted-foreground leading-relaxed">
            A Harmonização de Processos Judiciais é um trabalho energético que atua sobre as energias envolvidas em 
            questões jurídicas. Quando um processo judicial se arrasta, trava ou gera muito desgaste emocional, 
            muitas vezes existem energias densas envolvidas que impedem o fluxo natural de resolução.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Este trabalho não substitui a atuação do advogado ou do sistema jurídico. Ele atua de forma complementar, 
            harmonizando o campo energético que envolve o processo, as partes envolvidas e as situações ligadas à questão.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">Como Funciona?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Através de técnicas energéticas específicas, trabalho na limpeza das energias densas que estão ligadas 
            ao processo judicial. Isso inclui harmonizar conflitos energéticos entre as partes, limpar padrões de 
            estagnação e abrir caminhos para que a justiça possa fluir.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Você não precisa entender de energia para se beneficiar deste trabalho — basta estar aberto e disposto 
            a permitir que a harmonização aconteça.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">Benefícios</h2>
          <div className="space-y-3">
            {[
              { icon: Clock, text: "Aceleração processual — Destravar processos que estão parados ou lentos" },
              { icon: Zap, text: "Harmonização de andamentos — Facilitar o fluxo natural da justiça" },
              { icon: Shield, text: "Limpeza de energias densas — Remover bloqueios que impedem a resolução" },
              { icon: Star, text: "Equilíbrio emocional — Reduzir o desgaste emocional durante o processo" },
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                <benefit.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-accent/30 bg-accent/5 text-center">
          <MapPin className="h-8 w-8 text-accent mx-auto mb-3" />
          <h3 className="font-display text-xl font-semibold mb-2">Atendimento para Todo o Brasil</h3>
          <p className="text-sm text-muted-foreground">
            Como o trabalho é energético, pode ser realizado à distância com a mesma eficácia. 
            Atendo clientes de todo o Brasil.
          </p>
        </div>
      </div>
    </ServicePageLayout>
  );
};

export default HarmonizacaoJudicial;
