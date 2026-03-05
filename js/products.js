// Product data for SulamaShop
const PRODUCTS = [
    // Damla Sulama
    {
        id: 1,
        name: "16mm Yassı Damla Sulama Borusu (500m)",
        category: "damla",
        categoryName: "Damla Sulama",
        price: 850,
        oldPrice: 1050,
        icon: "🌱",
        badge: "Çok Satan",
        description: "16mm çapında, 20cm damlatıcı aralıklı yassı damla sulama borusu. 500 metre rulo halinde. Sebze ve meyve bahçeleri için ideal.",
        specs: {
            "Çap": "16mm",
            "Damlatıcı Aralığı": "20cm",
            "Debi": "2 lt/saat",
            "Rulo Uzunluğu": "500m",
            "Et Kalınlığı": "0.2mm",
            "Çalışma Basıncı": "0.5-1.5 bar"
        },
        featured: true
    },
    {
        id: 2,
        name: "Düz Damlatıcı (Dripper) 4 lt/saat - 100 Adet",
        category: "damla",
        categoryName: "Damla Sulama",
        price: 120,
        oldPrice: null,
        icon: "💧",
        badge: null,
        description: "Ayarlanabilir basınç dengelemeli düz damlatıcı. Meyve ağaçları ve sera sulama sistemleri için uygundur.",
        specs: {
            "Debi": "4 lt/saat",
            "Bağlantı": "16mm boru uyumlu",
            "Malzeme": "UV dayanımlı PP",
            "Adet": "100",
            "Çalışma Basıncı": "0.5-4 bar"
        },
        featured: true
    },
    {
        id: 3,
        name: "PE Lateral Boru 20mm (100m)",
        category: "damla",
        categoryName: "Damla Sulama",
        price: 320,
        oldPrice: 380,
        icon: "🔵",
        badge: null,
        description: "20mm çapında PE100 kalitesinde lateral boru. Damla sulama ana hatları için ideal.",
        specs: {
            "Çap": "20mm",
            "Malzeme": "PE100",
            "Basınç Sınıfı": "PN6",
            "Uzunluk": "100m",
            "Renk": "Siyah"
        },
        featured: false
    },
    {
        id: 4,
        name: "Damla Sulama Bağlantı Seti (50 Parça)",
        category: "damla",
        categoryName: "Damla Sulama",
        price: 185,
        oldPrice: null,
        icon: "🔧",
        badge: null,
        description: "16mm damla sulama sistemi için komple bağlantı seti. Dirsek, te, kapak ve manşon içerir.",
        specs: {
            "Boru Çapı": "16mm",
            "İçerik": "Dirsek, Te, Kapak, Manşon",
            "Adet": "50 parça",
            "Malzeme": "PP"
        },
        featured: false
    },

    // Yağmurlama
    {
        id: 5,
        name: "360° Döner Sprinkler - Pop-up",
        category: "yagmurlama",
        categoryName: "Yağmurlama",
        price: 95,
        oldPrice: 120,
        icon: "🌧️",
        badge: "İndirimli",
        description: "360 derece dönebilen pop-up sprinkler. Çim alanlar ve tarla sulamada kullanılır. Ayarlanabilir menzil.",
        specs: {
            "Dönüş Açısı": "360°",
            "Menzil": "5-12 metre",
            "Bağlantı": "1/2\" dişi",
            "Yükseklik": "10cm pop-up",
            "Debi": "600-1200 lt/saat"
        },
        featured: true
    },
    {
        id: 6,
        name: "Sulama Tabancası - Metal Gövde",
        category: "yagmurlama",
        categoryName: "Yağmurlama",
        price: 1450,
        oldPrice: 1800,
        icon: "🔫",
        badge: "Çok Satan",
        description: "Endüstriyel kalitede metal gövdeli sulama tabancası. Geniş alanların sulanmasında kullanılır.",
        specs: {
            "Menzil": "25-50 metre",
            "Bağlantı": "2\" dişi",
            "Gövde": "Pirinç",
            "Debi": "5-20 m³/saat",
            "Çalışma Basıncı": "3-7 bar"
        },
        featured: true
    },
    {
        id: 7,
        name: "Hortum Makarası 1\" (100m kapasiteli)",
        category: "yagmurlama",
        categoryName: "Yağmurlama",
        price: 2800,
        oldPrice: null,
        icon: "🔄",
        badge: null,
        description: "Tekerlekli hortum makarası. 1 inç hortum ile 100 metre kapasitelidir.",
        specs: {
            "Hortum Çapı": "1\"",
            "Kapasite": "100m",
            "Gövde": "Galvaniz çelik",
            "Teker": "Şişme lastik",
            "Ağırlık": "35 kg"
        },
        featured: false
    },

    // Pompalar
    {
        id: 8,
        name: "4\" Dalgıç Pompa 2 HP",
        category: "pompa",
        categoryName: "Pompalar",
        price: 4500,
        oldPrice: 5200,
        icon: "⚙️",
        badge: "İndirimli",
        description: "4 inç dalgıç pompa, 2 HP motor gücü. Kuyu ve derin su kaynaklarından su çekme için idealdir.",
        specs: {
            "Motor Gücü": "2 HP (1.5 kW)",
            "Debi": "3 m³/saat",
            "Basma Yüksekliği": "80 metre",
            "Çap": "4\" (100mm)",
            "Voltaj": "220V / 50Hz",
            "Koruma": "IP68"
        },
        featured: true
    },
    {
        id: 9,
        name: "Santrifüj Pompa 3 HP",
        category: "pompa",
        categoryName: "Pompalar",
        price: 3200,
        oldPrice: null,
        icon: "🔵",
        badge: null,
        description: "Yüksek performanslı santrifüj pompa. Açık su kaynaklarından besleme ve basınçlandırma için uygundur.",
        specs: {
            "Motor Gücü": "3 HP (2.2 kW)",
            "Debi": "12 m³/saat",
            "Basma Yüksekliği": "35 metre",
            "Emme Çapı": "2\"",
            "Basma Çapı": "1.5\"",
            "Voltaj": "380V / 50Hz"
        },
        featured: false
    },
    {
        id: 10,
        name: "Güneş Enerjili Sulama Pompası 1.5 HP",
        category: "pompa",
        categoryName: "Pompalar",
        price: 8500,
        oldPrice: 9800,
        icon: "☀️",
        badge: "Yeni",
        description: "Güneş paneli ile çalışan DC dalgıç pompa. Elektrik olmayan bölgelerde ideal çözüm. Panel dahil değildir.",
        specs: {
            "Motor Gücü": "1.5 HP DC",
            "Debi": "2.5 m³/saat",
            "Basma Yüksekliği": "60 metre",
            "Panel Gereksinimi": "4x 280W",
            "Kontrol Ünitesi": "MPPT dahil",
            "Garanti": "3 yıl"
        },
        featured: true
    },

    // Filtre & Gübre
    {
        id: 11,
        name: "Disk Filtre 2\" - 120 Mesh",
        category: "filtre",
        categoryName: "Filtre & Gübre",
        price: 450,
        oldPrice: null,
        icon: "🔧",
        badge: null,
        description: "Damla sulama sistemleri için disk filtre. Suyun temizlenmesini sağlayarak tıkanıklıkları önler.",
        specs: {
            "Bağlantı": "2\" dişi-dişi",
            "Filtreleme": "120 mesh (130 mikron)",
            "Debi": "25 m³/saat",
            "Gövde": "PP",
            "Çalışma Basıncı": "Max 8 bar"
        },
        featured: false
    },
    {
        id: 12,
        name: "Kum-Çakıl Filtre 3\" - Otomatik Yıkamalı",
        category: "filtre",
        categoryName: "Filtre & Gübre",
        price: 5800,
        oldPrice: 6500,
        icon: "🏗️",
        badge: null,
        description: "Endüstriyel kum-çakıl filtre sistemi. Otomatik geri yıkama özelliği ile düşük bakım maliyeti.",
        specs: {
            "Bağlantı": "3\" flanşlı",
            "Debi": "40 m³/saat",
            "Gövde": "Epoksi kaplı çelik",
            "Yıkama": "Otomatik zamanlayıcılı",
            "Çap": "60cm"
        },
        featured: false
    },
    {
        id: 13,
        name: "Venturi Gübre Enjektörü 1\"",
        category: "filtre",
        categoryName: "Filtre & Gübre",
        price: 280,
        oldPrice: null,
        icon: "💉",
        badge: null,
        description: "Venturi prensibi ile çalışan gübre enjeksiyon sistemi. Fertigasyon uygulamaları için ekonomik çözüm.",
        specs: {
            "Bağlantı": "1\" dişi",
            "Emme Kapasitesi": "70-200 lt/saat",
            "Malzeme": "PP",
            "Çalışma Basıncı": "1-6 bar"
        },
        featured: false
    },

    // Borular & Bağlantılar
    {
        id: 14,
        name: "PE Boru 63mm PN6 (100m)",
        category: "boru",
        categoryName: "Borular & Bağlantılar",
        price: 1850,
        oldPrice: 2100,
        icon: "🔩",
        badge: null,
        description: "63mm çapında PE100 kalitesinde ana hat borusu. Sulama ana hatları ve dağıtım şebekeleri için uygundur.",
        specs: {
            "Çap": "63mm",
            "Malzeme": "PE100",
            "Basınç Sınıfı": "PN6",
            "Uzunluk": "100m rulo",
            "Renk": "Siyah mavi şeritli"
        },
        featured: false
    },
    {
        id: 15,
        name: "PVC Vana 2\" Küresel",
        category: "boru",
        categoryName: "Borular & Bağlantılar",
        price: 65,
        oldPrice: null,
        icon: "🔵",
        badge: null,
        description: "2 inç PVC küresel vana. Sulama hatlarında açma-kapama kontrolü için kullanılır.",
        specs: {
            "Çap": "2\"",
            "Tip": "Küresel",
            "Malzeme": "PVC-U",
            "Bağlantı": "Yapıştırma",
            "Basınç": "PN16"
        },
        featured: false
    },
    {
        id: 16,
        name: "PE Fitting Seti 63mm (10 Parça)",
        category: "boru",
        categoryName: "Borular & Bağlantılar",
        price: 420,
        oldPrice: null,
        icon: "🔗",
        badge: null,
        description: "63mm PE boru sistemi için komple bağlantı seti. Dirsek, te, redüksiyon ve rakor içerir.",
        specs: {
            "Boru Çapı": "63mm",
            "İçerik": "Dirsek, Te, Redüksiyon, Rakor",
            "Adet": "10 parça",
            "Malzeme": "PP sıkıştırmalı"
        },
        featured: false
    },

    // Akıllı Sulama
    {
        id: 17,
        name: "Akıllı Sulama Kontrol Ünitesi - 8 İstasyon",
        category: "akilli",
        categoryName: "Akıllı Sulama",
        price: 2400,
        oldPrice: 2900,
        icon: "📱",
        badge: "Yeni",
        description: "WiFi bağlantılı 8 istasyonlu akıllı sulama kontrol ünitesi. Mobil uygulama ile uzaktan kontrol ve programlama.",
        specs: {
            "İstasyon": "8 bölge",
            "Bağlantı": "WiFi 2.4GHz",
            "Uygulama": "iOS & Android",
            "Besleme": "220V AC",
            "Vana Çıkışı": "24V AC",
            "Hava Durumu": "Otomatik ayar"
        },
        featured: true
    },
    {
        id: 18,
        name: "Toprak Nem Sensörü - Kablosuz",
        category: "akilli",
        categoryName: "Akıllı Sulama",
        price: 350,
        oldPrice: null,
        icon: "📡",
        badge: null,
        description: "Kablosuz toprak nem ve sıcaklık sensörü. Akıllı sulama kontrol ünitesi ile entegre çalışır.",
        specs: {
            "Ölçüm": "Nem + Sıcaklık",
            "İletişim": "LoRa 868MHz",
            "Menzil": "500m açık alan",
            "Besleme": "2x AA pil (1 yıl)",
            "Derinlik": "15-30cm ayarlanabilir"
        },
        featured: true
    },
    {
        id: 19,
        name: "Selenoid Vana 1\" - 24V",
        category: "akilli",
        categoryName: "Akıllı Sulama",
        price: 180,
        oldPrice: 220,
        icon: "⚡",
        badge: null,
        description: "24V AC selenoid vana. Otomatik sulama sistemlerinde bölge kontrolü için kullanılır.",
        specs: {
            "Çap": "1\"",
            "Voltaj": "24V AC",
            "Debi": "5 m³/saat",
            "Basınç": "0.5-10 bar",
            "Gövde": "Nylon"
        },
        featured: false
    },
    {
        id: 20,
        name: "Dijital Su Sayacı - Pulse Çıkışlı",
        category: "akilli",
        categoryName: "Akıllı Sulama",
        price: 750,
        oldPrice: null,
        icon: "🔢",
        badge: null,
        description: "Dijital ekranlı su sayacı. Pulse çıkışı ile akıllı sulama sistemlerine entegre edilebilir.",
        specs: {
            "Çap": "1\"",
            "Ölçüm Aralığı": "0.05-5 m³/saat",
            "Hassasiyet": "±2%",
            "Çıkış": "Pulse (1 pulse/litre)",
            "Ekran": "LCD dijital"
        },
        featured: false
    }
];

// Helper to get base path
function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/pages/')) {
        return '../';
    }
    return './';
}

// Get product by ID
function getProductById(id) {
    return PRODUCTS.find(p => p.id === parseInt(id));
}

// Get featured products
function getFeaturedProducts() {
    return PRODUCTS.filter(p => p.featured);
}

// Get products by category
function getProductsByCategory(category) {
    if (!category || category === 'all') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === category);
}

// Get related products
function getRelatedProducts(productId, limit) {
    const product = getProductById(productId);
    if (!product) return [];
    return PRODUCTS
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, limit || 4);
}
