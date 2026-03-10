import { BookingsTable } from '@/features/bookings/components/bookings-table';
import { getBookings } from '@/services/bookings';
import { Booking } from '@/types/booking';

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

      <BookingsTable bookings={bookings} />
    </div>
  );
}
