import { apiFetch } from '@/lib/api';
import { Customer } from '@/types/customer';

export function getCustomers() {
  return apiFetch<Customer[]>('http://localhost:3000/api/customers');
}
