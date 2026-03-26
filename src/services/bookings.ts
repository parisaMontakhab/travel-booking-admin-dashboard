import { supabase } from '@/lib/supabase';
import { Booking, CreateBookingPayload } from '@/types/booking';

function normalizeBookingPayload(data: CreateBookingPayload) {
  return {
    customer_id: data.customer_id,
    destination: data.destination.trim(),
    date: data.date,
    price: Number(data.price),
    status: data.status
  };
}

export async function getBookings(): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('date', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch bookings: ${error.message}`);
  }

  return data ?? [];
}

export async function getBookingById(id: number | string): Promise<Booking> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', String(id))
    .single();

  if (error) {
    throw new Error(`Failed to fetch booking: ${error.message}`);
  }

  return data;
}

export async function createBooking(
  data: CreateBookingPayload
): Promise<Booking> {
  const payload = {
    id: crypto.randomUUID(),
    ...normalizeBookingPayload(data)
  };

  const { data: created, error } = await supabase
    .from('bookings')
    .insert(payload)
    .select();

  if (error) {
    throw new Error(`Failed to create booking: ${error.message}`);
  }

  if (!created || created.length === 0) {
    throw new Error('Failed to create booking: no data returned.');
  }

  return created[0];
}

export async function updateBooking(
  id: number | string,
  data: CreateBookingPayload
): Promise<Booking> {
  const payload = normalizeBookingPayload(data);

  const { data: updated, error } = await supabase
    .from('bookings')
    .update(payload)
    .eq('id', String(id))
    .select();

  if (error) {
    throw new Error(`Failed to update booking: ${error.message}`);
  }

  if (!updated || updated.length === 0) {
    throw new Error('Failed to update booking: booking not found.');
  }

  return updated[0];
}

export async function deleteBooking(
  id: number | string
): Promise<{ success: true }> {
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', String(id));

  if (error) {
    throw new Error(`Failed to delete booking: ${error.message}`);
  }

  return { success: true };
}
