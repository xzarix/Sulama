module.exports = async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).json({ success: false, message: 'Method not allowed' });

    const password = req.headers['x-admin-password'] || req.query?.password;
    if (password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ success: false, message: 'Yetkisiz erisim.' });
    }

    // Vercel serverless - no persistent storage, return empty
    // For production, connect to a database (MongoDB Atlas, Supabase, etc.)
    const path = req.url?.split('?')[0] || '';

    if (path.includes('/stats')) {
        return res.status(200).json({
            success: true,
            stats: { messages: 0, subscribers: 0, orders: 0, totalRevenue: '0.00' },
            note: 'Vercel serverless - kalici veri icin veritabani baglantisi gerekli'
        });
    }

    res.status(200).json({ success: true, data: [], note: 'Vercel serverless - kalici veri icin veritabani baglantisi gerekli' });
};
