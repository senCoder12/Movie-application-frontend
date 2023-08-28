import React, { useEffect } from 'react';
import '../Css/sidebar.css';

const Sidebar = ({ isOpen, onClose, onSubmit, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll');
            const handleEscapeKey = (event) => {
                if (event.key === 'Escape') {
                    onClose();
                }
            };
            document.addEventListener('keydown', handleEscapeKey);
            return () => {
                document.removeEventListener('keydown', handleEscapeKey);
            };
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [isOpen, onClose]);

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            {children}
            <div className="sidebar-buttons">
                <button className="cancel-button" onClick={onClose}>
                    Close
                </button>
                <button className="submit-button" onClick={onSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
