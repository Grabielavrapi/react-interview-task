// src/pages/JobsitesPage.jsx
import { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FaInfoCircle } from 'react-icons/fa';
import SearchBar from '../components/SearchBar/SearchBar';
import CreateJobsiteModal from '../components/modals/CreateJobsiteModal.jsx';
import useJobSites from '../components/hooks/useJobSites';
import { useNavigate } from 'react-router-dom';

export default function JobsitesPage() {
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const { jobsites: filtered, counts } = useJobSites(search, 'all');
    const navigate = useNavigate();


    const getStatusClass = (status) => {
        return {
            'On Road': 'on-road',
            'Completed': 'completed',
            'On Hold': 'on-hold',
            'In Progress': 'in-progress'
        }[status] || 'in-progress';
    };

    return (
        <Box className="dashboard-container">
            {/* 3 STATUS CARDS */}
            <Box className="dashboard-header-cards">
                <Box className="status-card in-progress">
                    <div className="status-card-number">{counts['On Road']}</div>
                    <div className="status-card-label">On Road</div>
                </Box>
                <Box className="status-card completed">
                    <div className="status-card-number">{counts['Completed']}</div>
                    <div className="status-card-label">Completed</div>
                </Box>
                <Box className="status-card on-hold-header">
                    <div className="status-card-number">{counts['On Hold']}</div>
                    <div className="status-card-label">On Hold</div>
                </Box>
            </Box>

            {/* CONTENT BOX */}
            <Box className="dashboard-content-box">
                <Box className="dashboard-title-section">
                    <Typography variant="h2">Title</Typography>
                </Box>

                {/* INFO BANNER + SEARCH + CREATE */}
                <Box className="jobsite-list-controls">
                    <Box className="info-banner">
                        <FaInfoCircle className="icon" />
                        <span>Informative piece of text that can be used regarding this modal.</span>
                    </Box>
                    <Box className="search-and-create-controls">
                        <SearchBar value={search} onChange={setSearch} placeholder="Search a driver" />
                        <Button
                            className="create-btn"
                            endIcon={<AddIcon />}
                            onClick={() => setModalOpen(true)}
                        >
                            Create
                        </Button>
                    </Box>
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
                                <td>
                                    <span className="jobsite-name">{job.name}</span>
                                </td>
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