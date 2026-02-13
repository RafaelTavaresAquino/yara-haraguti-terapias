
-- Create a database webhook trigger that calls the edge function when a new testimonial is inserted
-- We use pg_net to make HTTP calls from the database

-- Enable the pg_net extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Create a function that sends an HTTP request to the edge function
CREATE OR REPLACE FUNCTION public.notify_admin_new_testimonial()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  _supabase_url text;
  _service_role_key text;
  _payload jsonb;
BEGIN
  -- Get the Supabase URL and service role key from vault or use hardcoded project URL
  _supabase_url := 'https://mrshnripdvtgaautfibp.supabase.co';
  _service_role_key := current_setting('app.settings.service_role_key', true);
  
  _payload := jsonb_build_object(
    'record', jsonb_build_object(
      'id', NEW.id,
      'name', NEW.name,
      'content', NEW.content,
      'rating', NEW.rating,
      'email', NEW.email,
      'created_at', NEW.created_at
    )
  );

  -- Use pg_net to make async HTTP call to the edge function
  PERFORM net.http_post(
    url := _supabase_url || '/functions/v1/notify-admin-testimonial',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || _service_role_key
    ),
    body := _payload
  );

  RETURN NEW;
END;
$$;

-- Create the trigger on testimonials table
CREATE TRIGGER on_new_testimonial_notify_admin
  AFTER INSERT ON public.testimonials
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_admin_new_testimonial();
