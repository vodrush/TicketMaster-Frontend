import React from 'react';

function TicketItem({ ticket, onDelete, onStatusChange }) {
  const priorityMap = { 'Low': 'Bas', 'Medium': 'Moyen', 'High': 'Élevé' };
  const statusMap = { 'Open': 'Ouvert', 'In Progress': 'En cours', 'Closed': 'Fermé' };
  
  const priority = ticket.priority || 'Medium';
  const status = ticket.status || 'Open';
  const displayPriority = priorityMap[priority] || priority;
  const displayStatus = statusMap[status] || status;
  
  return (
    <li className="ticket-item">
      <div className="ticket-header">
        <h2 className="ticket-title">{ticket.title}</h2>
        <div className="ticket-badges">
          <span className="badge badge-status">{displayStatus}</span>
          <span className={`badge badge-priority ${priority.toLowerCase()}`}>
            {displayPriority}
          </span>
        </div>
      </div>

      <p className="ticket-description">{ticket.description}</p>

      <div className="ticket-meta">
        <div>
          <strong>Tags:</strong> {ticket.tags && ticket.tags.length > 0 ? ticket.tags.join(', ') : 'Aucun tag'}
        </div>
        <select
          className="ticket-status-select"
          value={status}
          onChange={(e) => onStatusChange(ticket.id, e.target.value)}
        >
          <option value="Open">Ouvert</option>
          <option value="In Progress">En cours</option>
          <option value="Closed">Fermé</option>
        </select>
      </div>

      <div className="ticket-actions">
        <button className="btn-delete" onClick={() => onDelete(ticket.id)}>
          Supprimer
        </button>
      </div>
    </li>
  );
}

export default TicketItem;
