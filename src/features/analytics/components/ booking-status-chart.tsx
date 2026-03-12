'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Confirmed', value: 6 },
  { name: 'Pending', value: 3 },
  { name: 'Cancelled', value: 1 }
];

const COLORS = ['#22c55e', '#eab308', '#ef4444'];

function BookingStatusChart() {
  return (
    <div className='h-64 w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart>
          <Pie
            data={data}
            dataKey='value'
            nameKey='name'
            cx='50%'
            cy='50%'
            outerRadius={90}
            label
          >
            {data.map((_, index) => (
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
