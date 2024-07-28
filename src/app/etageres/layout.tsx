'use client'

import React, { PropsWithChildren, Suspense, useEffect, useMemo } from 'react';
import IconButton from '@/components/ui/IconButton';
import { BsFillGridFill } from 'react-icons/bs';
import { FaList } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { DisplayMode } from '@/interfaces/global.interface';
import { useGetShelves } from '@/services/book.service';
import { usePathname, useRouter } from 'next/navigation';
import { useBooks } from '@/providers/bookProvider';
import { Shelf } from '@/interfaces/shelf.interface';




export default function EtagereLayout({ children }: PropsWithChildren) {

  const { displayMode, setDisplayMode, setShelf, setSearchQuery } = useBooks()

  const router = useRouter()
  const pathName = usePathname();
  const shelfSlug = useMemo(() => pathName.split('/').pop(), [pathName]);


  const { data: shelves, isLoading, error } = useGetShelves({
    variables: {
      offset: 0,
      limit: 10,
    },
  });

  useEffect(() => {
    if (shelves && shelves.length > 0) {
      router.push(`/etageres/${shelves[0].slug}?id=${shelves[0].id}`)
    }
  }, [shelves, router])



  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Une erreur est survenue: {error.message}</p>;
  }


  const handleDisplayModeChange = (newDisplayMode: DisplayMode) => {
    setDisplayMode(newDisplayMode)
  };

  const handleShelfClick = (shelf: Shelf) => {
    setShelf(shelf);
    router.push(`/etageres/${shelf.slug}?id=${shelf.id}`)
  }

  return (
    <Suspense fallback={<p>Une erreur s&lsquo;est produite</p>}>

      <section className="w-full flex gap-8 pt-28 px-28">
        <hgroup className='max-w-[15%] w-full'>
          <h2 className="body18-semi mb-3 ml-6 uppercase">Les étagères</h2>
          <ul className="flex flex-col gap-1 body16-regular text-gray-700">
            {shelves && shelves.map(({ id, slug, title }) => (
              <li
                key={id}
                onClick={() => handleShelfClick({ id, slug, title })}
                className={`ml-6 p-2 cursor-pointer ${shelfSlug == slug ? 'bg-orange-50 text-orange-400 border border-orange-100' : ''}`}
              >
                {title}
              </li>
            ))}
          </ul>
        </hgroup>

        <div className='flex flex-col gap-y-8 w-full'>
          <div className="flex w-full items-center justify-end gap-2">
            {/* <h3 className='body20-semi'>{pathName.replace('/etageres/', '')} </h3> */}
            <hgroup className='flex'>
              <span className='flex items-center gap-2 rounded-full bg-slate-200 py-2 px-3 mr-4'>
                <IoSearch className='w-5 h-5' />
                <input onChange={(e) => setSearchQuery(e.target.value)} type="search" className='bg-transparent outline-none' />
              </span>
              <IconButton
                ariaLabel='display books in list'
                className={`hover:bg-orange-100/30 rounded-lg ${displayMode === 'list' ? 'text-orange-400' : 'text-gray-400'}`}
                icon={<FaList />}
                onClick={() => handleDisplayModeChange('list')}
              />
              <IconButton
                icon={<BsFillGridFill />}
                className={`hover:bg-orange-100/30 rounded-lg ${displayMode === 'grid' ? 'text-orange-400' : 'text-gray-400'}`}
                ariaLabel='display books in grid'
                onClick={() => handleDisplayModeChange('grid')}
              />
            </hgroup>
          </div>
          {children}

        </div>
      </section>
    </Suspense>
  );
}