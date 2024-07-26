"use client"
import BookCard from '@/app/_components/BookCard';
import { Book } from '@/interfaces/book.interface';
import { DisplayMode } from '@/interfaces/global.interface';
import { API, useGetBooks } from '@/services/book.service';
import { useQueries } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React from 'react'


export default function EtagerePage() {
  const searchParams = useSearchParams();
  const shelfId = searchParams.get('id')
  const displayMode = searchParams.get('displayMode') as DisplayMode

  

  const { data: bookIds, isLoading: idsLoading } = useGetBooks({ variables: { shelfId: shelfId as string } });

  if (idsLoading) {
    return <div>Loading ...</div>
  }


  return (
    <>
      <BookList bookIds={bookIds} displayMode={displayMode} />
    </>
  )
}


function BookList({ bookIds, displayMode = 'grid' }: { bookIds: string[], displayMode?: DisplayMode  }) {

  const booksDetailsQueries = useQueries(
    {
      queries: bookIds.map((bookId) => ({
        queryKey: ['get-books-details', bookId],
        queryFn: () => fetch(`${API}/forms/${bookId}`).then(res => res.json()),
        staleTime: Infinity,
      })),
    }
  );

  if (bookIds == undefined) {
    return <div>Une erreur s&lsquo;est produite</div>
  }
  const isLoading = booksDetailsQueries.some(query => query.isLoading);

  if (isLoading) return <div>Loading...</div>;

  const books = booksDetailsQueries.map(query => query.data as Book);

  return (
    <div className={`${displayMode == 'grid' ? 'grid grid-cols-12 gap-y-10 gap-x-4' :'flex flex-col gap-y-5'}  w-full`} >
      {books.map((book, i) => (
        <BookCard displayMode={displayMode} key={i} book={book} />
      ))}
    </div>
  )
}


