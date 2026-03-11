import { customerMockData } from '@/mock/customerMockData';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(customerMockData);
}
