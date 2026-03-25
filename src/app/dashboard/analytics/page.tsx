import BookingStatusChart from '@/features/analytics/components/ booking-status-chart';
import RevenueChart from '@/features/analytics/components/ revenue-chart';
import TopDestinationsChart from '@/features/analytics/components/ top-destinations-chart';

async function AnalyticsPage() {
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
          <p className='text-2xl font-bold'>$450</p>
        </div>

        <div className='bg-background rounded-xl border p-4'>
          <p className='text-muted-foreground text-sm'>Total Bookings</p>
          <p className='text-2xl font-bold'>5</p>
        </div>

        <div className='bg-background rounded-xl border p-4'>
          <p className='text-muted-foreground text-sm'>Customers</p>
          <p className='text-2xl font-bold'>6</p>
        </div>
      </div>

      {/* Chart placeholder */}
      <div className='bg-background rounded-xl border p-6'>
        <p className='text-muted-foreground mb-2 text-sm'>Revenue overview</p>
        <div className='text-muted-foreground flex h-64 items-center justify-center'>
          <RevenueChart />
        </div>
      </div>
      <div className='flex w-full flex-row items-center justify-between gap-4'>
        {/* Booking status */}
        <div className='bg-background w-full rounded-xl border p-6'>
          <p className='text-muted-foreground mb-2 text-sm'>Booking Status</p>
          <BookingStatusChart />
        </div>

        {/* Top destination  */}
        <div className='bg-background w-full rounded-xl border p-6'>
          <p className='text-muted-foreground mb-2 text-sm'>Top Destinations</p>

          <TopDestinationsChart />
        </div>
      </div>
    </div>
  );
}
export default AnalyticsPage;
