'use client';
import { ROUTES } from '@/constants/routes';
import {
  CreateCustomerForm,
  createCustomerSchema
} from '@/features/customers/schema';

import { createCustomer } from '@/services/customers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function NewCustomerPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CreateCustomerForm>({
    resolver: zodResolver(createCustomerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: ''
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateCustomerForm) => createCustomer(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['customers'] });
      router.push(ROUTES.CUSTOMERS.LIST);
    }
  });

  const onSubmit = async (data: CreateCustomerForm) => {
    mutate(data);
  };

  return (
    <div className='max-w-xl space-y-6 p-6'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>Create Customer</h1>
        <p className='text-muted-foreground'>
          Add a new customer to your travel dashboard.
        </p>
      </div>

      <div className='bg-background rounded-xl border p-6'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          <div className='space-y-2'>
            <label htmlFor='name' className='text-sm font-medium'>
              Full Name
            </label>
            <input
              id='name'
              {...register('name')}
              placeholder='Olivia Martin'
              className='focus:ring-ring w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2'
            />
            {errors.name && (
              <p className='text-sm text-red-500'>{errors.name.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <label htmlFor='email' className='text-sm font-medium'>
              Email Address
            </label>
            <input
              id='email'
              type='email'
              {...register('email')}
              placeholder='olivia@example.com'
              className='focus:ring-ring w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2'
            />
            {errors.email && (
              <p className='text-sm text-red-500'>{errors.email.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <label htmlFor='phone' className='text-sm font-medium'>
              Phone Number
            </label>
            <input
              id='phone'
              {...register('phone')}
              placeholder='+1 234 567 890'
              className='focus:ring-ring w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2'
            />
            {errors.phone && (
              <p className='text-sm text-red-500'>{errors.phone.message}</p>
            )}
          </div>

          <div className='flex justify-end pt-2'>
            <button
              type='submit'
              disabled={isSubmitting || isPending}
              className='rounded-lg bg-black px-4 py-2 text-sm text-white disabled:opacity-50'
            >
              {isSubmitting ? 'Creating...' : 'Create Customer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
