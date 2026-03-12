import { bookingMockData } from '@/mock/bookingMockData';
import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const booking = bookingMockData.find((b) => b.id === Number(id));

  if (!booking) {
    return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
  }

  return NextResponse.json(booking);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const bookingIndex = bookingMockData.findIndex((b) => b.id === Number(id));

  if (bookingIndex === -1) {
    return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
  }

  bookingMockData[bookingIndex] = {
    ...bookingMockData[bookingIndex],
    ...body,
    id: bookingMockData[bookingIndex].id
  };

  return NextResponse.json(bookingMockData[bookingIndex]);
}
