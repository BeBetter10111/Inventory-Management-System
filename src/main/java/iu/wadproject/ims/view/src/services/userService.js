import fetchApi from "../utils/fetchApi.js";

const endpoint = "/user";

export const userService = {
    getAllUsers: async () => await fetchApi(endpoint, 'GET'),
    
    getUser: async (username) => await fetchApi(`${endpoint}/${username}`, 'GET'),
    
    updateUser: async (username, fullName, phoneNumber, email) => await fetchApi(`${endpoint}/${id}`, 'PATCH', {
        username: username,
        fullName: fullName,
        phoneNumber: phoneNumber,
        email: email,
    }),

    updatePassword: async (newRawPassword) => await fetchApi(`${endpoint}/update-password`, {
        newRawPassword: newRawPassword,
    }),
};