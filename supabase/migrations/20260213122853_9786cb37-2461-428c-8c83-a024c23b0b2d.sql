
-- Fix the security definer view warning by setting security_invoker = true
ALTER VIEW public.approved_testimonials_public SET (security_invoker = true);
