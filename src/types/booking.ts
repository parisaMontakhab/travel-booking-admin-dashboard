export type BookingStatus = 'Confirmed' | 'Pending' | 'Cancelled';

export type Booking = {
  id: string;
  customer_id: string;
  destination: string;
  date: string;
  status: BookingStatus;
  price: number;
};

export type CreateBookingPayload = Omit<Booking, 'id'>;
