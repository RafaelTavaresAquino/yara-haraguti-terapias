-- Remove the policy that exposes email addresses to all authenticated users
-- The app uses get_approved_testimonials() security definer function which excludes email
DROP POLICY IF EXISTS "Authenticated users can view approved testimonials" ON public.testimonials;