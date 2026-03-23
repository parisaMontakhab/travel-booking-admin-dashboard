import { API_ROUTES } from '@/constants/api-routes';
import { apiDelete, apiGet, apiPost, apiPut } from '@/lib/api';
import { Booking, CreateBookingPayload } from '@/types/booking';

export function getBookings() {
  return apiGet<Booking[]>(API_ROUTES.BOOKINGS.BASE);
}

export function getBookingById(id: number | string) {
  return apiGet<Booking>(API_ROUTES.BOOKINGS.byId(id));
}

export function createBooking(data: CreateBookingPayload) {
  return apiPost<Booking>(API_ROUTES.BOOKINGS.BASE, data);
}

export function updateBooking(id: number | string, data: CreateBookingPayload) {
  return apiPut<Booking>(API_ROUTES.BOOKINGS.byId(id), data);
}

export function deleteBooking(id: number | string) {
  return apiDelete<Booking>(API_ROUTES.BOOKINGS.byId(id));
}
