import { BookingsTable } from '@/features/bookings/components/bookings-table';
import { getBookings } from '@/services/bookings';
import { Booking } from '@/types/booking';
import Link from 'next/link';

export default async function BookingsPage() {
  const bookings: Booking[] = await getBookings();

  return (
    <div className='space-y-6 p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Bookings</h1>
          <p className='text-muted-foreground'>
            Manage and track all travel bookings.
          </p>
        </div>

        <Link
          href='/dashboard/bookings/new'
          className='rounded-lg bg-black px-4 py-2 text-white'
        >
          New Booking
        </Link>
      </div>
      <BookingsTable bookings={bookings} />
    </div>
  );
}
