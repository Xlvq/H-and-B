
// /scripts/orders.js
import { orderAPI } from './api.js';

const orderContainer = document.getElementById('orders-container');
const template = document.getElementById('order-progress-template');

const statusMap = {
    'created': { label: 'Принят', progress: 25 },
    'processing': { label: 'В производстве', progress: 50 },
    'packaging': { label: 'Упакован', progress: 75 },
    'shipped': { label: 'Отправлен', progress: 100 },
};

async function loadOrders() {
    try {
        const { data: orders } = await orderAPI.getUserOrders();

        orders.forEach(order => {
            const clone = template.content.cloneNode(true);
            clone.querySelector('.order-id').textContent = order.id;
            clone.querySelector('.product-name').textContent = order.product_title;

            const { label, progress } = statusMap[order.status] || {};
            clone.querySelector('.order-status').textContent = label;
            clone.querySelector('.progress-bar').style.width = `${progress}%`;

            orderContainer.appendChild(clone);
        });
    } catch (err) {
        console.error('Ошибка при загрузке заказов:', err);
    }
}

document.addEventListener('DOMContentLoaded', loadOrders);
