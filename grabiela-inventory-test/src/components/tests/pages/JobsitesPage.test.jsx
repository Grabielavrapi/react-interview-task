import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import JobsitesPage from '../pages/JobsitesPage';
import { vi } from 'vitest';
vi.mock('../context/InventoryStore', () => ({
    useStore: () => ({ jobsites: [{ id: 1, name: 'Test', status: 'On Road' }] })
}));

test('renders jobsites and search', () => {
    render(<BrowserRouter><JobsitesPage /></BrowserRouter>);
    expect(screen.getByText('Test')).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Search a driver'), { target: { value: 'test' } });
});