interface Props {
  title?: string;
}

function LoadingState({ title = 'Loading...' }: Props) {
  return (
    <div className='m-4 flex min-h-1/2 flex-col items-center justify-center gap-3 rounded-xl border'>
      <div className='border-muted border-t-primary h-6 w-6 animate-spin rounded-full border-2' />
      <p className='text-muted-foreground text-sm'>{title}</p>
    </div>
  );
}
export default LoadingState;
