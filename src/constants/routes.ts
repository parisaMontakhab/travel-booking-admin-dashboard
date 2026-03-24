export const ROUTES = {
  DASHBOARD: '/dashboard',

  BOOKINGS: {
    LIST: '/dashboard/bookings',
    NEW: '/dashboard/bookings/new',
    DETAIL: (id: number | string) => `/dashboard/bookings/${id}`,
    EDIT: (id: number | string) => `/dashboard/bookings/${id}/edit`
  },

  CUSTOMERS: {
    LIST: '/dashboard/customers',
    NEW: '/dashboard/customers/new',
    DETAIL: (id: number | string) => `/dashboard/customers/${id}`,
    EDIT: (id: number | string) => `/dashboard/customers/${id}/edit`
  }
} as const;
