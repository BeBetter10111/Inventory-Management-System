import fetchApi from "../utils/fetchApi.js";

const endpoint = "/category";

export const categoryService = {
    getAllCategories: async () => await fetchApi(endpoint, 'GET'),

    createCategory: async (categoryName, unit) => await fetchApi(endpoint, 'PUT', {
        categoryName: categoryName,
        unit: unit,
    }),

    getCategory: async (id) => await fetchApi(`${endpoint}/${id}`, 'GET'),

    updateCategory: async (id, categoryName, unit) => await fetchApi(`${endpoint}/${id}`, 'PATCH', {
        categoryName: categoryName,
        unit: unit,
    }),

    deleteCategory: async (id) => await fetchApi(`${endpoint}/${id}`, 'DELETE'),
};