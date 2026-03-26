'use client';

import { Booking } from '@/types/booking';
import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

interface Props {
  bookings: Booking[];
}
function TopDestinationsChart({ bookings }: Props) {
  const destinationData = useMemo(() => {
    const destinationMap: Record<string, number> = {};
    bookings.forEach((booking) => {
      const destination = booking.destination;
      destinationMap[destination] = (destinationMap[destination] || 0) + 1;
    });

    return Object.entries(destinationMap)
      .map(([destination, count]) => ({
        destination,
        bookings: count
      }))
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, 5);
  }, [bookings]);

  return (
    <div className='flex h-64 w-full items-center justify-center'>
      <ResponsiveContainer width='50%' height='100%'>
        <BarChart data={destinationData}>
          <CartesianGrid strokeDasharray='3 3' />

          <XAxis dataKey='destination' />

          <YAxis />

          <Tooltip />

          <Bar dataKey='bookings' fill='#2563eb' radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default TopDestinationsChart;
