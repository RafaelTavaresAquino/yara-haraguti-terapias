import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase credentials not configured");
    }

    const payload = await req.json();
    const { record } = payload;

    if (!record) {
      throw new Error("No record provided");
    }

    const testimonialName = record.name || "Anônimo";
    const testimonialContent = record.content || "";
    const testimonialRating = record.rating || 0;

    // Fetch admin emails from user_roles
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: adminRoles, error: rolesError } = await supabase
      .from("user_roles")
      .select("user_id")
      .eq("role", "admin");

    if (rolesError) {
      throw new Error(`Error fetching admin roles: ${rolesError.message}`);
    }

    if (!adminRoles || adminRoles.length === 0) {
      console.log("No admin users found, skipping notification");
      return new Response(JSON.stringify({ success: true, message: "No admins to notify" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get admin emails from auth.users
    const adminEmails: string[] = [];
    for (const role of adminRoles) {
      const { data: userData, error: userError } = await supabase.auth.admin.getUserById(role.user_id);
      if (!userError && userData?.user?.email) {
        adminEmails.push(userData.user.email);
      }
    }

    if (adminEmails.length === 0) {
      console.log("No admin emails found");
      return new Response(JSON.stringify({ success: true, message: "No admin emails found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Generate star rating display
    const stars = "★".repeat(testimonialRating) + "☆".repeat(5 - testimonialRating);

    const htmlContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
</head>
<body style="margin:0;padding:0;background-color:#faf7f5;font-family:'Georgia','Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf7f5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #d4a574 0%, #c4956a 100%);padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:normal;letter-spacing:1px;">
                ✨ Yara Haraguti Terapias
              </h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h2 style="margin:0 0 8px 0;color:#5a4a3a;font-size:20px;font-weight:normal;">
                Novo depoimento aguardando aprovação
              </h2>
              <p style="margin:0 0 24px 0;color:#8a7a6a;font-size:14px;">
                Um novo depoimento foi enviado e precisa da sua análise.
              </p>
              
              <!-- Testimonial Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf7f5;border-radius:8px;border-left:4px solid #d4a574;">
                <tr>
                  <td style="padding:24px;">
                    <p style="margin:0 0 4px 0;color:#5a4a3a;font-size:16px;font-weight:bold;">
                      ${testimonialName}
                    </p>
                    <p style="margin:0 0 12px 0;color:#d4a574;font-size:18px;letter-spacing:2px;">
                      ${stars}
                    </p>
                    <p style="margin:0;color:#6a5a4a;font-size:15px;line-height:1.6;font-style:italic;">
                      "${testimonialContent.length > 300 ? testimonialContent.substring(0, 300) + "..." : testimonialContent}"
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                <tr>
                  <td align="center">
                    <p style="margin:0 0 16px 0;color:#8a7a6a;font-size:14px;">
                      Acesse o painel administrativo para aprovar ou rejeitar este depoimento.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color:#f5f0eb;padding:24px 40px;text-align:center;border-top:1px solid #ebe5de;">
              <p style="margin:0;color:#a09080;font-size:12px;">
                Este é um e-mail automático do sistema de depoimentos.<br/>
                Yara Haraguti — Terapias Holísticas & Psicanálise Energética
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    // Send email via Resend - individually to handle sandbox limitations
    const results = [];
    for (const email of adminEmails) {
      try {
        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Yara Haraguti Terapias <onboarding@resend.dev>",
            to: [email],
            subject: `✨ Novo depoimento de ${testimonialName} aguardando aprovação`,
            html: htmlContent,
          }),
        });

        const resendData = await resendResponse.json();
        if (resendResponse.ok) {
          console.log(`Email sent to ${email}:`, resendData);
          results.push({ email, success: true, id: resendData.id });
        } else {
          console.warn(`Failed to send to ${email}:`, resendData);
          results.push({ email, success: false, error: resendData.message });
        }
      } catch (err) {
        console.warn(`Error sending to ${email}:`, err);
        results.push({ email, success: false, error: String(err) });
      }
    }

    const anySuccess = results.some(r => r.success);
    console.log("Notification results:", results);

    return new Response(JSON.stringify({ success: anySuccess, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error sending admin notification:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
