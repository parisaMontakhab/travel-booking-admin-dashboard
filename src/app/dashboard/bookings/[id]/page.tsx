import { getBookings } from '@/services/bookings';
import { Booking } from '@/types/booking';
import Link from 'next/link';

export default async function BookingDetailsPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const bookings: Booking[] = await getBookings();

  const booking = bookings.find((b) => b.id === Number(id));

  if (!booking) {
    return <div className='p-6'>Booking not found</div>;
  }

  return (
    <div className='space-y-6 p-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Booking #{booking.id}</h1>

        <Link
          href={`/dashboard/bookings/${booking.id}/edit`}
          className='rounded-lg bg-black px-4 py-2 text-white'
        >
          Edit Booking
        </Link>
      </div>

      <div className='space-y-4 rounded-xl border p-6'>
        <div>
          <p className='text-muted-foreground text-sm'>Customer</p>
          <p className='font-medium'>{booking.customer}</p>
        </div>

        <div>
          <p className='text-muted-foreground text-sm'>Destination</p>
          <p className='font-medium'>{booking.destination}</p>
        </div>

        <div>
          <p className='text-muted-foreground text-sm'>Date</p>
          <p className='font-medium'>{booking.date}</p>
        </div>

        <div>
          <p className='text-muted-foreground text-sm'>Status</p>
          <p className='font-medium'>{booking.status}</p>
        </div>

        <div>
          <p className='text-muted-foreground text-sm'>Price</p>
          <p className='font-medium'>${booking.price}</p>
        </div>
      </div>
    </div>
  );
}
