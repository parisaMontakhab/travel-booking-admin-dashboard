'use client';
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

  if (isLoading) return <div>Loading...</div>; //TODO: implement correct component

  if (isError) return <div>Error loading customers</div>; //TODO: implement correct component

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
