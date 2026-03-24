'use client';
import CustomersTable from '@/features/customers/components/customers-table';
import { getCustomers } from '@/services/customers';
import { useQuery } from '@tanstack/react-query';

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
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>Customers</h1>
        <p className='text-muted-foreground'>
          View and manage your travel customers.
        </p>
      </div>

      <CustomersTable customers={customers} />
    </div>
  );
}
export default CustomersPage;
