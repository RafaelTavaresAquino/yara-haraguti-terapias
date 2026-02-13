import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Star, Upload, Send, LogIn, Mail } from "lucide-react";
import { z } from "zod";
import TestimonialsList from "@/components/TestimonialsList";

const testimonialSchema = z.object({
  name: z.string().trim().min(2, "Nome muito curto").max(100),
  content: z.string().trim().min(10, "Depoimento muito curto").max(1000),
  rating: z.number().min(0).max(5),
});

const Depoimentos = () => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [magicEmail, setMagicEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [sendingMagicLink, setSendingMagicLink] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const handleSendMagicLink = async () => {
    const emailResult = z.string().trim().email("E-mail inválido").safeParse(magicEmail);
    if (!emailResult.success) {
      toast({ title: "Erro", description: "Informe um e-mail válido", variant: "destructive" });
      return;
    }

    setSendingMagicLink(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: emailResult.data,
      options: {
        emailRedirectTo: `${window.location.origin}/depoimentos`,
      },
    });
    setSendingMagicLink(false);

    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      setMagicLinkSent(true);
      toast({ title: "E-mail enviado!", description: "Verifique sua caixa de entrada para acessar." });
    }
  };

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

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-8">Depoimentos</h1>

      {/* Approved testimonials - visible to everyone */}
      <div className="mb-12">
        <TestimonialsList />
      </div>

      {/* Form section - only for logged in users */}
      {authLoading ? null : user ? (
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-xl">Deixe seu Depoimento</CardTitle>
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
      ) : (
        <Card className="text-center py-8">
          <CardContent className="space-y-4">
            {magicLinkSent ? (
              <>
                <Mail className="h-10 w-10 mx-auto text-accent" />
                <p className="text-foreground font-medium">E-mail enviado!</p>
                <p className="text-muted-foreground text-sm">
                  Verifique sua caixa de entrada e clique no link para acessar e deixar seu depoimento.
                </p>
              </>
            ) : showEmailInput ? (
              <>
                <p className="text-muted-foreground mb-2">Informe seu e-mail para receber o link de acesso:</p>
                <div className="flex gap-2 max-w-sm mx-auto">
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={magicEmail}
                    onChange={(e) => setMagicEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMagicLink()}
                  />
                  <Button onClick={handleSendMagicLink} disabled={sendingMagicLink}>
                    {sendingMagicLink ? "Enviando..." : "Enviar"}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className="text-muted-foreground mb-4">Compartilhe sua experiência conosco!</p>
                <Button className="gap-2" onClick={() => setShowEmailInput(true)}>
                  <LogIn className="h-4 w-4" /> Clique aqui para deixar seu depoimento
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Depoimentos;
