import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, LogIn, UserPlus } from "lucide-react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().trim().email("Email inválido").max(255),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres").max(128),
});

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading, isAdmin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && user) {
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/depoimentos");
      }
    }
  }, [user, authLoading, isAdmin, navigate]);

  const handleSubmit = async () => {
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      toast({ title: "Erro", description: result.error.errors[0].message, variant: "destructive" });
      return;
    }

    setLoading(true);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email: result.data.email,
        password: result.data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/depoimentos`,
        },
      });
      setLoading(false);
      if (error) {
        toast({ title: "Erro", description: error.message, variant: "destructive" });
      } else {
        toast({
          title: "Conta criada!",
          description: "Verifique seu email para confirmar o cadastro antes de fazer login.",
        });
        setIsSignUp(false);
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: result.data.email,
        password: result.data.password,
      });
      setLoading(false);
      if (error) {
        toast({ title: "Erro ao entrar", description: error.message, variant: "destructive" });
      } else if (data.user) {
        // Check admin role and redirect
        const { data: roles } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", data.user.id)
          .eq("role", "admin");
        if (roles && roles.length > 0) {
          navigate("/admin");
        } else {
          navigate("/depoimentos");
        }
      }
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-display text-2xl">
            {isSignUp ? "Criar conta" : "Login"}
          </CardTitle>
          <CardDescription>
            {isSignUp
              ? "Preencha seus dados para criar uma conta"
              : "Entre com seu email e senha"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>
          <Button onClick={handleSubmit} disabled={loading} className="w-full gap-2">
            {loading
              ? "Aguarde..."
              : isSignUp
                ? <><UserPlus className="h-4 w-4" /> Criar conta</>
                : <><LogIn className="h-4 w-4" /> Entrar</>
            }
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
