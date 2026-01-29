import React, { useState, useEffect } from 'react';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import { deleteTicket, updateTicket } from './components/TicketService';
import './App.css';

function App() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteMessage, setDeleteMessage] = useState('');
    const [isLeaving, setIsLeaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [isLeavingSuccess, setIsLeavingSuccess] = useState(false);

    const handleTicketAdded = (newTicket) => {
        setTickets([...tickets, newTicket]);
        setSuccessMessage('Ticket créé avec succès!');
        setTimeout(() => setIsLeavingSuccess(true), 2500);
        setTimeout(() => {
            setSuccessMessage('');
            setIsLeavingSuccess(false);
        }, 3000);
    };
    const loadTickets = () => {
        setLoading(true);
        fetch('http://172.16.112.75:8000/tickets')
            .then(r => r.json())
            .then(data => {
                setTickets(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading tickets:', error);
                setLoading(false);
            });
    }

    useEffect(() => {
        loadTickets();
    }, []);

    const handleDelete = (id) => {
        deleteTicket(id).then(() => {
            setTickets(tickets.filter(t => t.id !== id));
            setDeleteMessage('Ticket supprimé avec succès!');
            setTimeout(() => setIsLeaving(true), 2500);
            setTimeout(() => {
                setDeleteMessage('');
                setIsLeaving(false);
            }, 3000);
        }).catch(error => console.error('Erreur lors de la suppression du ticket:', error));
    }

    const handleStatusChange = (id, newStatus) => {
        setTickets(tickets.map(t => 
            t.id === id ? { ...t, status: newStatus } : t
        ));
        updateTicket(id, { status: newStatus })
            .catch(error => console.error('Error updating ticket:', error));
    }

    return (
        <div className="app">
            <div className="app-header">
            <h1>TicketMaster</h1>
            </div>
            {deleteMessage && (
                <div className={`delete-message ${isLeaving ? 'slideOutRight' : 'slideInRight'}`} style={{
                    padding: '15px',
                    margin: '20px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    {deleteMessage}
                </div>
            )}
            {successMessage && (
                <div className={`success-message ${isLeavingSuccess ? 'slideOutRight' : 'slideInRight'}`} style={{
                    padding: '15px',
                    margin: '20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    {successMessage}
                </div>
            )}
            <TicketForm onTicketAdded={handleTicketAdded} />

            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#b0b0b0' }}>
                    Chargement des tickets...
                </div>
            ) : (
                <TicketList
                    tickets={tickets}
                    onDelete={handleDelete}
                    onStatusChange={handleStatusChange}
                />
            )}
        </div>
    )
}

export default App;