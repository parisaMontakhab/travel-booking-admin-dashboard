'use client';
import EmptyState from '@/components/states/EmptyState';
import ErrorState from '@/components/states/ErrorState';
import LoadingState from '@/components/states/LoadingState';
import { ROUTES } from '@/constants/routes';
import { DeleteButton } from '@/features/bookings/components/delete-button';
import { useAppMutation } from '@/hooks/use-mutation';
import { getBookings } from '@/services/bookings';
import { deleteCustomer, getCustomerById } from '@/services/customers';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function CustomerDetailsPage() {
  const { id } = useParams() as { id: string };
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: customer,
    isLoading: isLoadingCustomer,
    isError: isErrorCustomer
  } = useQuery({
    queryKey: ['customerDetail', id],
    queryFn: () => getCustomerById(id ?? ''),
    enabled: !!id
  });

  const {
    data: bookings = [],
    isLoading: isLoadingBookings,
    isError: isErrorBookings
  } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings
  });

  const customerBookings = bookings.filter(
    (booking) => booking.customer_id === customer?.id
  );

  const totalBookings = customerBookings.length;

  const totalSpent = customerBookings.reduce((sum, booking) => {
    return sum + booking.price;
  }, 0);

  const { mutate: deletedCustomerById, isPending } = useAppMutation({
    mutationFn: (id: string) => deleteCustomer(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      router.push(ROUTES.CUSTOMERS.LIST);
    }
  });

  const handleDelete = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this customer?'
    );

    if (!confirmed) return;

    deletedCustomerById(id);
  };

  if (isLoadingBookings || isLoadingCustomer) {
    return <LoadingState title='Loading customer...' />;
  }

  if (isErrorBookings || isErrorCustomer) {
    return (
      <ErrorState
        title='Failed to load customer'
        description='Please refresh the page and try again.'
      />
    );
  }

  if (!customer) {
    return (
      <EmptyState
        title='No customer yet'
        description='Create your first booking to get started.'
      />
    );
  }
  return (
    <div className='space-y-6 p-4 md:p-6'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <h1 className='text-2xl font-bold break-words'>{customer.name}</h1>

        <div className='flex flex-col gap-2 sm:flex-row sm:gap-3'>
          <Link
            href={ROUTES.CUSTOMERS.EDIT(customer.id)}
            className='rounded-lg bg-black px-6 py-2 text-center text-white'
          >
            Edit
          </Link>

          <DeleteButton onDelete={handleDelete} disabled={isPending} />
        </div>
      </div>

      <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        <div className='rounded-xl border p-4'>
          <p className='text-muted-foreground text-sm'>Email</p>
          <p className='font-medium break-all'>{customer.email}</p>
        </div>

        <div className='rounded-xl border p-4'>
          <p className='text-muted-foreground text-sm'>Phone Number</p>
          <p className='font-medium'>{customer.phone || '-'}</p>
        </div>

        <div className='rounded-xl border p-4'>
          <p className='text-muted-foreground text-sm'>Total Bookings</p>
          <p className='font-medium'>{totalBookings}</p>
        </div>

        <div className='rounded-xl border p-4'>
          <p className='text-muted-foreground text-sm'>Total Spent</p>
          <p className='font-medium'>${totalSpent}</p>
        </div>
      </div>

      <div className='rounded-xl border'>
        <div className='border-b px-4 py-3'>
          <h2 className='font-semibold'>Customer Bookings</h2>
        </div>

        {customerBookings.length === 0 ? (
          <div className='text-muted-foreground px-4 py-6 text-sm'>
            No bookings found for this customer.
          </div>
        ) : (
          <div className='w-full overflow-x-auto'>
            <table className='w-full min-w-[600px] text-sm'>
              <thead className='bg-muted/50'>
                <tr className='text-left'>
                  <th className='px-4 py-3 font-medium whitespace-nowrap'>
                    Destination
                  </th>
                  <th className='px-4 py-3 font-medium whitespace-nowrap'>
                    Date
                  </th>
                  <th className='px-4 py-3 font-medium whitespace-nowrap'>
                    Status
                  </th>
                  <th className='px-4 py-3 font-medium whitespace-nowrap'>
                    Price
                  </th>
                </tr>
              </thead>

              <tbody>
                {customerBookings.map((booking) => (
                  <tr key={booking.id} className='border-t'>
                    <td className='px-4 py-3 whitespace-nowrap'>
                      <Link href={ROUTES.BOOKINGS.DETAIL(booking.id)}>
                        {booking.destination}
                      </Link>
                    </td>

                    <td className='px-4 py-3 whitespace-nowrap'>
                      {booking.date}
                    </td>

                    <td className='px-4 py-3 whitespace-nowrap'>
                      {booking.status}
                    </td>

                    <td className='px-4 py-3 whitespace-nowrap'>
                      ${booking.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
