interface Props {
  title?: string;
  description?: string;
}

function EmptyState({
  title = 'No data found',
  description = 'There is nothing to display right now.'
}: Props) {
  return (
    <div className='flex min-h-50 flex-col items-center justify-center rounded-xl border text-center'>
      <h2 className='text-lg font-semibold'>{title}</h2>
      <p className='text-muted-foreground mt-2 text-sm'>{description}</p>
    </div>
  );
}
export default EmptyState;
