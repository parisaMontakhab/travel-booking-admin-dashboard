'use client';
import EmptyState from '@/components/states/EmptyState';
import ErrorState from '@/components/states/ErrorState';
import LoadingState from '@/components/states/LoadingState';
import BookingStatusChart from '@/features/analytics/components/ booking-status-chart';
import RevenueChart from '@/features/analytics/components/ revenue-chart';
import TopDestinationsChart from '@/features/analytics/components/ top-destinations-chart';
import { getBookings } from '@/services/bookings';
import { getCustomers } from '@/services/customers';
import { useQuery } from '@tanstack/react-query';

function AnalyticsPage() {
  const {
    data: customers = [],
    isLoading: isLoadingCustomers,
    isError: isErrorCustomers
  } = useQuery({
    queryKey: ['customers'],
    queryFn: getCustomers
  });

  const {
    data: bookings = [],
    isLoading: isLoadingBookings,
    isError: isErrorBookings
  } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings
  });

  const totalBookings = bookings.length;

  const totalRevenue = bookings
    .map((booking) => booking.price)
    .reduce((a, b) => {
      return a + b;
    }, 0)
    .toLocaleString();

  const totalCustomers = customers.length;

  if (isLoadingBookings || isLoadingCustomers) return <LoadingState />;
  if (isErrorBookings || isErrorCustomers) return <ErrorState />;
  if (!bookings.length || !customers.length) return <EmptyState />;

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
          <RevenueChart bookings={bookings} />
        </div>
      </div>
      <div className='flex w-full flex-col items-center justify-between gap-4 md:flex-row'>
        {/* Booking status */}
        <div className='bg-background w-full rounded-xl border p-2 md:p-6'>
          <p className='text-muted-foreground mb-2 text-sm'>Booking Status</p>
          <BookingStatusChart bookings={bookings} />
        </div>

        {/* Top destination  */}
        <div className='bg-background w-full rounded-xl border p-2 md:p-6'>
          <p className='text-muted-foreground mb-2 text-sm'>Top Destinations</p>

          <TopDestinationsChart bookings={bookings} />
        </div>
      </div>
    </div>
  );
}
export default AnalyticsPage;
