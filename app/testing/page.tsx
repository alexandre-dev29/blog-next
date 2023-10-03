'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Page = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className={'w-full h-[80vh] flex justify-center items-center'}>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Click here
      </Button>
    </div>
  );
};

export default Page;
