import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaCheck, FaTimes } from 'react-icons/fa';

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

    const getOptionClass = (option) => {
        return option.toLowerCase().replace(/\s+/g, '-');
    };

    const handleRemovePill = (e, option) => {
        e.stopPropagation();
        onDeselect(option);
    };

    return (
        <div className="multi-select-container" ref={wrapperRef}>
            <div className={`select-trigger ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                {selectedOptions.length === 0 ? (
                    <span className="placeholder">Select</span>
                ) : allSelected ? (
                    <span className="placeholder">All of them selected</span>
                ) : (
                    <div className="selected-pills-inline">
                        {selectedOptions.map(option => (
                            <span key={option} className={`category-pill ${getOptionClass(option)}`}>
                                {option}
                                <FaTimes
                                    className="remove-icon"
                                    onClick={(e) => handleRemovePill(e, option)}
                                />
                            </span>
                        ))}
                    </div>
                )}
                <FaChevronDown className={`arrow-icon ${isOpen ? 'open' : ''}`} />
            </div>

            {isOpen && (
                <div className="dropdown-menu">
                    {options.map(option => (
                        <div
                            key={option}
                            className={`dropdown-item ${isSelected(option) ? `active ${getOptionClass(option)}` : ''}`}
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