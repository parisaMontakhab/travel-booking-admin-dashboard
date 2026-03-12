'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const data = [
  { destination: 'Paris', bookings: 5 },
  { destination: 'Rome', bookings: 3 },
  { destination: 'Barcelona', bookings: 2 },
  { destination: 'Amsterdam', bookings: 1 }
];

function TopDestinationsChart() {
  return (
    <div className='h-64 w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={data}>
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
