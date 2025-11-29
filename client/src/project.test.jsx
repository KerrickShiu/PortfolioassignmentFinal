import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Project from './project.jsx'; // adjust path if needed

test('renders the form heading', () => {
  render(<Project />);
  const headingElement = screen.getByText(/Submit Your Project/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders the submit button', () => {
  render(<Project />);
  const submitButton = screen.getByRole('button', { name: /submit/i });
  expect(submitButton).toBeInTheDocument();
});