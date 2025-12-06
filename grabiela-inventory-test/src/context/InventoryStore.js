// src/context/InventoryStore.js
import { create } from 'zustand';

const initialJobsites = [
    { id: 1, name: "1658 E 23rd St, Brooklyn, NY 11229, USA", status: "On Road" },
    { id: 2, name: "1705 E 22nd St, Brooklyn, NY 11229, USA", status: "On Hold" },
    { id: 3, name: "47 Lake St, Brooklyn, NY 11223, USA", status: "Completed" },
];

const initialInventory = {
    1: {
        categories: [
            {
                name: "Electrical",
                items: [
                    { id: 1, item: "Cable 12AWG", quantity: 500, unit: "m", ordered: 600, received: 500 },
                    { id: 2, item: "LED Panel 2x4", quantity: 120, unit: "pcs", ordered: 150, received: 120 },
                    { id: 3, item: "Circuit Breaker 20A", quantity: 45, unit: "pcs", ordered: 50, received: 45 },
                ],
            },
            {
                name: "Plumbing",
                items: [
                    { id: 4, item: "PVC Pipe 4\"", quantity: 80, unit: "m", ordered: 100, received: 80 },
                    { id: 5, item: "Copper Pipe 1/2\"", quantity: 30, unit: "m", ordered: 40, received: 30 },
                ],
            },
        ],
    },
    // Mund të shtosh edhe për jobsite të tjera më vonë
};

export const useStore = create((set) => ({
    jobsites: initialJobsites,
    inventory: initialInventory,

    addJobsite: (newJobsite) =>
        set((state) => ({
            jobsites: [...state.jobsites, { ...newJobsite, id: Date.now() }],
        })),

    updateInventoryItem: (jobsiteId, categoryName, itemId, updatedFields) =>
        set((state) => ({
            inventory: {
                ...state.inventory,
                [jobsiteId]: {
                    ...state.inventory[jobsiteId],
                    categories: state.inventory[jobsiteId].categories.map((cat) =>
                        cat.name === categoryName
                            ? {
                                ...cat,
                                items: cat.items.map((item) =>
                                    item.id === itemId ? { ...item, ...updatedFields } : item
                                ),
                            }
                            : cat
                    ),
                },
            },
        })),
}));