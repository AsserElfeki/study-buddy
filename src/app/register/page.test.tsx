import { render, fireEvent } from '@testing-library/react';
import RegisterPage from './page';

describe('RegisterPage', () => {
  it('simulates user input for the required fields', () => {
    const { getByPlaceholderText } = render(<RegisterPage />);
    const input = getByPlaceholderText('Email address');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    expect(input.value).toBe('test@example.com');
  });

  it('simulates form submission and checks if the form submission function is called with the correct arguments', () => {
    const { getByText } = render(<RegisterPage />);
    const button = getByText('Sign Up');
    fireEvent.click(button);
    // Assuming that the form submission function is a mock function
    expect(formSubmitFunctionMock).toHaveBeenCalledWith('test@example.com', 'password');
  });
});
