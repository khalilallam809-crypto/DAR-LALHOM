export type Language = 'ar' | 'en' | 'fr';

export interface Translation {
  brand: string;
  hero: {
    badge: string;
    title: string;
    cta: string;
  };
  navigation: {
    home: string;
    shop: string;
    cart: string;
    dashboard: string;
    addProduct: string;
    profile: string;
    explore: string;
    login: string;
    services: string;
  };
  sections: {
    selected: string;
    viewAll: string;
    contactUs: string;
    about: string;
    follow: string;
    verified: string;
    startShopping: string;
    orderConfirmed: string;
    successAdd: string;
    welcomeMsg: string;
    processing: string;
    noAlerts: string;
    noOrders: string;
    shareVia: string;
    sharedVia: string;
    close: string;
    search: string;
    buy: string;
    rent: string;
    mainCategories: {
      all: string;
      jewelry: string;
      clothing: string;
      copper: string;
      homeDecor: string;
      hennaSetup: string;
      hennaInk: string;
    };
    jewelryFilters: {
      all: string;
      constantinois: string;
      kabyle: string;
      chaoui: string;
      sahraoui: string;
    };
    subFilters: {
      all: string;
      offers: string;
      bestSellers: string;
      rated5: string;
    };
  };
  cart: {
    title: string;
    empty: string;
    total: string;
    confirm: string;
    confirmation: string;
    methodTitle: string;
    cod: string;
    edahabia: string;
    paymentTitle: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardHolder: string;
    payNow: string;
    paymentSuccess: string;
    artisanNotified: string;
  };
  dashboard: {
    welcome: string;
    subtitle: string;
    views: string;
    sales: string;
    orders: string;
    rating: string;
    notifications: string;
    ordersTable: string;
    packages: {
      free: string;
      pro: string;
      premium: string;
      limit: string;
      unlimited: string;
      full: string;
    };
    premium: {
      badge: string;
      title: string;
      desc: string;
      cta: string;
    };
  };
  product: {
    addCart: string;
    inquiry: string;
    artisan: string;
    descPrefix: string;
    descSuffix: string;
    addNew: string;
    image: string;
    upload: string;
    name: string;
    description: string;
    wilaya: string;
    price: string;
    save: string;
    limitReached: string;
    fillAll: string;
    inquirySent: string;
  };
  profile: {
    title: string;
    edit: string;
    save: string;
    personalInfo: string;
    myProducts: string;
    myOrders: string;
    logout: string;
  };
  services: {
    title: string;
    photography: string;
    marketing: string;
    audience: string;
  };
  auth: {
    title: string;
    subtitle: string;
    client: string;
    artisan: string;
    google: string;
    facebook: string;
    artisanForm: {
      firstName: string;
      lastName: string;
      phone: string;
      wilaya: string;
      craft: string;
      documents: string;
      submit: string;
    };
    footer: string;
    invalid: string;
  };
}

export const translations: Record<Language, Translation> = {
  ar: {
    brand: "دَارُ لَالَّاهُمْ",
    hero: {
      badge: "موسم 2024",
      title: "حلي تروي تاريخ الأجداد",
      cta: "تصفح المجموعة"
    },
    navigation: {
      home: "الرئيسية",
      shop: "المتجر",
      cart: "السلة",
      dashboard: "إحصائيات نور",
      addProduct: "نشر منتج جديد",
      profile: "حسابي",
      explore: "استكشاف",
      login: "تسجيل الدخول",
      services: "الخدمات"
    },
    sections: {
      selected: "قطع مختارة لك",
      viewAll: "عرض الكل",
      contactUs: "اتصل بنا",
      about: "المكان المثالي لاكتشاف واقتناء أجمل الحلي وقطع التراث الجزائري الأصيل.",
      follow: "متابعة",
      verified: "حساب موثق",
      startShopping: "ابدأ التسوق",
      orderConfirmed: "تم تأكيد طلبك بنجاح!",
      successAdd: "تمت الإضافة للسلة بنجاح",
      welcomeMsg: "مرحباً بكِ في لوحة التحكم",
      processing: "قيد المعالجة",
      noAlerts: "لا توجد تنبيهات جديدة",
      noOrders: "لا توجد طلبيات بعد",
      shareVia: "مشاركة هذه القطعة عبر",
      sharedVia: "تمت المشاركة عبر",
      close: "إغلاق",
      search: "البحث عن حلي...",
      buy: "شراء",
      rent: "كراء",
      mainCategories: {
        all: "الكل",
        jewelry: "حلي",
        clothing: "ألبسة",
        copper: "نحاس",
        homeDecor: "ديكور المنزل",
        hennaSetup: "قعدة الحنة",
        hennaInk: "حرقوس حنة"
      },
      jewelryFilters: {
        all: "الكل",
        constantinois: "قسنطيني",
        kabyle: "قبائلي",
        chaoui: "شاوي",
        sahraoui: "صحراوي"
      },
      subFilters: {
        all: "الكل",
        offers: "عروض",
        bestSellers: "الأكثر مبيعاً",
        rated5: "تقييم 5 نجوم"
      }
    },
    cart: {
      title: "حقيبة المشتريات",
      empty: "سلة مشترياتك خالية",
      total: "الإجمالي",
      confirm: "تأكيد الطلب",
      confirmation: "تأكيد الطلبية والدفع",
      methodTitle: "اختر طريقة الدفع",
      cod: "الدفع عند الاستلام",
      edahabia: "البطاقة الذهبية (إلكتروني)",
      paymentTitle: "الدفع الإلكتروني (البطاقة الذهبية)",
      cardNumber: "رقم البطاقة",
      expiryDate: "تاريخ الانتهاء",
      cvv: "الرمز السري (CVV)",
      cardHolder: "اسم صاحب البطاقة",
      payNow: "دفع الآن",
      paymentSuccess: "تم الدفع بنجاح! سيتم إخطار الحرفي بالعملية.",
      artisanNotified: "تم إخطار الحرفي بنجاح"
    },
    dashboard: {
      welcome: "مرحباً بكِ، نور",
      subtitle: "أنتِ تشاهدين إحصائيات متجركِ اليوم",
      views: "المشاهدات",
      sales: "المبيعات",
      orders: "الطلبات",
      rating: "التقييم",
      notifications: "التنبيهات",
      ordersTable: "جدول الطلبيات",
      packages: {
        free: "الباقة المجانية",
        pro: "الباقة الاحترافية PRO",
        premium: "الباقة المميزة PREMIUM",
        limit: "محدودة بـ 3 منتجات فقط",
        unlimited: "منتجات غير محدودة + تسويق رقمي",
        full: "دعم فني + الظهور مع الأوائل + تصوير احترافي"
      },
      premium: {
        badge: "ترقية الباقة",
        title: "باقة PREMIUM لزيادة المبيعات",
        desc: "احصلي على تصوير احترافي لمنتجاتك وظهور في أولى نتائج البحث.",
        cta: "تفعيل الآن"
      }
    },
    product: {
      addCart: "إضافة للسلة",
      inquiry: "استفسار",
      artisan: "الحرفي المبدع",
      descPrefix: "هذه القطعة الفنية مصنوعة يدوياً بالكامل، وتخضع لمعايير الجودة الصارمة لِدَارِ لَالَّاهُمْ.",
      descSuffix: "يتم الشحن في علبة فاخرة تناسب قيمة الحلي.",
      addNew: "إضافة منتج جديد",
      image: "صورة المنتج",
      upload: "رفع من الجهاز",
      name: "اسم المنتج",
      description: "وصف المنتج",
      wilaya: "الولاية",
      price: "السعر (دج)",
      save: "حفظ المنتج",
      limitReached: "لقد وصلت للحد الأقصى للباقة المجانية (3 منتجات)",
      fillAll: "يرجى ملء جميع البيانات",
      inquirySent: "سيتم التواصل مع الحرفي فوراً"
    },
    profile: {
      title: "الملف الشخصي",
      edit: "تعديل البيانات",
      save: "حفظ التغييرات",
      personalInfo: "المعلومات الشخصية",
      myProducts: "منتجاتي المنشورة",
      myOrders: "طلبياتي",
      logout: "تسجيل الخروج"
    },
    services: {
      title: "الخدمات",
      photography: "تصوير احترافي",
      marketing: "تسويق رقمي",
      audience: "دراسة الجمهور"
    },
    auth: {
      title: "حساب جديد",
      subtitle: "انضم إلى عالم دَارِ لَالَّاهُمْ",
      client: "تسجيل كزبون",
      artisan: "تسجيل كحرفي",
      google: "التسجيل عبر جوجل",
      facebook: "التسجيل عبر فيسبوك",
      artisanForm: {
        firstName: "الاسم",
        lastName: "اللقب",
        phone: "رقم الهاتف",
        wilaya: "الولاية",
        craft: "الحرفة",
        documents: "سجل تجاري / بطاقة حرفي (اختياري)",
        submit: "فتح متجر"
      },
      footer: "منصة دَارِ لَالَّاهُمْ تضمن حقوق البائع والمشتري بالكامل.",
      invalid: "بيانات الدخول غير صحيحة"
    }
  },
  en: {
    brand: "DAR LALAHOM",
    hero: {
      badge: "2024 SEASON",
      title: "Jewelry Telling Ancestral History",
      cta: "Browse Collection"
    },
    navigation: {
      home: "Home",
      shop: "Shop",
      cart: "Cart",
      dashboard: "Stats Panel",
      addProduct: "New Product",
      profile: "Profile",
      explore: "Explore",
      login: "Login",
      services: "Services"
    },
    sections: {
      selected: "Selected for You",
      viewAll: "View All",
      contactUs: "Contact Us",
      about: "The perfect place to discover and acquire the most beautiful jewelry and authentic Algerian heritage pieces.",
      follow: "Follow",
      verified: "Verified Account",
      startShopping: "Start Shopping",
      orderConfirmed: "Order confirmed successfully!",
      successAdd: "Added to cart successfully",
      welcomeMsg: "Welcome to your Dashboard",
      processing: "Processing",
      noAlerts: "No new alerts",
      noOrders: "No orders yet",
      shareVia: "Share this piece via",
      sharedVia: "Shared via",
      close: "Close",
      search: "Search for jewelry...",
      buy: "Buy",
      rent: "Rent",
      mainCategories: {
        all: "All",
        jewelry: "Jewelry",
        clothing: "Clothing",
        copper: "Copper",
        homeDecor: "Home Decor",
        hennaSetup: "Henna Setup",
        hennaInk: "Henna Ink"
      },
      jewelryFilters: {
        all: "All",
        constantinois: "Constantinois",
        kabyle: "Kabyle",
        chaoui: "Chaoui",
        sahraoui: "Sahraoui"
      },
      subFilters: {
        all: "All",
        offers: "Offers",
        bestSellers: "Best Sellers",
        rated5: "Top Rated"
      }
    },
    cart: {
      title: "Shopping Bag",
      empty: "Your cart is empty",
      total: "Total",
      confirm: "Confirm Order",
      confirmation: "Confirm Order & Payment",
      methodTitle: "Choose Payment Method",
      cod: "Cash on Delivery",
      edahabia: "Edahabia Card (Online)",
      paymentTitle: "Electronic Payment (Edahabia)",
      cardNumber: "Card Number",
      expiryDate: "Expiry Date",
      cvv: "CVV",
      cardHolder: "Card Holder Name",
      payNow: "Pay Now",
      paymentSuccess: "Payment successful! The artisan will be notified.",
      artisanNotified: "Artisan notified successfully"
    },
    dashboard: {
      welcome: "Welcome, Nour",
      subtitle: "Viewing your daily shop statistics",
      views: "Views",
      sales: "Sales",
      orders: "Orders",
      rating: "Rating",
      notifications: "Notifications",
      ordersTable: "Orders List",
      packages: {
        free: "Free Plan",
        pro: "Professional PRO",
        premium: "Premium PREMIUM",
        limit: "Limited to 3 products",
        unlimited: "Unlimited + Digital Marketing",
        full: "Full Support + Top Ranking + Pro Photo"
      },
      premium: {
        badge: "UPGRADE",
        title: "PREMIUM Plan for High Sales",
        desc: "Get professional shots and appear first in search results.",
        cta: "Activate Now"
      }
    },
    product: {
      addCart: "Add to Cart",
      inquiry: "Inquiry",
      artisan: "Creative Artisan",
      descPrefix: "Handcrafted piece following Dar Lalahom excellence standards.",
      descSuffix: "Shipped in a luxury velvet box.",
      addNew: "Add New Item",
      image: "Product Image",
      upload: "Upload Photo",
      name: "Product Name",
      description: "Description",
      wilaya: "Wilaya",
      price: "Price (DZD)",
      save: "Save Item",
      limitReached: "Free plan limit reached (3 pieces)",
      fillAll: "Please fill all required fields",
      inquirySent: "Inquiry sent to artisan"
    },
    profile: {
      title: "My Profile",
      edit: "Edit Profile",
      save: "Save Changes",
      personalInfo: "Personal Information",
      myProducts: "My Listed Products",
      myOrders: "My Orders",
      logout: "Logout"
    },
    services: {
      title: "Services",
      photography: "Professional Photo",
      marketing: "Digital Marketing",
      audience: "Audience Analysis"
    },
    auth: {
      title: "Authentication",
      subtitle: "Join Dar Lalahom",
      client: "Register as Client",
      artisan: "Register as Artisan",
      google: "Continue with Google",
      facebook: "Continue with Facebook",
      artisanForm: {
        firstName: "First Name",
        lastName: "Last Name",
        phone: "Phone Number",
        wilaya: "Wilaya",
        craft: "Craft",
        documents: "Business License / Artisan Card (Optional)",
        submit: "Open Shop"
      },
      footer: "Protected by Dar Lalahom buyer guarantee.",
      invalid: "Incorrect username or password"
    }
  },
  fr: {
    brand: "DAR LALAHOM",
    hero: {
      badge: "SAISON 2024",
      title: "Bijoux Racontant l'Histoire Ancestrale",
      cta: "Découvrir la Collection"
    },
    navigation: {
      home: "Accueil",
      shop: "Boutique",
      cart: "Panier",
      dashboard: "Tableau de Bord",
      addProduct: "Ajouter Produit",
      profile: "Profil",
      explore: "Explorer",
      login: "Connexion",
      services: "Services"
    },
    sections: {
      selected: "Sélectionné pour vous",
      viewAll: "Voir tout",
      contactUs: "Contactez-nous",
      about: "L'endroit idéal pour découvrir et acquérir les plus beaux bijoux et pièces du patrimoine algérien authentique.",
      follow: "Suivre",
      verified: "Compte Vérifié",
      startShopping: "Boutique",
      orderConfirmed: "Commande confirmée avec succès !",
      successAdd: "Ajouté au panier avec succès",
      welcomeMsg: "Bienvenue sur votre Dashboard",
      processing: "En cours",
      noAlerts: "Aucune notification",
      noOrders: "Aucune commande",
      shareVia: "Partager cet article via",
      sharedVia: "Partagé via",
      close: "Fermer",
      search: "Rechercher un bijou...",
      buy: "Acheter",
      rent: "Louer",
      mainCategories: {
        all: "Tout",
        jewelry: "Bijoux",
        clothing: "Vêtements",
        copper: "Nحاس",
        homeDecor: "Décoration maison",
        hennaSetup: "Qâada Henna",
        hennaInk: "Harqous"
      },
      jewelryFilters: {
        all: "Tout",
        constantinois: "Constantinois",
        kabyle: "Kabyle",
        chaoui: "Chaoui",
        sahraoui: "Sahraoui"
      },
      subFilters: {
        all: "Tout",
        offers: "Offres",
        bestSellers: "Meilleures ventes",
        rated5: "Noté 5 étoiles"
      }
    },
    cart: {
      title: "Sac d'Achat",
      empty: "Votre panier est vide",
      total: "Total",
      confirm: "Confirmer la commande",
      confirmation: "Confirmation de Commande",
      methodTitle: "Choisir le mode de paiement",
      cod: "Paiement à la livraison",
      edahabia: "Carte Edahabia (En ligne)",
      paymentTitle: "Paiement Électronique (Edahabia)",
      cardNumber: "Numéro de Carte",
      expiryDate: "Date d'Expiration",
      cvv: "CVV",
      cardHolder: "Nom du Titulaire",
      payNow: "Payer Maintenant",
      paymentSuccess: "Paiement réussi ! L'artisan sera notifié.",
      artisanNotified: "Artisan notifié avec succès"
    },
    dashboard: {
      welcome: "Bienvenue, Nour",
      subtitle: "Vos statistiques de vente aujourd'hui",
      views: "Vues",
      sales: "Ventes",
      orders: "Retours",
      rating: "Note",
      notifications: "Alertes",
      ordersTable: "Liste des Commandes",
      packages: {
        free: "Plan Gratuit",
        pro: "Plan Pro PRO",
        premium: "Plan Premium PREMIUM",
        limit: "Limité à 3 produits",
        unlimited: "Illimité + Marketing Digital",
        full: "Support Technique + Top Résultats + Photo Pro"
      },
      premium: {
        badge: "MISE À JOUR",
        title: "Pack PREMIUM Boost Ventes",
        desc: "Photos professionnelles et visibilité prioritaire garanties.",
        cta: "Activer"
      }
    },
    product: {
      addCart: "Ajouter au panier",
      inquiry: "Demander Info",
      artisan: "Artisan Créateur",
      descPrefix: "Pièce artisanale respectant les normes d'excellence Dar Lalahom.",
      descSuffix: "Livré dans un coffret de luxe.",
      addNew: "Ajouter un Article",
      image: "Image Produit",
      upload: "Charger Photo",
      name: "Nom du Produit",
      description: "Description",
      wilaya: "Wilaya",
      price: "Prix (DZD)",
      save: "Enregistrer",
      limitReached: "Limite plan gratuit atteinte (3 produits)",
      fillAll: "Veuillez remplir tous les champs",
      inquirySent: "Demande envoyée à l'artisan"
    },
    profile: {
      title: "Mon Profil",
      edit: "Modifier Profil",
      save: "Enregistrer",
      personalInfo: "Infos Personnelles",
      myProducts: "Mes Produits",
      myOrders: "Mes Commandes",
      logout: "Déconnexion"
    },
    services: {
      title: "Services",
      photography: "Photographie",
      marketing: "Marketing",
      audience: "Étude d'Audience"
    },
    auth: {
      title: "Connexion",
      subtitle: "Rejoignez Dar Lalahom",
      client: "S'inscrire comme Client",
      artisan: "S'inscrire comme Artisan",
      google: "Continuer avec Google",
      facebook: "Continuer avec Facebook",
      artisanForm: {
        firstName: "Prénom",
        lastName: "Nom",
        phone: "Téléphone",
        wilaya: "Wilaya",
        craft: "Métier",
        documents: "Registre / Carte Artisan (Facultatif)",
        submit: "Ouvrir ma boutique"
      },
      footer: "Garantie acheteur Dar Lalahom incluse.",
      invalid: "Identifiants incorrects"
    }
  }
};
