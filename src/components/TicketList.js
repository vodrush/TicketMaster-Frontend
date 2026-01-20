import React from 'react';
import TicketItem from './TicketItem';

function TicketList({ tickets, onDelete, onStatusChange }) {
  if (tickets.length === 0) {
    return (
      <div className="tickets-section">
        <h2 className="tickets-title">My Tickets</h2>
        <p style={{ color: '#b0b0b0', textAlign: 'center', padding: '20px' }}>
          No tickets yet. Create one to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="tickets-section">
      <h2 className="tickets-title">My Tickets ({tickets.length})</h2>
      <ul className="tickets-list">
        {tickets.map(ticket => (
          <TicketItem
            key={ticket.id}
            ticket={ticket}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </ul>
    </div>
  );
}

export default TicketList;
