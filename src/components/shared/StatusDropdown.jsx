import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaChevronDown } from 'react-icons/fa';

const StatusDropdown = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
    const wrapperRef = useRef(null);
    const dropdownRef = useRef(null);

    const statusOptions = ["Completed", "In Progress", "On Hold"];

    const updatePosition = () => {
        if (wrapperRef.current) {
            const rect = wrapperRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + window.scrollY + 8,
                left: rect.left + window.scrollX,
                width: rect.width
            });
        }
    };

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target) &&
            dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        if (isOpen) {
            updatePosition();
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', updatePosition, true);
            window.removeEventListener('resize', updatePosition);
        };
    }, [isOpen]);

    const handleToggle = () => {
        if (!isOpen) {
            updatePosition();
        }
        setIsOpen(!isOpen);
    };

    return (
        <div className="status-dropdown-container" ref={wrapperRef}>
            <div
                className={`status-trigger ${isOpen ? 'open' : ''}`}
                onClick={handleToggle}
            >
                <div className="status-value-wrapper">
                    {value && <span className={`status-dot ${value.toLowerCase().replace(' ', '-')}`} />}
                    <span className={`status-value ${value ? value.toLowerCase().replace(' ', '-') : ''}`}>
                        {value || "Select one"}
                    </span>
                </div>
                <FaChevronDown className={`arrow-icon ${isOpen ? 'open' : ''}`} />
            </div>

            {isOpen && createPortal(
                <ul
                    ref={dropdownRef}
                    className="status-dropdown-menu"
                    style={{
                        position: 'fixed',
                        top: `${position.top}px`,
                        left: `${position.left}px`,
                        width: `${position.width}px`
                    }}
                >
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
                                <span className={`status-dot ${optionClass}`} />
                                <span className="status-text">{option}</span>
                            </li>
                        );
                    })}
                </ul>,
                document.body
            )}
        </div>
    );
};

export default StatusDropdown;