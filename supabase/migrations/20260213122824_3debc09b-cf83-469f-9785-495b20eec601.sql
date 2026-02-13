
-- Remove the public policy that exposes all columns including email
DROP POLICY IF EXISTS "Anyone can view approved testimonials" ON public.testimonials;

-- Create a secure view that excludes sensitive data
CREATE OR REPLACE VIEW public.approved_testimonials_public AS
SELECT id, name, content, rating, photo_url, created_at
FROM public.testimonials
WHERE status = 'approved';

-- Grant access to the view for anon and authenticated roles
GRANT SELECT ON public.approved_testimonials_public TO anon, authenticated;

-- Re-add a policy that only allows approved testimonials to be read by authenticated users (not anon)
-- The public access will go through the RPC function or view instead
CREATE POLICY "Authenticated users can view approved testimonials"
ON public.testimonials
FOR SELECT
USING (status = 'approved'::text AND auth.uid() IS NOT NULL);
