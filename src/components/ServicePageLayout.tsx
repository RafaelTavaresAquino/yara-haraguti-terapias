import { motion } from "framer-motion";
import { MessageCircle, Clock, CreditCard, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/5511958766162?text=Olá%20Yara!%20Gostaria%20de%20agendar%20uma%20sessão.";

interface ServicePageLayoutProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  showBooking?: boolean;
  duration?: string;
  payment?: string;
}

const ServicePageLayout = ({
  title,
  subtitle,
  icon,
  children,
  showBooking = true,
  duration = "1 hora",
  payment = "Pix ou Cartão via Picpay",
}: ServicePageLayoutProps) => {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-primary">
              {icon}
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose-lilac"
          >
            {children}
          </motion.div>
        </div>
      </section>

      {/* Info bar + CTA */}
      {showBooking && (
        <section className="py-12 gradient-spiritual">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="rounded-2xl bg-card border border-border/50 p-8 shadow-sm"
            >
              <h3 className="font-display text-2xl font-semibold mb-6 text-center">Informações do Atendimento</h3>
              <div className="grid gap-4 sm:grid-cols-3 mb-8">
                <div className="flex items-center gap-3 justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-sm">Duração: {duration}</span>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <Wifi className="h-5 w-5 text-primary" />
                  <span className="text-sm">Atendimento Online</span>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span className="text-sm">{payment}</span>
                </div>
              </div>
              <div className="text-center">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                    <MessageCircle className="h-5 w-5" />
                    Agendar pelo WhatsApp
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ServicePageLayout;
