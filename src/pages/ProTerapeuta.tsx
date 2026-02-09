import { Briefcase, FileText, Settings, Users, Star, MessageCircle } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/5511958766162?text=Olá%20Yara!%20Gostaria%20de%20saber%20mais%20sobre%20a%20consultoria%20Pró-Terapeuta.";

const ProTerapeuta = () => {
  return (
    <ServicePageLayout
      title="Pró-Terapeuta"
      subtitle="Consultoria jurídica e administrativa exclusiva para terapeutas que desejam profissionalizar sua prática."
      icon={<Briefcase className="h-8 w-8" />}
      showBooking={false}
    >
      <div className="space-y-8">
        <div>
          <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">O que é a Consultoria Pró-Terapeuta?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Muitos terapeutas são excelentes no que fazem, mas enfrentam dificuldades na parte burocrática e administrativa 
            de seus negócios. A consultoria Pró-Terapeuta foi criada para resolver exatamente isso.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Ofereço orientação personalizada para que você possa atuar com segurança jurídica, organização administrativa 
            e profissionalismo, dedicando mais tempo ao que realmente importa: cuidar das pessoas.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">Serviços Oferecidos</h2>
          <div className="space-y-4">
            {[
              {
                icon: FileText,
                title: "Formalização de Contratos",
                desc: "Elaboração e revisão de contratos de prestação de serviço, termos de consentimento e outros documentos essenciais para sua proteção e a de seus clientes.",
              },
              {
                icon: Settings,
                title: "Organização Administrativa",
                desc: "Orientação sobre como estruturar sua agenda, definir valores, criar processos de atendimento eficientes e organizar as finanças do seu negócio terapêutico.",
              },
              {
                icon: Users,
                title: "Orientação Personalizada",
                desc: "Atendimento individualizado para entender suas necessidades específicas e criar soluções sob medida para sua realidade como terapeuta.",
              },
            ].map((service, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl border border-border/50 bg-card">
                <service.icon className="h-6 w-6 text-primary mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold">{service.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-accent/30 bg-accent/5 text-center">
          <Star className="h-8 w-8 text-accent mx-auto mb-3" />
          <h3 className="font-display text-xl font-semibold mb-2">Serviço Exclusivo para Terapeutas</h3>
          <p className="text-sm text-muted-foreground mb-5">
            Essa consultoria foi pensada especialmente para profissionais da área terapêutica. 
            Entre em contato para saber mais.
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="gap-2">
              <MessageCircle className="h-5 w-5" />
              Falar pelo WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </ServicePageLayout>
  );
};

export default ProTerapeuta;
