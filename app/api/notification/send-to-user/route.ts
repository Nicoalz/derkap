import { InvalidRequestPayloadError } from '@/libs/errors';
import { sendCustomNotificationToUser } from '@/services/notification.services';
import { NextResponse } from 'next/server';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    // Read the raw body as text for logging
    const rawBody = await req.text();
    console.log('Raw Body:', rawBody);

    if (!rawBody) throw InvalidRequestPayloadError;

    // Parse the raw body manually
    const { userId, title, message } = JSON.parse(rawBody);
    console.log('Parsed Body:', { userId, title, message });

    // Validate the presence of required fields
    if (!title || !message) throw InvalidRequestPayloadError;

    // Send the custom notification
    await sendCustomNotificationToUser({ userId, title, message });

    // Return a success response
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error:', error);

    // Return an error response with the error message
    return NextResponse.json({
      error: error.message || 'Unknown error',
    });
  }
}
