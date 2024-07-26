"use client"
import BookCard from '@/app/_components/BookCard';
import { Book } from '@/interfaces/book.interface';
import { DisplayMode } from '@/interfaces/global.interface';
import { useBooks } from '@/providers/bookProvider';
import { API, useGetBooks } from '@/services/book.service';
import { useQueries } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React from 'react'


export default function Page() {
  const searchParams = useSearchParams();
  const shelfId = searchParams.get('id')
  const { displayMode, searchQuery } = useBooks()

  console.log(searchQuery)

  const { data: bookIds, isLoading: idsLoading } = useGetBooks({ variables: { shelfId: shelfId as string } });

  if (idsLoading) {
    return <div>Loading ...</div>
  }


  return (
    <>
      {bookIds &&
        <BookList bookIds={bookIds} displayMode={displayMode} searchQuery={searchQuery} />
      }
    </>
  )
}


function BookList({ bookIds, displayMode = 'grid', searchQuery }: { bookIds: string[], displayMode?: DisplayMode, searchQuery: string }) {

  const booksDetailsQueries = useQueries(
    {
      queries: bookIds.map((bookId) => ({
        queryKey: ['get-books-details', bookId],
        queryFn: () => fetch(`${API}/forms/${bookId}`).then(res => res.json()),
        staleTime: 36000,
      })),
    }
  );

  if (!bookIds) {
    return <div>Une erreur s&lsquo;est produite</div>
  }
  const isLoading = booksDetailsQueries.some(query => query.isLoading);

  if (isLoading) return <div>Loading...</div>;

  const books = booksDetailsQueries.map(query => query.data as Book);


  const filterBooks = (query: string): Book[] => {
    return books.filter(book => {
      const lowerCaseQuery = query.toLowerCase();
      const authorMatch = book.authors.some(author => author.name.toLowerCase().includes(lowerCaseQuery));
      const titleMatch = book.title.toLowerCase().includes(lowerCaseQuery);

      return authorMatch || titleMatch
    });
  };

  const filteredBooks = filterBooks(searchQuery);


  return (
    <div className={`${displayMode == 'grid' ? 'grid grid-cols-12 gap-y-10 gap-x-4' : 'flex flex-col gap-y-5'}  w-full`} >
      {filteredBooks.map((book) => (
        <BookCard displayMode={displayMode} key={book.id} book={book} />
      ))}
    </div>
  )
}


