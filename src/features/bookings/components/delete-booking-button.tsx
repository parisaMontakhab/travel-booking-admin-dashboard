'use client';

import { deleteBooking } from '@/services/bookings';
import { useRouter } from 'next/navigation';

type Props = {
  bookingId: number;
};

export function DeleteBookingButton({ bookingId }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this booking?'
    );

    if (!confirmed) return;

    try {
      await deleteBooking(bookingId);
      router.push('/dashboard/bookings');
      router.refresh();
    } catch (error) {
      console.error('Failed to delete booking', error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className='rounded-lg bg-red-600 px-4 py-2 text-white'
    >
      Delete
    </button>
  );
}
