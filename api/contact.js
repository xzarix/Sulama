const { sanitize, getTransporter, checkRateLimit, contactEmailHtml } = require('./_helpers');

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

    const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '';
    if (!checkRateLimit(ip, 5)) return res.status(429).json({ success: false, message: 'Cok fazla istek. Lutfen bir dakika bekleyin.' });

    try {
        const { name, phone, email, subject, message } = req.body || {};
        if (!name || !phone || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: 'Tum alanlar zorunludur.' });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ success: false, message: 'Gecerli bir e-posta adresi giriniz.' });
        }

        const data = {
            name: sanitize(name), phone: sanitize(phone), email: sanitize(email),
            subject: sanitize(subject), message: sanitize(message),
            date: new Date().toISOString()
        };

        const transporter = getTransporter();
        if (transporter) {
            try {
                await transporter.sendMail({
                    from: process.env.SMTP_FROM,
                    to: process.env.SMTP_TO,
                    subject: `SulamaShop Iletisim: ${data.subject} - ${data.name}`,
                    html: contactEmailHtml(data)
                });
            } catch (e) { console.error('Email error:', e.message); }
        }

        res.status(200).json({ success: true, message: 'Mesajiniz basariyla gonderildi. En kisa surede donus yapacagiz.' });
    } catch (err) {
        console.error('Contact error:', err);
        res.status(500).json({ success: false, message: 'Bir hata olustu.' });
    }
};
