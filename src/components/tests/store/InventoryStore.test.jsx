// filepath: c:\Users\User\react-interview-task\src\components\tests\store\InventoryStore.test.jsx
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useStore } from '../../../context/InventoryStore';

describe('InventoryStore - Jobsite Management', () => {
    beforeEach(() => {
        // Reset store to initial state before each test
        const { result } = renderHook(() => useStore());
        act(() => {
            result.current.jobsites = [
                { id: 1, name: "1658 E 23rd St, Brooklyn, NY 11229, USA", status: "On Road" },
                { id: 2, name: "1705 E 22nd St, Brooklyn, NY 11229, USA", status: "On Hold" },
                { id: 3, name: "47 Lake St, Brooklyn, NY 11223, USA", status: "Completed" },
            ];
        });
    });

    it('initializes with default jobsites', () => {
        const { result } = renderHook(() => useStore());

        expect(result.current.jobsites).toHaveLength(3);
        expect(result.current.jobsites[0].name).toBe("1658 E 23rd St, Brooklyn, NY 11229, USA");
    });

    it('adds a new jobsite with addJobsite', () => {
        const { result } = renderHook(() => useStore());

        const initialCount = result.current.jobsites.length;

        act(() => {
            result.current.addJobsite({
                name: 'New Test Jobsite',
                status: 'On Road',
                categories: ['Electrical']
            });
        });

        expect(result.current.jobsites.length).toBe(initialCount + 1);
        const newJobsite = result.current.jobsites[result.current.jobsites.length - 1];
        expect(newJobsite.name).toBe('New Test Jobsite');
        expect(newJobsite.status).toBe('On Road');
        expect(newJobsite.id).toBeDefined();
    });

    it('assigns unique id to new jobsite', () => {
        const { result } = renderHook(() => useStore());

        act(() => {
            result.current.addJobsite({
                name: 'Jobsite One',
                status: 'On Road',
                categories: []
            });
        });

        const firstId = result.current.jobsites[result.current.jobsites.length - 1].id;

        act(() => {
            result.current.addJobsite({
                name: 'Jobsite Two',
                status: 'On Hold',
                categories: []
            });
        });

        const secondId = result.current.jobsites[result.current.jobsites.length - 1].id;

        expect(firstId).not.toBe(secondId);
    });

    it('preserves existing jobsites when adding new one', () => {
        const { result } = renderHook(() => useStore());

        const existingJobsites = [...result.current.jobsites];

        act(() => {
            result.current.addJobsite({
                name: 'Additional Jobsite',
                status: 'Completed',
                categories: []
            });
        });

        // Check that all existing jobsites are still there
        existingJobsites.forEach((jobsite, index) => {
            expect(result.current.jobsites[index]).toEqual(jobsite);
        });
    });
});

describe('InventoryStore - Inventory Management', () => {
    it('initializes with default inventory', () => {
        const { result } = renderHook(() => useStore());

        expect(result.current.inventory).toBeDefined();
        expect(result.current.inventory[1]).toBeDefined();
        expect(result.current.inventory[1].categories).toHaveLength(2);
    });

    it('updates inventory item with updateInventoryItem', () => {
        const { result } = renderHook(() => useStore());

        act(() => {
            result.current.updateInventoryItem(
                1, // jobsiteId
                'Electrical', // categoryName
                1, // itemId
                { quantity: 750 } // updatedFields
            );
        });

        const electricalCategory = result.current.inventory[1].categories.find(
            cat => cat.name === 'Electrical'
        );
        const updatedItem = electricalCategory.items.find(item => item.id === 1);

        expect(updatedItem.quantity).toBe(750);
    });

    it('updates multiple fields of inventory item', () => {
        const { result } = renderHook(() => useStore());

        act(() => {
            result.current.updateInventoryItem(
                1,
                'Electrical',
                1,
                {
                    quantity: 600,
                    description: 'Updated description',
                    notes: 'Updated notes'
                }
            );
        });

        const electricalCategory = result.current.inventory[1].categories.find(
            cat => cat.name === 'Electrical'
        );
        const updatedItem = electricalCategory.items.find(item => item.id === 1);

        expect(updatedItem.quantity).toBe(600);
        expect(updatedItem.description).toBe('Updated description');
        expect(updatedItem.notes).toBe('Updated notes');
    });

    it('preserves other items when updating one item', () => {
        const { result } = renderHook(() => useStore());

        const electricalCategory = result.current.inventory[1].categories.find(
            cat => cat.name === 'Electrical'
        );
        const otherItems = electricalCategory.items.filter(item => item.id !== 1);

        act(() => {
            result.current.updateInventoryItem(1, 'Electrical', 1, { quantity: 999 });
        });

        const updatedCategory = result.current.inventory[1].categories.find(
            cat => cat.name === 'Electrical'
        );
        const unchangedItems = updatedCategory.items.filter(item => item.id !== 1);

        expect(unchangedItems).toEqual(otherItems);
    });

    it('preserves other categories when updating item in one category', () => {
        const { result } = renderHook(() => useStore());

        const plumbingCategory = result.current.inventory[1].categories.find(
            cat => cat.name === 'Plumbing'
        );

        act(() => {
            result.current.updateInventoryItem(1, 'Electrical', 1, { quantity: 888 });
        });

        const unchangedPlumbing = result.current.inventory[1].categories.find(
            cat => cat.name === 'Plumbing'
        );

        expect(unchangedPlumbing).toEqual(plumbingCategory);
    });

    it('updates correct item in correct category', () => {
        const { result } = renderHook(() => useStore());

        act(() => {
            result.current.updateInventoryItem(
                1,
                'Plumbing',
                4,
                { quantity: 200 }
            );
        });

        const plumbingCategory = result.current.inventory[1].categories.find(
            cat => cat.name === 'Plumbing'
        );
        const updatedItem = plumbingCategory.items.find(item => item.id === 4);

        expect(updatedItem.quantity).toBe(200);
        expect(updatedItem.item).toBe('PVC Pipe 4"');
    });
});

