const { sanitize, getTransporter, checkRateLimit, orderEmailHtml } = require('./_helpers');

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

    const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '';
    if (!checkRateLimit(ip, 3)) return res.status(429).json({ success: false, message: 'Cok fazla istek.' });

    try {
        const { customer, cart } = req.body || {};
        if (!customer || !cart || !Array.isArray(cart) || cart.length === 0) {
            return res.status(400).json({ success: false, message: 'Siparis bilgileri eksik.' });
        }

        const { name, phone, email, address, city, district } = customer;
        if (!name || !phone || !email || !address || !city) {
            return res.status(400).json({ success: false, message: 'Musteri bilgileri eksik.' });
        }

        const total = cart.reduce((sum, item) => sum + ((parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1)), 0).toFixed(2);
        const orderId = 'SP-' + Date.now().toString(36).toUpperCase();

        const orderData = {
            id: orderId,
            customer: {
                name: sanitize(name), phone: sanitize(phone), email: sanitize(email),
                address: sanitize(address), city: sanitize(city), district: sanitize(district || '')
            },
            cart: cart.map(item => ({
                id: item.id, name: sanitize(item.name || ''),
                quantity: parseInt(item.quantity) || 1, price: parseFloat(item.price) || 0
            })),
            total
        };

        const transporter = getTransporter();
        if (transporter) {
            try {
                await transporter.sendMail({
                    from: process.env.SMTP_FROM,
                    to: process.env.SMTP_TO,
                    subject: `Yeni Siparis #${orderId} - ${orderData.customer.name} - ${total} TL`,
                    html: orderEmailHtml(orderData)
                });
            } catch (e) { console.error('Order email error:', e.message); }
        }

        const whatsappNumber = process.env.WHATSAPP_NUMBER || '905325550000';
        const cartSummary = cart.map(item =>
            `- ${item.name || 'Urun'} x${item.quantity} = ${((parseFloat(item.price)||0) * (parseInt(item.quantity)||1)).toFixed(2)} TL`
        ).join('\n');
        const whatsappText = encodeURIComponent(
            `Merhaba, SulamaShop'tan siparis vermek istiyorum.\n\nSiparis No: ${orderId}\nAd: ${orderData.customer.name}\nTel: ${orderData.customer.phone}\nAdres: ${orderData.customer.address}, ${orderData.customer.district}/${orderData.customer.city}\n\nUrunler:\n${cartSummary}\n\nToplam: ${total} TL`
        );

        res.status(200).json({
            success: true,
            message: 'Sipairisiniz basariyla alindi!',
            orderId,
            whatsappUrl: `https://wa.me/${whatsappNumber}?text=${whatsappText}`
        });
    } catch (err) {
        console.error('Order error:', err);
        res.status(500).json({ success: false, message: 'Bir hata olustu.' });
    }
};
