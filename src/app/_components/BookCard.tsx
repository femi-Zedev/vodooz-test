import { Book } from '@/interfaces/book.interface'
import { DisplayMode } from '@/interfaces/global.interface'
import Image from 'next/image'
import React from 'react'
export default function BookCard({ book, displayMode }: { book: Book, displayMode: DisplayMode }) {
  const { authors, short_title, image, average_rating } = book
  return (
    <>
      {displayMode == DisplayMode.Grid ?
        <article className="mx-auto w-60 h-60 col-span-4 relative bg-white p-5">

          <Image src={image} width={140} height={180} alt={short_title} className=' absolute -right-[20%] top-6 shadow-xl shadow-gray-200 object-cover rounded' />

          <hgroup className='flex flex-col gap-4 w-[60%]'>
            <h3 className="body18-semi text-gray-600">{short_title}</h3>
            {authors.length > 0 &&
              <span className="body14-regular text-gray-600">
                <p>Par</p> 
                {authors.map((author, i) => (
                  <ul className='flex' key={i}>
                    <li className='underline'>{author.name}</li>
                    {i < authors.length - 1 && ", "}
                  </ul>
                ))}
              </span>}
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
            {average_rating && <p>{average_rating} </p> }
          </hgroup>
        </article>
      }
    </>

  )
}
