'use client';
import PageContainer from '@/components/layout/page-container';
import EmptyState from '@/components/states/EmptyState';
import ErrorState from '@/components/states/ErrorState';
import LoadingState from '@/components/states/LoadingState';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { getBookings } from '@/services/bookings';
import { getCustomers } from '@/services/customers';
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';

export default function ReviewPage() {
  //bookings
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
    .filter((booking) => booking.status === 'Confirmed')
    .reduce((sum, booking) => sum + Number(booking.price || 0), 0)
    .toLocaleString();

  //customers
  const {
    data: customers = [],
    isLoading: isLoadingCustomers,
    isError: isErrorCustomers
  } = useQuery({
    queryKey: ['customers'],
    queryFn: getCustomers
  });

  const totalCustomers = customers.length;

  //Badge information
  const now = new Date();
  const currentMonth = now.getMonth();
  const lastMonth = currentMonth - 1;

  //Total Revenue Badge
  const confirmed = bookings?.filter((b) => b.status === 'Confirmed');

  const currentRevenue = confirmed
    .filter((b) => new Date(b.date).getMonth() === currentMonth)
    .reduce((sum, b) => sum + b.price, 0);

  const lastRevenue = confirmed
    .filter((b) => new Date(b.date).getMonth() === lastMonth)
    .reduce((sum, b) => sum + b.price, 0);

  let revenueChange = 0;

  if (lastRevenue !== 0) {
    revenueChange = ((currentRevenue - lastRevenue) / lastRevenue) * 100;
  }

  const revenueChangeFormatted = revenueChange.toFixed(1);

  //Confirmed Bookings Badge
  const currentConfirmedBookings = confirmed.filter(
    (b) => new Date(b.date).getMonth() === currentMonth
  ).length;

  const lastConfirmedBookings = confirmed.filter(
    (b) => new Date(b.date).getMonth() === lastMonth
  ).length;

  let confirmedBookingsChange = 0;

  if (lastConfirmedBookings !== 0) {
    confirmedBookingsChange =
      ((currentConfirmedBookings - lastConfirmedBookings) /
        lastConfirmedBookings) *
      100;
  }

  const confirmedBookingsChangeFormatted = confirmedBookingsChange.toFixed(1);

  //Total Bookings Badge
  const currentBookings = bookings.filter(
    (b) => new Date(b.date).getMonth() === currentMonth
  ).length;

  const lastBookings = bookings.filter(
    (b) => new Date(b.date).getMonth() === currentMonth - 1
  ).length;

  let bookingsChange = 0;

  if (lastBookings !== 0) {
    bookingsChange = ((currentBookings - lastBookings) / lastBookings) * 100;
  }

  const bookingsChangeFormatted = bookingsChange.toFixed(1);

  //Total Customers Badge
  const currentCustomers = customers.filter(
    (customer) => new Date(customer.created_at).getMonth() === currentMonth
  ).length;

  const lastCustomers = customers.filter(
    (customer) => new Date(customer.created_at).getMonth() === currentMonth - 1
  ).length;

  let customersChange = 0;

  if (lastCustomers !== 0) {
    customersChange =
      ((currentCustomers - lastCustomers) / lastCustomers) * 100;
  }

  const customersChangeFormatted = customersChange.toFixed(1);

  //TopCustomer
  const topCustomer = customers
    .map((customer) => {
      const count = bookings?.filter(
        (booking) => booking.customer_id === customer.id
      ).length;

      return {
        name: customer.name,
        count
      };
    })
    .sort((a, b) => b.count - a.count)[0];

  //TopDestination
  const destinationCounts: Record<string, number> = {};

  bookings.forEach((booking) => {
    if (!destinationCounts[booking.destination]) {
      destinationCounts[booking.destination] = 0;
    }

    destinationCounts[booking.destination]++;
  });

  const topDestinationEntry = Object.entries(destinationCounts).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const topDestination = topDestinationEntry
    ? {
        destination: topDestinationEntry[0],
        count: topDestinationEntry[1]
      }
    : null;

  //TopMonth
  const monthCounts: Record<string, number> = {};

  bookings.forEach((booking) => {
    const month = new Date(booking.date).toLocaleString('en-US', {
      month: 'long'
    });

    if (!monthCounts[month]) {
      monthCounts[month] = 0;
    }

    monthCounts[month]++;
  });

  const topMonthEntry = Object.entries(monthCounts).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const topMonth = topMonthEntry
    ? {
        month: topMonthEntry[0],
        count: topMonthEntry[1]
      }
    : null;

  if (isLoadingBookings || isLoadingCustomers) return <LoadingState />;

  if (isErrorBookings || isErrorCustomers) return <ErrorState />;

  if (!customers.length || !bookings.length) return <EmptyState />;

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Dashboard Overview
            </h2>
            <p className='text-muted-foreground text-sm'>
              Monitor bookings, customers, revenue, and travel activity.
            </p>
          </div>
        </div>

        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                ${totalRevenue}
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  {revenueChange >= 0 ? (
                    <IconTrendingUp className='size-4' />
                  ) : (
                    <IconTrendingDown className='size-4' />
                  )}
                  {revenueChange > 0
                    ? `+${revenueChangeFormatted}%`
                    : `${revenueChangeFormatted}%`}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='flex items-center gap-2 font-medium'>
                {revenueChange >= 0
                  ? 'Revenue is growing'
                  : 'Revenue is decreasing'}

                {revenueChange >= 0 ? (
                  <IconTrendingUp className='size-4' />
                ) : (
                  <IconTrendingDown className='size-4' />
                )}
              </div>

              <div className='text-muted-foreground'>
                Based on all confirmed bookings
              </div>
            </CardFooter>
          </Card>

          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Total Bookings</CardDescription>

              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                {totalBookings}
              </CardTitle>

              <CardAction>
                <Badge variant='outline'>
                  {bookingsChange >= 0 ? (
                    <IconTrendingUp className='size-4' />
                  ) : (
                    <IconTrendingDown className='size-4' />
                  )}

                  {bookingsChange > 0
                    ? `+${bookingsChangeFormatted}%`
                    : `${bookingsChangeFormatted}%`}
                </Badge>
              </CardAction>
            </CardHeader>

            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='flex items-center gap-2 font-medium'>
                {bookingsChange >= 0
                  ? 'More bookings this month'
                  : 'Fewer bookings this month'}

                {bookingsChange >= 0 ? (
                  <IconTrendingUp className='size-4' />
                ) : (
                  <IconTrendingDown className='size-4' />
                )}
              </div>

              <div className='text-muted-foreground'>Includes all statuses</div>
            </CardFooter>
          </Card>

          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Confirmed Bookings</CardDescription>

              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                {confirmed.length}
              </CardTitle>

              <CardAction>
                <Badge variant='outline'>
                  {confirmedBookingsChange >= 0 ? (
                    <IconTrendingUp className='size-4' />
                  ) : (
                    <IconTrendingDown className='size-4' />
                  )}

                  {confirmedBookingsChange > 0
                    ? `+${confirmedBookingsChangeFormatted}%`
                    : `${confirmedBookingsChangeFormatted}%`}
                </Badge>
              </CardAction>
            </CardHeader>

            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='flex items-center gap-2 font-medium'>
                {confirmedBookingsChange >= 0
                  ? 'Strong confirmation rate'
                  : 'Confirmation rate dropped'}

                {confirmedBookingsChange >= 0 ? (
                  <IconTrendingUp className='size-4' />
                ) : (
                  <IconTrendingDown className='size-4' />
                )}
              </div>

              <div className='text-muted-foreground'>
                Confirmed vs pending and cancelled
              </div>
            </CardFooter>
          </Card>

          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Total Customers</CardDescription>

              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                {totalCustomers}
              </CardTitle>

              <CardAction>
                <Badge variant='outline'>
                  {customersChange >= 0 ? (
                    <IconTrendingUp className='size-4' />
                  ) : (
                    <IconTrendingDown className='size-4' />
                  )}

                  {customersChange > 0
                    ? `+${customersChangeFormatted}%`
                    : `${customersChangeFormatted}%`}
                </Badge>
              </CardAction>
            </CardHeader>

            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='flex items-center gap-2 font-medium'>
                {customersChange >= 0
                  ? 'Customer growth is increasing'
                  : 'Customer growth is decreasing'}

                {customersChange >= 0 ? (
                  <IconTrendingUp className='size-4' />
                ) : (
                  <IconTrendingDown className='size-4' />
                )}
              </div>

              <div className='text-muted-foreground'>
                Total registered customers in the system
              </div>
            </CardFooter>
          </Card>
        </div>

        <div>
          <h3 className='text-lg font-semibold'>Top Insights</h3>
          <p className='text-muted-foreground text-sm'>
            Quick highlights from your booking data
          </p>
        </div>

        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs md:grid-cols-3 lg:grid-cols-3'>
          {topCustomer && (
            <Card>
              <CardHeader>
                <CardDescription>Top Customer</CardDescription>
                <CardTitle className='text-2xl font-semibold'>
                  {topCustomer.name}
                </CardTitle>
              </CardHeader>

              <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                <div className='font-medium'>{topCustomer.count} bookings</div>
                <div className='text-muted-foreground'>
                  Customer with the highest number of bookings
                </div>
              </CardFooter>
            </Card>
          )}

          {topDestination && (
            <Card>
              <CardHeader>
                <CardDescription>Top Destination</CardDescription>
                <CardTitle className='text-2xl font-semibold'>
                  {topDestination.destination}
                </CardTitle>
              </CardHeader>

              <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                <div className='font-medium'>
                  {topDestination.count} bookings
                </div>
                <div className='text-muted-foreground'>
                  Most booked destination in the system
                </div>
              </CardFooter>
            </Card>
          )}

          {topMonth && (
            <Card>
              <CardHeader>
                <CardDescription>Top Month</CardDescription>
                <CardTitle className='text-2xl font-semibold'>
                  {topMonth.month}
                </CardTitle>
              </CardHeader>

              <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                <div className='font-medium'>{topMonth.count} bookings</div>
                <div className='text-muted-foreground'>
                  Month with the highest booking activity
                </div>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
