import { useState } from 'react';
import { FaTimes, FaInfoCircle } from 'react-icons/fa';
import { useStore } from '../../context/InventoryStore.js';
import MultiSelectDropdown from '../shared/MultiSelectDropdown.jsx';
import StatusDropdown from '../shared/StatusDropdown.jsx';
import Button from '../shared/Button.jsx';

const categories = ['Electrical', 'Plumbing', 'HVAC', 'Drywall', 'Painting'];

export default function CreateJobsiteModal({ onClose }) {
    const [name, setName] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [status, setStatus] = useState('On Hold');

    const addJobsite = useStore(state => state.addJobsite);

    const handleSave = () => {
        if (name.trim()) {
            addJobsite({ name: name.trim(), status, categories: selectedCategories });
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Create Job Site</h3>
                    <button onClick={onClose}><FaTimes /></button>
                </div>

                <div className="modal-body">
                    <div className="info-text">
                        <FaInfoCircle className="icon" />
                        <span>Fill in the details below to create a new job site. You can specify the name, categories, and the current status of the job site.</span>
                    </div>

                    <div style={{ margin: '20px 0' }}>
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Type jobsite's name"
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', marginTop: '8px' }}
                        />
                    </div>

                    <div className="modal-row">
                        <div className="modal-column">
                            <label>Category Included</label>
                            <MultiSelectDropdown
                                options={categories}
                                selectedOptions={selectedCategories}
                                onSelect={(opt) => setSelectedCategories(prev => [...prev, opt])}
                                onDeselect={(opt) => setSelectedCategories(prev => prev.filter(x => x !== opt))}
                            />
                        </div>
                        <div className="modal-column">
                            <label>Status</label>
                            <StatusDropdown value={status} onChange={setStatus} />
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <Button text="Cancel Changes" color="red" icon="cancel" onClick={onClose} />
                    <Button text="Save Changes" color="green" icon="check" onClick={handleSave} disabled={!name.trim()} />
                </div>
            </div>
        </div>
    );
}