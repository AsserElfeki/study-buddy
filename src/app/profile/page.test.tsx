import { render, fireEvent } from '@testing-library/react';
import Profile from './page';

describe('Profile page', () => {
  it('simulates user input for updating profile details', () => {
    const { getByLabelText } = render(<Profile />);
    const nameInput = getByLabelText('name');
    const emailInput = getByLabelText('email');

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(nameInput.value).toBe('Test User');
    expect(emailInput.value).toBe('test@example.com');
  });

  it('simulates form submission and checks if the form submission function is called with the correct arguments', () => {
    const mockSubmit = jest.fn();
    const { getByLabelText, getByTestId } = render(<Profile onSubmit={mockSubmit} />);
    const nameInput = getByLabelText('name');
    const emailInput = getByLabelText('email');
    const form = getByTestId('profile-form');

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.submit(form);

    expect(mockSubmit).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@example.com',
    });
  });
});
