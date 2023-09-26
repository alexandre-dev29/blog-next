'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import ModalImageElement from '@/components/images/modal-image-element';

const CustomMainImage = ({
  postImageSrc,
  postTitle,
  blurImage,
  customHeight,
  customWidth,
  hasBlurImage,
  customClassName,
}: {
  postTitle: string;
  postImageSrc: string;
  blurImage?: string;
  hasBlurImage: boolean;
  customWidth?: number | `${number}` | undefined;
  customHeight?: number | `${number}` | undefined;
  customClassName?: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ModalImageElement
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        imageSrc={postImageSrc}
        hasBlurImage={hasBlurImage}
        blurData={blurImage}
      />
      <Image
        width={customWidth ?? 1800}
        height={customHeight ?? 600}
        priority={true}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={`${postTitle} image`}
        src={postImageSrc}
        placeholder={hasBlurImage ? 'blur' : 'empty'}
        blurDataURL={blurImage}
        style={{ transform: 'translate3d(0, 0, 0)' }}
        className={`${customClassName} cursor-pointer brightness-100 transition-all hover:brightness-90`}
        onClick={() => setIsModalOpen(true)}
      />
    </>
  );
};

export default CustomMainImage;
