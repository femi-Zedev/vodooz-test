import BookCard from '@/app/_components/BookCard';
import { Book } from '@/interfaces/book.interface';
import { DisplayMode } from '@/interfaces/global.interface';
import { render, screen } from '@testing-library/react';

const mockBook: Book = {
  id: '1',
  short_title: 'Short Title',
  title: 'Full Title',
  description: 'Description',
  average_rating: 4.5,
  authors: [
    { id: '1', name: 'Author One', slug: 'author-one' },
    { id: '2', name: 'Author Two', slug: 'author-two' },
  ],
  image: '/path/to/image.jpg',
};

describe('BookCard Component', () => {
  it('renders correctly in grid mode', () => {
    render(<BookCard book={mockBook} displayMode={DisplayMode.Grid} />);

    const shortTitle = screen.getByText('Short Title');
    expect(shortTitle).toBeInTheDocument();

    const authorOne = screen.getByText('Author One');
    expect(authorOne).toBeInTheDocument();

    const authorTwo = screen.getByText('Author Two');
    expect(authorTwo).toBeInTheDocument();

    const image = screen.getByAltText('Short Title');
    expect(image).toBeInTheDocument();
  });

  it('renders correctly in list mode', () => {
    render(<BookCard book={mockBook} displayMode={DisplayMode.List} />);

    const shortTitle = screen.getByText('Short Title');
    expect(shortTitle).toBeInTheDocument();

    const authorOne = screen.getByText('Author One');
    expect(authorOne).toBeInTheDocument();

    const authorTwo = screen.getByText('Author Two');
    expect(authorTwo).toBeInTheDocument();

    const averageRating = screen.getByText('4.5');
    expect(averageRating).toBeInTheDocument();

    const image = screen.getByAltText('Short Title');
    expect(image).toBeInTheDocument();
  });
});