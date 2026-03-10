import { apiFetch } from '@/lib/api';
import { Booking } from '@/types/booking';

export function getBookings() {
  return apiFetch<Booking[]>('http://localhost:3000/api/bookings');
}
