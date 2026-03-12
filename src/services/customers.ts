import { API_ROUTES } from '@/constants/api-routes';
import { apiFetch } from '@/lib/api';
import { Customer } from '@/types/customer';

export function getCustomers() {
  return apiFetch<Customer[]>(API_ROUTES.CUSTOMERS);
}
