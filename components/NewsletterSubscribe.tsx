import { Input } from '@/components/ui/input';

export const NewsletterSubscribe = () => {
  return (
    <section className={'p-16 bg-gray-800 flex justify-center'}>
      <div
        className={
          'p-8 border-2 border-teal-600 rounded-xl flex w-fit gap-12 items-center'
        }
      >
        <div className={'w-3/4'}>
          <h3 className={'text-white capitalize text-3xl font-bold'}>
            Subscribe to newsletter
          </h3>
          <p className={'text-muted-foreground '}>
            Discover tips, technical guides, and best practices in our monthly
            newsletter for developers.
          </p>
        </div>
        <div>
          <Input
            placeholder={'Your Email adress'}
            className={'min-w-[400px]'}
          />
        </div>
      </div>
    </section>
  );
};
