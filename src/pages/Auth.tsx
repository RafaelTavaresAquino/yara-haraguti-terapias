import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, KeyRound, ArrowLeft } from "lucide-react";
import { z } from "zod";

const emailSchema = z.string().trim().email("Email inválido").max(255);

const Auth = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast({ title: "Email inválido", description: result.error.errors[0].message, variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email: result.data });
    setLoading(false);

    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      setStep("otp");
      toast({ title: "Código enviado!", description: "Verifique seu email para o código de verificação." });
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim() || otp.length < 6) {
      toast({ title: "Código inválido", description: "Insira o código de 6 dígitos.", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({ email, token: otp, type: "email" });
    setLoading(false);

    if (error) {
      toast({ title: "Código inválido", description: "Verifique o código e tente novamente.", variant: "destructive" });
    } else {
      toast({ title: "Login realizado!" });
      navigate("/depoimentos");
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-display text-2xl">
            {step === "email" ? "Entrar para deixar seu depoimento" : "Verificar código"}
          </CardTitle>
          <CardDescription>
            {step === "email"
              ? "Informe seu email para receber um código de verificação"
              : `Enviamos um código para ${email}`}
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
                  onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                />
              </div>
              <Button onClick={handleSendOtp} disabled={loading} className="w-full gap-2">
                {loading ? "Enviando..." : "Enviar código"}
                <Mail className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="pl-10 text-center text-lg tracking-widest"
                  maxLength={6}
                  onKeyDown={(e) => e.key === "Enter" && handleVerifyOtp()}
                />
              </div>
              <Button onClick={handleVerifyOtp} disabled={loading} className="w-full gap-2">
                {loading ? "Verificando..." : "Verificar código"}
                <KeyRound className="h-4 w-4" />
              </Button>
              <Button variant="ghost" onClick={() => setStep("email")} className="w-full gap-2">
                <ArrowLeft className="h-4 w-4" /> Voltar
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
