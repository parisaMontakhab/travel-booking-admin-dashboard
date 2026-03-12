'use client';

import {
  CreateBookingForm,
  createBookingSchema
} from '@/features/bookings/schema';
import { createBooking } from '@/services/bookings';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function NewBookingPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
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

  const onSubmit = async (data: CreateBookingForm) => {
    await createBooking(data);
    router.push('/dashboard/bookings');
  };

  return (
    <div className='max-w-xl space-y-6 p-6'>
      <h1 className='text-2xl font-bold'>Create Booking</h1>

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
        </div>

        <div>
          <input
            type='date'
            {...register('date')}
            className='w-full rounded-lg border p-2'
          />
        </div>

        <div>
          <input
            type='number'
            {...register('price', {
              valueAsNumber: true
            })}
            className='w-full rounded-lg border p-2'
          />
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
        </div>

        <button
          disabled={isSubmitting}
          className='rounded-lg bg-black px-4 py-2 text-white'
        >
          {isSubmitting ? 'Creating...' : 'Create Booking'}
        </button>
      </form>
    </div>
  );
}
