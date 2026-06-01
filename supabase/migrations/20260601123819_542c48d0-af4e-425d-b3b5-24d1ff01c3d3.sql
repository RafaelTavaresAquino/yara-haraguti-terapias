-- 1. Explicit deny for non-admin writes on user_roles (defense in depth)
CREATE POLICY "Only admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 2. Realtime channel authorization - restrict to admins only
-- (testimonials realtime should only be consumed by admins for moderation)
ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can receive realtime messages"
ON realtime.messages
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 3. Storage: DELETE policy for testimonial-photos
CREATE POLICY "Users can delete their own testimonial photos"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'testimonial-photos'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Admins can delete any testimonial photo"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'testimonial-photos'
  AND public.has_role(auth.uid(), 'admin')
);