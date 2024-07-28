'use client'
import { useBooks } from '@/providers/bookProvider';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';




export default function EtagerePage() {

  const router = useRouter()
  const { shelf } = useBooks()







  return (
   <></>
  );
}
