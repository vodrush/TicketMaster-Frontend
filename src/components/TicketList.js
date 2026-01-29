import React from 'react';
import TicketItem from './TicketItem';

function TicketList({ tickets, onDelete, onStatusChange }) {
  if (tickets.length === 0) {
    return (
      <div className="tickets-section">
        <h2 className="tickets-title">Mes tickets</h2>
        <p style={{ color: '#b0b0b0', textAlign: 'center', padding: '20px' }}>
          Aucun ticket pour le moment. Créez-en un pour commencer!
        </p>
      </div>
    );
  }

  return (
    <div className="tickets-section">
      <h2 className="tickets-title">Mes tickets ({tickets.length})</h2>
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
