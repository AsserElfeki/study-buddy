import { render, fireEvent, waitFor } from '@testing-library/react';
import RegisterPage from './page';

describe('RegisterPage', () => {
  it('renders the registration form', () => {
    const { getByPlaceholderText } = render(<RegisterPage />);
    const input = getByPlaceholderText('Email address');
    expect(input).toBeInTheDocument();
  });

  it('submits the form with user input', async () => {
    const { getByPlaceholderText, getByText } = render(<RegisterPage />);
    const emailInput = getByPlaceholderText('Email address');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByText('Sign Up');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(emailInput).toHaveValue('test@example.com');
      expect(passwordInput).toHaveValue('password');
    });
  });

  it('displays an error message for invalid inputs', async () => {
    const { getByPlaceholderText, getByText } = render(<RegisterPage />);
    const emailInput = getByPlaceholderText('Email address');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByText('Sign Up');

    fireEvent.change(emailInput, { target: { value: 'invalid email' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('invalid email or password')).toBeInTheDocument();
    });
  });
});
