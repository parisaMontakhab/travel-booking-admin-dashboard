'use client';
import EmptyState from '@/components/states/EmptyState';
import ErrorState from '@/components/states/ErrorState';
import LoadingState from '@/components/states/LoadingState';
import { ROUTES } from '@/constants/routes';
import CustomersTable from '@/features/customers/components/customers-table';
import { getBookings } from '@/services/bookings';
import { getCustomers } from '@/services/customers';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

function CustomersPage() {
  const {
    data: customers = [],
    isLoading: isLoadingCustomers,
    isError: isErrorCustomers
  } = useQuery({
    queryKey: ['customers'],
    queryFn: getCustomers
  });

  const {
    data: bookings = [],
    isLoading: isLoadingBooking,
    isError: isErrorBooking
  } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings
  });

  if (isLoadingCustomers || isLoadingBooking)
    return <LoadingState title='Loading customers...' />;

  if (isErrorCustomers || isErrorBooking)
    return (
      <ErrorState
        title='Failed to load customers'
        description='Please refresh the page and try again.'
      />
    );

  if (!customers?.length || !bookings?.length)
    return (
      <EmptyState
        title='No customers yet'
        description='Create your first customer to get started.'
      />
    );

  return (
    <div className='space-y-6 p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Customers</h1>
          <p className='text-muted-foreground'>
            View and manage your travel customers.
          </p>
        </div>
        <Link
          href={ROUTES.CUSTOMERS.NEW}
          className='rounded-lg bg-black p-2 text-white md:px-4 md:py-2'
        >
          New Customer
        </Link>
      </div>

      <CustomersTable customers={customers} bookings={bookings} />
    </div>
  );
}
export default CustomersPage;
