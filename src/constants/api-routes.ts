export const API_ROUTES = {
  BOOKINGS: {
    BASE: '/bookings',
    byId: (id: number | string) => `/bookings/${id}`
  },
  CUSTOMERS: {
    BASE: '/customers',
    byId: (id: number | string) => `/customers/${id}`
  }
} as const;
