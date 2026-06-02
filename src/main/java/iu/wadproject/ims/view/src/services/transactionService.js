import fetchApi from "../utils/fetchApi.js";

const endpoint = "/transaction";

export const transactionService = {
    getAllTransactions: async () => await fetchApi(endpoint, 'GET'),

    getTransaction: async (id) => await fetchApi(`${endpoint}/${id}`, 'GET'),

    processTransaction: async (transactionType, supplier, buyer, note, details) => await fetchApi(`${endpoint}/process`, 'POST', {
        transactionType: transactionType,
        supplier: supplier,
        buyer: buyer,
        note: note,
        details: details,
    }),
};