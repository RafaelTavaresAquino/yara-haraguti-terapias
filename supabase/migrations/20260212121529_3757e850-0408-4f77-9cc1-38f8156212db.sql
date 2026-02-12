
-- Fix 1: Profiles - restrict SELECT to own profile only
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

-- Fix 2: Testimonials - create RPC that returns approved testimonials WITHOUT email
CREATE OR REPLACE FUNCTION public.get_approved_testimonials()
RETURNS TABLE (
  id uuid,
  name text,
  content text,
  rating integer,
  photo_url text,
  created_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id, name, content, rating, photo_url, created_at
  FROM public.testimonials
  WHERE status = 'approved'
  ORDER BY created_at DESC;
$$;
