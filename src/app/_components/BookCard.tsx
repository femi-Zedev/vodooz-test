import { Book } from '@/interfaces/book.interface'
import { DisplayMode } from '@/interfaces/global.interface'
import Image from 'next/image'
import React from 'react'
export default function BookCard({ book, displayMode }: { book: Book, displayMode: DisplayMode }) {
  const { authors, short_title, image, title } = book
  return (
    <>
      {displayMode == 'grid' ?
        <article className="mx-auto w-[280px] h-[280px] col-span-4 relative bg-white p-5">

          <Image src={image} width={160} height={208} alt={short_title} className=' absolute -right-[20%] top-6 shadow-xl shadow-gray-200 object-cover rounded' />

          <hgroup className='flex flex-col gap-4 w-[65%]'>
            <h3 className="body18-regular">{short_title}</h3>
            {authors.length > 0 &&
              <p className="body14-regular text-gray-600">Par
                {authors.map((author, i) => (
                  <ul className='flex' key={i}>
                    <li className='underline'>{author.name}</li>
                    {i < authors.length - 1 && ", "}
                  </ul>
                ))}
              </p>}
          </hgroup>

        </article>
        :

        <article className='flex gap-4 p-4 bg-white rounded-lg'>
          <Image src={image} width={80} height={120} alt={short_title} className='object-cover rounded' />
          <hgroup className='space-y-2'>
            <h3 className="body18-semi">{short_title}</h3>
            {authors.length > 0 &&
            <span className="flex gap-2 body14-regular text-gray-600">
              <p>Par</p> 
              {authors.map((author, i) => (
                <ul className='flex gap-1' key={i}>
                  <li className='underline'>{author.name}</li>
                  {i < authors.length - 1 && ", "}
                </ul>
              ))}
            </span>}
          </hgroup>
        </article>

      }
    </>

  )
}
