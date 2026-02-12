-- Allow admins to delete testimonials
CREATE POLICY "Admins can delete testimonials"
  ON public.testimonials FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));
