'use client';
import EmptyState from '@/components/states/EmptyState';
import ErrorState from '@/components/states/ErrorState';
import LoadingState from '@/components/states/LoadingState';
import { ROUTES } from '@/constants/routes';
import CustomersTable from '@/features/customers/components/customers-table';
import { getCustomers } from '@/services/customers';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

function CustomersPage() {
  const {
    data: customers = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ['customers'],
    queryFn: getCustomers
  });

  if (isLoading) return <LoadingState title='Loading customers...' />;

  if (isError)
    return (
      <ErrorState
        title='Failed to load customers'
        description='Please refresh the page and try again.'
      />
    );

  if (!customers?.length)
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
          className='rounded-lg bg-black px-4 py-2 text-white'
        >
          New Customer
        </Link>
      </div>

      <CustomersTable customers={customers} />
    </div>
  );
}
export default CustomersPage;
