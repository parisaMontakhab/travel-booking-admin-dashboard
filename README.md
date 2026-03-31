<h1 align="center">Travel Booking Admin Dashboard</h1>

<div align="center">
Admin dashboard for managing bookings, customers, and analytics.
Built with Next.js, shadcn/ui, Tailwind CSS, TypeScript, TanStack Query, Clerk, and Supabase.
</div>

<br />

## Overview

This project is a travel booking admin dashboard built as a portfolio project.

It includes:

- booking management
- customer management
- analytics dashboard
- overview page with KPI cards and top insights
- real backend integration with Supabase
- authentication with Clerk

The goal of this project was to practice building a complete admin dashboard UI with real data, CRUD operations, charts, and responsive layouts.

---

## Tech Stack

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **TanStack Query**
- **Supabase**
- **Clerk**
- **React Hook Form**
- **Zod**

---

## Features

- Dashboard overview with:

  - Total Revenue
  - Total Bookings
  - Confirmed Bookings
  - Total Customers
  - Top Customer
  - Top Destination
  - Top Month

- Bookings management:

  - create booking
  - edit booking
  - delete booking
  - booking details page
  - search bookings
  - responsive bookings table

- Customers management:

  - create customer
  - edit customer
  - delete customer
  - customer details page
  - search customers
  - responsive customers table

- Analytics page with real charts and statistics

- Real backend with Supabase

- Authentication with Clerk

- Loading, error, and empty states

- Responsive design for desktop, tablet, and mobile

---

## Project Structure

```plaintext
src/
├── app/
│   ├── auth/
│   └── dashboard/
│       ├── overview/
│       ├── bookings/
│       ├── customers/
│       └── analytics/
├── components/
│   ├── layout/
│   └── ui/
├── services/
├── lib/
├── hooks/
└── types/
```
