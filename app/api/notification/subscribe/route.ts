

import { saveSubscription } from '@/services/notification.services';
import { NextResponse } from 'next/server';

export async function POST(req:Request): Promise<NextResponse> {
  try {

    const { subscription } = await req.json();

    // // const id = req.headers['uid'] as UUID;

    // // if (!id) throw InvalidRequestPayloadError;

    await saveSubscription({ subscription });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(error);


   return  NextResponse.json({
      error: error.message,
    });
  }
}
