import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;
    
    // Get IP address
    const ip = req.headers.get('x-forwarded-for') || 'unknown';

    // Mock storage - In a real app, save to database here
    console.log('Received message:', message);
    console.log('From IP:', ip);

    // Provide a simple mock response
    return NextResponse.json({ success: true, message: 'Message received' });
  } catch (error) {
    console.error('Error processing chat:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
