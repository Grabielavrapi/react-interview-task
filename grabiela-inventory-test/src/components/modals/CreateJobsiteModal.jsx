import { useState } from 'react';
import { FaTimes, FaInfoCircle } from 'react-icons/fa';
import { useStore } from '../../context/InventoryStore.js';
import MultiSelectDropdown from '../shared/MultiSelectDropdown.jsx';
import StatusDropdown from '../shared/StatusDropdown.jsx';
import Button from '../shared/Button.jsx';

const categories = ['Sidewalk Shed', 'Scaffold', 'Shoring'];

export default function CreateJobsiteModal({ onClose }) {
    const [name, setName] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [status, setStatus] = useState('');

    const addJobsite = useStore(state => state.addJobsite);

    const handleSave = () => {
        if (name.trim() && status) {
            addJobsite({ name: name.trim(), status, categories: selectedCategories });
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Title</h3>
                    <button onClick={onClose}><FaTimes /></button>
                </div>

                <div className="modal-body">
                    <div className="info-text">
                        <FaInfoCircle className="icon" />
                        <span>Informative piece of text that can be used regarding this modal.</span>
                    </div>

                    <div className="form-field">
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Type the jobsite's name"
                            className="modal-input"
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
                    <Button text="Save Changes" color="green" icon="check" onClick={handleSave} disabled={!name.trim() || !status} />
                </div>
            </div>
        </div>
    );
}