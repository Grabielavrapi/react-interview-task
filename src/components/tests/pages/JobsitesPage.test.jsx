import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import JobsitesPage from '../../../pages/JobsitesPage';
import { useStore } from '../../../context/InventoryStore';

vi.mock('../../../context/InventoryStore', () => ({
    useStore: vi.fn()
}));

describe('JobsitesPage - Search and Display', () => {
    const mockJobsites = [
        { id: 1, name: 'Brooklyn Site A', status: 'On Road', categories: ['Electrical', 'Plumbing'] },
        { id: 2, name: 'Manhattan Site B', status: 'On Hold', categories: ['Scaffold'] },
        { id: 3, name: 'Queens Site C', status: 'Completed', categories: ['Sidewalk Shed'] }
    ];

    beforeEach(() => {
        useStore.mockReturnValue({
            jobsites: mockJobsites
        });
    });

    it('renders all jobsites initially', () => {
        render(
            <BrowserRouter>
                <JobsitesPage />
            </BrowserRouter>
        );

        expect(screen.getByText('Brooklyn Site A')).toBeInTheDocument();
        expect(screen.getByText('Manhattan Site B')).toBeInTheDocument();
        expect(screen.getByText('Queens Site C')).toBeInTheDocument();
    });

    it('renders search bar with correct placeholder', () => {
        render(
            <BrowserRouter>
                <JobsitesPage />
            </BrowserRouter>
        );

        const searchInput = screen.getByPlaceholderText('Search a driver');
        expect(searchInput).toBeInTheDocument();
    });

    it('allows user to type in search bar', () => {
        render(
            <BrowserRouter>
                <JobsitesPage />
            </BrowserRouter>
        );

        const searchInput = screen.getByPlaceholderText('Search a driver');
        fireEvent.change(searchInput, { target: { value: 'Brooklyn' } });

        expect(searchInput.value).toBe('Brooklyn');
    });

    it('displays jobsite count', () => {
        render(
            <BrowserRouter>
                <JobsitesPage />
            </BrowserRouter>
        );

        // Should display total count of jobsites
        // Adjust this based on actual implementation
        const jobsiteCards = screen.getAllByRole('article').length ||
                            screen.getAllByText(/Site/).length;
        expect(jobsiteCards).toBeGreaterThan(0);
    });

    it('shows different status badges for each jobsite', () => {
        render(
            <BrowserRouter>
                <JobsitesPage />
            </BrowserRouter>
        );

        // Verify different statuses are displayed
        expect(screen.getByText('On Road')).toBeInTheDocument();
        expect(screen.getByText('On Hold')).toBeInTheDocument();
        expect(screen.getByText('Completed')).toBeInTheDocument();
    });
});

describe('JobsitesPage - Empty State', () => {
    it('handles empty jobsites list', () => {
        useStore.mockReturnValue({
            jobsites: []
        });

        render(
            <BrowserRouter>
                <JobsitesPage />
            </BrowserRouter>
        );

        // Should render without crashing
        const searchInput = screen.getByPlaceholderText('Search a driver');
        expect(searchInput).toBeInTheDocument();
    });
});

describe('JobsitesPage - Single Jobsite', () => {
    it('renders single jobsite correctly', () => {
        useStore.mockReturnValue({
            jobsites: [{ id: 1, name: 'Test Single Site', status: 'On Road', categories: [] }]
        });

        render(
            <BrowserRouter>
                <JobsitesPage />
            </BrowserRouter>
        );

        expect(screen.getByText('Test Single Site')).toBeInTheDocument();
    });
});