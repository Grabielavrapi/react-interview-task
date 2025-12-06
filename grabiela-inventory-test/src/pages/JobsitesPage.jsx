import { useState } from 'react';
import { Container, Typography, Button, Stack, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchBar from '../components/SearchBar/SearchBar';
import StatusFilter from '../components/StatusFilter/StatusFilter';
import JobsiteCard from '../components/JobsiteCard/JobsiteCard';
import CreateJobsiteModal from '../components/CreateJobsiteModal/CreateJobsiteModal';
import { useStore } from '../context/InventoryStore';

export default function JobsitesPage() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [modalOpen, setModalOpen] = useState(false);

    const jobsites = useStore((state) => state.jobsites);

    const filtered = jobsites.filter((job) => {
        const matchesSearch = job.name.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4">Job Sites</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setModalOpen(true)}
                >
                    Create Jobsite
                </Button>
            </Stack>

            <Stack direction="row" mb={4}>
                <SearchBar value={search} onChange={setSearch} placeholder="Search jobsites..." />
                <StatusFilter value={statusFilter} onChange={setStatusFilter} />
            </Stack>

            <Box>
                {filtered.length === 0 ? (
                    <Typography color="text.secondary">No jobsites found</Typography>
                ) : (
                    filtered.map((job) => (
                        <JobsiteCard key={job.id} jobsite={job} />
                    ))
                )}
            </Box>

            <CreateJobsiteModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </Container>
    );
}