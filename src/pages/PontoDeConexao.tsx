import { Users, Sparkles, Shield, Eye, Waves, Instagram } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { Button } from "@/components/ui/button";

const PontoDeConexao = () => {
  return (
    <ServicePageLayout
      title="Ponto de Conexão"
      subtitle="Campo mensal de manutenção energética para terapeutas, magos e facilitadores que desejam manter seu campo limpo e equilibrado."
      icon={<Users className="h-8 w-8" />}
      showBooking={false}
    >
      <div className="space-y-8">
        <div>
          <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">O que é o Ponto de Conexão?</h2>
          <p className="text-muted-foreground leading-relaxed">
            O Ponto de Conexão é um plano de assinatura mensal criado especialmente para quem trabalha com energia —
            terapeutas, magos, facilitadores energéticos e todos que lidam diariamente com o campo energético de outras pessoas.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Quando você trabalha com energia alheia, seu próprio campo pode ficar sobrecarregado. O Ponto de Conexão
            oferece uma manutenção regular para garantir que você esteja sempre limpo, protegido e em equilíbrio para
            continuar seu trabalho com excelência..
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">Para Quem é?</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Terapeutas holísticos",
              "Terapeutas energéticos",
              "Magos e praticantes espirituais",
              "Facilitadores de constelação",
              "Reikianos e curadores",
              "Todos que trabalham com energia",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                <Sparkles className="h-4 w-4 text-accent shrink-0" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">O que o Campo Oferece?</h2>
          <div className="space-y-3">
            {[
              { icon: Sparkles, title: "Limpeza Energética", desc: "Remoção de energias densas absorvidas no dia a dia" },
              { icon: Eye, title: "Clareza", desc: "Maior percepção e intuição para seus atendimentos" },
              { icon: Shield, title: "Proteção", desc: "Fortalecimento do seu campo de proteção energética" },
              { icon: Waves, title: "Equilíbrio e Fluxo", desc: "Manutenção do fluxo energético contínuo e saudável" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl border border-border/50 bg-card">
                <item.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm">{item.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-primary/20 bg-secondary/30 text-center">
          <h3 className="font-display text-xl font-semibold mb-3">Acompanhe no Instagram</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Informações sobre a programação mensal, assinatura e novidades do Ponto de Conexão.
          </p>
          <a href="https://instagram.com/yaraharaguti.terapias" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2">
              <Instagram className="h-4 w-4" />
              @yaraharaguti.terapias
            </Button>
          </a>
        </div>
      </div>
    </ServicePageLayout>
  );
};

export default PontoDeConexao;
