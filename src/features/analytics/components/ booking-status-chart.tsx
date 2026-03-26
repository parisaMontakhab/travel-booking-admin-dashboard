'use client';

import { Booking } from '@/types/booking';
import { useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#16a34a', '#f59e0b', '#dc2626'];

interface Props {
  bookings: Booking[];
}

function BookingStatusChart({ bookings }: Props) {
  const statusData = useMemo(() => {
    const confirmedCount = bookings?.filter(
      (booking) => booking.status === 'Confirmed'
    ).length;

    const pendingCount = bookings?.filter(
      (booking) => booking.status === 'Pending'
    ).length;

    const cancelledCount = bookings?.filter(
      (booking) => booking.status === 'Cancelled'
    ).length;

    return [
      { name: 'Confirmed', value: confirmedCount },
      { name: 'Pending', value: pendingCount },
      { name: 'Cancelled', value: cancelledCount }
    ];
  }, [bookings]);

  return (
    <div className='h-64 w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart>
          <Pie
            data={statusData}
            dataKey='value'
            nameKey='name'
            cx='50%'
            cy='50%'
            outerRadius={90}
            label
          >
            {statusData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
export default BookingStatusChart;
