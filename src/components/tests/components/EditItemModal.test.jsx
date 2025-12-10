// filepath: c:\Users\User\react-interview-task\src\components\tests\components\EditItemModal.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EditItemModal from '../../modals/EditItemModal';
import { useStore } from '../../../context/InventoryStore';

// Mock the store
vi.mock('../../../context/InventoryStore', () => ({
    useStore: vi.fn()
}));

describe('EditItemModal - Updating Inventory Items', () => {
    let mockUpdateInventoryItem;
    let mockOnClose;
    let testItem;

    beforeEach(() => {
        mockUpdateInventoryItem = vi.fn();
        mockOnClose = vi.fn();

        testItem = {
            id: 1,
            item: 'Cable 12AWG',
            quantity: 500,
            description: 'Electrical cable for wiring',
            notes: 'Handle with care'
        };

        useStore.mockReturnValue({
            updateInventoryItem: mockUpdateInventoryItem
        });
    });

    it('renders the modal with all form fields', () => {
        render(
            <EditItemModal
                open={true}
                onClose={mockOnClose}
                item={testItem}
                categoryName="Electrical"
                jobsiteId={1}
            />
        );

        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText('Item')).toBeInTheDocument();
        expect(screen.getByText('Quantity')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('Notes')).toBeInTheDocument();
        expect(screen.getByText('Save Changes')).toBeInTheDocument();
    });

    it('displays info banner', () => {
        render(
            <EditItemModal
                open={true}
                onClose={mockOnClose}
                item={testItem}
                categoryName="Electrical"
                jobsiteId={1}
            />
        );

        expect(screen.getByText(/Informative piece of text/i)).toBeInTheDocument();
    });

    it('populates form with item data', () => {
        render(
            <EditItemModal
                open={true}
                onClose={mockOnClose}
                item={testItem}
                categoryName="Electrical"
                jobsiteId={1}
            />
        );

        expect(screen.getByDisplayValue('500')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Electrical cable for wiring')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Handle with care')).toBeInTheDocument();
    });

    it('updates quantity when user changes it', () => {
        render(
            <EditItemModal
                open={true}
                onClose={mockOnClose}
                item={testItem}
                categoryName="Electrical"
                jobsiteId={1}
            />
        );

        const quantityInput = screen.getByDisplayValue('500');
        fireEvent.change(quantityInput, { target: { value: '750' } });

        expect(screen.getByDisplayValue('750')).toBeInTheDocument();
    });

    it('updates description when user changes it', () => {
        render(
            <EditItemModal
                open={true}
                onClose={mockOnClose}
                item={testItem}
                categoryName="Electrical"
                jobsiteId={1}
            />
        );

        const descriptionInput = screen.getByDisplayValue('Electrical cable for wiring');
        fireEvent.change(descriptionInput, { target: { value: 'Updated description' } });

        expect(screen.getByDisplayValue('Updated description')).toBeInTheDocument();
    });

    it('updates notes when user changes it', () => {
        render(
            <EditItemModal
                open={true}
                onClose={mockOnClose}
                item={testItem}
                categoryName="Electrical"
                jobsiteId={1}
            />
        );

        const notesInput = screen.getByDisplayValue('Handle with care');
        fireEvent.change(notesInput, { target: { value: 'New notes added' } });

        expect(screen.getByDisplayValue('New notes added')).toBeInTheDocument();
    });

    it('calls updateInventoryItem with correct parameters on save', () => {
        render(
            <EditItemModal
                open={true}
                onClose={mockOnClose}
                item={testItem}
                categoryName="Electrical"
                jobsiteId={1}
            />
        );

        // Update quantity
        const quantityInput = screen.getByDisplayValue('500');
        fireEvent.change(quantityInput, { target: { value: '600' } });

        // Update description
        const descriptionInput = screen.getByDisplayValue('Electrical cable for wiring');
        fireEvent.change(descriptionInput, { target: { value: 'Updated cable description' } });

        // Click save
        const saveButton = screen.getByText('Save Changes');
        fireEvent.click(saveButton);

        expect(mockUpdateInventoryItem).toHaveBeenCalledWith(
            1, // jobsiteId
            'Electrical', // categoryName
            1, // item.id
            expect.objectContaining({
                item: 'Cable 12AWG',
                quantity: 600,
                description: 'Updated cable description',
                notes: 'Handle with care'
            })
        );
    });

    it('closes modal after saving changes', () => {
        render(
            <EditItemModal
                open={true}
                onClose={mockOnClose}
                item={testItem}
                categoryName="Electrical"
                jobsiteId={1}
            />
        );

        const saveButton = screen.getByText('Save Changes');
        fireEvent.click(saveButton);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('closes modal when close button is clicked', () => {
        render(
            <EditItemModal
                open={true}
                onClose={mockOnClose}
                item={testItem}
                categoryName="Electrical"
                jobsiteId={1}
            />
        );

        // Find the close icon button
        const closeButtons = screen.getAllByRole('button');
        const xButton = closeButtons.find(button => button.querySelector('svg'));

        if (xButton) {
            fireEvent.click(xButton);
            expect(mockOnClose).toHaveBeenCalled();
        }
    });

    it('returns null when item is not provided', () => {
        const { container } = render(
            <EditItemModal
                open={true}
                onClose={mockOnClose}
                item={null}
                categoryName="Electrical"
                jobsiteId={1}
            />
        );

        expect(container.firstChild).toBeNull();
    });

    it('handles numeric quantity input correctly', () => {
        render(
            <EditItemModal
                open={true}
                onClose={mockOnClose}
                item={testItem}
                categoryName="Electrical"
                jobsiteId={1}
            />
        );

        const quantityInput = screen.getByDisplayValue('500');

        // Test valid number
        fireEvent.change(quantityInput, { target: { value: '1000' } });
        expect(screen.getByDisplayValue('1000')).toBeInTheDocument();

        // Test decimal number
        fireEvent.change(quantityInput, { target: { value: '150.5' } });
        expect(screen.getByDisplayValue('150.5')).toBeInTheDocument();
    });

    it('updates all fields independently', () => {
        render(
            <EditItemModal
                open={true}
                onClose={mockOnClose}
                item={testItem}
                categoryName="Electrical"
                jobsiteId={1}
            />
        );

        const quantityInput = screen.getByDisplayValue('500');
        const descriptionInput = screen.getByDisplayValue('Electrical cable for wiring');
        const notesInput = screen.getByDisplayValue('Handle with care');

        // Change all fields
        fireEvent.change(quantityInput, { target: { value: '800' } });
        fireEvent.change(descriptionInput, { target: { value: 'New description' } });
        fireEvent.change(notesInput, { target: { value: 'New notes' } });

        // Verify all changes
        expect(screen.getByDisplayValue('800')).toBeInTheDocument();
        expect(screen.getByDisplayValue('New description')).toBeInTheDocument();
        expect(screen.getByDisplayValue('New notes')).toBeInTheDocument();
    });

    it('handles empty optional fields', () => {
        const itemWithoutOptionalFields = {
            id: 2,
            item: 'Test Item',
            quantity: 100,
            description: '',
            notes: ''
        };

        render(
            <EditItemModal
                open={true}
                onClose={mockOnClose}
                item={itemWithoutOptionalFields}
                categoryName="Plumbing"
                jobsiteId={1}
            />
        );

        const descriptionInput = screen.getByPlaceholderText('Type the description...');
        const notesInput = screen.getByPlaceholderText('Type a note...');

        expect(descriptionInput.value).toBe('');
        expect(notesInput.value).toBe('');
    });
});

