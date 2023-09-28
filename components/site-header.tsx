import { SiteNavigationMenu } from '@/components/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import UserConnection from '@/components/user-connection';
import { categories, DbConnection } from '@/db/src';
import { getUserFromSession } from '@/lib/utils';
import { getServerSession } from 'next-auth';

export async function SiteHeader() {
  const session = await getServerSession();
  const userInformation = getUserFromSession(session);
  const categorylist = await DbConnection.instance()
    .select({
      idCategory: categories.id,
      categorySlug: categories.categorySlug,
      categoryName: categories.categoryName,
      categoryDescription: categories.categoryDescription,
    })
    .from(categories);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center space-x-8 sm:justify-between sm:space-x-0 w-[85vw] mx-auto">
        <SiteNavigationMenu categories={categorylist} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            <UserConnection userData={userInformation} />
          </nav>
        </div>
      </div>
    </header>
  );
}
