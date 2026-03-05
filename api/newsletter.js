const { sanitize, checkRateLimit } = require('./_helpers');

// In-memory store (resets on cold start - use a DB for production)
const subscribers = new Set();

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

    const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '';
    if (!checkRateLimit(ip, 3)) return res.status(429).json({ success: false, message: 'Cok fazla istek.' });

    try {
        const { email } = req.body || {};
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ success: false, message: 'Gecerli bir e-posta adresi giriniz.' });
        }

        const sanitizedEmail = sanitize(email).toLowerCase();
        if (subscribers.has(sanitizedEmail)) {
            return res.status(200).json({ success: true, message: 'Bu e-posta zaten abone listesinde.' });
        }

        subscribers.add(sanitizedEmail);
        res.status(200).json({ success: true, message: 'Bultenimize basariyla abone oldunuz!' });
    } catch (err) {
        console.error('Newsletter error:', err);
        res.status(500).json({ success: false, message: 'Bir hata olustu.' });
    }
};
