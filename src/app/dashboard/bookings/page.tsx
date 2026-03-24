'use client';
import EmptyState from '@/components/states/EmptyState';
import ErrorState from '@/components/states/ErrorState';
import LoadingState from '@/components/states/LoadingState';
import { ROUTES } from '@/constants/routes';
import { BookingsTable } from '@/features/bookings/components/bookings-table';
import { getBookings } from '@/services/bookings';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

export default function BookingsPage() {
  const {
    data: bookings = [],
    isError,
    isLoading
  } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings
  });

  if (isLoading) return <LoadingState title='Loading bookings...' />;

  if (isError)
    return (
      <ErrorState
        title='Failed to load bookings'
        description='Please refresh the page and try again.'
      />
    );

  if (!bookings?.length)
    return (
      <EmptyState
        title='No bookings yet'
        description='Create your first booking to get started.'
      />
    );

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
          href={ROUTES.BOOKINGS.NEW}
          className='rounded-lg bg-black px-4 py-2 text-white'
        >
          New Booking
        </Link>
      </div>
      <BookingsTable bookings={bookings} />
    </div>
  );
}
