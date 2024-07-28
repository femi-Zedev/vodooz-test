import { Shelf } from '@/interfaces/shelf.interface';
import { paramsBuilder } from '@/utils/params-builder';
import { createQuery } from 'react-query-kit'

export const API = process.env.NEXT_PUBLIC_API_URI

export const useGetShelves = createQuery({
  queryKey: ['/get-shelves'],
  fetcher: ({
    offset = 0, 
    limit = 10 
  }: {
    offset?: number;
    limit?: number;
  }): Promise<Shelf[]> => {
    const params = paramsBuilder({ offset, limit });
    return fetch(`${API}/users/5a8411b53ed02c04187ff02a/shelves?${params}`).then(res =>  res.json())
  }
})

export const useGetBooks = createQuery({
  queryKey: ['/get-books'],
  fetcher: ({
    shelfId,
    offset = 0, 
    limit = 10 
  }: {
    shelfId: string,
    offset?: number;
    limit?: number;
  }): Promise<string[]> => {
    const params = paramsBuilder({ offset, limit });
    return fetch(`${API}/shelves/${shelfId}/forms?${params}`).then(res =>  res.json())
  }
})

export const useGetBookDetail = createQuery({
  queryKey: ['/get-book-details'],
  fetcher: ({
    bookId
  }: {
    bookId: string
  }): Promise<any> => {
    return fetch(`${API}/forms/${bookId}`).then(res =>  res.json())
  }
})