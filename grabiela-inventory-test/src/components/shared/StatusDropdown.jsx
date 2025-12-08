import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const StatusDropdown = ({ value, onSelect }) => {
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
                className="status-trigger"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div>
          <span className={`status-value ${value ? value.toLowerCase().replace(' ', '-') : ''}`}>
            {value || "Select one"}
          </span>
                </div>
                {isOpen ? <FaChevronUp className="arrow-icon" /> : <FaChevronDown className="arrow-icon" />}
            </div>

            {isOpen && (
                <ul className="status-dropdown-menu">
                    {statusOptions.map(option => (
                        <li
                            key={option}
                            className={`dropdown-item ${option === value ? 'selected-option' : ''}`}
                            onClick={() => {
                                onSelect(option);
                                setIsOpen(false);
                            }}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default StatusDropdown;