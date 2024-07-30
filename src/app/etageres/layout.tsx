'use client'

import React, { PropsWithChildren, Suspense } from 'react';

import Filters from './_components/Filters';
import ShelfList from './_components/ShelfList';




export default function EtagereLayout({ children }: PropsWithChildren) {
  

  return (
    <Suspense fallback={<p>Une erreur s&lsquo;est produite</p>}>

      <section className="w-full flex gap-8 pt-28 px-28">

        <hgroup className='max-w-[15%] w-full'>
          <h2 className="body18-semi mb-3 ml-6 uppercase">Les étagères</h2>
          <ShelfList />
        </hgroup>

        <div className='flex flex-col gap-y-8 w-full'>
          <Filters />
          {children}
        </div>
        
      </section>

    </Suspense>
  );
}