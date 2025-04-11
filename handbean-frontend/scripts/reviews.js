// /scripts/reviews.js/
import { reviewAPI } from './api.js';

const container = document.getElementById('reviews-container');

async function loadReviews() {
    try {
        const { data: reviews } = await reviewAPI.getYandexReviews();

        reviews.forEach(({ text, author }) => {
            const div = document.createElement('div');
            div.className = 'bg-white p-6 rounded-xl shadow-md';
            div.innerHTML = `
        <p class="text-lg italic">"${text}"</p>
        <p class="mt-4 font-semibold text-right">— ${author}</p>
      `;
            container.appendChild(div);
        });

    } catch (err) {
        console.error('Ошибка загрузки отзывов:', err);
    }
}

document.addEventListener('DOMContentLoaded', loadReviews);
