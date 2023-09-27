import ProgressBar from '@/components/dashboard/progress-bar';
import { DbConnection } from '@/db/src';
import React from 'react';

const PropertyReferals = async () => {
  const categoryList = await DbConnection.instance().query.categories.findMany({
    with: { posts: true },
  });
  const generateRandomColor = (): string =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  return (
    <div className={'my-6 flex flex-col gap-4'}>
      {categoryList.map(({ id, categoryName, posts }, index) => (
        <ProgressBar
          key={index}
          title={categoryName}
          percentage={posts.length}
          color={generateRandomColor()}
        />
      ))}
    </div>
  );
};

export default PropertyReferals;
