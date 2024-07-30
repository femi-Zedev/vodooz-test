
import { useBooks } from '@/providers/bookProvider';
import { useGetBooks } from '@/services/book.service';
import { useSearchParams } from 'next/navigation';
import { render, screen, waitFor } from '@testing-library/react';
import LivresEtagere from '@/app/etageres/[etagere]/page';

// Mock the hooks
jest.mock('@/providers/bookProvider', () => ({
  useBooks: jest.fn(),
}));

jest.mock('@/services/book.service', () => ({
  useGetBooks: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

// Mock data
const mockBookIds = ['1', '2', '3'];
const mockBooks = [
  {
    id: '1',
    short_title: 'Short Title 1',
    title: 'Full Title 1',
    description: 'Description 1',
    average_rating: 4.5,
    authors: [{ id: '1', name: 'Author One', slug: 'author-one' }],
    image: '/path/to/image1.jpg',
  },
  {
    id: '2',
    short_title: 'Short Title 2',
    title: 'Full Title 2',
    description: 'Description 2',
    average_rating: 4.0,
    authors: [{ id: '2', name: 'Author Two', slug: 'author-two' }],
    image: '/path/to/image2.jpg',
  },
  {
    id: '3',
    short_title: 'Short Title 3',
    title: 'Full Title 3',
    description: 'Description 3',
    average_rating: 4.2,
    authors: [{ id: '3', name: 'Author Three', slug: 'author-three' }],
    image: '/path/to/image3.jpg',
  },
];

const mockSearchParams = {
  get: jest.fn().mockReturnValue('1'),
};

describe('Page Component', () => {
  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    (useBooks as jest.Mock).mockReturnValue({
      displayMode: 'grid',
      searchQuery: '',
    });
    (useGetBooks as unknown as  jest.Mock).mockReturnValue({
      data: mockBookIds,
      isLoading: false,
      error: null,
    });

    global.fetch = jest.fn().mockImplementation((url) => {
      const bookId = url.split('/').pop();
      const book = mockBooks.find(b => b.id === bookId);
      return Promise.resolve({
        json: () => Promise.resolve(book),
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    (useGetBooks as unknown as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<LivresEtagere />);
    expect(screen.getByText('Chargment...')).toBeInTheDocument();
  });

  it('renders book list correctly', async () => {
    render(<LivresEtagere />);

    await waitFor(() => {
      expect(screen.getByText('Short Title 1')).toBeInTheDocument();
      expect(screen.getByText('Short Title 2')).toBeInTheDocument();
      expect(screen.getByText('Short Title 3')).toBeInTheDocument();
    });
  });

  it('renders error state', () => {
    const errorMessage = 'An error occurred';
    (useGetBooks as unknown as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: { message: errorMessage },
    });

    render(<LivresEtagere />);
    expect(screen.getByText(`Une erreur est survenue: ${errorMessage}`)).toBeInTheDocument();
  });
});