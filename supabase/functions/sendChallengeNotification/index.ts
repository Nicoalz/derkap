import { serve } from 'https://deno.land/std/http/server.ts';

serve(async (req) => {
  try {
    // Vérifier si la requête est bien une requête POST
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
    }

    // Extraire les données de la requête
    const { title, message } = await req.json();

    if (!title || !message) {
      return new Response(JSON.stringify({ error: 'Missing title or message' }), { status: 400 });
    }

    // Appeler l'API de notification avec la clé service_role
    const apiResponse = await fetch('https://derkap.vercel.app/api/notification/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_SERVICE_ROLE_KEY',  // Remplace par ta clé service_role
      },
      body: JSON.stringify({ title, message }),
    });

    // Vérifier si l'API de notification a renvoyé une erreur
    if (!apiResponse.ok) {
      throw new Error(`Failed to send notification: ${apiResponse.statusText}`);
    }

    const data = await apiResponse.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    console.error('Error sending notification:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});
