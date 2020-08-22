import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ProductCard from './ProductCard';

test('renders product in a card', () => {
  const product = {
    'Title': 'Apple Macbook Pro 16\'',
    'Cover': 'https://dl.airtable.com/.attachmentThumbnails/4bb4b8d3cc7a1189db7da6ebec06cbba/4eeff9ce',
    'Price': '2800',
    'Description': 'Designed for those who defy limits and change the world, the new MacBook Pro is by far the most powerful notebook we’ve ever made. With an immersive 16-inch Retina display, superfast processors, next-generation graphics, the largest battery capacity ever in a MacBook Pro, a new Magic Keyboard, and massive storage, it’s the ultimate pro notebook for the ultimate user.',
    'Discount': true
  };

  const { getByText } = render(<ProductCard product={product} />);
  expect(getByText('Apple Macbook Pro 16\'')).toBeInTheDocument();
  expect(getByText('$2800')).toBeInTheDocument();
});

test('renders an empty product in a card', () => {
  const { getByText } = render(<ProductCard />);

  expect(getByText('Empty product')).toBeInTheDocument();
})