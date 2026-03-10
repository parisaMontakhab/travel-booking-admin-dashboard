export type BookingStatus = 'Confirmed' | 'Pending' | 'Cancelled';

export type Booking = {
  id: number;
  customer: string;
  destination: string;
  date: string;
  status: BookingStatus;
  price: number;
};
