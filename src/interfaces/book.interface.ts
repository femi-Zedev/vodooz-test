export interface Book {
  id: string,
  short_title: string,
  average_rating?: number,
  description: string;
  title: string,
  authors: Author[],
  image: string,
}

interface Author{
  id: string,
  name: string,
  slug: string,
}