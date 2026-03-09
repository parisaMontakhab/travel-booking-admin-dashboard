import { NavItem } from '@/types';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: true,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: 'Bookings',
    url: '/dashboard/bookings',
    icon: 'product',
    isActive: false,
    shortcut: ['b', 'k'],
    items: []
  },
  {
    title: 'Customers',
    url: '/dashboard/customers',
    icon: 'teams',
    isActive: false,
    shortcut: ['c', 'u'],
    items: []
  },
  {
    title: 'Analytics',
    url: '/dashboard/analytics',
    icon: 'kanban',
    isActive: false,
    shortcut: ['a', 'n'],
    items: []
  }
];
