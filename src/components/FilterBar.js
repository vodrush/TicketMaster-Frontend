import React from 'react';

const STATUS = ['', 'Open', 'In Progress', 'Closed'];
const PRIORITY = ['', 'Low', 'Medium', 'High'];
const SORT = ['id', 'createdAt', 'updatedAt', 'priority', 'status'];

const STATUS_MAP = { 'Open': 'Ouvert', 'In Progress': 'En cours', 'Closed': 'Fermé' };
const PRIORITY_MAP = { 'Low': 'Faible', 'Medium': 'Moyen', 'High': 'Élevé' };
const SORT_MAP = { 
  'id': 'ID', 
  'createdAt': 'Date de création', 
  'updatedAt': 'Dernière mise à jour', 
  'priority': 'Priorité', 
  'status': 'Statut' 
};

export default function FilterBar({ filters, onChange, onApply, onReset }) {
  return (
    <div className="filter-bar">
      <div className="filter-section">
        <h3 className="filter-title">Filtrer les tickets</h3>
        <div className="filter-inputs">
          <select value={filters.status} onChange={(e) => onChange({ ...filters, status: e.target.value })}>
            <option value="">Statut (tous)</option>
            {STATUS.filter(v => v).map(v => <option key={v} value={v}>{STATUS_MAP[v]}</option>)}
          </select>

          <select value={filters.priority} onChange={(e) => onChange({ ...filters, priority: e.target.value })}>
            <option value="">Priorité (toutes)</option>
            {PRIORITY.filter(v => v).map(v => <option key={v} value={v}>{PRIORITY_MAP[v]}</option>)}
          </select>

          <input
            type="text"
            placeholder="Tag (ex: bug)"
            value={filters.tag}
            onChange={(e) => onChange({ ...filters, tag: e.target.value })}
          />

          <select value={filters.sort_by} onChange={(e) => onChange({ ...filters, sort_by: e.target.value })}>
            <option value="">Trier par...</option>
            {SORT.map(v => <option key={v} value={v}>{SORT_MAP[v]}</option>)}
          </select>

          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={filters.descending}
              onChange={(e) => onChange({ ...filters, descending: e.target.checked })}
            />
            Ordre décroissant
          </label>
        </div>
      </div>

      <div className="filter-actions">
        <button className="filter-button" onClick={onApply}>Appliquer</button>
        <button className="filter-button secondary" onClick={onReset}>Réinitialiser</button>
      </div>
    </div>
  );
}