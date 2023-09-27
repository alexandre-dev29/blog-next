import { DbConnection, posts } from '@/db/src';
import GenerateMdxSource from '@/lib/GenerateMdxSource';
import { Users } from '@/types/allTypes';
import axios from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { eq } from 'drizzle-orm';
import matter from 'gray-matter';
import { Session } from 'next-auth';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cloudinaryUploadImage = async (file: any) => {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`;
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'community-blog'); // note that you must create an upload preset on your cloudinary and paste the name here
  const responseData = await axios.post(url, data);
  return responseData.data.secure_url;
};

const normalizeSrc = (src: string) => (src[0] === '/' ? src.slice(1) : src);
export function cloudinaryLoader({ src, width, quality }: any) {
  const params = [
    'f_auto',
    'c_limit',
    'w_' + width,
    'q_' + (quality || 'auto'),
  ];
  if (src.includes('https://res.cloudinary.com')) {
    const puredSrc = src.split(
      `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload/`
    )[1];
    return `https://res.cloudinary.com/${
      process.env.NEXT_PUBLIC_CLOUDINARY_NAME
    }/image/upload/${params.join(',')}/${normalizeSrc(puredSrc)}`;
  } else {
    return `${src}`;
  }
}

export function getUserFromSession(session: Session | null): Users | null {
  const user = session?.user;
  return user ? JSON.parse(`${user?.image}`) : null;
}

export const GetPreviewImage = async (imageUrl: string) =>
  (await axios.post('/api/imagePreview', { imageUrl: imageUrl })).data as {
    imageData: string;
  };
