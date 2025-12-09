import {
    Dialog, DialogContent, IconButton, Box, TextField, MenuItem, Select, FormControl
} from '@mui/material';
import { FaInfoCircle, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useStore } from '../../context/InventoryStore.js';
import Button from '../shared/Button.jsx';
export default function EditItemModal({ open, onClose, item, categoryName, jobsiteId }) {
    const updateInventoryItem = useStore((state) => state.updateInventoryItem);

    const [formData, setFormData] = useState({
        item: '',
        quantity: 0,
        description: '',
        notes: ''
    });

    useEffect(() => {
        if (item) {
            setFormData({
                item: item.item || '',
                quantity: item.quantity || 0,
                description: item.description || '',
                notes: item.notes || ''
            });
        }
    }, [item]);

    const handleSave = () => {
        if (item && categoryName) {
            updateInventoryItem(jobsiteId, categoryName, item.id, formData);
            onClose();
        }
    };

    if (!item) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={false}
            PaperProps={{
                sx: {
                    width: '650px',
                    maxWidth: '90%',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                }
            }}
        >
            {/* HEADER */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 24px',
                borderBottom: '1px solid #e0e0e0'
            }}>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 600, color: '#333' }}>Title</h2>
                <IconButton onClick={onClose} sx={{ color: '#666' }}>
                    <FaTimes size={20} />
                </IconButton>
            </Box>

            <DialogContent sx={{ padding: '24px' }}>
                {/* INFO BANNER */}
                <Box className="info-banner" sx={{ marginBottom: '20px' }}>
                    <FaInfoCircle size={20} color="#1976d2" />
                    <span style={{ color: '#0d47a1', fontSize: '14px' }}>
                        Informative piece of text that can be used regarding this modal.
                    </span>
                </Box>

                {/* ITEM AND QUANTITY */}
                <Box sx={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                    <FormControl sx={{ flex: 1 }}>
                        <label style={{
                            fontSize: '14px',
                            fontWeight: 500,
                            color: '#333',
                            marginBottom: '8px',
                            display: 'block'
                        }}>
                            Item
                        </label>
                        <Select
                            value={formData.item}
                            onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                            displayEmpty
                            sx={{
                                backgroundColor: '#f5f5f5',
                                borderRadius: '8px',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none'
                                }
                            }}
                        >
                            <MenuItem value={formData.item}>{formData.item || 'Search & Select Item'}</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ flex: 1 }}>
                        <label style={{
                            fontSize: '14px',
                            fontWeight: 500,
                            color: '#333',
                            marginBottom: '8px',
                            display: 'block'
                        }}>
                            Quantity
                        </label>
                        <TextField
                            type="number"
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                            placeholder="Set Quantity"
                            sx={{
                                backgroundColor: '#f5f5f5',
                                borderRadius: '8px',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none'
                                }
                            }}
                        />
                    </FormControl>
                </Box>

                {/* DESCRIPTION */}
                <Box sx={{ marginBottom: '24px' }}>
                    <label style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#333',
                        marginBottom: '8px',
                        display: 'block'
                    }}>
                        Description
                    </label>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Type the description..."
                        sx={{
                            backgroundColor: '#f5f5f5',
                            borderRadius: '8px',
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none'
                            }
                        }}
                    />
                </Box>

                {/* NOTES */}
                <Box sx={{ marginBottom: '24px' }}>
                    <label style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#333',
                        marginBottom: '8px',
                        display: 'block'
                    }}>
                        Notes
                    </label>
                    <TextField
                        fullWidth
                        multiline
                        rows={2}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Type a note..."
                        sx={{
                            backgroundColor: '#f5f5f5',
                            borderRadius: '8px',
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none'
                            }
                        }}
                    />
                </Box>

                {/* SAVE BUTTON */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        text="Save Changes"
                        color="green"
                        icon="check"
                        onClick={handleSave}
                    />
                </Box>
            </DialogContent>
        </Dialog>
    );
}