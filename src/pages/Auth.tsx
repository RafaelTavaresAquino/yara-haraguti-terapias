import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, CheckCircle } from "lucide-react";
import { z } from "zod";

const emailSchema = z.string().trim().email("Email inválido").max(255);

const Auth = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "sent">("email");
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      navigate("/depoimentos");
    }
  }, [user, authLoading, navigate]);

  const handleSendLink = async () => {
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast({ title: "Email inválido", description: result.error.errors[0].message, variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: result.data,
      options: {
        emailRedirectTo: `${window.location.origin}/depoimentos`,
      },
    });
    setLoading(false);

    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      setStep("sent");
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-display text-2xl">
            {step === "email" ? "Entrar para deixar seu depoimento" : "Verifique seu email"}
          </CardTitle>
          <CardDescription>
            {step === "email"
              ? "Informe seu email para receber um link de acesso"
              : `Enviamos um link de acesso para ${email}. Clique no botão no email para entrar.`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === "email" ? (
            <>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  onKeyDown={(e) => e.key === "Enter" && handleSendLink()}
                />
              </div>
              <Button onClick={handleSendLink} disabled={loading} className="w-full gap-2">
                {loading ? "Enviando..." : "Enviar link de acesso"}
                <Mail className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <div className="text-center space-y-4">
              <CheckCircle className="h-12 w-12 text-primary mx-auto" />
              <p className="text-sm text-muted-foreground">
                Após clicar no link, você será redirecionado automaticamente.
              </p>
              <Button variant="ghost" onClick={() => setStep("email")} className="w-full">
                Usar outro email
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
