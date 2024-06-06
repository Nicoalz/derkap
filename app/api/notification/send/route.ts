import { InvalidRequestPayloadError } from '@/libs/errors';
import { sendCustomNotificationToAll } from '@/services/notification.services';
import { NextResponse } from 'next/server';
export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { title, message } = await req.json();

    if (!title || !message) throw InvalidRequestPayloadError;

    await sendCustomNotificationToAll({ title, message });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json({
      error: error.message,
    });
  }
}
