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
    
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        if (darkMode) {
            document.body.className = 'dark';
        } else {
            document.body.className = 'light';
        }
    }, [darkMode]);

    function toggleTheme() {
        setDarkMode(!darkMode);
    }

    const [editingFilters, setEditingFilters] = useState({
        status: '',
        priority: '',
        tag: '',
        sort_by: '',
        descending: false
    });

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

    let openCount = 0;
    let inProgressCount = 0;
    let closedCount = 0;

    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].status === 'Open') {
            openCount = openCount + 1;
        }
        if (tickets[i].status === 'In Progress') {
            inProgressCount = inProgressCount + 1;
        }
        if (tickets[i].status === 'Closed') {
            closedCount = closedCount + 1;
        }
    }

    return (
        <div className="app-container">
            
            {deleteMessage && (
                <div className={isLeaving ? 'toast toast-danger slideOut' : 'toast toast-danger slideIn'}>
                    <span className="toast-icon">✕</span>
                    {deleteMessage}
                </div>
            )}
            
            {successMessage && (
                <div className={isLeavingSuccess ? 'toast toast-success slideOut' : 'toast toast-success slideIn'}>
                    <span className="toast-icon">✓</span>
                    {successMessage}
                </div>
            )}

            <div className="sidebar">
                
                <div className="sidebar-header">
                    <div className="logo">
                        <span className="logo-icon">◆</span>
                        <span className="logo-text">TicketMaster</span>
                    </div>
                    
                    <button className="theme-button" onClick={toggleTheme}>
                        {darkMode ? '☀️' : '🌙'}
                    </button>
                </div>

                <div className="sidebar-stats">
                    <div className="stat-box">
                        <span className="stat-number">{tickets.length}</span>
                        <span className="stat-text">Total</span>
                    </div>
                    <div className="stat-box stat-blue">
                        <span className="stat-number">{openCount}</span>
                        <span className="stat-text">Ouverts</span>
                    </div>
                    <div className="stat-box stat-yellow">
                        <span className="stat-number">{inProgressCount}</span>
                        <span className="stat-text">En cours</span>
                    </div>
                    <div className="stat-box stat-green">
                        <span className="stat-number">{closedCount}</span>
                        <span className="stat-text">Fermés</span>
                    </div>
                </div>

                <div className="sidebar-form">
                    <TicketForm onTicketAdded={handleTicketAdded} />
                </div>
            </div>

            <div className="main-content">
                
                <div className="main-header">
                    <h1>Tous les tickets</h1>
                    <span className="ticket-count">{tickets.length} tickets</span>
                </div>

                <FilterBar
                    filters={editingFilters}
                    onChange={setEditingFilters}
                    onApply={handleApplyFilters}
                    onReset={handleResetFilters}
                />

                <div className="tickets-area">
                    {loading ? (
                        <div className="loading">
                            <div className="spinner"></div>
                            <p>Chargement des tickets...</p>
                        </div>
                    ) : (
                        <TicketList
                            tickets={tickets}
                            onDelete={handleDelete}
                            onUpdate={handleUpdateTicket}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;