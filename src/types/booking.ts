export type BookingStatus = 'Confirmed' | 'Pending' | 'Cancelled';

export type Booking = {
  id: number;
  customer: string;
  destination: string;
  date: string;
  status: BookingStatus;
  price: number;
};

export type CreateBookingPayload = {
  customer: string;
  destination: string;
  date: string;
  price: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
};
