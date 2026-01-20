import React, { useState, useEffect } from 'react';
import TicketForm from './components/TicketForm';
import { getTickets, createTicket, updateTicket, deleteTicket } from './components/TicketService';

function App() {
    const [tickets, setTickets] = useState([])
    
    useEffect(() => {
        fetch('http://172.16.112.75:8000/tickets')
            .then(r => r.json())
            .then(data => setTickets(data))
    }, []);
    
    return (
        <div>
            <h1>Ticket Master</h1>
            <TicketForm onTicketAdded={() => {
                fetch('http://172.16.112.75:8000/tickets')
                    .then(r => r.json())
                    .then(data => setTickets(data))
            }} />
            <ul>
                {tickets.map(ticket => (
                    <li key={ticket.id}>
                        <h2>{ticket.title}</h2>
                        <p>{ticket.description}</p>
                        <p>Status: {ticket.status}</p>
                        <p>Priority: {ticket.priority}</p>
                        <p>Tags: {ticket.tags ? ticket.tags.join(', ') : 'No tags'}</p>
                    </li>
                ))}
            </ul>
            
        </div>
    )
}

export default App;