const nodemailer = require('nodemailer');

// Input sanitizer
function sanitize(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[<>]/g, '').trim().slice(0, 2000);
}

// Email transporter (lazy init)
let transporter = null;
function getTransporter() {
    if (transporter) return transporter;
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        });
        return transporter;
    }
    return null;
}

// Rate limiting (in-memory, resets on cold start)
const rateLimitMap = new Map();
function checkRateLimit(ip, maxPerMinute) {
    const now = Date.now();
    const hits = rateLimitMap.get(ip) || [];
    const recent = hits.filter(t => now - t < 60000);
    if (recent.length >= maxPerMinute) return false;
    recent.push(now);
    rateLimitMap.set(ip, recent);
    return true;
}

// Email templates
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
                <tr style="background:#fff;"><td style="padding:6px 12px;font-weight:bold;color:#555;">Telefon:</td><td style="padding:6px 12px;">${customer.phone}</td></tr>
                <tr><td style="padding:6px 12px;font-weight:bold;color:#555;">E-posta:</td><td style="padding:6px 12px;">${customer.email}</td></tr>
                <tr style="background:#fff;"><td style="padding:6px 12px;font-weight:bold;color:#555;">Adres:</td><td style="padding:6px 12px;">${customer.address}, ${customer.district}/${customer.city}</td></tr>
            </table>
            <h3 style="color:#333;">Siparis Detayi</h3>
            <table style="width:100%;border-collapse:collapse;background:white;">
                <thead><tr style="background:#e3f2fd;">
                    <th style="padding:10px 12px;text-align:left;">Urun</th>
                    <th style="padding:10px 12px;text-align:center;">Adet</th>
                    <th style="padding:10px 12px;text-align:right;">Fiyat</th>
                    <th style="padding:10px 12px;text-align:right;">Toplam</th>
                </tr></thead>
                <tbody>${itemRows}</tbody>
                <tfoot><tr style="background:#e8f5e9;">
                    <td colspan="3" style="padding:12px;text-align:right;font-weight:bold;">Genel Toplam:</td>
                    <td style="padding:12px;text-align:right;font-weight:bold;font-size:18px;color:#2e7d32;">${total} TL</td>
                </tr></tfoot>
            </table>
        </div>
    </div>`;
}

module.exports = { sanitize, getTransporter, checkRateLimit, contactEmailHtml, orderEmailHtml };
