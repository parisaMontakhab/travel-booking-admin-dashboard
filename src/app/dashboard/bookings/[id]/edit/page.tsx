'use client';

import { ROUTES } from '@/constants/routes';
import {
  CreateBookingForm,
  createBookingSchema
} from '@/features/bookings/schema';
import { getBookingById, updateBooking } from '@/services/bookings';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
      customer: '',
      destination: '',
      date: '',
      price: 0,
      status: 'Pending'
    }
  });

  const {
    data: booking,
    isLoading,
    error
  } = useQuery({
    queryKey: ['bookingDetail', id],
    queryFn: () => getBookingById(id),
    enabled: !!id
  });

  useEffect(() => {
    if (booking) {
      reset({
        customer: booking.customer,
        destination: booking.destination,
        date: booking.date,
        price: booking.price,
        status: booking.status
      });
    }
  }, [booking, reset]);

  const { mutate } = useMutation({
    mutationFn: (data: CreateBookingForm) => updateBooking(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['bookings'] });
      await queryClient.invalidateQueries({ queryKey: ['bookingDetail', id] });
      router.push(ROUTES.BOOKINGS.DETAIL(id));
    }
  });

  const onSubmit = async (data: CreateBookingForm) => {
    mutate(data);
  };

  if (isLoading) {
    return <div className='p-6'>Loading booking...</div>; //TODO: implement correct component
  }

  if (error || !booking) {
    return <div className='p-6'>Booking not found</div>; //TODO: implement correct component
  }

  return (
    <div className='max-w-xl space-y-6 p-6'>
      <h1 className='text-2xl font-bold'>Edit Booking</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <input
            {...register('customer')}
            placeholder='Customer'
            className='w-full rounded-lg border p-2'
          />
          {errors.customer && (
            <p className='text-sm text-red-500'>{errors.customer.message}</p>
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
          disabled={isSubmitting}
          className='rounded-lg bg-black px-4 py-2 text-white'
        >
          {isSubmitting ? 'Updating...' : 'Update Booking'}
        </button>
      </form>
    </div>
  );
}
export default EditBookingPage;
