import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles, Shield, LogOut, LogIn } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const navLinks = [
  { label: "Início", path: "/" },
  { label: "Psicanálise & Energético", path: "/psicanalise-energetico" },
  { label: "Energéticos", path: "/atendimentos-energeticos" },
  { label: "Harmonização Judicial", path: "/harmonizacao-judicial" },
  { label: "Ponto de Conexão", path: "/ponto-de-conexao" },
  { label: "Pró-Terapeuta", path: "/pro-terapeuta" },
  { label: "Contato", path: "/contato" },
  { label: "Depoimentos", path: "/depoimentos" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const location = useLocation();
  const { isAdmin, user, signOut } = useAuth();

  useEffect(() => {
    if (!isAdmin) return;
    const fetchPending = async () => {
      const { count } = await supabase
        .from("testimonials")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");
      setPendingCount(count || 0);
    };
    fetchPending();

    const channel = supabase
      .channel("pending-testimonials")
      .on("postgres_changes", { event: "*", schema: "public", table: "testimonials" }, () => {
        fetchPending();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [isAdmin]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-accent" />
          <span className="font-display text-xl font-semibold text-foreground tracking-wide">
            Yara Haraguti
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                location.pathname === link.path
                  ? "text-primary bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1",
                location.pathname === "/admin"
                  ? "text-primary bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <Shield className="h-4 w-4" /> Admin
              {pendingCount > 0 && (
                <span className="ml-1 inline-flex items-center justify-center h-5 min-w-5 px-1 text-xs font-bold rounded-full bg-destructive text-destructive-foreground">
                  {pendingCount}
                </span>
              )}
            </Link>
          )}
          {user ? (
            <Button variant="ghost" size="sm" onClick={signOut} className="gap-1 text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4" /> Sair
            </Button>
          ) : (
            <Link
              to="/auth"
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1",
                location.pathname === "/auth"
                  ? "text-primary bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <LogIn className="h-4 w-4" /> Entrar
            </Link>
          )}
        </nav>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-background">
            <SheetTitle className="font-display text-lg">Menu</SheetTitle>
            <nav className="mt-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    location.pathname === link.path
                      ? "text-primary bg-secondary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
                    location.pathname === "/admin"
                      ? "text-primary bg-secondary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <Shield className="h-4 w-4" /> Admin
                  {pendingCount > 0 && (
                    <span className="ml-1 inline-flex items-center justify-center h-5 min-w-5 px-1 text-xs font-bold rounded-full bg-destructive text-destructive-foreground">
                      {pendingCount}
                    </span>
                  )}
                </Link>
              )}
              {user ? (
                <Button variant="ghost" onClick={signOut} className="w-full justify-start gap-2 px-4 py-3 text-muted-foreground hover:text-foreground">
                  <LogOut className="h-4 w-4" /> Sair
                </Button>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
                    location.pathname === "/auth"
                      ? "text-primary bg-secondary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <LogIn className="h-4 w-4" /> Entrar
                </Link>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
