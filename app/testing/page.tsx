'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const Page = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const formSchema = z.object({
    imageUrl: z.string().url({
      message: 'Please write a correct url.',
    }),
    altText: z
      .string()
      .min(5, { message: 'the alt text must have at least 5 letter' }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: '',
      altText: '',
    },
  });
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" />
    </div>
  );
};

export default Page;
