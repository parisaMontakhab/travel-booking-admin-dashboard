'use client';

interface Props {
  disabled: boolean;
  onDelete: () => void;
}

export function DeleteButton({ onDelete, disabled }: Props) {
  return (
    <button
      onClick={onDelete}
      disabled={disabled}
      className='cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-white'
    >
      Delete
    </button>
  );
}
