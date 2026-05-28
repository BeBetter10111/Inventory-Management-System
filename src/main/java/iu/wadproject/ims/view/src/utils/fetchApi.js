const BASE_URL = 'http://localhost:8080';

export default async function fetchApi(endpoint, method, body = null) {
    const response = await fetch(`${BASE_URL}/api${endpoint}`, {
        method: method,
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include', // Attach session to every request
        body: body ? JSON.stringify(body) : null,
    });
    
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || `${method} ${endpoint} returned status ${response.status}`);
    }
    
    return data.data;
}