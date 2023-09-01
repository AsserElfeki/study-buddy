import React from 'react';
import { render, screen } from '@testing-library/react';
import { NextAuthProvider } from './providers';

describe('NextAuthProvider', () => {
  test('renders its children correctly', () => {
    render(
      <NextAuthProvider>
        <div>Test Child</div>
      </NextAuthProvider>
    );

    const childElement = screen.getByText(/Test Child/i);
    expect(childElement).toBeInTheDocument();
  });
});
