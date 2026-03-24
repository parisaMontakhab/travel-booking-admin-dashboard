import { z } from 'zod';
export const createCustomerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.email('Invalid email address'),
  phone: z.string().optional()
});

export type CreateCustomerForm = z.infer<typeof createCustomerSchema>;
