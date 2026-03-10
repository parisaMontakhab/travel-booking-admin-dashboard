import { bookingMockData } from '@/mock/bookingMockData';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(bookingMockData);
}
