import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaTimes, FaCheck } from 'react-icons/fa';

const MultiSelectDropdown = ({ options, selectedOptions, onSelect, onDeselect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isSelected = (option) => selectedOptions.includes(option);

    const allSelected = selectedOptions.length === options.length && options.length > 0;

    const handleItemClick = (option) => {
        if (isSelected(option)) {
            onDeselect(option);
        } else {
            onSelect(option);
        }
    };

    return (
        <div className="multi-select-container" ref={wrapperRef}>
            <div className="select-trigger" onClick={() => setIsOpen(!isOpen)}>
        <span className="placeholder">
          {allSelected ? "All of them selected" : "Category Included"}
        </span>
                <FaChevronDown className="arrow-icon" />
            </div>

            {isOpen && (
                <div className="dropdown-menu">
                    {options.map(option => (
                        <div
                            key={option}
                            className={`dropdown-item ${isSelected(option) ? 'active' : ''}`}
                            onClick={() => handleItemClick(option)}
                        >
                            <span className="item-text">{option}</span>
                            {isSelected(option) && <FaCheck className="check-icon" />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelectDropdown;