import { render, screen, waitFor } from '@testing-library/react';
import ShelfList from '@/app/etageres/_components/ShelfList';
import { useGetShelves } from '@/services/book.service';
import { useRouter, usePathname } from 'next/navigation';

jest.mock('@/services/book.service', () => ({
  useGetShelves: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

const mockShelves = [
  { id: '1', slug: 'shelf-one', title: 'Shelf One' },
  { id: '2', slug: 'shelf-two', title: 'Shelf Two' },
];

describe('ShelfList Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    (usePathname as jest.Mock).mockReturnValue('/etageres/shelf-one');
  });

  it('renders loading state', () => {
    (useGetShelves as unknown as  jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<ShelfList />);
    expect(screen.getByText('Chargement...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    const errorMessage = 'An error occurred';
    (useGetShelves as unknown as  jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: { message: errorMessage },
    });

    render(<ShelfList />);
    expect(screen.getByText(`Une erreur est survenue: ${errorMessage}`)).toBeInTheDocument();
  });

  it('renders shelves and handles clicks', async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    (useGetShelves as unknown as  jest.Mock).mockReturnValue({
      data: mockShelves,
      isLoading: false,
      error: null,
    });

    render(<ShelfList />);

    await waitFor(() => {
      expect(screen.getByText('Shelf One')).toBeInTheDocument();
      expect(screen.getByText('Shelf Two')).toBeInTheDocument();
    });

    screen.getByText('Shelf One').click();
    expect(pushMock).toHaveBeenCalledWith('/etageres/shelf-one?id=1');

    screen.getByText('Shelf Two').click();
    expect(pushMock).toHaveBeenCalledWith('/etageres/shelf-two?id=2');
  });

  it('navigates to the first shelf on load', async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    (useGetShelves as unknown as jest.Mock).mockReturnValue({
      data: mockShelves,
      isLoading: false,
      error: null,
    });

    render(<ShelfList />);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/etageres/shelf-one?id=1');
    });
  });
});