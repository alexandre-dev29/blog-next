import { SiteNavigationMenu } from '@/components/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import UserConnection from '@/components/user-connection';
import { categories, DbConnection } from '@/db/src';

export async function SiteHeader() {
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
      <div className="flex h-16 items-center  sm:justify-between sm:space-x-0 md:w-[85vw] mx-auto">
        <SiteNavigationMenu categories={categorylist} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            <UserConnection />
          </nav>
        </div>
      </div>
    </header>
  );
}
