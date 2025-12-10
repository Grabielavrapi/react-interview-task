// filepath: c:\Users\User\react-interview-task\src\components\tests\components\SearchBar.test.jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../SearchBar/SearchBar';

describe('SearchBar Component', () => {
    it('renders with default placeholder', () => {
        const mockOnChange = vi.fn();
        render(<SearchBar value="" onChange={mockOnChange} />);

        const searchInput = screen.getByPlaceholderText('Search...');
        expect(searchInput).toBeInTheDocument();
    });

    it('renders with custom placeholder', () => {
        const mockOnChange = vi.fn();
        render(<SearchBar value="" onChange={mockOnChange} placeholder="Search drivers..." />);

        const searchInput = screen.getByPlaceholderText('Search drivers...');
        expect(searchInput).toBeInTheDocument();
    });

    it('displays the correct value', () => {
        const mockOnChange = vi.fn();
        render(<SearchBar value="test search" onChange={mockOnChange} />);

        const searchInput = screen.getByDisplayValue('test search');
        expect(searchInput).toBeInTheDocument();
    });

    it('calls onChange when user types', () => {
        const mockOnChange = vi.fn();
        render(<SearchBar value="" onChange={mockOnChange} />);

        const searchInput = screen.getByPlaceholderText('Search...');
        fireEvent.change(searchInput, { target: { value: 'new search term' } });

        expect(mockOnChange).toHaveBeenCalledWith('new search term');
        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    it('handles multiple typing events', () => {
        const mockOnChange = vi.fn();
        render(<SearchBar value="" onChange={mockOnChange} />);

        const searchInput = screen.getByPlaceholderText('Search...');

        fireEvent.change(searchInput, { target: { value: 't' } });
        fireEvent.change(searchInput, { target: { value: 'te' } });
        fireEvent.change(searchInput, { target: { value: 'tes' } });

        expect(mockOnChange).toHaveBeenCalledTimes(3);
    });

    it('handles clearing the search', () => {
        const mockOnChange = vi.fn();
        render(<SearchBar value="existing text" onChange={mockOnChange} />);

        const searchInput = screen.getByDisplayValue('existing text');
        fireEvent.change(searchInput, { target: { value: '' } });

        expect(mockOnChange).toHaveBeenCalledWith('');
    });
});

