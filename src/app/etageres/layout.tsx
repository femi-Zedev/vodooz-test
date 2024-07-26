'use client'
import IconButton from '@/components/ui/IconButton';
import { DisplayMode } from '@/interfaces/global.interface';
import { useGetShelves } from '@/services/book.service';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import React, { PropsWithChildren, Suspense, useEffect, useState } from 'react';
import { BsFillGridFill } from 'react-icons/bs';
import { FaList } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';

function EtagereContent({ children }: PropsWithChildren) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const pathPart = pathName.split('/');
  const slug = pathPart[pathPart.length - 1];

  const [searchQuery, setSearchQuery] = useState('');
  const [displayMode, setDisplayMode] = useState<DisplayMode>(
    searchParams.get('displayMode') as DisplayMode || 'grid'
  ); // Get displayMode from URL or default to 'grid'

  const { data: shelters, isLoading } = useGetShelves({
    variables: {
      offset: 0,
      limit: 10,
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleDisplayModeChange = (newDisplayMode: DisplayMode) => {
    setDisplayMode(newDisplayMode);
    router.replace(`${pathName}?id=${searchParams.get('id')}&displayMode=${displayMode}`);
  };

  return (
    <section className="w-full flex gap-8 pt-28 px-28">
      <hgroup className='max-w-[15%] w-full'>
        <h2 className="body18-semi mb-3 ml-6 uppercase">Les étagères</h2>
        <ul className="flex flex-col gap-1 body16-regular text-gray-700">
          {shelters && shelters.map((shelter: { id: string, slug: string, title: string }) => (
            <Link
              href={{
                pathname: `/etageres/${shelter.slug}`,
                query: { id: shelter.id, displayMode }
              }}
              key={shelter.id}
              className={`ml-6 p-2 ${slug == shelter.slug ? 'bg-orange-50 text-orange-400 border border-orange-100' : ''}`}
            >
              {shelter.title}
            </Link>
          ))}
        </ul>
      </hgroup>

      <div className='flex flex-col gap-y-8 w-full'>
        <div className="flex w-full items-center justify-end gap-2">
          {/* <h3 className='body20-semi'>{pathName.replace('/etageres/', '')} </h3> */}
          <hgroup className='flex'>
            <span className='flex items-center gap-2 rounded-full bg-slate-200 py-2 px-3 mr-4'>
              <IoSearch className='w-5 h-5' />
              <input value={searchQuery} type="search" className='bg-transparent outline-none' />
            </span>
            <IconButton
              icon={<FaList />}
              onClick={() => handleDisplayModeChange('list')}
              isActive={displayMode === 'list'}
            />
            <IconButton
              icon={<BsFillGridFill />}
              onClick={() => handleDisplayModeChange('grid')}
              isActive={displayMode === 'grid'}
            />
          </hgroup>
        </div>
        {children}
      </div>
    </section>
  );
}

export default function EtagereLayout({ children }: PropsWithChildren) {
  return (
    <Suspense fallback={<p>Une erreur s&lsquo;est produite</p>}>
      <EtagereContent>{children}</EtagereContent>
    </Suspense>
  );
}