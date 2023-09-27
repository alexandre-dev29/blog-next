import EditCategoryForm from '@/app/dashboard/categories/edit/[id]/edit-category-form';
import { categories, DbConnection } from '@/db/src';
import { selectCategoriesSchema } from '@/types/allTypes';
import { eq } from 'drizzle-orm';

export default async function Index({ params }: { params: { id: string } }) {
  const initialData = await DbConnection.instance().query.categories.findFirst({
    where: eq(categories.id, params.id),
  });

  return (
    <EditCategoryForm
      categoryInitialData={selectCategoriesSchema.parse(initialData)}
    />
  );
}
