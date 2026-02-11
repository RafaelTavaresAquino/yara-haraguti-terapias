import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Star, Upload, LogOut, Send } from "lucide-react";
import { z } from "zod";
import TestimonialsList from "@/components/TestimonialsList";

const testimonialSchema = z.object({
  name: z.string().trim().min(2, "Nome muito curto").max(100),
  content: z.string().trim().min(10, "Depoimento muito curto").max(1000),
  rating: z.number().min(0).max(5),
});

const Depoimentos = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({ title: "Arquivo muito grande", description: "Máximo 2MB", variant: "destructive" });
        return;
      }
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    const result = testimonialSchema.safeParse({ name, content, rating });
    if (!result.success) {
      toast({ title: "Erro", description: result.error.errors[0].message, variant: "destructive" });
      return;
    }

    if (!user) return;

    setSubmitting(true);
    let photoUrl: string | null = null;

    if (photo) {
      const ext = photo.name.split(".").pop();
      const filePath = `${user.id}/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("testimonial-photos")
        .upload(filePath, photo);

      if (uploadError) {
        toast({ title: "Erro no upload", description: uploadError.message, variant: "destructive" });
        setSubmitting(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("testimonial-photos")
        .getPublicUrl(filePath);
      photoUrl = urlData.publicUrl;
    }

    const { error } = await supabase.from("testimonials").insert({
      user_id: user.id,
      name: result.data.name,
      email: user.email || "",
      content: result.data.content,
      rating: result.data.rating,
      photo_url: photoUrl,
    });

    setSubmitting(false);

    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Depoimento enviado!", description: "Aguarde a aprovação para aparecer no site." });
      setName("");
      setContent("");
      setRating(5);
      setPhoto(null);
      setPhotoPreview(null);
    }
  };

  if (authLoading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><p className="text-muted-foreground">Carregando...</p></div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-semibold">Deixe seu Depoimento</h1>
        <Button variant="ghost" onClick={signOut} className="gap-2">
          <LogOut className="h-4 w-4" /> Sair
        </Button>
      </div>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="font-display text-xl">Novo Depoimento</CardTitle>
          <CardDescription>Compartilhe sua experiência. Seu depoimento será publicado após aprovação.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
          />

          <Textarea
            placeholder="Conte sobre sua experiência..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={1000}
            rows={4}
          />

          {/* Rating */}
          <div>
            <label className="text-sm font-medium mb-2 block">Avaliação</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="transition-colors"
                >
                  <Star
                    className={`h-6 w-6 ${star <= rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Photo upload */}
          <div>
            <label className="text-sm font-medium mb-2 block">Foto (opcional)</label>
            <div className="flex items-center gap-4">
              {photoPreview && (
                <img src={photoPreview} alt="Preview" className="w-16 h-16 rounded-full object-cover border-2 border-border" />
              )}
              <label className="cursor-pointer">
                <div className="flex items-center gap-2 px-4 py-2 rounded-md border border-input bg-background hover:bg-secondary/50 transition-colors text-sm">
                  <Upload className="h-4 w-4" />
                  {photo ? "Trocar foto" : "Enviar foto"}
                </div>
                <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
              </label>
            </div>
          </div>

          <Button onClick={handleSubmit} disabled={submitting} className="w-full gap-2">
            {submitting ? "Enviando..." : "Enviar Depoimento"}
            <Send className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Approved testimonials */}
      <div>
        <h2 className="font-display text-2xl font-semibold mb-6">Depoimentos Aprovados</h2>
        <TestimonialsList />
      </div>
    </div>
  );
};

export default Depoimentos;
