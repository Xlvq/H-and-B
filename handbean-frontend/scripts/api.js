// /scripts/api.js/
const API_BASE = 'http://localhost:8000/api'; // подставим позже env или прод-адрес

const api = axios.create({
    baseURL: API_BASE,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Пример API методов
const authAPI = {
    login: (data) => api.post('/auth/login', data),
    register: (data) => api.post('/auth/register', data),
    getProfile: () => api.get('/user/me'),
};

const productAPI = {
    getAll: () => api.get('/products'),
};

const orderAPI = {
    getUserOrders: () => api.get('/orders'),
};

const reviewAPI = {
    getYandexReviews: () => api.get('/reviews/yandex'),
};

export { authAPI, productAPI, orderAPI, reviewAPI };
