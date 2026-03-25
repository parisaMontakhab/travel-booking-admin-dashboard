'use client';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

type AppMutationOptions<TData, TVariables> = UseMutationOptions<
  TData,
  Error,
  TVariables
>;

export function useAppMutation<TData, TVariables>(
  options: AppMutationOptions<TData, TVariables>
) {
  const { onSuccess, onError, ...rest } = options;

  return useMutation({
    ...rest,
    onSuccess: async (data, variables, onMutateResult, context) => {
      toast.success('Operation completed successfully');
      await onSuccess?.(data, variables, onMutateResult, context);
    },
    onError: (error, variables, onMutateResult, context) => {
      toast.error('Operation failed');
      onError?.(error, variables, onMutateResult, context);
    }
  });
}
