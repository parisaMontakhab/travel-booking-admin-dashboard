import { getBookings } from '@/services/bookings';
import { Booking } from '@/types/booking';

const getStatusClasses = (status: Booking['status']) => {
  switch (status) {
    case 'Confirmed':
      return 'bg-green-100 text-green-700';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-700 px-4';
    case 'Cancelled':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default async function BookingsPage() {
  const bookings: Booking[] = await getBookings();

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
