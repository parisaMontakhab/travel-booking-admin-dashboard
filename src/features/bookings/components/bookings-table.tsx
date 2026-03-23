'use client';
import { ROUTES } from '@/constants/routes';
import { Booking } from '@/types/booking';
import Link from 'next/link';
import { useMemo, useState } from 'react';

interface Props {
  bookings: Booking[];
}

const getStatusClasses = (status: Booking['status']) => {
  switch (status) {
    case 'Confirmed':
      return 'bg-green-100 text-green-700';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-700 px-4';
    case 'Cancelled':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export function BookingsTable({ bookings }: Props) {
  const [searchValue, setSearchValue] = useState('');

  const filteredBookings = useMemo(() => {
    const normalizedSearch = searchValue.toLowerCase().trim();
    if (!normalizedSearch) return bookings;

    return bookings.filter((booking) => {
      return (
        booking.customer.toLowerCase().includes(normalizedSearch) ||
        booking.destination.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [bookings, searchValue]);

  return (
    <div className='space-y-4'>
      <div>
        <input
          type='text'
          placeholder='Search by customer or destination...'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className='bg-background w-full max-w-sm rounded-md border px-3 py-2 text-sm outline-none focus:ring-1'
        />
      </div>
      <div className='bg-background overflow-hidden rounded-xl border'>
        <table className='w-full text-sm'>
          <thead className='bg-muted/50'>
            <tr className='text-left'>
              <th className='px-4 py-3 font-medium'>Customer</th>
              <th className='px-4 py-3 font-medium'>Destination</th>
              <th className='px-4 py-3 font-medium'>Date</th>
              <th className='px-4 py-3 font-medium'>Status</th>
              <th className='px-4 py-3 font-medium'>Price</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id} className='border-t'>
                <td className='px-4 py-3 font-medium'>
                  {' '}
                  <Link href={ROUTES.BOOKINGS.DETAIL(booking.id)}>
                    {booking.customer}
                  </Link>
                </td>
                <td className='px-4 py-3'>{booking.destination}</td>
                <td className='px-4 py-3'>{booking.date}</td>
                <td className='px-4 py-3'>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className='px-4 py-3'>${booking.price}</td>
              </tr>
            ))}
            {filteredBookings.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className='text-muted-foreground px-4 py-6 text-center'
                >
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
