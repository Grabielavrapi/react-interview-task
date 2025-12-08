// src/pages/JobsitesPage.jsx
import { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchBar from '../components/SearchBar/SearchBar';
import StatusFilter from '../components/StatusFilter/StatusFilter';
import CreateJobsiteModal from '../components/modals/CreateJobsiteModal.jsx';
import useJobSites from '../components/hooks/useJobSites';
import { useNavigate } from 'react-router-dom';

export default function JobsitesPage() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [modalOpen, setModalOpen] = useState(false);
    const { jobsites: filtered, counts } = useJobSites(search, statusFilter);
    const navigate = useNavigate();


    const getStatusClass = (status) => {
        return {
            'On Road': 'in-progress',
            'Completed': 'completed',
            'On Hold': 'on-hold-header',
            'In Progress': 'in-progress'
        }[status] || 'in-progress';
    };

    return (
        <Box className="dashboard-container">
            {/* 3 STATUS CARDS */}
            <Box className="dashboard-header-cards">
                <Box className="status-card in-progress">
                    {counts['On Road']} On Road
                </Box>
                <Box className="status-card completed">
                    {counts['Completed']} Completed
                </Box>
                <Box className="status-card on-hold-header">
                    {counts['On Hold']} On Hold
                </Box>
            </Box>

            {/* CONTENT BOX */}
            <Box className="dashboard-content-box">
                <Box className="dashboard-title-section">
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                            Job Site Dashboard
                        </Typography>
                    </Box>
                </Box>

                {/* SEARCH + CREATE */}
                <Box className="jobsite-list-controls">
                    <Box className="search-and-create-controls">
                        <SearchBar value={search} onChange={setSearch} placeholder="Search a driver" />
                        <StatusFilter value={statusFilter} onChange={setStatusFilter} />
                    </Box>
                    <Button
                        className="create-btn"
                        startIcon={<AddIcon />}
                        onClick={() => setModalOpen(true)}
                    >
                        CREATE
                    </Button>
                </Box>

                {/* TABLE */}
                <Box className="jobsite-list">
                    <table>
                        <thead>
                        <tr>
                            <th>Jobsite Name</th>
                            <th style={{ textAlign: 'right' }}>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filtered.map(job => (
                            <tr key={job.id} onClick={() => navigate(`/inventory/${job.id}`)}>
                                <td>{job.name}</td>
                                <td style={{ textAlign: 'right' }}>
                    <span className={`status-pill ${getStatusClass(job.status)}`}>
                      {job.status}
                    </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </Box>
            </Box>

            {modalOpen && <CreateJobsiteModal onClose={() => setModalOpen(false)} />}
        </Box>
    );
}