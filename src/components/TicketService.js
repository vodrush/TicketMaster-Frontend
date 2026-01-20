
function getTickets() {
    return fetch('http://localhost:8000/tickets')
        .then(response => response.json())
        .then(data => {
            console.log('Tickets fetched:', data);
        })
        .catch(error => {
            console.error('Error fetching tickets:', error);
        });
}
function createTicket(data) {
    return fetch('http://172.16.112.75:8000/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
}
function updateTicket(id, changes) {
    return fetch(`http://172.16.112.75:8000/tickets/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(changes)
    })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
}
function deleteTicket(id) {
    return fetch(`http://172.16.112.75:8000/tickets/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
}

export { getTickets, createTicket, updateTicket, deleteTicket };