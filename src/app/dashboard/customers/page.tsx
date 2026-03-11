import CustomersTable from '@/features/customers/components/customers-table';
import { getCustomers } from '@/services/customers';
import { Customer } from '@/types/customer';

async function CustomersPage() {
  const customers: Customer[] = await getCustomers();

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
