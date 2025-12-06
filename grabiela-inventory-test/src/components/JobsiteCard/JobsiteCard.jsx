import { Card, CardContent, Typography, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const statusColors = {
    "On Road": "warning",
    "On Hold": "error",
    "Completed": "success"
};

export default function JobsiteCard({ jobsite }) {
    const navigate = useNavigate();

    return (
        <Card
            sx={{ mb: 2, cursor: 'pointer', '&:hover': { boxShadow: 6 } }}
            onClick={() => navigate(`/inventory/${jobsite.id}`)}
        >
            <CardContent>
                <Typography variant="h6" component="div">
                    {jobsite.name}
                </Typography>
                <Chip
                    label={jobsite.status}
                    color={statusColors[jobsite.status]}
                    size="small"
                    sx={{ mt: 1 }}
                />
            </CardContent>
        </Card>
    );
}