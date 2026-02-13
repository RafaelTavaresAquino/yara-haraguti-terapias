import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Star, User } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  photo_url: string | null;
  created_at: string;
}

const TestimonialsList = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data } = await supabase.rpc("get_approved_testimonials");
      setTestimonials((data as Testimonial[]) || []);
      setLoading(false);
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return <p className="text-muted-foreground text-center py-8">Carregando depoimentos...</p>;
  }

  if (testimonials.length === 0) {
    return <p className="text-muted-foreground text-center py-8">Nenhum depoimento realizado ainda.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {testimonials.map((t) => (
        <Card key={t.id} className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              {t.photo_url ? (
                <img src={t.photo_url} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
              <div>
                <p className="font-medium text-sm">{t.name}</p>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3 w-3 ${star <= t.rating ? "fill-accent text-accent" : "text-muted-foreground/20"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TestimonialsList;
