'use client';

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const data = [
  { month: 'Jan', revenue: 1200 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 1500 },
  { month: 'Apr', revenue: 2200 },
  { month: 'May', revenue: 2600 },
  { month: 'Jun', revenue: 2100 }
];

function RevenueChart() {
  return (
    <div className='h-64 w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart data={data}>
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
