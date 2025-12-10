import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaCheck, FaTimes, FaPlus, FaSearch } from 'react-icons/fa';
import './MultiSelectDropdown.css';

const MultiSelectDropdown = ({ options = [], selectedOptions = [], onSelect, onDeselect, placeholder = 'Select categories…' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
    const wrapperRef = useRef(null);
    const popoverRef = useRef(null);
    const searchRef = useRef(null);

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target) &&
                popoverRef.current && !popoverRef.current.contains(event.target)) {
                setIsOpen(false);
                setQuery('');
            }
        };

        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
                setQuery('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEsc);

        if (isOpen) {
            updatePosition();
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEsc);
            window.removeEventListener('scroll', updatePosition, true);
            window.removeEventListener('resize', updatePosition);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && searchRef.current) {
            searchRef.current.focus();
        }
    }, [isOpen]);

    const isSelected = (option) => selectedOptions.includes(option);

    const handleItemClick = (option) => {
        if (isSelected(option)) {
            onDeselect && onDeselect(option);
        } else {
            onSelect && onSelect(option);
        }
    };

    const getOptionClass = (option) => option.toLowerCase().replace(/\s+/g, '-');

    const handleRemovePill = (e, option) => {
        e.stopPropagation();
        onDeselect && onDeselect(option);
    };

    const handleToggle = () => {
        if (!isOpen) {
            updatePosition();
        }
        setIsOpen((v) => !v);
    };

    const filtered = options.filter((o) => o.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="multi-select-container" ref={wrapperRef}>
            <div
                className={`select-trigger ${isOpen ? 'open' : ''}`}
                onClick={handleToggle}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') handleToggle(); }}
                aria-expanded={isOpen}
            >
                {/* ...existing pills inline code... */}
                <div className="selected-pills-inline">
                    {selectedOptions.length === 0 ? (
                        <span className="placeholder">
                            {placeholder}
                        </span>
                    ) : (
                        selectedOptions.map(option => (
                            <span key={option} className={`category-pill ${getOptionClass(option)}`} title={option}>
                                <span className={`pill-dot ${getOptionClass(option)}`} />
                                <span className="pill-label">{option}</span>
                                <FaTimes
                                    className="remove-icon"
                                    onClick={(e) => handleRemovePill(e, option)}
                                    aria-label={`Remove ${option}`}
                                />
                            </span>
                        ))
                    )}
                </div>

                {/* subtle plus icon when empty; otherwise a small chevron-less spacer */}
                <div className="trigger-end">
                    {selectedOptions.length === 0 ? <FaPlus className="plus-icon" /> : <div style={{ width: 18 }} />}
                </div>
            </div>

            {isOpen && createPortal(
                <div
                    ref={popoverRef}
                    className="popover-menu"
                    role="dialog"
                    aria-label="Select categories"
                    style={{
                        position: 'fixed',
                        top: `${position.top}px`,
                        left: `${position.left}px`,
                        width: `${Math.max(position.width, 360)}px`
                    }}
                >
                    <div className="popover-search">
                        <FaSearch className="search-icon" />
                        <input
                            ref={searchRef}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="search-input"
                            placeholder="Search categories..."
                            aria-label="Search categories"
                        />
                    </div>

                    <div className="popover-list">
                        {filtered.length === 0 ? (
                            <div className="empty-state">No categories found</div>
                        ) : (
                            filtered.map(option => (
                                <div
                                    key={option}
                                    className={`popover-item ${isSelected(option) ? `selected ${getOptionClass(option)}` : ''}`}
                                    onClick={() => handleItemClick(option)}
                                >
                                    <div className="item-left">
                                        <span className={`item-dot ${getOptionClass(option)}`} />
                                        <span className="item-text">{option}</span>
                                    </div>
                                    {isSelected(option) && <FaCheck className="item-check" />}
                                </div>
                            ))
                        )}
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default MultiSelectDropdown;