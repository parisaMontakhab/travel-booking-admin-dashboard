import { Booking } from '@/types/booking';

export const bookingMockData: Booking[] = [
  {
    id: 1,
    customer: 'Olivia Martin',
    destination: 'Paris',
    date: '2026-05-12',
    status: 'Confirmed',
    price: 1200
  },
  {
    id: 2,
    customer: 'Jackson Lee',
    destination: 'Rome',
    date: '2026-05-15',
    status: 'Pending',
    price: 980
  },
  {
    id: 3,
    customer: 'Isabella Nguyen',
    destination: 'Barcelona',
    date: '2026-05-18',
    status: 'Cancelled',
    price: 760
  },
  {
    id: 4,
    customer: 'William Kim',
    destination: 'Amsterdam',
    date: '2026-05-20',
    status: 'Confirmed',
    price: 1430
  },
  {
    id: 5,
    customer: 'Sofia Davis',
    destination: 'Vienna',
    date: '2026-05-24',
    status: 'Pending',
    price: 890
  }
];
