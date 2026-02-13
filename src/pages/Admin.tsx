import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Star, Check, X, User, LogOut, Clock, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Testimonial {
  id: string;
  name: string;
  email: string;
  content: string;
  rating: number;
  photo_url: string | null;
  status: string;
  created_at: string;
}

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-800" },
  approved: { label: "Aprovado", color: "bg-green-100 text-green-800" },
  rejected: { label: "Rejeitado", color: "bg-red-100 text-red-800" },
};

const Admin = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("pending");
  const [confirmAction, setConfirmAction] = useState<{ id: string; action: "approved" | "rejected" | "delete" } | null>(null);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (!isAdmin) return;
    fetchTestimonials();
  }, [isAdmin, filter]);

  const fetchTestimonials = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .eq("status", filter)
      .order("created_at", { ascending: false });

    setTestimonials((data as Testimonial[]) || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    const { error } = await supabase
      .from("testimonials")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: status === "approved" ? "Depoimento aprovado!" : "Depoimento rejeitado" });
      fetchTestimonials();
    }
  };

  const deleteTestimonial = async (id: string) => {
    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", id);

    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Depoimento apagado!" });
      fetchTestimonials();
    }
  };

  const actionLabels: Record<string, string> = {
    approved: "Aprovar",
    rejected: "Rejeitar",
    delete: "Apagar",
  };

  const handleConfirm = async () => {
    if (!confirmAction) return;
    if (confirmAction.action === "delete") {
      await deleteTestimonial(confirmAction.id);
    } else {
      await updateStatus(confirmAction.id, confirmAction.action);
    }
    setConfirmAction(null);
  };

  if (authLoading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><p className="text-muted-foreground">Carregando...</p></div>;
  }

  if (!isAdmin) return null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-semibold">Painel Admin</h1>
        <Button variant="ghost" onClick={signOut} className="gap-2">
          <LogOut className="h-4 w-4" /> Sair
        </Button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {(["pending", "approved", "rejected"] as const).map((s) => (
          <Button
            key={s}
            variant={filter === s ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(s)}
          >
            {statusLabels[s].label}
          </Button>
        ))}
      </div>

      {loading ? (
        <p className="text-muted-foreground text-center py-12">Carregando...</p>
      ) : testimonials.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">Nenhum depoimento {statusLabels[filter].label.toLowerCase()}.</p>
      ) : (
        <div className="space-y-4">
          {testimonials.map((t) => (
            <Card key={t.id} className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {t.photo_url ? (
                      <img src={t.photo_url} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                        <User className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.email}</p>
                      <div className="flex gap-0.5 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3 w-3 ${star <= t.rating ? "fill-accent text-accent" : "text-muted-foreground/20"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn("text-xs px-2 py-1 rounded-full font-medium", statusLabels[t.status]?.color)}>
                      {statusLabels[t.status]?.label}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(t.created_at).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">{t.content}</p>

                {filter === "pending" && (
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" onClick={() => setConfirmAction({ id: t.id, action: "approved" })} className="gap-1">
                      <Check className="h-4 w-4" /> Aprovar
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setConfirmAction({ id: t.id, action: "rejected" })} className="gap-1">
                      <X className="h-4 w-4" /> Rejeitar
                    </Button>
                  </div>
                )}
                <div className="flex gap-2 mt-4">
                  {filter !== "pending" && filter === "rejected" && (
                    <Button size="sm" variant="outline" onClick={() => setConfirmAction({ id: t.id, action: "approved" })} className="gap-1">
                      <Check className="h-4 w-4" /> Aprovar
                    </Button>
                  )}
                  <Button size="sm" variant="destructive" onClick={() => setConfirmAction({ id: t.id, action: "delete" })} className="gap-1">
                    <Trash2 className="h-4 w-4" /> Apagar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!confirmAction} onOpenChange={(open) => !open && setConfirmAction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmação</AlertDialogTitle>
            <AlertDialogDescription>
              Você deseja {confirmAction ? actionLabels[confirmAction.action] : ""} o Depoimento?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;
