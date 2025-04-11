// /scripts/products.js
import { productAPI } from './api.js';

const productList = document.getElementById('product-list');
const template = document.getElementById('product-card-template');

async function loadProducts() {
    try {
        const { data: products } = await productAPI.getAll();

        products.forEach(product => {
            const clone = template.content.cloneNode(true);
            clone.querySelector('img').src = product.image;
            clone.querySelector('.title').textContent = product.title;
            clone.querySelector('.desc').textContent = product.description;
            clone.querySelector('.price').textContent = product.price + '₽';

            const titleInputs = clone.querySelectorAll('.title-input');
            titleInputs.forEach(el => el.value = product.title);

            const priceInput = clone.querySelector('.price-input');
            priceInput.value = product.price;

            productList.appendChild(clone);
        });

    } catch (err) {
        console.error('Ошибка загрузки каталога:', err);
    }
}

document.addEventListener('DOMContentLoaded', loadProducts);
