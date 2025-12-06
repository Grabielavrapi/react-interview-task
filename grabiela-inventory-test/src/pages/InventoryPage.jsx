// src/pages/InventoryPage.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
    Container,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
} from '@mui/material';
import { useStore } from '../context/InventoryStore';
import EditItemModal from '../components/EditItemModal/EditItemModal';
import SearchBar from '../components/SearchBar/SearchBar';

export default function InventoryPage() {
    const { jobsiteId } = useParams();
    const navigate = useNavigate();
    const { jobsites, inventory } = useStore();

    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');

    const jobsite = jobsites.find((j) => j.id === Number(jobsiteId));
    const data = inventory[jobsiteId];

    if (!jobsite || !data) {
        return (
            <Container sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h5">Jobsite not found</Typography>
                <Typography
                    onClick={() => navigate('/')}
                    sx={{ cursor: 'pointer', color: 'primary.main', mt: 2 }}
                >
                    ← Back to Jobsites
                </Typography>
            </Container>
        );
    }

    const filteredCategories = data.categories
        .map((cat) => ({
            ...cat,
            items: cat.items.filter((item) =>
                item.item.toLowerCase().includes(searchTerm.toLowerCase())
            ),
        }))
        .filter((cat) => cat.items.length > 0); // hiq kategoritë bosh pas filtrimit

    const handleCellDoubleClick = (item, categoryName) => {
        setSelectedItem({ ...item });
        setSelectedCategory(categoryName);
        setModalOpen(true);
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                {jobsite.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Status: <strong>{jobsite.status}</strong>
            </Typography>

            {/* SEARCH BAR */}
            <Box sx={{ mb: 5, maxWidth: 500 }}>
                <SearchBar
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Search items across all categories..."
                />
                {searchTerm && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {filteredCategories.flatMap((c) => c.items).length} results found
                    </Typography>
                )}
            </Box>

            {/* TABELAT - KATEGORIVE */}
            {filteredCategories.length === 0 ? (
                <Typography color="text.secondary">
                    No items found matching "{searchTerm}"
                </Typography>
            ) : (
                filteredCategories.map((category) => (
                    <Box key={category.name} sx={{ mb: 7 }}>
                        <Typography
                            variant="h5"
                            sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}
                        >
                            {category.name}
                        </Typography>

                        <TableContainer component={Paper} elevation={4}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                                        <TableCell><strong>Item</strong></TableCell>
                                        <TableCell align="right"><strong>Quantity</strong></TableCell>
                                        <TableCell align="right"><strong>Unit</strong></TableCell>
                                        <TableCell align="right"><strong>Ordered</strong></TableCell>
                                        <TableCell align="right"><strong>Received</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {category.items.map((item) => (
                                        <TableRow
                                            key={item.id}
                                            hover
                                            onDoubleClick={() => handleCellDoubleClick(item, category.name)}
                                            sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
                                        >
                                            <TableCell>{item.item}</TableCell>
                                            <TableCell align="right">{item.quantity}</TableCell>
                                            <TableCell align="right">{item.unit}</TableCell>
                                            <TableCell align="right">{item.ordered}</TableCell>
                                            <TableCell align="right">{item.received}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                ))
            )}

            {/* MODAL EDIT */}
            {selectedItem && (
                <EditItemModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    item={selectedItem}
                    categoryName={selectedCategory}
                    jobsiteId={Number(jobsiteId)}
                />
            )}
        </Container>
    );
}