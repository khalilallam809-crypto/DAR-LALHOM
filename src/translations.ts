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
    login: string;
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
    categories: {
      all: string;
      constantinois: string;
      kabyle: string;
      chaoui: string;
      sahraoui: string;
    };
  };
  cart: {
    title: string;
    empty: string;
    total: string;
    confirm: string;
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
    price: string;
    save: string;
    limitReached: string;
    fillAll: string;
    inquirySent: string;
  };
  auth: {
    title: string;
    subtitle: string;
    client: string;
    artisan: string;
    footer: string;
    invalid: string;
  };
}

export const translations: Record<Language, Translation> = {
  ar: {
    brand: "دار لالاهم",
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
      login: "تسجيل الدخول"
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
      categories: {
        all: "الكل",
        constantinois: "قسنطيني",
        kabyle: "قبائلي",
        chaoui: "شاوي",
        sahraoui: "صحراوي"
      }
    },
    cart: {
      title: "حقيبة المشتريات",
      empty: "سلة مشترياتك خالية",
      total: "الإجمالي",
      confirm: "تأكيد الطلبية والدفع"
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
      descPrefix: "هذه القطعة الفنية مصنوعة يدوياً بالكامل، وتخضع لمعايير الجودة الصارمة لدار لالاهم.",
      descSuffix: "يتم الشحن في علبة فاخرة تناسب قيمة الحلي.",
      addNew: "إضافة منتج جديد",
      image: "صورة المنتج",
      upload: "رفع من الجهاز",
      name: "اسم المنتج",
      price: "السعر (دج)",
      save: "حفظ المنتج",
      limitReached: "لقد وصلت للحد الأقصى للباقة المجانية (3 منتجات)",
      fillAll: "يرجى ملء جميع البيانات",
      inquirySent: "سيتم التواصل مع الحرفي فوراً"
    },
    auth: {
      title: "تسجيل الدخول",
      subtitle: "اختر حسابك للمتابعة",
      client: "أنا زبون (نور)",
      artisan: "أنا حرفي (ADMIN)",
      footer: "منصة دار لالاهم تضمن حقوق البائع والمشتري بالكامل.",
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
      login: "Login"
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
      categories: {
        all: "All",
        constantinois: "Constantinois",
        kabyle: "Kabyle",
        chaoui: "Chaoui",
        sahraoui: "Sahraoui"
      }
    },
    cart: {
      title: "Shopping Bag",
      empty: "Your cart is empty",
      total: "Total",
      confirm: "Confirm Order & Pay"
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
      price: "Price (DZD)",
      save: "Save Item",
      limitReached: "Free plan limit reached (3 pieces)",
      fillAll: "Please fill all required fields",
      inquirySent: "Inquiry sent to artisan"
    },
    auth: {
      title: "Authentication",
      subtitle: "Sign in to continue",
      client: "Customer (Nour)",
      artisan: "Artisan (Admin)",
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
      login: "Connexion"
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
      categories: {
        all: "Tout",
        constantinois: "Constantinois",
        kabyle: "Kabyle",
        chaoui: "Chaoui",
        sahraoui: "Sahraoui"
      }
    },
    cart: {
      title: "Sac d'Achat",
      empty: "Votre panier est vide",
      total: "Total",
      confirm: "Confirmer la commande"
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
      price: "Prix (DZD)",
      save: "Enregistrer",
      limitReached: "Limite plan gratuit atteinte (3 produits)",
      fillAll: "Veuillez remplir tous les champs",
      inquirySent: "Demande envoyée à l'artisan"
    },
    auth: {
      title: "Connexion",
      subtitle: "Identifiez-vous pour continuer",
      client: "Client (Nour)",
      artisan: "Artisan (Admin)",
      footer: "Garantie acheteur Dar Lalahom incluse.",
      invalid: "Identifiants incorrects"
    }
  }
};
