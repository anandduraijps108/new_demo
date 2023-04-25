import React from 'react';
import HomePage from './index';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';

test('HomePage renders without errors', async () => {
  const onSubmit = jest.fn().mockResolvedValue({
    post: [
      {
        date: '2023-04-04',
        description: 'Bying some carrots',
        amount: '400',
        id: 2,
      },
    ],
  });

  await onSubmit();
  expect(onSubmit).toHaveBeenCalled();

  render(
    <BrowserRouter>
      <HomePage onSubmit={onSubmit} />
    </BrowserRouter>
  );

  await waitFor(() => {
    const dateInput = screen.getByLabelText('Date');
    const descriptionInput = screen.getByLabelText('Description');
    const amountInput = screen.getByLabelText('Amount');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    expect(dateInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(amountInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
