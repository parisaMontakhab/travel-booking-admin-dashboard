'use client';

interface Props {
  bookingId: number;
}

export function DeleteBookingButton({ bookingId }: Props) {
  return (
    <button
      onClick={() => console.log(bookingId)}
      className='rounded-lg bg-red-600 px-4 py-2 text-white'
    >
      Delete
    </button>
  );
}
