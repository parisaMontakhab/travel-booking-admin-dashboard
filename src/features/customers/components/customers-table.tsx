import { Customer } from '@/types/customer';

interface Props {
  customers: Customer[];
}

function CustomersTable({ customers }: Props) {
  return (
    <div className='bg-background overflow-hidden rounded-xl border'>
      <table className='w-full text-sm'>
        <thead className='bg-muted/50'>
          <tr className='text-left'>
            <th className='px-4 py-3 font-medium'>Name</th>
            <th className='px-4 py-3 font-medium'>Email</th>
            <th className='px-4 py-3 font-medium'>Bookings</th>
            <th className='px-4 py-3 font-medium'>Total Spent</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className='border-t'>
              <td className='px-4 py-3 font-medium'>{customer.name}</td>
              <td className='px-4 py-3'>{customer.email}</td>
              <td className='px-4 py-3'>{customer.bookings}</td>
              <td className='px-4 py-3'>${customer.totalSpent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default CustomersTable;
