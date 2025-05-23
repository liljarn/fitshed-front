export const API_URL = 'http://localhost:8000';

const getHeaders = (isFormData = false) => {
    const headers: HeadersInit = {};
    
    if (!isFormData) {
        headers['Content-Type'] = 'application/json';
    }
    
    return headers;
};

const getAuthHeaders = (isFormData = false) => {
    const headers: HeadersInit = {};
    const token = localStorage.getItem('token');
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    if (!isFormData) {
        headers['Content-Type'] = 'application/json';
    }
    
    return headers;
};

export const fetchBase = async (url: string, options: RequestInit = {}) => {
    const isFormData = options.body instanceof FormData;
    const headers = getHeaders(isFormData);
    
    const response = await fetch(`${API_URL}/${url}`, {
        ...options,
        headers: {
            ...headers,
            ...options.headers,
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw error;
    }

    if (response.status === 204) {
        return response;
    }

    return response.json();
};

export const fetchAuth = async (url: string, options: RequestInit = {}) => {
    const isFormData = options.body instanceof FormData;
    const headers = getAuthHeaders(isFormData);
    
    const response = await fetch(`${API_URL}/${url}`, {
        ...options,
        headers: {
            ...headers,
            ...options.headers,
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw error;
    }

    if (response.status === 204) {
        return response;
    }

    return response.json();
}; 