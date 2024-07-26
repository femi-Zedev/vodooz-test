'use client'
import { useBooks } from '@/providers/bookProvider';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';




export default function EtagerePage() {

  const router = useRouter()
  const { shelf } = useBooks()


  // useEffect(() => {
  //   if (shelf.slug && shelf.slug !== ''){
  //     console.log(shelf)
  //     router.push(`/etageres/${shelf.slug}`)
  //   } else {
  //     return
  //   }
  // }, [shelf.slug])







  return (
   <></>
  );
}
