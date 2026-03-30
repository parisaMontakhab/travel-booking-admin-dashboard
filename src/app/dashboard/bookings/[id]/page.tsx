'use client';
import EmptyState from '@/components/states/EmptyState';
import ErrorState from '@/components/states/ErrorState';
import LoadingState from '@/components/states/LoadingState';
import { ROUTES } from '@/constants/routes';
import { DeleteButton } from '@/features/bookings/components/delete-button';
import { useAppMutation } from '@/hooks/use-mutation';
import { deleteBooking, getBookingById } from '@/services/bookings';
import { getCustomers } from '@/services/customers';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function BookingDetailsPage() {
  const { id } = useParams() as { id: string };
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: booking,
    isLoading: isLoadingBookings,
    isError: isErrorBookings
  } = useQuery({
    queryKey: ['bookingDetail', id],
    queryFn: () => getBookingById(id ?? ''),
    enabled: !!id
  });

  const {
    data: customers = [],
    isLoading: isLoadingCustomers,
    error: isErrorCustomers
  } = useQuery({
    queryKey: ['customers'],
    queryFn: getCustomers
  });

  const { mutate: deleteBookingById, isPending } = useAppMutation({
    mutationFn: (id: string) => deleteBooking(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      router.push(ROUTES.BOOKINGS.LIST);
    }
  });

  const customer = customers.find((c) => c.id === booking?.customer_id);

  const handleDelete = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this booking?'
    );

    if (!confirmed) return;

    deleteBookingById(id);
  };

  if (isLoadingBookings || isLoadingCustomers) {
    return <LoadingState title='Loading booking...' />;
  }

  if (isErrorBookings || isErrorCustomers) {
    return (
      <ErrorState
        title='Failed to load booking'
        description='Please refresh the page and try again.'
      />
    );
  }

  if (!booking)
    return (
      <EmptyState
        title='No booking yet'
        description='Create your first booking to get started.'
      />
    );

  return (
    <div className='space-y-6 p-4 md:p-6'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <h1 className='text-2xl font-bold break-words'>{customer?.name}</h1>

        <div className='flex flex-col gap-2 sm:flex-row sm:gap-3'>
          <Link
            href={ROUTES.BOOKINGS.EDIT(booking.id)}
            className='rounded-lg bg-black px-6 py-2 text-center text-white'
          >
            Edit
          </Link>

          <DeleteButton onDelete={handleDelete} disabled={isPending} />
        </div>
      </div>

      <div className='space-y-4 rounded-xl border p-4 md:p-6'>
        <div>
          <p className='text-muted-foreground text-sm'>Customer</p>
          <p className='font-medium'>{customer?.name ?? 'Unknown customer'}</p>

          {customer?.email && (
            <p className='text-muted-foreground text-sm break-all'>
              {customer.email}
            </p>
          )}
        </div>

        <div>
          <p className='text-muted-foreground text-sm'>Destination</p>
          <p className='font-medium break-words'>{booking.destination}</p>
        </div>

        <div>
          <p className='text-muted-foreground text-sm'>Date</p>
          <p className='font-medium'>{booking.date}</p>
        </div>

        <div>
          <p className='text-muted-foreground text-sm'>Status</p>
          <p className='font-medium'>{booking.status}</p>
        </div>

        <div>
          <p className='text-muted-foreground text-sm'>Price</p>
          <p className='font-medium'>${booking.price}</p>
        </div>
      </div>
    </div>
  );
}
