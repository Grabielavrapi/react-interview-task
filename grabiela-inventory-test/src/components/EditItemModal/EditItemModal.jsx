import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Grid
} from '@mui/material';
import { useStore } from '../../context/InventoryStore';

export default function EditItemModal({ open, onClose, item, categoryName, jobsiteId }) {
    const updateInventoryItem = useStore((state) => state.updateInventoryItem);

    const handleSave = () => {
        updateInventoryItem(jobsiteId, categoryName, item.id, item);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <TextField
                            label="Item"
                            fullWidth
                            value={item.item}
                            onChange={(e) => (item.item = e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Quantity"
                            type="number"
                            fullWidth
                            value={item.quantity}
                            onChange={(e) => (item.quantity = Number(e.target.value))}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Unit"
                            fullWidth
                            value={item.unit}
                            onChange={(e) => (item.unit = e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Ordered"
                            type="number"
                            fullWidth
                            value={item.ordered}
                            onChange={(e) => (item.ordered = Number(e.target.value))}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Received"
                            type="number"
                            fullWidth
                            value={item.received}
                            onChange={(e) => (item.received = Number(e.target.value))}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );
}