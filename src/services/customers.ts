import { API_ROUTES } from '@/constants/api-routes';
import { apiDelete, apiGet, apiPost, apiPut } from '@/lib/api';
import { CreateCustomerPayload, Customer } from '@/types/customer';

export function getCustomers() {
  return apiGet<Customer[]>(API_ROUTES.CUSTOMERS.BASE);
}

export function getCustomerById(id: number | string) {
  return apiGet<Customer>(API_ROUTES.CUSTOMERS.byId(id));
}

export function createCustomer(data: CreateCustomerPayload) {
  return apiPost<Customer>(API_ROUTES.CUSTOMERS.BASE, data);
}

export function updateCustomer(
  id: number | string,
  data: CreateCustomerPayload
) {
  return apiPut<Customer>(API_ROUTES.CUSTOMERS.byId(id), data);
}

export function deleteCustomer(id: number | string) {
  return apiDelete<Customer>(API_ROUTES.CUSTOMERS.byId(id));
}
