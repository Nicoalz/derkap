import { serve } from 'https://deno.land/std/http/server.ts';

serve(async (req) => {
  try {
    const { title, message } = await req.json();
  const APIKEY = Deno.env.get("apiKey") ;

    if (!title || !message) {
      return new Response(JSON.stringify({ error: 'Invalid request payload' }), { status: 400 });
    }

    // Appeler l'API interne avec l'autorisation intégrée
    const response = await fetch('https://derkap.vercel.app/api/notification/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${APIKEY}`  // Insère le token directement ici
      },
      body: JSON.stringify({ title, message }),
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Error sending notification:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});
