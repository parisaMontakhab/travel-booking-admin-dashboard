'use client';
import { ROUTES } from '@/constants/routes';
import { DeleteButton } from '@/features/bookings/components/delete-button';
import { deleteCustomer, getCustomerById } from '@/services/customers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function CustomerDetailsPage() {
  const { id } = useParams() as { id: string };
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: customer,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['customerDetail', id],
    queryFn: () => getCustomerById(id ?? ''),
    enabled: !!id
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => deleteCustomer(id),

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

    mutate(Number(id));
  };

  if (isLoading) {
    return <div className='p-6'>Loading Customer...</div>; //TODO: implement correct component
  }

  if (isError) {
    return <div className='p-6'>Error loading Customer</div>; //TODO: implement correct component
  }

  if (!customer) {
    return <div className='p-6'>Customer not found</div>; //TODO: implement correct component
  }
  return (
    <div className='space-y-6 p-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Booking #{customer.id}</h1>
        <div className='flex gap-3'>
          <Link
            href={ROUTES.CUSTOMERS.EDIT(customer.id)}
            className='rounded-lg bg-black px-6 py-2 text-white'
          >
            Edit
          </Link>

          <DeleteButton onDelete={handleDelete} disabled={isPending} />
        </div>
      </div>

      <div className='space-y-4 rounded-xl border p-6'>
        <div>
          <p className='text-muted-foreground text-sm'>Customer</p>
          <p className='font-medium'>{customer.name}</p>
        </div>

        <div>
          <p className='text-muted-foreground text-sm'>Email</p>
          <p className='font-medium'>{customer.email}</p>
        </div>

        <div>
          <p className='text-muted-foreground text-sm'>Phone Number</p>
          <p className='font-medium'>{customer.phone}</p>
        </div>
      </div>
    </div>
  );
}
