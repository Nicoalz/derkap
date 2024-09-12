import { serve } from 'https://deno.land/std/http/server.ts';

serve(async (req) => {
  try {
const request = await req.json();
const { title, message } = request;

console.log('request', request)

const userId = request.record.accept_user

console.log('userId', userId)
console.log('title', title)
console.log('message', message)

const APIKEY = Deno.env.get("apiKey") ;


    if (!title || !message) {
      return new Response(JSON.stringify({ error: 'Invalid request payload' }), { status: 400 });
    }

    // Appeler l'API interne avec l'autorisation intégrée
    const response = await fetch('https://derkap.vercel.app/api/notification/send-to-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${APIKEY}`  // Insère le token directement ici
      },
      body: JSON.stringify({ title, message, userId }),
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Error sending notification to user:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});
