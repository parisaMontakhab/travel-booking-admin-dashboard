export type Customer = {
  id: number;
  name: string;
  email: string;
  bookings: number;
  totalSpent: number;
};

export type CreateCustomerPayload = Omit<Customer, 'id'>;
