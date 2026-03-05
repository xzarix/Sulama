require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting (in-memory, IP-based)
const rateLimitMap = new Map();
function rateLimit(maxPerMinute) {
    return (req, res, next) => {
        const ip = req.ip || req.connection.remoteAddress;
        const now = Date.now();
        const windowMs = 60000;
        const hits = rateLimitMap.get(ip) || [];
        const recent = hits.filter(t => now - t < windowMs);
        if (recent.length >= maxPerMinute) {
            return res.status(429).json({ success: false, message: 'Cok fazla istek. Lutfen bir dakika bekleyin.' });
        }
        recent.push(now);
        rateLimitMap.set(ip, recent);
        next();
    };
}

// Clean rate limit map every 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [ip, hits] of rateLimitMap) {
        const recent = hits.filter(t => now - t < 60000);
        if (recent.length === 0) rateLimitMap.delete(ip);
        else rateLimitMap.set(ip, recent);
    }
}, 300000);

// Input sanitizer
function sanitize(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[<>]/g, '').trim().slice(0, 2000);
}

// ---------------------------------------------------------------------------
// Email Transporter
// ---------------------------------------------------------------------------
let transporter = null;
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
    transporter.verify((err) => {
        if (err) console.log('SMTP baglanti hatasi:', err.message);
        else console.log('SMTP baglantisi basarili');
    });
} else {
    console.log('SMTP ayarlari eksik - email gonderimi devre disi (.env dosyasini kontrol edin)');
}

// ---------------------------------------------------------------------------
// Helper: Save to JSON file
// ---------------------------------------------------------------------------
function saveToFile(filename, data) {
    const filepath = path.join(DATA_DIR, filename);
    let existing = [];
    try {
        existing = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    } catch { /* file doesn't exist yet */ }
    existing.push(data);
    fs.writeFileSync(filepath, JSON.stringify(existing, null, 2), 'utf8');
}

function readFromFile(filename) {
    const filepath = path.join(DATA_DIR, filename);
    try {
        return JSON.parse(fs.readFileSync(filepath, 'utf8'));
    } catch {
        return [];
    }
}

// ---------------------------------------------------------------------------
// Email Templates
// ---------------------------------------------------------------------------
function contactEmailHtml({ name, phone, email, subject, message }) {
    return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#2e7d32;color:white;padding:20px;text-align:center;">
            <h2 style="margin:0;">SulamaShop - Yeni Iletisim Mesaji</h2>
        </div>
        <div style="padding:24px;background:#f9f9f9;">
            <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:8px 12px;font-weight:bold;color:#555;width:120px;">Ad Soyad:</td><td style="padding:8px 12px;">${name}</td></tr>
                <tr style="background:#fff;"><td style="padding:8px 12px;font-weight:bold;color:#555;">Telefon:</td><td style="padding:8px 12px;"><a href="tel:${phone}">${phone}</a></td></tr>
                <tr><td style="padding:8px 12px;font-weight:bold;color:#555;">E-posta:</td><td style="padding:8px 12px;"><a href="mailto:${email}">${email}</a></td></tr>
                <tr style="background:#fff;"><td style="padding:8px 12px;font-weight:bold;color:#555;">Konu:</td><td style="padding:8px 12px;">${subject}</td></tr>
            </table>
            <div style="margin-top:16px;padding:16px;background:white;border-radius:8px;border:1px solid #e0e0e0;">
                <strong style="color:#555;">Mesaj:</strong>
                <p style="margin:8px 0 0;line-height:1.6;color:#333;">${message}</p>
            </div>
        </div>
        <div style="padding:12px;text-align:center;color:#999;font-size:12px;">
            Bu mesaj sulamashop.com iletisim formu uzerinden gonderilmistir.
        </div>
    </div>`;
}

function orderEmailHtml({ customer, cart, total }) {
    const itemRows = cart.map(item => `
        <tr>
            <td style="padding:8px 12px;border-bottom:1px solid #eee;">${item.name}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;">${item.price} TL</td>
            <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;">${(item.price * item.quantity).toFixed(2)} TL</td>
        </tr>
    `).join('');

    return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#1565c0;color:white;padding:20px;text-align:center;">
            <h2 style="margin:0;">SulamaShop - Yeni Siparis</h2>
        </div>
        <div style="padding:24px;background:#f9f9f9;">
            <h3 style="color:#333;margin-top:0;">Musteri Bilgileri</h3>
            <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
                <tr><td style="padding:6px 12px;font-weight:bold;color:#555;width:100px;">Ad Soyad:</td><td style="padding:6px 12px;">${customer.name}</td></tr>
                <tr style="background:#fff;"><td style="padding:6px 12px;font-weight:bold;color:#555;">Telefon:</td><td style="padding:6px 12px;"><a href="tel:${customer.phone}">${customer.phone}</a></td></tr>
                <tr><td style="padding:6px 12px;font-weight:bold;color:#555;">E-posta:</td><td style="padding:6px 12px;">${customer.email}</td></tr>
                <tr style="background:#fff;"><td style="padding:6px 12px;font-weight:bold;color:#555;">Adres:</td><td style="padding:6px 12px;">${customer.address}, ${customer.district}/${customer.city}</td></tr>
            </table>
            <h3 style="color:#333;">Siparis Detayi</h3>
            <table style="width:100%;border-collapse:collapse;background:white;border-radius:8px;">
                <thead>
                    <tr style="background:#e3f2fd;">
                        <th style="padding:10px 12px;text-align:left;">Urun</th>
                        <th style="padding:10px 12px;text-align:center;">Adet</th>
                        <th style="padding:10px 12px;text-align:right;">Fiyat</th>
                        <th style="padding:10px 12px;text-align:right;">Toplam</th>
                    </tr>
                </thead>
                <tbody>${itemRows}</tbody>
                <tfoot>
                    <tr style="background:#e8f5e9;">
                        <td colspan="3" style="padding:12px;text-align:right;font-weight:bold;">Genel Toplam:</td>
                        <td style="padding:12px;text-align:right;font-weight:bold;font-size:18px;color:#2e7d32;">${total} TL</td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div style="padding:12px;text-align:center;color:#999;font-size:12px;">
            Bu siparis sulamashop.com uzerinden alinmistir.
        </div>
    </div>`;
}

// ---------------------------------------------------------------------------
// API: Contact Form
// ---------------------------------------------------------------------------
app.post('/api/contact', rateLimit(5), async (req, res) => {
    try {
        const { name, phone, email, subject, message } = req.body;

        if (!name || !phone || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: 'Tum alanlar zorunludur.' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Gecerli bir e-posta adresi giriniz.' });
        }

        const data = {
            name: sanitize(name),
            phone: sanitize(phone),
            email: sanitize(email),
            subject: sanitize(subject),
            message: sanitize(message),
            date: new Date().toISOString(),
            ip: req.ip
        };

        // Save to file
        saveToFile('messages.json', data);

        // Send email
        if (transporter) {
            try {
                await transporter.sendMail({
                    from: process.env.SMTP_FROM,
                    to: process.env.SMTP_TO,
                    subject: `SulamaShop Iletisim: ${data.subject} - ${data.name}`,
                    html: contactEmailHtml(data)
                });
            } catch (emailErr) {
                console.error('Email gonderilemedi:', emailErr.message);
            }
        }

        res.json({ success: true, message: 'Mesajiniz basariyla gonderildi. En kisa surede donus yapacagiz.' });
    } catch (err) {
        console.error('Contact error:', err);
        res.status(500).json({ success: false, message: 'Bir hata olustu. Lutfen tekrar deneyin.' });
    }
});

// ---------------------------------------------------------------------------
// API: Newsletter
// ---------------------------------------------------------------------------
app.post('/api/newsletter', rateLimit(3), async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: 'E-posta adresi zorunludur.' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Gecerli bir e-posta adresi giriniz.' });
        }

        const sanitizedEmail = sanitize(email).toLowerCase();

        // Check duplicate
        const existing = readFromFile('subscribers.json');
        if (existing.some(s => s.email === sanitizedEmail)) {
            return res.json({ success: true, message: 'Bu e-posta zaten abone listesinde.' });
        }

        saveToFile('subscribers.json', {
            email: sanitizedEmail,
            date: new Date().toISOString()
        });

        res.json({ success: true, message: 'Bultenimize basariyla abone oldunuz!' });
    } catch (err) {
        console.error('Newsletter error:', err);
        res.status(500).json({ success: false, message: 'Bir hata olustu. Lutfen tekrar deneyin.' });
    }
});

// ---------------------------------------------------------------------------
// API: Order
// ---------------------------------------------------------------------------
app.post('/api/order', rateLimit(3), async (req, res) => {
    try {
        const { customer, cart } = req.body;

        if (!customer || !cart || !Array.isArray(cart) || cart.length === 0) {
            return res.status(400).json({ success: false, message: 'Siparis bilgileri eksik.' });
        }

        const { name, phone, email, address, city, district } = customer;
        if (!name || !phone || !email || !address || !city) {
            return res.status(400).json({ success: false, message: 'Musteri bilgileri eksik.' });
        }

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);

        const orderData = {
            id: 'SP-' + Date.now().toString(36).toUpperCase(),
            customer: {
                name: sanitize(name),
                phone: sanitize(phone),
                email: sanitize(email),
                address: sanitize(address),
                city: sanitize(city),
                district: sanitize(district || '')
            },
            cart: cart.map(item => ({
                id: item.id,
                name: sanitize(item.name || ''),
                quantity: parseInt(item.quantity) || 1,
                price: parseFloat(item.price) || 0
            })),
            total,
            date: new Date().toISOString(),
            status: 'yeni'
        };

        // Save order
        saveToFile('orders.json', orderData);

        // Send email
        if (transporter) {
            try {
                await transporter.sendMail({
                    from: process.env.SMTP_FROM,
                    to: process.env.SMTP_TO,
                    subject: `Yeni Siparis #${orderData.id} - ${orderData.customer.name} - ${total} TL`,
                    html: orderEmailHtml(orderData)
                });
            } catch (emailErr) {
                console.error('Siparis emaili gonderilemedi:', emailErr.message);
            }
        }

        // Build WhatsApp URL
        const whatsappNumber = process.env.WHATSAPP_NUMBER || '905325550000';
        const cartSummary = cart.map(item =>
            `- ${item.name || 'Urun'} x${item.quantity} = ${(item.price * item.quantity).toFixed(2)} TL`
        ).join('\n');
        const whatsappText = encodeURIComponent(
            `Merhaba, SulamaShop'tan siparis vermek istiyorum.\n\n` +
            `Siparis No: ${orderData.id}\n` +
            `Ad: ${orderData.customer.name}\n` +
            `Tel: ${orderData.customer.phone}\n` +
            `Adres: ${orderData.customer.address}, ${orderData.customer.district}/${orderData.customer.city}\n\n` +
            `Urunler:\n${cartSummary}\n\n` +
            `Toplam: ${total} TL`
        );
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

        res.json({
            success: true,
            message: 'Sipairisiniz basariyla alindi!',
            orderId: orderData.id,
            whatsappUrl
        });
    } catch (err) {
        console.error('Order error:', err);
        res.status(500).json({ success: false, message: 'Bir hata olustu. Lutfen tekrar deneyin.' });
    }
});

// ---------------------------------------------------------------------------
// Admin API (simple password protection)
// ---------------------------------------------------------------------------
function adminAuth(req, res, next) {
    const password = req.headers['x-admin-password'] || req.query.password;
    if (password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ success: false, message: 'Yetkisiz erisim.' });
    }
    next();
}

app.get('/api/admin/messages', adminAuth, (req, res) => {
    const data = readFromFile('messages.json');
    res.json({ success: true, data: data.reverse() });
});

app.get('/api/admin/subscribers', adminAuth, (req, res) => {
    const data = readFromFile('subscribers.json');
    res.json({ success: true, data: data.reverse(), total: data.length });
});

app.get('/api/admin/orders', adminAuth, (req, res) => {
    const data = readFromFile('orders.json');
    res.json({ success: true, data: data.reverse(), total: data.length });
});

app.get('/api/admin/stats', adminAuth, (req, res) => {
    const messages = readFromFile('messages.json');
    const subscribers = readFromFile('subscribers.json');
    const orders = readFromFile('orders.json');
    const totalRevenue = orders.reduce((sum, o) => sum + parseFloat(o.total || 0), 0);

    res.json({
        success: true,
        stats: {
            messages: messages.length,
            subscribers: subscribers.length,
            orders: orders.length,
            totalRevenue: totalRevenue.toFixed(2)
        }
    });
});

// ---------------------------------------------------------------------------
// Static Files (serve the existing site)
// ---------------------------------------------------------------------------
app.use(express.static(__dirname, {
    extensions: ['html'],
    index: 'index.html'
}));

// Fallback to 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// ---------------------------------------------------------------------------
// Start Server
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`SulamaShop server ${PORT} portunda calisiyor`);
    console.log(`http://localhost:${PORT}`);
});
