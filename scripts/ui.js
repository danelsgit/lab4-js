import { transactions } from './transactions.js';

export function renderTransaction(transaction) {
    const tableBody = document.querySelector('#transaction-table tbody');
    const row = document.createElement('tr');
    row.dataset.id = transaction.id;
    row.className = transaction.amount >= 0 ? 'income' : 'expense';
    row.innerHTML = `
        <td>${transaction.date}</td>
        <td>${transaction.category}</td>
        <td>${shortenDescription(transaction.description)}</td>
        <td><button class="delete-btn">Удалить</button></td>
    `;
    tableBody.appendChild(row);
}

export function clearForm() {
    document.getElementById('amount').value = '';
    document.getElementById('category').value = '';
    document.getElementById('description').value = '';
}

export function renderTotal() {
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);
    document.getElementById('total').textContent = `Общая сумма: ${total}`;
}

export function renderFullDescription(transaction) {
    document.getElementById('full-description').textContent = transaction.description;
}

function shortenDescription(text) {
    return text.split(' ').slice(0, 4).join(' ') + '...';
}