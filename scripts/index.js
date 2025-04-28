import { transactions, addTransactionToArray, deleteTransactionById } from './transactions.js';
import { renderTransaction, clearForm, renderTotal, renderFullDescription } from './ui.js';
import { generateId } from './utils.js';

const form = document.getElementById('transaction-form');
const tableBody = document.querySelector('#transaction-table tbody');
const totalElement = document.getElementById('total');
const fullDescriptionElement = document.getElementById('full-description');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const amount = parseFloat(document.getElementById('amount').value.trim());
    const category = document.getElementById('category').value.trim();
    const description = document.getElementById('description').value.trim();

    if (isNaN(amount) || !category || !description) {
        alert('Пожалуйста, заполните все поля корректно.');
        return;
    }

    const transaction = {
        id: generateId(),
        date: new Date().toLocaleString(),
        amount,
        category,
        description
    };

    addTransactionToArray(transaction);
    renderTransaction(transaction);
    renderTotal();
    clearForm();
});

tableBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const id = event.target.closest('tr').dataset.id;
        deleteTransactionById(id);
        event.target.closest('tr').remove();
        renderTotal();
        fullDescriptionElement.textContent = 'Выберите транзакцию для подробного описания.';
    } else if (event.target.tagName === 'TD') {
        const row = event.target.parentElement;
        const id = row.dataset.id;
        const transaction = transactions.find(t => t.id === id);
        if (transaction) {
            renderFullDescription(transaction);
        }
    }
});
