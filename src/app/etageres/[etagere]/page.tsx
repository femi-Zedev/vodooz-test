"use client"
import BookCard from '@/app/_components/BookCard';
import PaginationUI from '@/app/_components/PaginationUI';
import { Book } from '@/interfaces/book.interface';
import { DisplayMode } from '@/interfaces/global.interface';
import { useBooks } from '@/providers/bookProvider';
import { API, useGetBooks } from '@/services/book.service';
import { useQueries } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'


export default function LivresEtagere() {
  const searchParams = useSearchParams();
  const shelfId = searchParams.get('id')
  const { displayMode, searchQuery } = useBooks()

  console.log(searchQuery)

  const { data: bookIds, isLoading: idsLoading } = useGetBooks({ variables: { shelfId: shelfId as string } });

  if (idsLoading) {
    return <div>Chargement ...</div>
  }


  return (
    <>
      {bookIds &&
        <BookList bookIds={bookIds} displayMode={displayMode} searchQuery={searchQuery} />
      }
    </>
  )
}


function BookList({ bookIds, displayMode = DisplayMode.Grid, searchQuery }: { bookIds: string[], displayMode?: DisplayMode, searchQuery: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const booksDetailsQueries = useQueries(
    {
      queries: bookIds.map((bookId) => ({
        queryKey: ['get-books-details', bookId],
        queryFn: () => fetch(`${API}/forms/${bookId}`).then(res => res.json()),
        staleTime: 36000,
      })),
    }
  );


  const isLoading = booksDetailsQueries.some(query => query.isLoading);

  if (isLoading) return <div>Chargement...</div>;

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


  const totalPages = Math.ceil(filteredBooks.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentBooks = filteredBooks.slice(startIndex, endIndex);




  return (
    <>
      <div className={`${displayMode == 'grid' ? 'grid grid-cols-12 gap-y-10 gap-x-4' : 'flex flex-col gap-y-5'}  w-full`} >
        {currentBooks.map((book) => (
          <BookCard key={book.id} displayMode={displayMode} book={book} />
        ))}
      </div>
      <PaginationUI
        pageSize={pageSize}
        currentPage={currentPage}
        onPrevPage={() => setCurrentPage((curr) => Math.max(curr - 1, 1))}
        onNextPage={() => setCurrentPage((curr) => Math.min(curr + 1, totalPages))}
        dataCount={filteredBooks.length}
      />
    </>

  )
}


