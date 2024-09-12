import { serve } from 'https://deno.land/std/http/server.ts';

serve(async (req) => {
  try {
    const contentType = req.headers.get('content-type');
    if (contentType !== 'application/json') {
      return new Response(JSON.stringify({ error: 'Invalid content type' }), { status: 400 });
    }

    const request = await req.json();
    const { record } = request;

    console.log('Request:', request);

    if (!record || !record.accept_user) {
      return new Response(JSON.stringify({ error: 'Missing user information' }), { status: 400 });
    }

    const userId = record.accept_user;
    console.log('UserId:', userId);

    // if (!title || !message) {
    //   return new Response(JSON.stringify({ error: 'Title or message missing' }), { status: 400 });
    // }

    const APIKEY = Deno.env.get("APIKEY");


    if (!APIKEY) {
      return new Response(JSON.stringify({ error: 'Missing API key' }), { status: 500 });
    }

    const response = await fetch('https://derkap.vercel.app/api/notification/send-to-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${APIKEY}`
      },
      body: JSON.stringify({ title: "Vous avez une nouvelle demande d'amis", message: "Venez découvrir qui veut devenir votre poto", userId }),
    });

    const data = await response.json();

    if (response.status !== 200) {
      console.error('Failed to send notification:', data.error);
      return new Response(JSON.stringify({ error: data.error }), { status: response.status });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});
