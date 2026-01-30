import React, { useState, useEffect, useCallback } from 'react';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import FilterBar from './components/FilterBar';
import { deleteTicket, updateTicket, getTickets } from './components/TicketService';
import './App.css';

function App() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteMessage, setDeleteMessage] = useState('');
    const [isLeaving, setIsLeaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [isLeavingSuccess, setIsLeavingSuccess] = useState(false);

    // Filtres en édition (changent au fil de la saisie)
    const [editingFilters, setEditingFilters] = useState({
        status: '',
        priority: '',
        tag: '',
        sort_by: '',
        descending: false
    });

    // Filtres appliqués (ne changent que quand on clique "Appliquer")
    const [appliedFilters, setAppliedFilters] = useState({
        status: '',
        priority: '',
        tag: '',
        sort_by: '',
        descending: false
    });

    const loadTickets = useCallback((currentFilters = appliedFilters) => {
        setLoading(true);
        getTickets(currentFilters)
            .then(data => {
            setTickets(data);
            setLoading(false);
            })
            .catch(error => {
            console.error('Error loading tickets:', error);
            setLoading(false);
            });
        }, [appliedFilters]);

        useEffect(() => {
        loadTickets();
        }, [loadTickets]);

    const handleApplyFilters = () => {
        setAppliedFilters(editingFilters);
        loadTickets(editingFilters);
    };

    const handleResetFilters = () => {
        const reset = { status: '', priority: '', tag: '', sort_by: '', descending: false };
        setEditingFilters(reset);
        setAppliedFilters(reset);
        loadTickets(reset);
    };

    const handleTicketAdded = (newTicket) => {
        setTickets([...tickets, newTicket]);
        setSuccessMessage('Ticket créé avec succès!');
        setTimeout(() => setIsLeavingSuccess(true), 2500);
        setTimeout(() => {
            setSuccessMessage('');
            setIsLeavingSuccess(false);
        }, 3000);
    };

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
    };

    const handleUpdateTicket = (id, changes) => {
        updateTicket(id, changes)
            .then((updated) => {
                if (!updated || !updated.id) return;
                setTickets(tickets.map(t => (t.id === id ? updated : t)));
            })
            .catch(error => console.error('Error updating ticket:', error));
    };

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
            <FilterBar
                filters={editingFilters}
                onChange={setEditingFilters}
                onApply={handleApplyFilters}
                onReset={handleResetFilters}
            />
            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#b0b0b0' }}>
                    Chargement des tickets...
                </div>
            ) : (
                <TicketList
                    tickets={tickets}
                    onDelete={handleDelete}
                    onUpdate={handleUpdateTicket}
                />
            )}
        </div>
    );
}

export default App;