import fetchApi from "../utils/fetchApi.js";

const endpoint = "/supplier"

export const supplierService = {
    getAllSuppliers: async () => await fetchApi(endpoint, 'GET'),
    
    createSupplier: async (supplierName, contact, address) => await fetchApi(endpoint, 'PUT', {
        supplierName: supplierName,
        contact: contact,
        address: address,
    }),

    getSupplier: async (id) => await fetchApi(`${endpoint}/${id}`, 'GET'),

    updateSupplier: async (id, supplierName, contact, address) => await fetchApi(`${endpoint}/${id}`, 'PATCH', {
        supplierName: supplierName,
        contact: contact,
        address: address,
    }),

    deleteSupplier: async (id) => await fetchApi(`${endpoint}/${id}`, 'DELETE'),
};