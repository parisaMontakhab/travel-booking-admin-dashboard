'use client';

import { ROUTES } from '@/constants/routes';
import {
  CreateBookingForm,
  createBookingSchema
} from '@/features/bookings/schema';
import { useAppMutation } from '@/hooks/use-mutation';
import { createBooking } from '@/services/bookings';
import { getCustomers } from '@/services/customers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function NewBookingPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CreateBookingForm>({
    resolver: zodResolver(createBookingSchema),
    defaultValues: {
      customer_id: '',
      destination: '',
      date: '',
      price: 0,
      status: 'Pending'
    }
  });

  const { data: customers = [], isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: getCustomers
  });

  const { mutate: createNewBooking, isPending } = useAppMutation({
    mutationFn: createBooking,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['bookings'] });
      router.push(ROUTES.BOOKINGS.LIST);
    }
  });

  const onSubmit = (data: CreateBookingForm) => {
    createNewBooking(data);
  };

  return (
    <div className='max-w-xl space-y-6 p-6'>
      <h1 className='text-2xl font-bold'>Create Booking</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <select
            {...register('customer_id')}
            disabled={isLoading}
            className='w-full rounded-lg border p-2'
          >
            <option value=''>
              {isLoading ? 'Loading customers...' : 'Select a customer'}
            </option>

            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name} ({customer.email})
              </option>
            ))}
          </select>

          {errors.customer_id && (
            <p className='text-sm text-red-500'>{errors.customer_id.message}</p>
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
            {...register('price', {
              valueAsNumber: true
            })}
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
          disabled={isSubmitting || isPending || isLoading}
          className='rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50'
        >
          {isPending ? 'Creating...' : 'Create Booking'}
        </button>
      </form>
    </div>
  );
}
