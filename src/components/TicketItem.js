import React from 'react';

function TicketItem({ ticket, onDelete, onStatusChange }) {
  const priority = ticket.priority || 'Medium';
  const status = ticket.status || 'Open';
  
  return (
    <li className="ticket-item">
      <div className="ticket-header">
        <h2 className="ticket-title">{ticket.title}</h2>
        <div className="ticket-badges">
          <span className="badge badge-status">{status}</span>
          <span className={`badge badge-priority ${priority.toLowerCase()}`}>
            {priority}
          </span>
        </div>
      </div>

      <p className="ticket-description">{ticket.description}</p>

      <div className="ticket-meta">
        <div>
          <strong>Tags:</strong> {ticket.tags && ticket.tags.length > 0 ? ticket.tags.join(', ') : 'No tags'}
        </div>
        <select
          className="ticket-status-select"
          value={status}
          onChange={(e) => onStatusChange(ticket.id, e.target.value)}
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <div className="ticket-actions">
        <button className="btn-delete" onClick={() => onDelete(ticket.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TicketItem;
