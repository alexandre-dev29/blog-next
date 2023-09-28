'use client';

import ArticleCard from '@/components/common/article-card';
import { Button } from '@/components/ui/button';
import { Posts } from '@/types/allTypes';
import axios from 'axios';
import { Loader2, MailIcon, PhoneCall } from 'lucide-react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

enum ElementNatureEdit {
  Biography,
  PhoneNumber,
  UserTitle,
}

interface ProfileViewContentProps {
  initialData: any;
}

const ProfileViewContent = ({ initialData }: ProfileViewContentProps) => {
  const {
    avatarImage,
    fullName,
    userTitle,
    biography,
    email,
    phoneNumber,
    id,
  } = initialData;
  const [isDisabled, setIsDisabled] = useState(true);
  const biographyReference = useRef(biography);
  const phoneNumberReference = useRef(phoneNumber);
  const userTitleReference = useRef(userTitle);
  const [isLoading, setIsLoading] = useState<boolean>();

  const handleChange = (
    event: ContentEditableEvent,
    elementNature: ElementNatureEdit
  ) => {
    switch (elementNature) {
      case ElementNatureEdit.Biography:
        biographyReference.current = event.target.value;
        break;
      case ElementNatureEdit.PhoneNumber:
        phoneNumberReference.current = event.target.value;
        break;
      case ElementNatureEdit.UserTitle:
        userTitleReference.current = event.target.value;
    }

    if (
      biography === biographyReference.current &&
      phoneNumber == phoneNumberReference.current &&
      userTitle == userTitleReference.current
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };
  const persistInformation = async () => {
    setIsLoading(true);
    const response = await axios.put(
      '/api/users',
      JSON.stringify({
        userTitle: userTitleReference.current,
        biography: biographyReference.current,
        phoneNumber: phoneNumberReference.current,
        id: id,
      })
    );
    if (response.data.messageType === 'success') {
      setIsDisabled(true);
    }
    setIsLoading(false);
  };
  return (
    <div className={'p-6'}>
      <h3 className={'text-2xl font-extrabold'}>Profile</h3>
      <article className={''}>
        <div
          className={
            'rounded-lg bg-background shadow-md transition-all duration-500 hover:shadow-lg'
          }
        >
          <div className="mt-4 h-[20vh] rounded-t-lg bg-gradient-to-r from-amber-200 via-rose-200 to-pink-300"></div>
          <div className="relative rounded-lg border-x-2 border-b-2 bg-background py-8">
            <div
              className={
                'absolute -top-14 left-10 w-fit rounded-full bg-white p-2'
              }
            >
              <Image
                alt={`${fullName} avatar`}
                src={`${avatarImage}`}
                width={120}
                height={120}
                className={'h-auto w-auto rounded-full'}
              />
            </div>

            <div className={'absolute right-10 '}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Button disabled={isDisabled} onClick={persistInformation}>
                  Update informations
                </Button>
              )}
            </div>

            <div className={'mt-12 flex flex-col gap-2 px-8'}>
              <h5 className="text-xl font-bold text-gray-600 dark:text-white">
                {fullName}
              </h5>
              <ContentEditable
                html={`${userTitleReference.current}`}
                disabled={false}
                onChange={(event) => {
                  handleChange(event, ElementNatureEdit.UserTitle);
                }}
                contentEditable={false}
                style={{
                  padding: '10px',
                  borderColor: 'red',
                  outlineColor: 'var(--tw-ring-color)',
                  display: 'inline',
                  width: 'fit-content',
                }}
              />
              <div className={'flex gap-8 items-center '}>
                <p className={'flex text-gray-400 items-center gap-2'}>
                  <MailIcon type={'bold'} color="blueviolet" /> {email}
                </p>
                <div className={'flex items-center'}>
                  <PhoneCall type="bold" color="blueviolet" />
                  <ContentEditable
                    html={`${phoneNumberReference.current}`}
                    disabled={false}
                    onChange={(event) => {
                      handleChange(event, ElementNatureEdit.PhoneNumber);
                    }}
                    style={{
                      padding: '0 10px',
                      borderColor: 'red',
                      outlineColor: 'var(--tw-ring-color)',
                    }}
                  />
                </div>
              </div>
              <ContentEditable
                html={`${biographyReference.current}`}
                disabled={false}
                onChange={(event) => {
                  handleChange(event, ElementNatureEdit.Biography);
                }}
                style={{
                  padding: '10px',
                  borderColor: 'red',
                  outlineColor: 'var(--tw-ring-color)',
                }}
              />
              {/*<p>{biography}</p>*/}
            </div>
          </div>
        </div>
      </article>
      <article className={'mt-8'}>
        <h5 className={'text-center text-3xl text-gray-500'}>
          Some of your posts
        </h5>

        <div className={'grid grid-cols-4 gap-8 py-8'}>
          {initialData.posts?.map((currentPost: Posts) => (
            <ArticleCard
              key={currentPost.id}
              currentPost={currentPost}
              withAuthor={false}
            />
          ))}
        </div>
      </article>
    </div>
  );
};

export default ProfileViewContent;
