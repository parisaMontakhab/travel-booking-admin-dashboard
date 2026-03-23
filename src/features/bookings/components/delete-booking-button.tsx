'use client';

import { ROUTES } from '@/constants/routes';
import { deleteBooking } from '@/services/bookings';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface Props {
  bookingId: number;
}

export function DeleteBookingButton({ bookingId }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => deleteBooking(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      router.push(ROUTES.BOOKINGS.LIST);
    }
  });
  const handleDelete = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this booking?'
    );

    if (!confirmed) return;

    mutate(bookingId);
  };
  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className='rounded-lg bg-red-600 px-4 py-2 text-white'
    >
      Delete
    </button>
  );
}
