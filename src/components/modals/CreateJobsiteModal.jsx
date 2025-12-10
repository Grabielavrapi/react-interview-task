import { useState } from 'react';
import { FaTimes, FaInfoCircle } from 'react-icons/fa';
import { Dialog, DialogContent, IconButton, Box, TextField } from '@mui/material';
import { useStore } from '../../context/InventoryStore.js';
import Button from '../shared/Button.jsx';
import MultiSelectDropdown from '../shared/MultiSelectDropdown.jsx';
import StatusDropdown from '../shared/StatusDropdown.jsx';

const categories = ['Sidewalk Shed', 'Scaffold', 'Shoring'];

export default function CreateJobsiteModal({ onClose }) {
    const [name, setName] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [status, setStatus] = useState('');

    const addJobsite = useStore(state => state.addJobsite);

    const handleSave = () => {
        if (name.trim() && status) {
            addJobsite({ name: name.trim(), status, categories: selectedCategories });
            onClose();
        }
    };

    return (
        <Dialog
            open={true}
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
                padding: '16px 20px',
                borderBottom: '1px solid #e0e0e0'
            }}>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#333' }}>Title</h2>
                <IconButton onClick={onClose} sx={{ color: '#666' }}>
                    <FaTimes size={20} />
                </IconButton>
            </Box>

            <DialogContent sx={{ padding: '16px' }}>
                {/* INFO BANNER */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    backgroundColor: '#e3f2fd',
                    borderRadius: '6px',
                    marginBottom: '16px'
                }}>
                    <FaInfoCircle size={18} color="#1976d2" />
                    <span style={{ color: '#0d47a1', fontSize: '13px' }}>
                        Informative piece of text that can be used regarding this modal.
                    </span>
                </Box>

                {/* NAME */}
                <Box sx={{ marginBottom: '16px' }}>
                    <label style={{
                        fontSize: '13px',
                        fontWeight: 500,
                        color: '#333',
                        marginBottom: '6px',
                        display: 'block'
                    }}>
                        Name
                    </label>
                    <TextField
                        fullWidth
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Type the jobsite's name"
                        sx={{
                            backgroundColor: '#f5f5f5',
                            borderRadius: '8px',
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none'
                            }
                        }}
                    />
                </Box>

                {/* CATEGORY INCLUDED AND STATUS */}
                <Box sx={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                    <Box sx={{ flex: 2 }}>
                        <label style={{
                            fontSize: '13px',
                            fontWeight: 500,
                            color: '#333',
                            marginBottom: '6px',
                            display: 'block'
                        }}>
                            Category Included
                        </label>
                        <MultiSelectDropdown
                            options={categories}
                            selectedOptions={selectedCategories}
                            onSelect={(category) => setSelectedCategories([...selectedCategories, category])}
                            onDeselect={(category) => setSelectedCategories(selectedCategories.filter(c => c !== category))}
                        />
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <label style={{
                            fontSize: '13px',
                            fontWeight: 500,
                            color: '#333',
                            marginBottom: '6px',
                            display: 'block'
                        }}>
                            Status
                        </label>
                        <StatusDropdown
                            value={status}
                            onChange={(newStatus) => setStatus(newStatus)}
                        />
                    </Box>
                </Box>

                {/* BUTTONS */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                    <Button text="Cancel Changes" color="red" icon="cancel" onClick={onClose} />
                    <Button text="Save Changes" color="green" icon="check" onClick={handleSave} disabled={!name.trim() || !status} />
                </Box>
            </DialogContent>
        </Dialog>
    );
}