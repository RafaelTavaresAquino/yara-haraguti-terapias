import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5511958766162?text=Olá%20Yara!%20Gostaria%20de%20saber%20mais%20sobre%20seus%20atendimentos.";

const WhatsAppButton = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Entrar em contato pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20b858] transition-all hover:scale-110"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
};

export default WhatsAppButton;
