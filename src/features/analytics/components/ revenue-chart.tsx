'use client';

import { Booking } from '@/types/booking';
import { useMemo } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

interface Props {
  bookings: Booking[];
}

function RevenueChart({ bookings }: Props) {
  const revenueData = useMemo(() => {
    const monthMap: Record<string, number> = {};

    bookings.forEach((booking) => {
      const date = new Date(booking.date);

      const month = date.toLocaleString('en-US', {
        month: 'short'
      });

      monthMap[month] = (monthMap[month] || 0) + booking.price;
    });

    return Object.entries(monthMap).map(([month, revenue]) => ({
      month,
      revenue
    }));
  }, [bookings]);

  return (
    <div className='h-64 w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart data={revenueData}>
          <CartesianGrid strokeDasharray='3 3' />

          <XAxis dataKey='month' />

          <YAxis />

          <Tooltip />

          <Line
            type='monotone'
            dataKey='revenue'
            stroke='#2563eb'
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
export default RevenueChart;
