import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import IconButton from '@/components/ui/IconButton';

// Mock SVG icon component
const MockIcon = () => (
  <svg data-testid="mock-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 2L2 7h20L12 2zm0 2.36L18.92 7H5.08L12 4.36zM2 9h20v2H2V9zm0 4h20v9H2v-9zm2 2v5h16v-5H4z" />
  </svg>
);

describe('IconButton component', () => {
  it('should render an icon when the icon prop is provided', () => {
    render(<IconButton ariaLabel='' icon={<MockIcon />} onClick={() => {}} />);

    const iconElement = screen.getByTestId('mock-icon');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement.tagName).toBe('svg');
  });

  it('should call the onClick function when clicked', () => {
    const handleClick = jest.fn();
    render(<IconButton ariaLabel='' icon={<MockIcon />} onClick={handleClick} />);

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});