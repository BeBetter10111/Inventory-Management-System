import fetchApi from "../utils/fetchApi.js";

const endpoint = "/buyer";

export const buyerService = {
    getAllBuyers: async () => await fetchApi(endpoint, 'GET'),

    createBuyer: async (fullName, address) => await fetchApi(endpoint, 'PUT', {
        fullName: fullName,
        address: address,
    }),

    getBuyer: async (id) => await fetchApi(`${endpoint}/${id}`, 'GET'),

    updateBuyer: async (id, fullName, address) => await fetchApi(`${endpoint}/${id}`, 'PATCH', {
        fullName: fullName,
        address: address,
    }),

    deleteBuyer: async (id) => await fetchApi(`${endpoint}/${id}`, 'DELETE'),
};
