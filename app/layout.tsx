import './global.css';
import { CommandRender } from '@/components/command/command-render';
import { SessionProvider } from '@/components/SessionProvider';
import { SiteHeader } from '@/components/site-header';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { siteConfig } from '@/config/site';
import { categories, DbConnection, posts } from '@/db/src';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_FRONT_URL}`),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  keywords: siteConfig.keyWords,
  authors: siteConfig.authors,
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categoryList = await DbConnection.instance()
    .select({ slug: categories.categorySlug, title: categories.categoryName })
    .from(categories);
  const postList = await DbConnection.instance()
    .select({ slug: posts.postSlug, title: posts.postTitle })
    .from(posts);
  const session = await getServerSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.className
        )}
      >
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SiteHeader />
            {children} <TailwindIndicator />
            <CommandRender categories={categoryList} posts={postList} />
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
