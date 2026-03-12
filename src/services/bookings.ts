import { API_ROUTES } from '@/constants/api-routes';
import { apiFetch } from '@/lib/api';
import { Booking } from '@/types/booking';

export type CreateBookingPayload = {
  customer: string;
  destination: string;
  date: string;
  price: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
};

export function getBookings() {
  return apiFetch<Booking[]>(API_ROUTES.BOOKINGS);
}

export function createBooking(data: CreateBookingPayload) {
  return apiFetch<Booking>(API_ROUTES.BOOKINGS, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}
