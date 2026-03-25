'use client';

import EmptyState from '@/components/states/EmptyState';
import ErrorState from '@/components/states/ErrorState';
import LoadingState from '@/components/states/LoadingState';
import { ROUTES } from '@/constants/routes';
import {
  CreateBookingForm,
  createBookingSchema
} from '@/features/bookings/schema';
import { useAppMutation } from '@/hooks/use-mutation';
import { getBookingById, updateBooking } from '@/services/bookings';
import { getCustomers } from '@/services/customers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

function EditBookingPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CreateBookingForm>({
    resolver: zodResolver(createBookingSchema),
    defaultValues: {
      customerId: '',
      destination: '',
      date: '',
      price: 0,
      status: 'Pending'
    }
  });

  const {
    data: booking,
    isLoading: isLoadingBookings,
    isError: isErrorBookings
  } = useQuery({
    queryKey: ['bookingDetail', id],
    queryFn: () => getBookingById(id),
    enabled: !!id
  });

  const {
    data: customers = [],
    isLoading: isLoadingCustomers,
    isError: isErrorCustomers
  } = useQuery({
    queryKey: ['customers'],
    queryFn: getCustomers
  });

  useEffect(() => {
    if (booking) {
      reset({
        customerId: booking.customerId,
        destination: booking.destination,
        date: booking.date,
        price: booking.price,
        status: booking.status
      });
    }
  }, [booking, reset]);

  const { mutate: editBooking, isPending } = useAppMutation({
    mutationFn: (data: CreateBookingForm) => updateBooking(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['bookings'] });
      await queryClient.invalidateQueries({ queryKey: ['bookingDetail', id] });
      router.push(ROUTES.BOOKINGS.LIST);
    }
  });

  const onSubmit = async (data: CreateBookingForm) => {
    editBooking(data);
  };

  if (isLoadingBookings || isLoadingCustomers)
    return <LoadingState title='Loading booking...' />;

  if (isErrorBookings || isErrorCustomers)
    return (
      <ErrorState
        title='Failed to load booking'
        description='Please refresh the page and try again.'
      />
    );

  if (!booking)
    return (
      <EmptyState
        title='No booking yet'
        description='Create your first booking to get started.'
      />
    );

  return (
    <div className='max-w-xl space-y-6 p-6'>
      <h1 className='text-2xl font-bold'>Edit Booking</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <select
            {...register('customerId')}
            className='w-full rounded-lg border p-2'
          >
            <option value=''>Select a customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name} ({customer.email})
              </option>
            ))}
          </select>
          {errors.customerId && (
            <p className='text-sm text-red-500'>{errors.customerId.message}</p>
          )}
        </div>

        <div>
          <input
            {...register('destination')}
            placeholder='Destination'
            className='w-full rounded-lg border p-2'
          />
          {errors.destination && (
            <p className='text-sm text-red-500'>{errors.destination.message}</p>
          )}
        </div>

        <div>
          <input
            type='date'
            {...register('date')}
            className='w-full rounded-lg border p-2'
          />
          {errors.date && (
            <p className='text-sm text-red-500'>{errors.date.message}</p>
          )}
        </div>

        <div>
          <input
            type='number'
            {...register('price', { valueAsNumber: true })}
            className='w-full rounded-lg border p-2'
          />
          {errors.price && (
            <p className='text-sm text-red-500'>{errors.price.message}</p>
          )}
        </div>

        <div>
          <select
            {...register('status')}
            className='w-full rounded-lg border p-2'
          >
            <option value='Pending'>Pending</option>
            <option value='Confirmed'>Confirmed</option>
            <option value='Cancelled'>Cancelled</option>
          </select>
          {errors.status && (
            <p className='text-sm text-red-500'>{errors.status.message}</p>
          )}
        </div>

        <button
          type='submit'
          disabled={isSubmitting || isPending}
          className='rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50'
        >
          {isPending ? 'Updating...' : 'Update Booking'}
        </button>
      </form>
    </div>
  );
}
export default EditBookingPage;
