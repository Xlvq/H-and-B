// /scripts/auth.js/
import { authAPI } from './api.js';

const tokenKey = 'hb_token';

export function saveToken(token) {
    localStorage.setItem(tokenKey, token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export function getToken() {
    return localStorage.getItem(tokenKey);
}

export function logout() {
    localStorage.removeItem(tokenKey);
    delete api.defaults.headers.common['Authorization'];
}

export async function login(email, password) {
    const { data } = await authAPI.login({ email, password });
    saveToken(data.token);
}

export async function register(name, email, password) {
    const { data } = await authAPI.register({ name, email, password });
    saveToken(data.token);
}
