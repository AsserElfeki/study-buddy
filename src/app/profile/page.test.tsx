import { render, fireEvent, waitFor } from '@testing-library/react';
import Profile from './page';

describe('Profile component', () => {
  it('updates profile on form submission', async () => {
    const { getByLabelText, getByText } = render(<Profile />);

    // Simulate user interactions
    fireEvent.change(getByLabelText(/name/i), { target: { value: 'New Name' } });
    fireEvent.change(getByLabelText(/email/i), { target: { value: 'newemail@example.com' } });
    fireEvent.click(getByText(/submit/i));

    // Wait for the form submission to be processed
    await waitFor(() => getByText(/profile updated/i));

    // Assert that the expected outcomes occur
    expect(getByText(/profile updated/i)).toBeInTheDocument();
  });

  it('shows error message on invalid input', async () => {
    const { getByLabelText, getByText } = render(<Profile />);

    // Simulate user interactions
    fireEvent.change(getByLabelText(/email/i), { target: { value: 'invalid email' } });
    fireEvent.click(getByText(/submit/i));

    // Wait for the form submission to be processed
    await waitFor(() => getByText(/invalid email/i));

    // Assert that the expected outcomes occur
    expect(getByText(/invalid email/i)).toBeInTheDocument();
  });
});
