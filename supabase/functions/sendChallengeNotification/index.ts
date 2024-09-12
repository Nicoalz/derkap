import { serve } from 'https://deno.land/std/http/server.ts';

serve(async (req) => {
  try {
    const { title, message } = await req.json();

    if (!title || !message) {
      return new Response(JSON.stringify({ error: 'Invalid request payload' }), { status: 400 });
    }

    // Appeler l'API interne avec l'autorisation intégrée
    const response = await fetch('https://derkap.vercel.app/api/notification/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhya3R4cXBzcWJqbm9ja2dnbmljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3NDgzMTksImV4cCI6MjAzMzMyNDMxOX0.vnNh1kwokAi43XuAArlkyhlAFxDuKVzYkPKOvnOoRp4'  // Insère le token directement ici
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
