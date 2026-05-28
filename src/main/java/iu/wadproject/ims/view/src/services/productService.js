import fetchApi from "../utils/fetchApi.js";

const endpoint = "/product";

export const productService = {
    getAllProducts: async () => await fetchApi(endpoint, 'GET'),
    
    createProduct: async (productName, description, price, stockQuantity, category) => await fetchApi(endpoint, 'PUT', {
        productName: productName,
        description: description,
        price: price,
        stockQuantity: stockQuantity,
        category: category,
    }),

    getProduct: async (id) => await fetchApi(`${endpoint}/${id}`, 'GET'),

    updateProduct: async (id, productName, description, price, stockQuantity, category) => await fetchApi(`${endpoint}/${id}`, 'PATCH', {
        productName: productName,
        description: description,
        price: price,
        stockQuantity: stockQuantity,
        category: category,
    }),

    deleteProduct: async (id) => await fetchApi(`${endpoint}/${id}`, 'DELETE'),
};