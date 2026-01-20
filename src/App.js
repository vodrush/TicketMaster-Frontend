import React, { useState, useEffect } from 'react';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import { deleteTicket, updateTicket } from './components/TicketService';
import './App.css';

function App() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

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
            loadTickets();
        }).catch(error => console.error('Error deleting ticket:', error));
    }

    const handleStatusChange = (id, newStatus) => {
        updateTicket(id, { status: newStatus }).then(() => {
            loadTickets();
        }).catch(error => console.error('Error updating ticket:', error));
    }

    return (
        <div className="app">
            <div className="app-header">
            <h1>TicketMaster</h1>
            </div>

            <TicketForm onTicketAdded={loadTickets} />

            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#b0b0b0' }}>
                    Loading tickets...
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