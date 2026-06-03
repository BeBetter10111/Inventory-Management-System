import fetchApi from "../utils/fetchApi.js";

const endpoint = "/user";

export const userService = {
    getAllUsers: async () => await fetchApi(endpoint, 'GET'),
    
    getUser: async (username) => await fetchApi(`${endpoint}/${username}`, 'GET'),
    
    updateUser: async (username, payload) => await fetchApi(`${endpoint}/${username}`, 'PATCH', {
        ...payload,
    }),

    updatePassword: async (newRawPassword) => await fetchApi(`${endpoint}/update-password`, 'PATCH', {
        newRawPassword: newRawPassword,
    }),
};