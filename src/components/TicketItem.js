import React, { useState } from 'react';

const MAX_TITLE_LEN = 60;
const MAX_DESC_LEN = 500;
const MAX_TAGS_LEN = 120;

function TicketItem({ ticket, onDelete, onUpdate }) {
  const priorityMap = { 'Low': 'Faible', 'Medium': 'Moyen', 'High': 'Élevé' };
  const statusMap = { 'Open': 'Ouvert', 'In Progress': 'En cours', 'Closed': 'Fermé' };
  
  const priority = ticket.priority || 'Medium';
  const status = ticket.status || 'Open';
  const displayPriority = priorityMap[priority] || priority;
  const displayStatus = statusMap[status] || status;

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: ticket.title || '',
    description: ticket.description || '',
    status,
    priority,
    tags: ticket.tags && ticket.tags.length > 0 ? ticket.tags.join(', ') : ''
  });

  const startEdit = () => {
    setEditData({
      title: ticket.title || '',
      description: ticket.description || '',
      status: ticket.status || 'Open',
      priority: ticket.priority || 'Medium',
      tags: ticket.tags && ticket.tags.length > 0 ? ticket.tags.join(', ') : ''
    });
    setIsEditing(true);
  };

  const isSaveDisabled = !editData.title.trim() || !editData.description.trim();

  const handleSave = () => {
    if (isSaveDisabled) return;
    const payload = {
      title: editData.title.trim(),
      description: editData.description.trim(),
      status: editData.status,
      priority: editData.priority,
      tags: editData.tags.split(',').map(t => t.trim()).filter(Boolean)
    };
    onUpdate(ticket.id, payload);
    setIsEditing(false);
  };
  
  return (
    <li className="ticket-item">
      <div className="ticket-header">
        {isEditing ? (
          <input
            className="ticket-title-input"
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            maxLength={MAX_TITLE_LEN}
          />
        ) : (
          <h2 className="ticket-title">{ticket.title}</h2>
        )}
        {isEditing ? (
          <div className="ticket-edit-controls">
            <select
              value={editData.status}
              onChange={(e) => setEditData({ ...editData, status: e.target.value })}
            >
              <option value="Open">Ouvert</option>
              <option value="In Progress">En cours</option>
              <option value="Closed">Fermé</option>
            </select>
            <select
              value={editData.priority}
              onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
            >
              <option value="Low">Faible</option>
              <option value="Medium">Moyen</option>
              <option value="High">Élevé</option>
            </select>
          </div>
        ) : (
          <div className="ticket-badges">
            <span className="badge badge-status">{displayStatus}</span>
            <span className={`badge badge-priority ${priority.toLowerCase()}`}>
              {displayPriority}
            </span>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="ticket-edit-body">
          <textarea
            className="ticket-description-input"
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            maxLength={MAX_DESC_LEN}
          />
          <div className="input-counter">{editData.description.length}/{MAX_DESC_LEN}</div>
          <input
            className="ticket-tags-input"
            type="text"
            placeholder="Tags (ex: bug, urgent)"
            value={editData.tags}
            onChange={(e) => setEditData({ ...editData, tags: e.target.value })}
            maxLength={MAX_TAGS_LEN}
          />
          <div className="input-counter">{editData.tags.length}/{MAX_TAGS_LEN}</div>
        </div>
      ) : (
        <>
          <p className="ticket-description">{ticket.description}</p>
          <div className="ticket-meta">
            <div>
              <strong>Tags:</strong> {ticket.tags && ticket.tags.length > 0 ? ticket.tags.join(', ') : 'Aucun tag'}
            </div>
          </div>
        </>
      )}

      <div className="ticket-actions">
        {isEditing ? (
          <>
            <button className="btn-edit" onClick={handleSave} disabled={isSaveDisabled}>
              Enregistrer
            </button>
            <button className="btn-edit secondary" onClick={() => setIsEditing(false)}>
              Annuler
            </button>
          </>
        ) : (
          <>
            <button className="btn-edit" onClick={startEdit}>
              Modifier
            </button>
            <button className="btn-delete" onClick={() => onDelete(ticket.id)}>
              Supprimer
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default TicketItem;
