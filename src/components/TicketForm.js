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
        createTicket(ticketToSubmit).then((newTicket) => {
            setFormData({
                title: '',
                description: '',
                status: 'Open',
                priority: 'Medium',
                tags: ''
            });
            onTicketAdded(newTicket);
        });
    }

    return (
        <>
            <form className="ticket-form" onSubmit={handleSubmit}>
                <h2 style={{ marginTop: 0, color: '#61dafb', marginBottom: '20px' }}>
                    Créer un nouveau ticket
                </h2>

                <div className="form-group">
                    <label htmlFor="title">Titre *</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Entrez le titre du ticket"
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
                        placeholder="Décrivez votre ticket..."
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="status">Statut</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="Open">Ouvert</option>
                            <option value="In Progress">En cours</option>
                            <option value="Closed">Fermé</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="priority">Priorité</label>
                        <select
                            id="priority"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                        >
                            <option value="Low">Bas</option>
                            <option value="Medium">Moyen</option>
                            <option value="High">Élevé</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="tags">Tags (séparés par des virgules)</label>
                    <input
                        id="tags"
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="ex: bug, fonctionnalité, urgent"
                    />
                </div>

                <button type="submit" className="form-button">
                    Créer un ticket
                </button>
            </form>
        </>
    )
}

export default TicketForm;


