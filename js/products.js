// SVG Icons for product categories
const PRODUCT_ICONS = {
    damla: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><defs><linearGradient id="g-damla" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0e7c46"/><stop offset="100%" stop-color="#1a9d5a"/></linearGradient></defs><path d="M32 8C32 8 16 28 16 40a16 16 0 0 0 32 0C48 28 32 8 32 8z" fill="url(#g-damla)" opacity="0.15"/><path d="M32 8C32 8 16 28 16 40a16 16 0 0 0 32 0C48 28 32 8 32 8z" stroke="url(#g-damla)" stroke-width="2.5" fill="none"/><circle cx="26" cy="42" r="3" fill="url(#g-damla)" opacity="0.4"/><path d="M20 34h24M22 28h20" stroke="url(#g-damla)" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.5"/></svg>',
    yagmurlama: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><defs><linearGradient id="g-yag" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1a73e8"/><stop offset="100%" stop-color="#4a90e8"/></linearGradient></defs><rect x="28" y="32" width="8" height="24" rx="2" fill="url(#g-yag)" opacity="0.2"/><rect x="28" y="32" width="8" height="24" rx="2" stroke="url(#g-yag)" stroke-width="2" fill="none"/><path d="M32 32C32 32 20 20 14 14M32 32C32 32 32 16 32 10M32 32C32 32 44 20 50 14" stroke="url(#g-yag)" stroke-width="2.5" stroke-linecap="round"/><circle cx="14" cy="14" r="2" fill="url(#g-yag)" opacity="0.6"/><circle cx="32" cy="10" r="2" fill="url(#g-yag)" opacity="0.6"/><circle cx="50" cy="14" r="2" fill="url(#g-yag)" opacity="0.6"/><path d="M10 20l2 4M24 8l1 4M40 8l-1 4M54 20l-2 4" stroke="url(#g-yag)" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/></svg>',
    pompa: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><defs><linearGradient id="g-pompa" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e65100"/><stop offset="100%" stop-color="#ff8f00"/></linearGradient></defs><circle cx="32" cy="32" r="18" fill="url(#g-pompa)" opacity="0.12"/><circle cx="32" cy="32" r="18" stroke="url(#g-pompa)" stroke-width="2.5" fill="none"/><circle cx="32" cy="32" r="6" fill="url(#g-pompa)" opacity="0.3"/><circle cx="32" cy="32" r="6" stroke="url(#g-pompa)" stroke-width="2" fill="none"/><path d="M32 14v6M32 44v6M14 32h6M44 32h6" stroke="url(#g-pompa)" stroke-width="2.5" stroke-linecap="round"/><path d="M6 32h8M50 32h8" stroke="url(#g-pompa)" stroke-width="2" stroke-linecap="round"/><rect x="4" y="28" width="4" height="8" rx="1" fill="url(#g-pompa)" opacity="0.3"/><rect x="56" y="28" width="4" height="8" rx="1" fill="url(#g-pompa)" opacity="0.3"/></svg>',
    filtre: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><defs><linearGradient id="g-filtre" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#7b1fa2"/><stop offset="100%" stop-color="#ab47bc"/></linearGradient></defs><path d="M12 12h40l-14 20v16l-12 6V32L12 12z" fill="url(#g-filtre)" opacity="0.12"/><path d="M12 12h40l-14 20v16l-12 6V32L12 12z" stroke="url(#g-filtre)" stroke-width="2.5" fill="none" stroke-linejoin="round"/><path d="M18 18h28M22 24h20" stroke="url(#g-filtre)" stroke-width="1.5" opacity="0.5"/><circle cx="30" cy="38" r="1.5" fill="url(#g-filtre)" opacity="0.6"/><circle cx="34" cy="42" r="1.5" fill="url(#g-filtre)" opacity="0.6"/></svg>',
    boru: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><defs><linearGradient id="g-boru" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0277bd"/><stop offset="100%" stop-color="#0288d1"/></linearGradient></defs><path d="M8 20h20v8H8zM28 20v28h8V20zM36 40h20v8H36z" fill="url(#g-boru)" opacity="0.12"/><path d="M8 20h20v8H8zM28 20v28h8V20zM36 40h20v8H36z" stroke="url(#g-boru)" stroke-width="2.5" fill="none" stroke-linejoin="round"/><circle cx="8" cy="24" r="3" stroke="url(#g-boru)" stroke-width="2" fill="none"/><circle cx="56" cy="44" r="3" stroke="url(#g-boru)" stroke-width="2" fill="none"/><path d="M14 24h6M42 44h8" stroke="url(#g-boru)" stroke-width="1.5" stroke-dasharray="2 2" opacity="0.5"/></svg>',
    akilli: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><defs><linearGradient id="g-akilli" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#00897b"/><stop offset="100%" stop-color="#26a69a"/></linearGradient></defs><rect x="16" y="8" width="32" height="48" rx="4" fill="url(#g-akilli)" opacity="0.12"/><rect x="16" y="8" width="32" height="48" rx="4" stroke="url(#g-akilli)" stroke-width="2.5" fill="none"/><rect x="20" y="14" width="24" height="28" rx="2" stroke="url(#g-akilli)" stroke-width="1.5" fill="url(#g-akilli)" opacity="0.08"/><circle cx="32" cy="50" r="2" fill="url(#g-akilli)"/><path d="M26 24l4 4-4 4M34 28h6" stroke="url(#g-akilli)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="28" cy="36" r="1" fill="url(#g-akilli)" opacity="0.5"/><circle cx="32" cy="36" r="1" fill="url(#g-akilli)" opacity="0.5"/><circle cx="36" cy="36" r="1" fill="url(#g-akilli)" opacity="0.5"/></svg>'
};

// Category icon mapping for products
const CATEGORY_ICON_MAP = {
    'damla': 'damla',
    'yagmurlama': 'yagmurlama',
    'pompa': 'pompa',
    'filtre': 'filtre',
    'boru': 'boru',
    'akilli': 'akilli'
};

// Get SVG icon for a product
function getProductSVGIcon(product) {
    const iconKey = CATEGORY_ICON_MAP[product.category] || 'damla';
    return PRODUCT_ICONS[iconKey] || product.icon;
}

// Product data for SulamaShop
const PRODUCTS = [
    // Damla Sulama
    {
        id: 1,
        slug: "16mm-yassi-damla-sulama-borusu",
        brand: "Netafim",
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
        slug: "duz-damlatici-dripper-4lt",
        brand: "Netafim",
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
        slug: "pe-lateral-boru-20mm",
        brand: "Fırat Boru",
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
        slug: "damla-sulama-baglanti-seti",
        brand: "Irritec",
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
        slug: "360-doner-sprinkler-popup",
        brand: "Rain Bird",
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
        slug: "sulama-tabancasi-metal",
        brand: "Rain Bird",
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
        slug: "hortum-makarasi-1inch",
        brand: "Hunter",
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
        slug: "4inch-dalgic-pompa-2hp",
        brand: "Pedrollo",
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
        slug: "santrifuj-pompa-3hp",
        brand: "Pedrollo",
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
        slug: "gunes-enerjili-sulama-pompasi",
        brand: "Pedrollo",
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
        slug: "disk-filtre-2inch-120mesh",
        brand: "Irritec",
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
        slug: "kum-cakil-filtre-otomatik",
        brand: "Irritec",
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
        slug: "venturi-gubre-enjektoru",
        brand: "Irritec",
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
        slug: "pe-boru-63mm-pn6",
        brand: "Fırat Boru",
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
        slug: "pvc-vana-2inch-kuresel",
        brand: "Pipelife",
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
        slug: "pe-fitting-seti-63mm",
        brand: "Fırat Boru",
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
        slug: "akilli-sulama-kontrol-unitesi",
        brand: "Hunter",
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
        slug: "toprak-nem-sensoru-kablosuz",
        brand: "Netafim",
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
        slug: "selenoid-vana-1inch-24v",
        brand: "Hunter",
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
        slug: "dijital-su-sayaci-pulse",
        brand: "Anadolu Boru",
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

const BRANDS = [
    { slug: "firat-boru", name: "Fırat Boru", description: "Türkiye'nin lider boru üreticisi. 1960'tan bu yana PE boru, PVC boru ve sulama boruları üretmektedir." },
    { slug: "netafim", name: "Netafim", description: "İsrail menşeli dünyanın en büyük damla sulama sistemleri üreticisi. 1965'ten beri küresel sulama çözümleri sunmaktadır." },
    { slug: "rainbird", name: "Rain Bird", description: "1933'ten bu yana sulama sektörünün öncüsü. Yağmurlama ve sprinkler sistemlerinde dünya lideri." },
    { slug: "irritec", name: "Irritec", description: "İtalyan menşeli mikro sulama ve filtrasyon çözümleri üreticisi. Damla sulama ve filtre sistemlerinde uzman." },
    { slug: "pipelife", name: "Pipelife", description: "Avrupa'nın lider plastik boru üreticisi. PE ve PVC boru sistemlerinde 50 yılı aşkın deneyim." },
    { slug: "anadolu-boru", name: "Anadolu Boru", description: "Türkiye'nin köklü boru üreticilerinden. Tarımsal sulama boruları ve altyapı çözümlerinde güvenilir marka." },
    { slug: "hunter", name: "Hunter", description: "ABD menşeli sulama otomasyon ve kontrol sistemleri üreticisi. Akıllı sulama çözümlerinde dünya lideri." },
    { slug: "pedrollo", name: "Pedrollo", description: "İtalyan menşeli pompa üreticisi. Dalgıç pompa, santrifüj pompa ve güneş enerjili pompalarda 50 yılı aşkın tecrübe." }
];

const CATEGORIES = [
    { slug: "damla-sulama", name: "Damla Sulama", category: "damla", description: "Damla sulama boruları, damlatıcılar, lateral borular ve bağlantı parçaları. Su tasarrufu sağlayan modern sulama çözümleri." },
    { slug: "yagmurlama-sistemleri", name: "Yağmurlama Sistemleri", category: "yagmurlama", description: "Sprinkler, sulama tabancası, hortum makaraları ve yağmurlama ekipmanları. Geniş alan sulama çözümleri." },
    { slug: "pompalar", name: "Pompalar", category: "pompa", description: "Dalgıç pompa, santrifüj pompa ve güneş enerjili pompalar. Her türlü su kaynağı için uygun çözümler." },
    { slug: "filtre-gubre-sistemleri", name: "Filtre & Gübre Sistemleri", category: "filtre", description: "Disk filtre, kum filtre, venturi enjektör ve fertigasyon üniteleri. Sulama suyunun filtrelenmesi ve gübre enjeksiyonu." },
    { slug: "borular-baglantilar", name: "Borular & Bağlantılar", category: "boru", description: "PE borular, PVC borular, vanalar ve fitting parçaları. Sulama altyapısı için gerekli tüm boru ve bağlantı malzemeleri." },
    { slug: "akilli-sulama", name: "Akıllı Sulama", category: "akilli", description: "Sulama otomasyon kontrol üniteleri, toprak nem sensörleri, selenoid vanalar ve dijital su sayaçları." }
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

// Get products by brand
function getProductsByBrand(brandSlug) {
    const brand = BRANDS.find(b => b.slug === brandSlug);
    if (!brand) return [];
    return PRODUCTS.filter(p => p.brand === brand.name);
}

// Get brand by slug
function getBrandBySlug(slug) {
    return BRANDS.find(b => b.slug === slug);
}

// Get category by slug
function getCategoryBySlug(slug) {
    return CATEGORIES.find(c => c.slug === slug);
}
