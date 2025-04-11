// /scripts/admin-crm.js/
import { api } from './api.js';

async function loadAdminOrders() {
    const { data: orders } = await api.get('/admin/orders');
    const container = document.getElementById('admin-orders');

    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.user_name}</td>
      <td>${order.product_title}</td>
      <td>
        <select data-id="${order.id}" class="status-select border px-2 py-1 rounded">
          <option value="created" ${order.status === 'created' ? 'selected' : ''}>Принят</option>
          <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>В производстве</option>
          <option value="packaging" ${order.status === 'packaging' ? 'selected' : ''}>Упакован</option>
          <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Отправлен</option>
        </select>
      </td>
    `;
        container.appendChild(row);
    });

    container.addEventListener('change', async (e) => {
        if (e.target.classList.contains('status-select')) {
            const id = e.target.dataset.id;
            const status = e.target.value;
            await api.patch(`/admin/orders/${id}`, { status });
        }
    });
}

document.addEventListener('DOMContentLoaded', loadAdminOrders);
