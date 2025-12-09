import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const StatusDropdown = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    const statusOptions = ["Completed", "In Progress", "On Hold"];

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="status-dropdown-container" ref={wrapperRef}>
            <div
                className={`status-trigger ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div>
          <span className={`status-value ${value ? value.toLowerCase().replace(' ', '-') : ''}`}>
            {value || "Select one"}
          </span>
                </div>
                <FaChevronDown className={`arrow-icon ${isOpen ? 'open' : ''}`} />
            </div>

            {isOpen && (
                <ul className="status-dropdown-menu">
                    {statusOptions.map(option => {
                        const optionClass = option.toLowerCase().replace(' ', '-');
                        const isSelected = option === value;
                        return (
                            <li
                                key={option}
                                className={`dropdown-item ${isSelected ? `selected-option ${optionClass}-selected` : `${optionClass}-option`}`}
                                onClick={() => {
                                    onChange(option);
                                    setIsOpen(false);
                                }}
                            >
                                {option}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default StatusDropdown;