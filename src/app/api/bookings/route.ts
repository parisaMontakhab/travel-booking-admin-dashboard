import { bookingMockData } from '@/mock/bookingMockData';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(bookingMockData);
}

export async function POST(request: Request) {
  const body = await request.json();

  const newBooking = {
    id: Date.now(),
    ...body
  };

  bookingMockData.push(newBooking);

  return NextResponse.json(newBooking);
}
