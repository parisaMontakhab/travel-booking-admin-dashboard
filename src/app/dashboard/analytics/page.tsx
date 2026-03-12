import BookingStatusChart from '@/features/analytics/components/ booking-status-chart';
import RevenueChart from '@/features/analytics/components/ revenue-chart';
import TopDestinationsChart from '@/features/analytics/components/ top-destinations-chart';
import { getBookings } from '@/services/bookings';
import { getCustomers } from '@/services/customers';

async function AnalyticsPage() {
  const bookings = await getBookings();
  const customers = await getCustomers();

  const totalBookings = bookings.length;
  const totalCustomers = customers.length;

  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + booking.price,
    0
  );

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
          <p className='text-2xl font-bold'>${totalRevenue}</p>
        </div>

        <div className='bg-background rounded-xl border p-4'>
          <p className='text-muted-foreground text-sm'>Total Bookings</p>
          <p className='text-2xl font-bold'>{totalBookings}</p>
        </div>

        <div className='bg-background rounded-xl border p-4'>
          <p className='text-muted-foreground text-sm'>Customers</p>
          <p className='text-2xl font-bold'>{totalCustomers}</p>
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
