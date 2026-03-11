function AnalyticsPage() {
  return (
    <div className='space-y-6 p-6'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>Analytics</h1>
        <p className='text-muted-foreground'>
          Overview of bookings, customers and revenue.
        </p>
      </div>

      {/* Stats Cards */}
      <div className='grid gap-4 md:grid-cols-3'>
        <div className='bg-background rounded-xl border p-4'>
          <p className='text-muted-foreground text-sm'>Total Revenue</p>
          <p className='text-2xl font-bold'>$12,450</p>
        </div>

        <div className='bg-background rounded-xl border p-4'>
          <p className='text-muted-foreground text-sm'>Total Bookings</p>
          <p className='text-2xl font-bold'>23</p>
        </div>

        <div className='bg-background rounded-xl border p-4'>
          <p className='text-muted-foreground text-sm'>Customers</p>
          <p className='text-2xl font-bold'>15</p>
        </div>
      </div>

      {/* Chart placeholder */}
      <div className='bg-background rounded-xl border p-6'>
        <p className='text-muted-foreground mb-2 text-sm'>Revenue overview</p>

        <div className='text-muted-foreground flex h-64 items-center justify-center'>
          Chart will go here
        </div>
      </div>
    </div>
  );
}
export default AnalyticsPage;
