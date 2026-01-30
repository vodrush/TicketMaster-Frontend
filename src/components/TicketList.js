import React from 'react';
import TicketItem from './TicketItem';

function TicketList({ tickets, onDelete, onUpdate }) {
  if (tickets.length === 0) {
    return (
      <div className="tickets-section">
        <h2 className="tickets-title">Mes tickets</h2>
        <p>
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
            onUpdate={onUpdate}
          />
        ))}
      </ul>
    </div>
  );
}

export default TicketList;
