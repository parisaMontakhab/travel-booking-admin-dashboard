'use client';
import { ROUTES } from '@/constants/routes';
import {
  CreateCustomerForm,
  createCustomerSchema
} from '@/features/bookings/schema';
import { getCustomerById, updateCustomer } from '@/services/customers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function EditCustomerPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CreateCustomerForm>({
    resolver: zodResolver(createCustomerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: ''
    }
  });

  const {
    data: customer,
    isLoading,
    error
  } = useQuery({
    queryKey: ['customerDetail', id],
    queryFn: () => getCustomerById(id),
    enabled: !!id
  });

  useEffect(() => {
    if (customer) {
      reset({
        name: customer.name,
        email: customer.email,
        phone: customer.phone
      });
    }
  }, [customer, reset]);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateCustomerForm) => updateCustomer(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['customer'] });
      await queryClient.invalidateQueries({ queryKey: ['customerDetail', id] });
      router.push(ROUTES.CUSTOMERS.DETAIL(id));
    }
  });

  const onSubmit = async (data: CreateCustomerForm) => {
    mutate(data);
  };

  if (isLoading) {
    return <div className='p-6'>Loading customer...</div>; //TODO: implement correct component
  }

  if (error || !customer) {
    return <div className='p-6'>customer not found</div>; //TODO: implement correct component
  }

  return (
    <div className='max-w-xl space-y-6 p-6'>
      <h1 className='text-2xl font-bold'>Edit Customer</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <input
            type='text'
            {...register('name')}
            placeholder='FullName'
            className='w-full rounded-lg border p-2'
          />
          {errors.name && (
            <p className='text-sm text-red-500'>{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            type='email'
            {...register('email')}
            placeholder='Email'
            className='w-full rounded-lg border p-2'
          />
          {errors.email && (
            <p className='text-sm text-red-500'>{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type='text'
            {...register('phone')}
            placeholder='Phone Number'
            className='w-full rounded-lg border p-2'
          />
          {errors.phone && (
            <p className='text-sm text-red-500'>{errors.phone.message}</p>
          )}
        </div>

        <button
          disabled={isSubmitting || isPending}
          className='rounded-lg bg-black px-4 py-2 text-white'
        >
          {isSubmitting ? 'Updating...' : 'Update Customer'}
        </button>
      </form>
    </div>
  );
}
