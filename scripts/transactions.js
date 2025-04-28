export const transactions = [];

export function addTransactionToArray(transaction) {
    transactions.push(transaction);
}

export function deleteTransactionById(id) {
    const index = transactions.findIndex(t => t.id === id);
    if (index !== -1) {
        transactions.splice(index, 1);
    }
}