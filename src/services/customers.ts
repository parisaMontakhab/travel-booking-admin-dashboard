import { supabase } from '@/lib/supabase';
import { CreateCustomerPayload, Customer } from '@/types/customer';

function normalizeCustomerPayload(data: CreateCustomerPayload) {
  return {
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone?.trim()
  };
}

export async function getCustomers(): Promise<Customer[]> {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch customers: ${error.message}`);
  }

  return data ?? [];
}

export async function getCustomerById(id: number | string): Promise<Customer> {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', String(id))
    .single();

  if (error) {
    throw new Error(`Failed to fetch customer: ${error.message}`);
  }

  return data;
}

export async function createCustomer(
  data: CreateCustomerPayload
): Promise<Customer> {
  const payload = {
    id: crypto.randomUUID(),
    ...normalizeCustomerPayload(data)
  };

  const { data: created, error } = await supabase
    .from('customers')
    .insert(payload)
    .select();

  if (error) {
    throw new Error(`Failed to create customer: ${error.message}`);
  }

  if (!created || created.length === 0) {
    throw new Error('Failed to create customer: no data returned.');
  }

  return created[0];
}

export async function updateCustomer(
  id: number | string,
  data: CreateCustomerPayload
): Promise<Customer> {
  const payload = normalizeCustomerPayload(data);

  const { data: updated, error } = await supabase
    .from('customers')
    .update(payload)
    .eq('id', String(id))
    .select();

  if (error) {
    throw new Error(`Failed to update customer: ${error.message}`);
  }

  if (!updated || updated.length === 0) {
    throw new Error('Failed to update customer: customer not found.');
  }

  return updated[0];
}

export async function deleteCustomer(
  id: number | string
): Promise<{ success: true }> {
  const { error } = await supabase
    .from('customers')
    .delete()
    .eq('id', String(id));

  if (error) {
    throw new Error(`Failed to delete customer: ${error.message}`);
  }

  return { success: true };
}
