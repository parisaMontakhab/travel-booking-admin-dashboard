'use client';
import { ROUTES } from '@/constants/routes';
import { DeleteBookingButton } from '@/features/bookings/components/delete-booking-button';
import { getBookingById } from '@/services/bookings';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function BookingDetailsPage() {
  const { id } = useParams() as { id: string };

  const {
    data: booking,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['bookingDetail', id],
    queryFn: () => getBookingById(id ?? ''),
    enabled: !!id
  });

  if (isLoading) {
    return <div className='p-6'>Loading booking...</div>; //TODO: implement correct component
  }

  if (isError) {
    return <div className='p-6'>Error loading booking</div>; //TODO: implement correct component
  }

  if (!booking) {
    return <div className='p-6'>Booking not found</div>; //TODO: implement correct component
  }
  return (
    <div className='space-y-6 p-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Booking #{booking.id}</h1>
        <div className='flex gap-3'>
          <Link
            href={ROUTES.BOOKINGS.EDIT(booking.id)}
            className='rounded-lg bg-black px-6 py-2 text-white'
          >
            Edit
          </Link>

          <DeleteBookingButton bookingId={booking?.id} />
        </div>
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
