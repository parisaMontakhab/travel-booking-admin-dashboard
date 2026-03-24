import { z } from 'zod';

export const createBookingSchema = z.object({
  customer: z.string().min(2, 'Customer name is required'),
  destination: z.string().min(2, 'Destination is required'),
  date: z.string(),
  price: z.number().min(1, 'Price must be greater than 0'),
  status: z.enum(['Pending', 'Confirmed', 'Cancelled'])
});

export type CreateBookingForm = z.infer<typeof createBookingSchema>;

export const createCustomerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.email('Invalid email address'),
  phone: z.string().optional()
});

export type CreateCustomerForm = z.infer<typeof createCustomerSchema>;
