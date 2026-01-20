import React, { useState } from 'react';
import { createTicket } from '../components/TicketService';

function TicketForm({ onTicketAdded }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'open',
        priority: 'medium',
        tags: []
    });
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
     }
    
    const handleSubmit = (e) => { 
        e.preventDefault();
        createTicket(formData).then(() => {
            setFormData({
                title: '',
                description: '',
                status: 'open',
                priority: 'medium',
                tags: []
            });
            onTicketAdded();
        });

    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                required
            />
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
            />
            <select
                name="status"
                value={formData.status}
                onChange={handleChange}
            >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
            </select>
            <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button type="submit">Create</button>
        </form>
    )
}

export default TicketForm;


