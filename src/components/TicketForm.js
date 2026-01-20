import React, { useState } from 'react';
import { createTicket } from '../components/TicketService';

function TicketForm({ onTicketAdded }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'Open',
        priority: 'Medium',
        tags: ''
    });
    const [successMessage, setSuccessMessage] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const ticketToSubmit = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        };
        createTicket(ticketToSubmit).then(() => {
            setFormData({
                title: '',
                description: '',
                status: 'Open',
                priority: 'Medium',
                tags: ''
            });
            setSuccessMessage(true);
            setTimeout(() => {
                setSuccessMessage(false);
            }, 3000);
            onTicketAdded();
        });
    }

    return (
        <>
            {successMessage && (
                <div className="success-message">
                    Ticket created successfully!
                </div>
            )}
            <form className="ticket-form" onSubmit={handleSubmit}>
                <h2 style={{ marginTop: 0, color: '#61dafb', marginBottom: '20px' }}>
                    Create New Ticket
                </h2>

                <div className="form-group">
                    <label htmlFor="title">Title *</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter ticket title"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description *</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe your ticket..."
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="priority">Priority</label>
                        <select
                            id="priority"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="tags">Tags (comma-separated)</label>
                    <input
                        id="tags"
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="e.g. bug, feature, urgent"
                    />
                </div>

                <button type="submit" className="form-button">
                    Create Ticket
                </button>
            </form>
        </>
    )
}

export default TicketForm;


