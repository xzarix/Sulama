// SulamaShop - Main Application Logic
document.addEventListener('DOMContentLoaded', function () {
    Cart.updateUI();
    initMobileMenu();
    initCartSidebar();
    initFeaturedProducts();
    initProductsPage();
    initProductDetail();
    initCartPage();
    initContactForm();
    initNewsletterForm();
    initHeaderScroll();
    initScrollAnimations();
});

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    let ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                if (window.scrollY > 20) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease both';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.category-card, .feature-card, .value-card, .stat-card, .contact-card').forEach(function (el) {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Toast notification
function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// Mobile menu
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('mainNav');
    if (!btn || !nav) return;

    btn.addEventListener('click', function () {
        nav.classList.toggle('open');
        btn.textContent = nav.classList.contains('open') ? '✕' : '☰';
    });
}

// Cart sidebar
function initCartSidebar() {
    const cartBtn = document.getElementById('cartBtn');
    const sidebar = document.getElementById('cartSidebar');
    const closeBtn = document.getElementById('cartClose');
    const overlay = document.getElementById('cartOverlay');

    if (!cartBtn || !sidebar) return;

    function openCart() {
        sidebar.classList.add('open');
        if (overlay) overlay.classList.add('open');
    }

    function closeCart() {
        sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('open');
    }

    cartBtn.addEventListener('click', openCart);
    if (closeBtn) closeBtn.addEventListener('click', closeCart);
    if (overlay) overlay.addEventListener('click', closeCart);
}

// Render a product card
function renderProductCard(product) {
    const basePath = getBasePath();
    const detailPage = basePath === './' ? 'pages/urun-detay.html' : 'urun-detay.html';
    const svgIcon = typeof getProductSVGIcon === 'function' ? getProductSVGIcon(product) : product.icon;

    return `
        <div class="product-card">
            <a href="${detailPage}?id=${product.id}">
                <div class="product-image">
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                    ${svgIcon}
                </div>
            </a>
            <div class="product-info">
                <span class="product-category">${product.categoryName}</span>
                <h3 class="product-name">
                    <a href="${detailPage}?id=${product.id}">${product.name}</a>
                </h3>
                <div class="product-price">
                    <span class="current">${product.price.toLocaleString('tr-TR')} TL</span>
                    ${product.oldPrice ? `<span class="old">${product.oldPrice.toLocaleString('tr-TR')} TL</span>` : ''}
                </div>
                <button class="btn btn-primary btn-sm" onclick="Cart.addItem(${product.id})">Sepete Ekle</button>
            </div>
        </div>
    `;
}

// Featured products on homepage
function initFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;

    const featured = getFeaturedProducts();
    container.innerHTML = featured.map(renderProductCard).join('');
}

// Products page
function initProductsPage() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    // Check URL params for category filter
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get('kategori');

    if (categoryParam) {
        const checkboxes = document.querySelectorAll('.filter-category');
        checkboxes.forEach(cb => {
            if (cb.value === categoryParam) cb.checked = true;
        });
    }

    function renderProducts() {
        const checkedCategories = Array.from(document.querySelectorAll('.filter-category:checked')).map(cb => cb.value);
        const priceFilter = document.querySelector('.filter-price:checked');
        const sortValue = document.getElementById('sortSelect').value;

        let filtered = PRODUCTS;

        // Category filter
        if (checkedCategories.length > 0) {
            filtered = filtered.filter(p => checkedCategories.includes(p.category));
        }

        // Price filter
        if (priceFilter && priceFilter.value !== 'all') {
            const [min, max] = priceFilter.value.split('-').map(Number);
            filtered = filtered.filter(p => p.price >= min && p.price <= max);
        }

        // Sort
        switch (sortValue) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                filtered.sort((a, b) => a.name.localeCompare(b.name, 'tr'));
                break;
        }

        grid.innerHTML = filtered.length > 0
            ? filtered.map(renderProductCard).join('')
            : '<p style="grid-column:1/-1;text-align:center;color:#6c757d;padding:40px;">Bu kriterlere uygun ürün bulunamadı.</p>';

        const countEl = document.getElementById('productCount');
        if (countEl) countEl.textContent = filtered.length + ' ürün';
    }

    renderProducts();

    // Event listeners
    const applyBtn = document.getElementById('applyFilters');
    if (applyBtn) applyBtn.addEventListener('click', renderProducts);

    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) sortSelect.addEventListener('change', renderProducts);

    // Also render on checkbox/radio change
    document.querySelectorAll('.filter-category, .filter-price').forEach(el => {
        el.addEventListener('change', renderProducts);
    });
}

// Product detail page
function initProductDetail() {
    const container = document.getElementById('productDetail');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (!productId) {
        container.innerHTML = '<p>Ürün bulunamadı.</p>';
        return;
    }

    const product = getProductById(productId);
    if (!product) {
        container.innerHTML = '<p>Ürün bulunamadı.</p>';
        return;
    }

    // Update breadcrumb
    const breadcrumb = document.getElementById('breadcrumbProduct');
    if (breadcrumb) breadcrumb.textContent = product.name;

    // Update page title
    document.title = product.name + ' - SulamaShop';

    // Specs table
    let specsHtml = '';
    if (product.specs) {
        specsHtml = '<div class="detail-specs"><h3>Teknik Özellikler</h3><table>';
        for (const [key, value] of Object.entries(product.specs)) {
            specsHtml += `<tr><td>${key}</td><td>${value}</td></tr>`;
        }
        specsHtml += '</table></div>';
    }

    const detailSvgIcon = typeof getProductSVGIcon === 'function' ? getProductSVGIcon(product) : product.icon;
    container.innerHTML = `
        <div class="detail-image">${detailSvgIcon}</div>
        <div class="detail-info">
            <span class="detail-category">${product.categoryName}</span>
            <h1>${product.name}</h1>
            <div class="detail-price">${product.price.toLocaleString('tr-TR')} TL</div>
            ${product.oldPrice ? `<div class="detail-old-price">${product.oldPrice.toLocaleString('tr-TR')} TL</div>` : ''}
            <p class="detail-description">${product.description}</p>
            ${specsHtml}
            <div class="quantity-selector">
                <label>Adet:</label>
                <div class="quantity-input">
                    <button id="qtyMinus">−</button>
                    <input type="text" id="qtyInput" value="1" readonly>
                    <button id="qtyPlus">+</button>
                </div>
            </div>
            <div class="detail-actions">
                <button class="btn btn-primary" id="addToCartBtn">Sepete Ekle</button>
            </div>
        </div>
    `;

    // Quantity controls
    const qtyInput = document.getElementById('qtyInput');
    const qtyMinus = document.getElementById('qtyMinus');
    const qtyPlus = document.getElementById('qtyPlus');
    const addBtn = document.getElementById('addToCartBtn');

    if (qtyMinus) {
        qtyMinus.addEventListener('click', () => {
            let val = parseInt(qtyInput.value);
            if (val > 1) qtyInput.value = val - 1;
        });
    }

    if (qtyPlus) {
        qtyPlus.addEventListener('click', () => {
            let val = parseInt(qtyInput.value);
            qtyInput.value = val + 1;
        });
    }

    if (addBtn) {
        addBtn.addEventListener('click', () => {
            Cart.addItem(product.id, parseInt(qtyInput.value));
        });
    }

    // Related products
    const relatedContainer = document.getElementById('relatedProducts');
    if (relatedContainer) {
        const related = getRelatedProducts(product.id, 4);
        if (related.length > 0) {
            relatedContainer.innerHTML = related.map(renderProductCard).join('');
        }
    }
}

// Cart page
function initCartPage() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    const modal = document.getElementById('checkoutModal');
    const modalClose = document.getElementById('modalClose');
    const checkoutForm = document.getElementById('checkoutForm');

    if (!checkoutBtn) return;

    checkoutBtn.addEventListener('click', () => {
        if (Cart.getCount() === 0) {
            showToast('Sepetiniz boş');
            return;
        }
        if (modal) modal.classList.add('open');
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => modal.classList.remove('open'));
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('open');
        });
    }

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = checkoutForm.querySelector('button[type="submit"]');
            const origText = btn ? btn.textContent : '';
            if (btn) { btn.disabled = true; btn.textContent = 'Gönderiliyor...'; }

            const customer = {
                name: checkoutForm.querySelector('[name="name"]')?.value || '',
                phone: checkoutForm.querySelector('[name="phone"]')?.value || '',
                email: checkoutForm.querySelector('[name="email"]')?.value || '',
                address: checkoutForm.querySelector('[name="address"]')?.value || '',
                city: checkoutForm.querySelector('[name="city"]')?.value || '',
                district: checkoutForm.querySelector('[name="district"]')?.value || ''
            };

            const items = Cart.getItems ? Cart.getItems() : [];
            const cartData = items.map(item => {
                const product = typeof getProductById === 'function' ? getProductById(item.id) : null;
                return {
                    id: item.id,
                    name: product ? product.name : 'Urun #' + item.id,
                    quantity: item.quantity,
                    price: product ? product.price : 0
                };
            });

            try {
                const resp = await fetch('/api/order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ customer, cart: cartData })
                });
                const data = await resp.json();
                if (data.success) {
                    Cart.clear();
                    if (modal) modal.classList.remove('open');
                    showToast('Siparişiniz alındı! WhatsApp ile onay bekleniyor.');
                    if (data.whatsappUrl) {
                        setTimeout(() => { window.open(data.whatsappUrl, '_blank'); }, 500);
                    }
                    setTimeout(() => { Cart.renderCartPage(); }, 1000);
                } else {
                    showToast(data.message || 'Bir hata oluştu.');
                }
            } catch {
                showToast('Bağlantı hatası. Lütfen tekrar deneyin.');
            }

            if (btn) { btn.disabled = false; btn.textContent = origText; }
        });
    }
}

// Contact form
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const origText = btn ? btn.textContent : '';
        if (btn) { btn.disabled = true; btn.textContent = 'Gönderiliyor...'; }

        const formData = {
            name: form.querySelector('[name="name"]')?.value || '',
            phone: form.querySelector('[name="phone"]')?.value || '',
            email: form.querySelector('[name="email"]')?.value || '',
            subject: form.querySelector('[name="subject"]')?.value || '',
            message: form.querySelector('[name="message"]')?.value || ''
        };

        try {
            const resp = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await resp.json();
            showToast(data.message || 'Mesajınız gönderildi.');
            if (data.success) form.reset();
        } catch {
            showToast('Bağlantı hatası. Lütfen tekrar deneyin.');
        }

        if (btn) { btn.disabled = false; btn.textContent = origText; }
    });
}

// Newsletter form
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const origText = btn ? btn.textContent : '';
        if (btn) { btn.disabled = true; btn.textContent = '...'; }

        const email = form.querySelector('[name="email"]')?.value || form.querySelector('input[type="email"]')?.value || '';

        try {
            const resp = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await resp.json();
            showToast(data.message || 'Abone oldunuz!');
            if (data.success) form.reset();
        } catch {
            showToast('Bağlantı hatası. Lütfen tekrar deneyin.');
        }

        if (btn) { btn.disabled = false; btn.textContent = origText; }
    });
}
