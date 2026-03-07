// Cart management for SulamaShop
const Cart = {
    STORAGE_KEY: 'sulamashop_cart',

    getItems() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    saveItems(items) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
        this.updateUI();
    },

    addItem(productId, quantity) {
        quantity = quantity || 1;
        const items = this.getItems();
        const existing = items.find(item => item.id === productId);

        if (existing) {
            existing.quantity += quantity;
        } else {
            items.push({ id: productId, quantity: quantity });
        }

        this.saveItems(items);
        showToast('Ürün sepete eklendi');
    },

    removeItem(productId) {
        const items = this.getItems().filter(item => item.id !== productId);
        this.saveItems(items);
    },

    updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            this.removeItem(productId);
            return;
        }
        const items = this.getItems();
        const item = items.find(i => i.id === productId);
        if (item) {
            item.quantity = quantity;
            this.saveItems(items);
        }
    },

    getTotal() {
        const items = this.getItems();
        return items.reduce((total, item) => {
            const product = getProductById(item.id);
            return total + (product ? product.price * item.quantity : 0);
        }, 0);
    },

    getCount() {
        return this.getItems().reduce((count, item) => count + item.quantity, 0);
    },

    clear() {
        localStorage.removeItem(this.STORAGE_KEY);
        this.updateUI();
    },

    updateUI() {
        // Update cart count badge
        const countEl = document.getElementById('cartCount');
        if (countEl) {
            countEl.textContent = this.getCount();
        }

        // Update cart sidebar
        this.renderSidebar();

        // Update cart page if on it
        this.renderCartPage();
    },

    renderSidebar() {
        const container = document.getElementById('cartItems');
        const footer = document.getElementById('cartFooter');
        if (!container) return;

        const items = this.getItems();

        if (items.length === 0) {
            container.innerHTML = '<p class="cart-empty">Sepetiniz boş</p>';
            if (footer) footer.style.display = 'none';
            return;
        }

        let html = '';
        items.forEach(item => {
            const product = getProductById(item.id);
            if (!product) return;
            html += `
                <div class="cart-item">
                    <div class="cart-item-image">${typeof getProductSVGIcon === 'function' ? getProductSVGIcon(product) : product.icon}</div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${product.name}</div>
                        <div class="cart-item-price">${product.price.toLocaleString('tr-TR')} TL</div>
                        <div class="cart-item-qty">Adet: ${item.quantity}</div>
                    </div>
                    <button class="cart-item-remove" onclick="Cart.removeItem(${product.id})">×</button>
                </div>
            `;
        });

        container.innerHTML = html;

        if (footer) {
            footer.style.display = 'block';
            const totalEl = document.getElementById('cartTotal');
            if (totalEl) {
                totalEl.textContent = this.getTotal().toLocaleString('tr-TR') + ' TL';
            }
        }
    },

    renderCartPage() {
        const container = document.getElementById('cartPageItems');
        const summary = document.getElementById('cartPageSummary');
        if (!container) return;

        const items = this.getItems();

        if (items.length === 0) {
            container.innerHTML = '<p class="cart-empty-page">Sepetinizde ürün bulunmamaktadır.</p>';
            if (summary) summary.style.display = 'none';
            return;
        }

        let html = '';
        items.forEach(item => {
            const product = getProductById(item.id);
            if (!product) return;
            html += `
                <div class="cart-page-item">
                    <div class="cart-page-item-image">${typeof getProductSVGIcon === 'function' ? getProductSVGIcon(product) : product.icon}</div>
                    <div class="cart-page-item-info">
                        <h3>${product.name}</h3>
                        <p class="price">${product.price.toLocaleString('tr-TR')} TL</p>
                    </div>
                    <div class="cart-page-item-actions">
                        <div class="quantity-input">
                            <button onclick="Cart.updateQuantity(${product.id}, ${item.quantity - 1})">−</button>
                            <input type="text" value="${item.quantity}" readonly>
                            <button onclick="Cart.updateQuantity(${product.id}, ${item.quantity + 1})">+</button>
                        </div>
                        <strong>${(product.price * item.quantity).toLocaleString('tr-TR')} TL</strong>
                        <button class="btn btn-sm btn-danger" onclick="Cart.removeItem(${product.id})">Sil</button>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;

        if (summary) {
            summary.style.display = 'block';
            const subtotal = this.getTotal();
            const shipping = subtotal >= 500 ? 0 : 49;
            const total = subtotal + shipping;

            const subtotalEl = document.getElementById('subtotal');
            const shippingEl = document.getElementById('shipping');
            const totalEl = document.getElementById('totalAmount');

            if (subtotalEl) subtotalEl.textContent = subtotal.toLocaleString('tr-TR') + ' TL';
            if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Ücretsiz' : shipping + ' TL';
            if (totalEl) totalEl.textContent = total.toLocaleString('tr-TR') + ' TL';
        }
    }
};
