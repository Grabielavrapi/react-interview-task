// src/pages/InventoryPage.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaChevronLeft, FaCheck, FaTimes } from 'react-icons/fa';
import { useStore } from '../context/InventoryStore';
import SearchBar from '../components/SearchBar/SearchBar';
import EditItemModal from '../components/modals/EditItemModal';

export default function InventoryPage() {
    const { jobsiteId } = useParams();
    const navigate = useNavigate();
    const { jobsites, inventory } = useStore();

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const jobsite = jobsites.find(j => j.id === Number(jobsiteId));
    const data = inventory[jobsiteId];

    if (!jobsite || !data) {
        return <div style={{ padding: 40, textAlign: 'center' }}>Jobsite not found</div>;
    }

    const categories = data.categories.map(c => c.name);
    const selectedItems = selectedCategory
        ? data.categories.find(c => c.name === selectedCategory)?.items || []
        : [];

    const filteredItems = selectedItems.filter(item =>
        item.item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDoubleClick = (item) => {
        setEditingItem({ ...item, category: selectedCategory });
        setEditModalOpen(true);
    };

    const handleClear = () => {
        setSelectedCategory(null);
        setSearchTerm('');
    };

    return (
        <div className="inventory-container">
            {/* SIDEBAR */}
            <div className="inventory-sidebar">
                <div className="inventory-main-header1">
                    <h2>{jobsite.name}</h2>
                </div>
                <div className="category-buttons-container">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`category-button ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            <span>{cat}</span>
                            {selectedCategory === cat && <FaCheck className="check-icon" />}
                        </button>
                    ))}
                    <button className="go-back-button" onClick={() => navigate('/')}>
                        <FaChevronLeft /> Go Back
                    </button>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="inventory-main">
                <div className="inventory-main-header">
                    <h3 style={{ fontWeight: 500 }}>
                        {selectedCategory || 'Data Grid'}
                    </h3>
                    {selectedCategory && (
                        <div className="search-and-close">
                            <SearchBar value={searchTerm} onChange={setSearchTerm} />
                            <button onClick={handleClear} className="close-icon-button">
                                <FaTimes />
                            </button>
                        </div>
                    )}
                </div>

                {/* TABLE OR NO SERVICE */}
                {selectedCategory ? (
                    <div className="inventory-table-container">
                        {filteredItems.length === 0 ? (
                            <div style={{ padding: 60, textAlign: 'center', color: '#666' }}>
                                <h3>No items found</h3>
                            </div>
                        ) : (
                            <table>
                                <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Unit</th>
                                    <th>Ordered</th>
                                    <th>Received</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredItems.map(item => (
                                    <tr key={item.id} onDoubleClick={() => handleDoubleClick(item)}>
                                        <td>{item.item}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.unit}</td>
                                        <td>{item.ordered}</td>
                                        <td>{item.received}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                ) : (
                    <div className="no-service-selected">
                        <img
                            src="https://media.istockphoto.com/id/1296187581/photo/empty-open-cardboard-box-high-angle-view.jpg?s=612x612&w=0&k=20&c=PbPYTIUhEZzPejKlu01w1WUkcZ0RpG9-g_hXqeHEGWQ="
                            alt="No service selected"
                            className="box-package-icon"
                        />
                        <h2>No Service Selected</h2>
                        <p>Please select a service on your left to proceed.</p>
                    </div>
                )}
            </div>

            {/* EDIT MODAL */}
            {editingItem && (
                <EditItemModal
                    open={editModalOpen}
                    onClose={() => {
                        setEditModalOpen(false);
                        setEditingItem(null);
                    }}
                    item={editingItem}
                    categoryName={editingItem.category}
                    jobsiteId={Number(jobsiteId)}
                />
            )}
        </div>
    );
}