import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, MenuItem
} from '@mui/material';
import { useState } from 'react';
import { useStore } from '../../context/InventoryStore';

const statuses = ["On Road", "On Hold", "Completed"];

export default function CreateJobsiteModal({ open, onClose }) {
    const [name, setName] = useState('');
    const [status, setStatus] = useState('On Road');
    const addJobsite = useStore((state) => state.addJobsite);

    const handleSave = () => {
        if (name.trim()) {
            addJobsite({ name: name.trim(), status });
            setName('');
            setStatus('On Road');
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Create New Jobsite</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Jobsite Address"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                />
                <TextField
                    select
                    margin="dense"
                    label="Status"
                    fullWidth
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    {statuses.map((s) => (
                        <MenuItem key={s} value={s}>{s}</MenuItem>
                    ))}
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} variant="contained">Create</Button>
            </DialogActions>
        </Dialog>
    );
}