import { motion } from "framer-motion";
import { Phone, MessageCircle, Instagram, MapPin, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const WHATSAPP_URL = "https://wa.me/5511958766162?text=Olá%20Yara!%20Gostaria%20de%20saber%20mais%20sobre%20seus%20atendimentos.";

const Contato = () => {
  return (
    <div>
      <section className="gradient-hero py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
              Entre em Contato
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Estou aqui para acolher você. Entre em contato e vamos conversar sobre como posso ajudar na sua jornada.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="grid gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Card className="border-border/50 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group">
                  <CardContent className="p-6 flex items-center gap-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors shrink-0">
                      <MessageCircle className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold">WhatsApp</h3>
                      <p className="text-muted-foreground text-sm">Clique para iniciar uma conversa diretamente</p>
                      <p className="text-primary font-medium text-sm mt-1">+55 11 95876-6162</p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a href="tel:+5511958766162">
                <Card className="border-border/50 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group">
                  <CardContent className="p-6 flex items-center gap-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                      <Phone className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold">Telefone</h3>
                      <p className="text-muted-foreground text-sm">Ligue diretamente para agendar</p>
                      <p className="text-primary font-medium text-sm mt-1">+55 11 95876-6162</p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <a href="https://instagram.com/yaraharaguti.terapias" target="_blank" rel="noopener noreferrer">
                <Card className="border-border/50 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group">
                  <CardContent className="p-6 flex items-center gap-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                      <Instagram className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold">Instagram</h3>
                      <p className="text-muted-foreground text-sm">Acompanhe conteúdos e novidades</p>
                      <p className="text-primary font-medium text-sm mt-1">@yaraharaguti.terapias</p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="border-border/50 bg-secondary/30">
                <CardContent className="p-6 flex items-center gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary shrink-0">
                    <Wifi className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold">Atendimento Online</h3>
                    <p className="text-muted-foreground text-sm">
                      Todos os atendimentos são realizados online, com a mesma eficácia. 
                      Atendo clientes de todo o Brasil.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contato;
