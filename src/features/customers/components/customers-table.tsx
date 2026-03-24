import { Customer } from '@/types/customer';
import { useMemo, useState } from 'react';

interface Props {
  customers: Customer[];
}

function CustomersTable({ customers }: Props) {
  const [searchValue, setSearchValue] = useState('');

  const filteredCustomers = useMemo(() => {
    const normalizedSearch = searchValue.toLowerCase().trim();
    if (!normalizedSearch) return customers;

    return customers.filter((customer) => {
      return (
        customer.name.toLowerCase().includes(normalizedSearch) ||
        customer.email.toLocaleLowerCase().includes(normalizedSearch)
      );
    });
  }, [customers, searchValue]);

  return (
    <div className='space-y-4'>
      <div>
        <input
          type='text'
          placeholder='Search by name or email ...'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className='bg-background w-full max-w-sm rounded-md border px-3 py-2 text-sm outline-none focus:ring-1'
        />
      </div>
      <div className='bg-background overflow-hidden rounded-xl border'>
        <table className='w-full text-sm'>
          <thead className='bg-muted/50'>
            <tr className='text-left'>
              <th className='px-4 py-3 font-medium'>Name</th>
              <th className='px-4 py-3 font-medium'>Email</th>
              <th className='px-4 py-3 font-medium'>Phone</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className='border-t'>
                <td className='px-4 py-3 font-medium'>{customer.name}</td>
                <td className='px-4 py-3'>{customer.email}</td>
                <td className='px-4 py-3'>{customer.phone}</td>
              </tr>
            ))}
            {filteredCustomers.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className='text-muted-foreground px-4 py-6 text-center'
                >
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default CustomersTable;
