export type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  created_at: string;
};

export type CreateCustomerPayload = {
  name: string;
  email: string;
  phone?: string;
};
