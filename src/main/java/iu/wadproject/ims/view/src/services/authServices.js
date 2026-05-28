import fetchApi from "../utils/fetchApi.js";

const endpoint = "/auth";

export const authService = {
    register: async (username, password, fullName, email, phoneNumber, roleType) => await fetchApi(`${endpoint}/register`, 'POST', {
        username: username,
        password: password,
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        roleType: roleType,
    }),

    login: async (username, password, rememberMe) => await fetchApi(`${endpoint}/login`, 'POST', {
        username: username,
        password: password,
        rememberMe: rememberMe,
    }),
    
    logout: async () => await fetchApi(`${endpoint}/logout`, 'GET'),
};