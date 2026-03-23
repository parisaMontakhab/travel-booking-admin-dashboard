import { ActiveThemeProvider } from '@/components/themes/active-theme';
import { fontVariables } from '@/components/themes/font.config';
import ThemeProvider from '@/components/themes/theme-provider';
import { DEFAULT_THEME } from '@/components/themes/theme.config';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { ReactQueryProvider } from '@/providers/react-query-provider';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import NextTopLoader from 'nextjs-toploader';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import '../styles/globals.css';

const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b'
};

export const metadata: Metadata = {
  title: 'Next Shadcn',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get('active_theme')?.value;
  const themeToApply = activeThemeValue || DEFAULT_THEME;

  return (
    <html lang='en' suppressHydrationWarning data-theme={themeToApply}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `
          }}
        />
      </head>
      <body
        className={cn(
          'bg-background overflow-x-hidden overscroll-none font-sans antialiased',
          fontVariables
        )}
      >
        <ClerkProvider>
          <NuqsAdapter>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
              enableColorScheme
            >
              <ActiveThemeProvider initialTheme={themeToApply}>
                <ReactQueryProvider>
                  <NextTopLoader color='var(--primary)' showSpinner={false} />
                  <Toaster />
                  {children}
                </ReactQueryProvider>
              </ActiveThemeProvider>
            </ThemeProvider>
          </NuqsAdapter>
        </ClerkProvider>
      </body>
    </html>
  );
}
