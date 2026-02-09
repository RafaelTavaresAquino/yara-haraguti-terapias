import { Link } from "react-router-dom";
import { Sparkles, Phone, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-secondary/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-accent" />
              <span className="font-display text-lg font-semibold">Yara Haraguti</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Psicanalista e Terapeuta Energética. Transformação, acolhimento e cura para uma vida mais plena.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Serviços</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/psicanalise-energetico" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Psicanálise & Energético
              </Link>
              <Link to="/atendimentos-energeticos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Atendimentos Energéticos
              </Link>
              <Link to="/harmonizacao-judicial" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Harmonização Judicial
              </Link>
              <Link to="/ponto-de-conexao" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Ponto de Conexão
              </Link>
              <Link to="/pro-terapeuta" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Pró-Terapeuta
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contato</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:+5511958766162" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                +55 11 95876-6162
              </a>
              <a href="https://instagram.com/yaraharaguti.terapias" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-4 w-4" />
                @yaraharaguti.terapias
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/40 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Yara Haraguti — Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
