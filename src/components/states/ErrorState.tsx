interface Props {
  title?: string;
  description?: string;
}

function ErrorState({
  title = 'Something went wrong',
  description = 'Please try again later.'
}: Props) {
  return (
    <div className='m-4 flex min-h-1/2 flex-col items-center justify-center rounded-xl border text-center'>
      <h2 className='text-lg font-semibold'>{title}</h2>
      <p className='text-muted-foreground mt-2 text-sm'>{description}</p>
    </div>
  );
}
export default ErrorState;
