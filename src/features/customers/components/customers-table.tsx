import { ROUTES } from '@/constants/routes';
import { Booking } from '@/types/booking';
import { Customer } from '@/types/customer';
import Link from 'next/link';
import { useMemo, useState } from 'react';

interface Props {
  customers: Customer[];
  bookings: Booking[];
}

function CustomersTable({ customers, bookings }: Props) {
  const [searchValue, setSearchValue] = useState('');

  const customersWithStats = useMemo(() => {
    return customers.map((customer) => {
      const customerBookings = bookings.filter(
        (booking) => booking.customer_id === customer.id
      );

      const totalBookings = customerBookings.length;

      const totalSpent = customerBookings.reduce((sum, booking) => {
        return sum + booking.price;
      }, 0);

      return {
        ...customer,
        totalBookings,
        totalSpent
      };
    });
  }, [customers, bookings]);

  const filteredCustomers = useMemo(() => {
    const normalizedSearch = searchValue.toLowerCase().trim();

    if (!normalizedSearch) return customersWithStats;

    return customersWithStats.filter((customer) => {
      return (
        customer.name.toLowerCase().includes(normalizedSearch) ||
        customer.email.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [customersWithStats, searchValue]);

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
              <th className='px-4 py-3 font-medium'>Bookings</th>
              <th className='px-4 py-3 font-medium'>Total Spent</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className='border-t'>
                <td className='px-4 py-3 font-medium'>
                  <Link href={ROUTES.CUSTOMERS.DETAIL(customer.id)}>
                    {customer.name}
                  </Link>
                </td>

                <td className='px-4 py-3'>{customer.email}</td>
                <td className='px-4 py-3'>{customer.phone}</td>
                <td className='px-4 py-3'>{customer.totalBookings}</td>
                <td className='px-4 py-3'>${customer.totalSpent}</td>
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
