import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function StatusFilter({ value, onChange }) {
    return (
        <FormControl size="small" sx={{ minWidth: 120, ml: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select value={value} label="Status" onChange={(e) => onChange(e.target.value)}>
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="On Road">On Road</MenuItem>
                <MenuItem value="On Hold">On Hold</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
            </Select>
        </FormControl>
    );
}