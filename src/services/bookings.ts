import { API_ROUTES } from '@/constants/api-routes';
import { apiFetch } from '@/lib/api';
import { Booking, CreateBookingPayload } from '@/types/booking';

export function getBookings() {
  return apiFetch<Booking[]>(API_ROUTES.BOOKINGS);
}

export function getBookingById(id: number | string) {
  return apiFetch<Booking>(`${API_ROUTES.BOOKINGS}/${id}`);
}

export function createBooking(data: CreateBookingPayload) {
  return apiFetch<Booking>(API_ROUTES.BOOKINGS, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export function updateBooking(id: number | string, data: CreateBookingPayload) {
  return apiFetch<Booking>(`${API_ROUTES.BOOKINGS}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}
