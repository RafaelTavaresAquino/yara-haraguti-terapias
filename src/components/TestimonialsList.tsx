import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Star, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  photo_url: string | null;
  created_at: string;
}

const TestimonialSkeleton = () => (
  <Card className="border-border/50">
    <CardContent className="p-6">
      <div className="flex items-center gap-3 mb-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4" />
    </CardContent>
  </Card>
);

const TestimonialsList = () => {
  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["approved-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_approved_testimonials");
      if (error) throw error;
      return (data as Testimonial[]) || [];
    },
    staleTime: 5 * 60 * 1000, // 5 min cache
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <TestimonialSkeleton />
        <TestimonialSkeleton />
      </div>
    );
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
