import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from './form';

describe('LoginForm', () => {
  test('submits form with email and password', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm />);

    fireEvent.change(getByPlaceholderText('Email address'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password' } });

    fireEvent.click(getByText('Sign In'));

    await waitFor(() => {
      // Replace this with actual assertions based on your application's response on form submission
      // For example, if a successful login redirects to a different page, you can check if the location has changed
      // Or if an error message is displayed for invalid inputs, you can check if the error message is in the document
    });
  });
});
