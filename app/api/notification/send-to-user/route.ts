import { InvalidRequestPayloadError } from '@/libs/errors';
import { sendCustomNotificationToUser } from '@/services/notification.services';
import { NextResponse } from 'next/server';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    // Read the raw body as text for logging
    const rawBody = await req.text();

    if (!rawBody) throw InvalidRequestPayloadError;

    // Parse the raw body manually
    const { userId, title, message } = JSON.parse(rawBody);

    // Validate the presence of required fields
    if (!title || !message) throw InvalidRequestPayloadError;

    // Send the custom notification
    await sendCustomNotificationToUser({ userId, title, message });

    // Return a success response
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({
      error: (error instanceof Error) ? error.message : 'An unknown error occurred',
    });
  }
}
