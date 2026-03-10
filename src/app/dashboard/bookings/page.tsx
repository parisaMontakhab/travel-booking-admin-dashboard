type Booking = {
  id: number;
  customer: string;
  destination: string;
  date: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  price: number;
};

const bookings: Booking[] = [
  {
    id: 1,
    customer: 'Olivia Martin',
    destination: 'Paris',
    date: '2026-05-12',
    status: 'Confirmed',
    price: 1200
  },
  {
    id: 2,
    customer: 'Jackson Lee',
    destination: 'Rome',
    date: '2026-05-15',
    status: 'Pending',
    price: 980
  },
  {
    id: 3,
    customer: 'Isabella Nguyen',
    destination: 'Barcelona',
    date: '2026-05-18',
    status: 'Cancelled',
    price: 760
  },
  {
    id: 4,
    customer: 'William Kim',
    destination: 'Amsterdam',
    date: '2026-05-20',
    status: 'Confirmed',
    price: 1430
  },
  {
    id: 5,
    customer: 'Sofia Davis',
    destination: 'Vienna',
    date: '2026-05-24',
    status: 'Pending',
    price: 890
  }
];

const getStatusClasses = (status: Booking['status']) => {
  switch (status) {
    case 'Confirmed':
      return 'bg-green-100 text-green-700';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-700';
    case 'Cancelled':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function BookingsPage() {
  return (
    <div className='space-y-6 p-6'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>Bookings</h1>
        <p className='text-muted-foreground'>
          Manage and track all travel bookings.
        </p>
      </div>

      <div className='bg-background overflow-hidden rounded-xl border'>
        <table className='w-full text-sm'>
          <thead className='bg-muted/50'>
            <tr className='text-left'>
              <th className='px-4 py-3 font-medium'>Customer</th>
              <th className='px-4 py-3 font-medium'>Destination</th>
              <th className='px-4 py-3 font-medium'>Date</th>
              <th className='px-4 py-3 font-medium'>Status</th>
              <th className='px-4 py-3 font-medium'>Price</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className='border-t'>
                <td className='px-4 py-3 font-medium'>{booking.customer}</td>
                <td className='px-4 py-3'>{booking.destination}</td>
                <td className='px-4 py-3'>{booking.date}</td>
                <td className='px-4 py-3'>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className='px-4 py-3'>${booking.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
