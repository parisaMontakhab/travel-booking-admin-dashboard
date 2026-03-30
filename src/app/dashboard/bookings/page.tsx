'use client';
import EmptyState from '@/components/states/EmptyState';
import ErrorState from '@/components/states/ErrorState';
import LoadingState from '@/components/states/LoadingState';
import { ROUTES } from '@/constants/routes';
import { BookingsTable } from '@/features/bookings/components/bookings-table';
import { getBookings } from '@/services/bookings';
import { getCustomers } from '@/services/customers';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

export default function BookingsPage() {
  const {
    data: bookings = [],
    isError: isErrorBookings,
    isLoading: isLoadingBookings
  } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings
  });

  const {
    data: customers = [],
    isError: isErrorCustomers,
    isLoading: isLoadingCustomers
  } = useQuery({
    queryKey: ['customers'],
    queryFn: getCustomers
  });

  if (isLoadingBookings || isLoadingCustomers)
    return <LoadingState title='Loading bookings...' />;

  if (isErrorBookings || isErrorCustomers)
    return (
      <ErrorState
        title='Failed to load bookings'
        description='Please refresh the page and try again.'
      />
    );

  if (!bookings?.length || !customers.length)
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
          className='rounded-lg bg-black p-2 text-white md:px-4 md:py-2'
        >
          New Booking
        </Link>
      </div>
      <BookingsTable bookings={bookings} customers={customers} />
    </div>
  );
}
