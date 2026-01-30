const BASE_URL = 'http://localhost:8000';


const buildQuery = (params) => {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== '' && v !== null && v !== undefined) qs.append(k, v);
  });
  return qs.toString();
};

function getTickets(filters = {}) {
  const query = buildQuery(filters);
  const url = query ? `${BASE_URL}/tickets?${query}` : `${BASE_URL}/tickets`;
  return fetch(url).then(r => r.json());
}
function createTicket(data) {
    return fetch(`${BASE_URL}/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
}
function updateTicket(id, changes) {
    return fetch(`${BASE_URL}/tickets/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(changes)
    })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
}
function deleteTicket(id) {
    return fetch(`${BASE_URL}/tickets/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
}

export { getTickets, createTicket, updateTicket, deleteTicket };