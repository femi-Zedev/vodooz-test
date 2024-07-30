import React, { useEffect, useMemo } from 'react'

import { useGetShelves } from '@/services/book.service';
import { usePathname, useRouter } from 'next/navigation';
import { Shelf } from '@/interfaces/shelf.interface';

export default function ShelfList() {
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
  const handleShelfClick = (shelf: Shelf) => {
    router.push(`/etageres/${shelf.slug}?id=${shelf.id}`)
  }

  return (
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
  )
}
