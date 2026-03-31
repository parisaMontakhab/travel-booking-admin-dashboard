'use client';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { GalleryVerticalEnd } from 'lucide-react';
import Link from 'next/link';

export function OrgSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild size='lg'>
          <Link href='/dashboard/overview'>
            <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg'>
              <GalleryVerticalEnd className='size-4' />
            </div>

            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-medium'>Travel Dashboard</span>
              <span className='text-muted-foreground truncate text-xs'>
                Admin Panel
              </span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
