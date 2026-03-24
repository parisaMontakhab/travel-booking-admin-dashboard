export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export type CreateCustomerPayload = Omit<Customer, 'id'>;
