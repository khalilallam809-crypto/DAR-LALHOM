/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ShoppingCart, Home, LayoutDashboard, Plus, 
  ChevronRight, Star, Zap, Share2, Heart, User, 
  Globe, LogOut, CheckCircle2, TrendingUp, Eye, Package, Search,
  Facebook, Instagram, MessageCircle, Briefcase, Camera, Trophy, ChevronDown, FileText
} from 'lucide-react';
import { translations, Language, Translation } from './translations';

interface Product {
  id: number;
  name: string;
  nameEn: string;
  nameFr: string;
  description: string;
  price: number;
  rentPrice?: number;
  img: string;
  artisan: string;
  artisanImg: string;
  category: 'jewelry' | 'clothing' | 'copper' | 'homeDecor' | 'hennaSetup' | 'hennaInk';
  jewelryType?: 'constantinois' | 'kabyle' | 'chaoui' | 'sahraoui' | 'other';
  wilaya?: string;
  rating: number;
  isOffer?: boolean;
  isBestSeller?: boolean;
}

const products: Product[] = [
  // Jewelry
  { 
    id: 1, 
    name: "خيط الروح ذهب خالص", 
    nameEn: "Khait El Rouh Pure Gold", 
    nameFr: "Khait El Rouh Or Pur", 
    description: "حلي تقليدي عاصمي مصنوع من الذهب الخالص عيار 18 قيراط، قطعة فنية تلبس في الجبين تعبر عن عمق التراث العاصمي.",
    price: 125000, 
    rentPrice: 5000, 
    img: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=600", 
    artisan: "نور (Admin)", 
    artisanImg: "https://i.pravatar.cc/150?u=nour", 
    category: 'jewelry',
    jewelryType: 'constantinois',
    wilaya: 'Alger',
    rating: 5,
    isBestSeller: true
  },
  { 
    id: 2, 
    name: "طقم مرجان أحمر أصلي", 
    nameEn: "Original Red Coral Set", 
    nameFr: "Parure Corail Rouge", 
    description: "طقم فضة مزين بالمرجان الأحمر الطبيعي من منطقة القبائل، يضم قلادة وأقراط بتصميم 'آث يني' العريق.",
    price: 45000, 
    rentPrice: 2500, 
    img: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=600", 
    artisan: "حرفي القبائل", 
    artisanImg: "https://i.pravatar.cc/150?u=kab", 
    category: 'jewelry',
    jewelryType: 'kabyle',
    wilaya: 'Tizi Ouzou',
    rating: 4.8,
    isOffer: true
  },
  { 
    id: 3, 
    name: "خلخال فضة منقوش", 
    nameEn: "Engraved Silver Anklet", 
    nameFr: "Chevillère en Argent", 
    description: "خلخال تقليدي شاوي مصنوع من الفضة المنقوشة بزخارف أمازيغية أصيلة من منطقة الأوراس.",
    price: 32000, 
    rentPrice: 1500, 
    img: "https://media.zid.store/thumbs/c330bdf6-d372-43c3-99d3-a72da9e4ad63/bbefc431-cadb-4005-a06b-e750f15f5d81-thumbnail-500x500.png", 
    artisan: "نور (Admin)", 
    artisanImg: "https://https://i.pravatar.cc/", 
    category: 'jewelry',
    jewelryType: 'chaoui',
    wilaya: 'Batna',
    rating: 5
  },
  { 
    id: 4, 
    name: "سكاب تلمساني أصيل", 
    nameEn: "Authentic Tlemcen Skab", 
    nameFr: "Skab Tlemcen Authentique", 
    description: "عقد السكاب التقليدي التلمساني، يتميز برائحته الزكية المرتبطة بالعنبر والمسك والذهب.",
    price: 28000, 
    rentPrice: 2000, 
    img: "https://pbs.twimg.com/media/GNjxiz1XMAAw8CZ.jpg", 
    artisan: "لالة تلمسان", 
    artisanImg: "https://i.pravatar.cc/150?u=tlem", 
    category: 'jewelry',
    jewelryType: 'sahraoui',
    wilaya: 'Tlemcen',
    rating: 4.9
  },
  // Clothing
  {
    id: 5,
    name: "كراكو عاصمي مطرز بالفتلة",
    nameEn: "Royal Karakou",
    nameFr: "Karakou Royal Algerois",
    description: "سترة مخملية مطرزة يدوياً بخيوط الفتلة الذهبية، مع سروال مدور حريري. قمة الأناقة العاصمية.",
    price: 85000,
    rentPrice: 8000,
    img: "https://auroyaumeducaftan.com/cdn/shop/products/image_3c706e02-5315-4c1d-a964-a42145756504.jpg?v=1672681960&width=1445",
    artisan: "نور (Admin)",
    artisanImg: "https://https://i.pravatar.cc/",
    category: 'clothing',
    wilaya: 'Alger',
    rating: 5,
    isBestSeller: true
  },
  {
    id: 6,
    name: "جبة قبائلي عصرية",
    nameEn: "Modern Kabyle Dress",
    nameFr: "Robe Kabyle Moderne",
    description: "فستان قبائلي مزين بالزيغزغ الملون التقليدي مع لمسة عصرية تناسب المناسبات الكبرى.",
    price: 25000,
    rentPrice: 3000,
    img: "https://i.etsystatic.com/50756637/r/il/54a874/7807049017/il_340x270.7807049017_iymi.jpg",
    artisan: "دار الحراير",
    artisanImg: "https://i.pravatar.cc/150?u=harayer",
    category: 'clothing',
    wilaya: 'Béjaïa',
    rating: 4.7
  },
  // Copper (N'hass)
  {
    id: 7,
    name: "صينية نحاس منقوشة يدوياً",
    nameEn: "Hand-Engraved Copper Tray",
    nameFr: "Plateau Cuivre Gravé",
    description: "صينية نحاس حمراء كبيرة منقوشة باليد بزخارف إسلامية معقدة. قطعة ديكور فاخرة.",
    price: 35000,
    img: "https://zazahomes.co.uk/wp-content/uploads/2020/01/P1019714.jpg",
    artisan: "محترف النحاس",
    artisanImg: "https://i.pravatar.cc/150?u=copper",
    category: 'copper',
    wilaya: 'Constantine',
    rating: 4.9,
    isOffer: true
  },
  {
    id: 8,
    name: "إبريق قهوة نحاسي (جزوة)",
    nameEn: "Traditional Copper Pot",
    nameFr: "Cafetière en Cuivre",
    description: "إبريق قهوة تقليدي مصنوع من النحاس الخالص، يحافظ على نكهة القهوة الجزائرية الأصيلة.",
    price: 12000,
    img: "https://m.media-amazon.com/images/I/81OHi2zIB0L._AC_UF1000,1000_QL80_.jpg",
    artisan: "نور (Admin)",
    artisanImg: "https://https://i.pravatar.cc/",
    category: 'copper',
    wilaya: 'Tlemcen',
    rating: 4.6
  },
  // Home Decor
  {
    id: 9,
    name: "زربية بابار أوراسية",
    nameEn: "Babar Berber Rug",
    nameFr: "Tapis Babar Berbère",
    description: "سجاد يدوي أصلي من منطقة الأوراس، منسوج بصوف طبيعي يحمل رموز الهوية الشاوية.",
    price: 65000,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDm5dVCrtBiYki8vjEGNDx4Ycyi48aHodcAA&s",
    artisan: "نساجات الأوراس",
    artisanImg: "https://i.pravatar.cc/150?u=auras",
    category: 'homeDecor',
    wilaya: 'Khenchela',
    rating: 5,
    isBestSeller: true
  },
  {
    id: 10,
    name: "فخار مشلل بالأزهار الملونة",
    nameEn: "Kabyle Glazed Pottery",
    nameFr: "Poterie Kabyle Vernissée",
    description: "مجموعة فخارية لتزيين المنزل مكونة من جرة وصحن كبير، مزينة بالألوان الطبيعية لمنطقة القبائل.",
    price: 18000,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxHNC2UPBgT1w0DmlndhN8H24iDyyp4IDGnA&s",
    artisan: "نور (Admin)",
    artisanImg: "https://https://i.pravatar.cc/",
    category: 'homeDecor',
    wilaya: 'Tizi Ouzou',
    rating: 4.8
  },
  // Henna Setup
  {
    id: 11,
    name: "قعدة حنة كاملة مطرزة",
    nameEn: "Full Henna Ceremony Set",
    nameFr: "Set Complet Qâada Henna",
    description: "تشمل وسائد كبيرة، غطاء صينية، وستائر صغيرة مطرزة بنفس النمط للعروس الجزائرية.",
    price: 48000,
    rentPrice: 6000,
    img: "https://www.fatizaweddings.com/1367-large_default/coffret-henna-creme-mariage.jpg",
    artisan: "دار العرس",
    artisanImg: "https://i.pravatar.cc/150?u=wedding",
    category: 'hennaSetup',
    wilaya: 'Oran',
    rating: 4.9,
    isBestSeller: true
  },
  {
    id: 12,
    name: "شموع الحنة المزينة يدوياً",
    nameEn: "Decorated Henna Candles",
    nameFr: "Bougies de Henna Décorées",
    description: "زوج من الشموع الكبيرة المخصصة لطقوس الحنة، مزينة بالدانتيل واللؤلؤ والورود.",
    price: 4500,
    img: "https://orientalart.fr/cdn/shop/files/BougieHenneFessi-styleAmazigh-bougieberbere-bougieChleuh-bougieTarz45_1200x.webp?v=1719951791",
    artisan: "نور (Admin)",
    artisanImg: "https://https://i.pravatar.cc/",
    category: 'hennaSetup',
    wilaya: 'Constantine',
    rating: 5
  },
  // Henna Ink
  {
    id: 13,
    name: "حرقوس تونسي جزائري أصلي",
    nameEn: "Authentic Harqous Ink",
    nameFr: "Harqous Authentique",
    description: "قارورة حرقوس تقليدي أسود فاحم يدوم طويلاً، مخصص للنقوش الدقيقة على اليدين والرقبة.",
    price: 1500,
    img: "https://hraier.com/wp-content/uploads/2023/07/FB_IMG_1688611031900.jpg",
    artisan: "خبير الحنة",
    artisanImg: "https://i.pravatar.cc/150?u=henna",
    category: 'hennaInk',
    wilaya: 'Biskra',
    rating: 4.5,
    isOffer: true
  },
  {
    id: 14,
    name: "حنة خضراء طبيعية مصفاة",
    nameEn: "Organic Pure Henna",
    nameFr: "Henné Naturel Pur",
    description: "حنة طبيعية مطحونة ومصفاة بعناية للحصول على لون أحمر داكن مثالي للعروس.",
    price: 900,
    img: "https://media.zid.store/thumbs/8217e26b-c978-493f-97a8-ad4030e58a9b/9301550b-87f0-464f-9d29-e35757998e1c-thumbnail-1000x1000-70.jpg",
    artisan: "نور (Admin)",
    artisanImg: "https://https://i.pravatar.cc/",
    category: 'hennaInk',
    wilaya: 'Adrar',
    rating: 4.7
  }
];

type Tab = 'home' | 'shop' | 'cart' | 'dash' | 'add' | 'services' | 'profile' | 'explore';

interface Order {
  id: string;
  customerName: string;
  items: Product[];
  total: number;
  date: string;
  status: 'pending' | 'completed';
}

export default function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [currentTab, setCurrentTab] = useState<Tab>('home');
  const [cart, setCart] = useState<Product[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentUser, setCurrentUser] = useState<{ role: 'artisan' | 'client', name: string } | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  
  // New States
  const [allProducts, setAllProducts] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('jewelry');
  const [selectedJewelryType, setSelectedJewelryType] = useState<string>('all');
  const [selectedSubFilter, setSelectedSubFilter] = useState<string>('all');
  const [selectedWilaya, setSelectedWilaya] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number>(500000);
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [newProduct, setNewProduct] = useState({ name: '', nameEn: '', nameFr: '', description: '', wilaya: '', price: '', img: '', category: 'jewelry' as Product['category'] });
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online');
  const [paymentData, setPaymentData] = useState({ cardNumber: '', expiry: '', cvv: '', holder: '' });
  const [isPaying, setIsPaying] = useState(false);
  const [loginCreds, setLoginCreds] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register-client' | 'register-artisan'>('login');
  const [artisanForm, setArtisanForm] = useState({ firstName: '', lastName: '', phone: '', wilaya: '', craft: '', hasDocuments: false });

  const t = (translations as Record<Language, Translation>)[lang];
  const isRtl = lang === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRtl]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (product: Product) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setCart([...cart, product]);
    showToast(isRtl ? "تمت الإضافة للسلة بنجاح" : "Added to cart successfully");
    setSelectedProduct(null);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleLogin = () => {
    if (authMode === 'login') {
      const { username, password } = loginCreds;
      if (username.toUpperCase() === 'ADMIN' && password.toUpperCase() === 'ADMIN') {
        setCurrentUser({ role: 'artisan', name: 'Nour (Admin)' });
        showToast(t.sections.welcomeMsg);
        setIsAuthModalOpen(false);
        setLoginError(null);
      } else if (username.toUpperCase() === 'NOUR' && password.toUpperCase() === 'NOUR') {
        setCurrentUser({ role: 'client', name: 'Nour (User)' });
        showToast(t.sections.welcomeMsg);
        setIsAuthModalOpen(false);
        setLoginError(null);
      } else {
        setLoginError(t.auth.invalid);
      }
    } else if (authMode === 'register-client') {
      setCurrentUser({ role: 'client', name: 'New Client' });
      showToast(t.sections.welcomeMsg);
      setIsAuthModalOpen(false);
    } else if (authMode === 'register-artisan') {
      if (artisanForm.firstName && artisanForm.phone) {
        setCurrentUser({ role: 'artisan', name: `${artisanForm.firstName} ${artisanForm.lastName}` });
        showToast(t.sections.welcomeMsg);
        setIsAuthModalOpen(false);
      } else {
        setLoginError(t.product.fillAll);
      }
    }
  };

  const ProductCard = ({ p }: { p: Product }) => (
    <motion.div 
      layoutId={`product-${p.id}`}
      className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-stone-100 overflow-hidden group shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col h-full"
      onClick={() => setSelectedProduct(p)}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={p.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={getName(p)} />
        <div className="absolute top-2 right-2 md:top-4 md:right-4 flex flex-col gap-1 md:gap-2">
          {p.isOffer && (
            <div className="bg-gold text-white text-[8px] md:text-[10px] font-black px-2 py-1 md:px-3 md:py-1 rounded-full uppercase tracking-widest shadow-lg">
              Offre
            </div>
          )}
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              if (!currentUser) setIsAuthModalOpen(true);
              else showToast(t.sections.successAdd); 
            }}
            className="w-8 h-8 md:w-12 md:h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-stone-600 hover:text-gold transition-colors shadow-lg"
          >
            <ShoppingCart className="w-4 h-4 md:w-6 md:h-6" />
          </button>
        </div>
        <div className="absolute top-2 left-2 md:top-4 md:left-4">
          <div className="flex gap-1 md:gap-2">
            <span className="bg-white/90 backdrop-blur-md text-stone-800 text-[8px] md:text-[10px] font-black px-2 py-1 rounded-full uppercase">
              {p.rentPrice ? t.sections.rent : t.sections.buy}
            </span>
          </div>
        </div>
      </div>
      <div className="p-3 md:p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-1 md:mb-2">
          <h4 className="font-bold text-xs md:text-sm text-stone-800 leading-tight flex-grow line-clamp-1">{getName(p)}</h4>
          <div className="flex items-center gap-0.5 text-gold ml-1">
            <Star className="w-3 h-3 fill-gold" />
            <span className="text-[10px] font-black">{p.rating}</span>
          </div>
        </div>
        <p className="text-stone-400 text-[10px] mb-2 md:mb-4 line-clamp-2 leading-relaxed">
          {p.description}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <p className="text-gold font-black text-sm md:text-lg">{p.price.toLocaleString()} {isRtl ? 'دج' : 'DZD'}</p>
          <div className="flex gap-1">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsShareOpen(true); }}
              className="p-1 px-2 border border-stone-100 rounded-lg text-stone-400 hover:text-gold transition-colors"
            >
              <Share2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const getName = (p: Product) => {
    if (lang === 'en') return p.nameEn;
    if (lang === 'fr') return p.nameFr;
    return p.name;
  };

  const filteredProducts = allProducts.filter(p => {
    const matchesSearch = getName(p).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesJewelryType = selectedJewelryType === 'all' || p.jewelryType === selectedJewelryType;
    
    let matchesSubFilter = true;
    if (selectedSubFilter === 'offers') matchesSubFilter = !!p.isOffer;
    if (selectedSubFilter === 'bestSellers') matchesSubFilter = !!p.isBestSeller;
    if (selectedSubFilter === 'rated5') matchesSubFilter = p.rating >= 5;

    return matchesSearch && matchesCategory && matchesJewelryType && matchesSubFilter;
  });

  const handleConfirmOrder = () => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setIsPaymentModalOpen(true);
  };

  const processPayment = () => {
    if (!paymentData.cardNumber || !paymentData.expiry || !paymentData.cvv) {
      showToast(t.product.fillAll);
      return;
    }

    setIsPaying(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const newOrder: Order = {
        id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        customerName: currentUser?.name || 'Guest',
        items: [...cart],
        total: cart.reduce((sum: number, item: Product) => sum + item.price, 0),
        date: new Date().toLocaleDateString(lang === 'ar' ? 'ar-DZ' : 'en-US'),
        status: 'pending'
      };

      setOrders([newOrder, ...orders]);
      setNotifications([`${t.navigation.cart}: ${newOrder.total} DZD`, ...notifications]);
      
      showToast(t.cart.paymentSuccess);
      // Simulate notifying the artisan
      setTimeout(() => {
        showToast(t.cart.artisanNotified);
      }, 1500);

      setCart([]);
      setIsPaying(false);
      setIsPaymentModalOpen(false);
      setPaymentData({ cardNumber: '', expiry: '', cvv: '', holder: '' });
      setCurrentTab('home');
    }, 2000);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, img: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.img) {
      showToast(t.product.fillAll);
      return;
    }

    // Free plan check
    if (allProducts.filter(p => p.artisan.includes('Nour')).length >= 3) {
      showToast(t.product.limitReached);
      return;
    }

    const product: Product = {
      id: Date.now(),
      name: newProduct.name,
      nameEn: newProduct.nameEn || newProduct.name,
      nameFr: newProduct.nameFr || newProduct.name,
      description: newProduct.description || (isRtl ? "منتج جديد تم إضافته للحساب" : "New product added to account"),
      price: parseInt(newProduct.price),
      img: newProduct.img,
      artisan: currentUser?.name || "نور (Admin)",
      artisanImg: "https://i.pravatar.cc/150?u=nour",
      category: newProduct.category,
      rating: 5,
      wilaya: newProduct.wilaya || 'Alger'
    };

    setAllProducts([product, ...allProducts]);
    setNewProduct({ name: '', nameEn: '', nameFr: '', description: '', wilaya: '', price: '', img: '', category: 'jewelry' });
    setCurrentTab('home');
    showToast(t.sections.successAdd);
  };

  const ArtisanSignature = ({ artisan, artisanImg, variant = 'compact' }: { artisan: string, artisanImg: string, variant?: 'compact' | 'full' }) => (
    <div className={`flex items-center gap-4 ${variant === 'full' ? 'p-6 bg-stone-50 rounded-[2.5rem] border border-stone-100' : ''}`}>
      <div className="relative">
        <img src={artisanImg} className={`${variant === 'full' ? 'w-16 h-16' : 'w-10 h-10'} rounded-full border-2 border-gold object-cover shadow-sm`} alt={artisan} />
        <div className="absolute -bottom-1 -right-1 bg-gold text-white p-1 rounded-full border-2 border-white">
          <Star className="w-2 h-2 fill-white" />
        </div>
      </div>
      <div>
        <p className="text-[10px] font-black text-gold uppercase tracking-widest mb-1 leading-none">
          {t.product.artisan}
        </p>
        <p className={`${variant === 'full' ? 'text-lg' : 'text-sm'} font-bold text-stone-900`}>{artisan}</p>
        {variant === 'full' && (
          <div className="flex items-center gap-1 mt-1">
            <CheckCircle2 className="w-3 h-3 text-green-500" />
            <span className="text-[10px] text-stone-400 font-bold uppercase">{t.sections.verified}</span>
          </div>
        )}
      </div>
      {variant === 'full' && (
        <div className="mr-auto">
          <button className="px-4 py-2 border border-gold/20 text-gold text-xs font-bold rounded-full hover:bg-gold hover:text-white transition-all">
            {t.sections.follow}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen font-sans selection:bg-gold/30 selection:text-gold">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-20 left-1/2 z-[2000] bg-stone-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 text-sm"
          >
            <CheckCircle2 className="w-4 h-4 text-gold" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-stone-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-stone-100 rounded-xl transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden sm:flex w-10 h-10 bg-transparent items-center justify-center">
            <img src="/logo.png" className="w-full h-full object-contain" alt="Logo" />
          </div>
        </div>

        <h1 className="font-serif text-lg md:text-xl font-bold text-gold tracking-tighter text-center line-clamp-1 px-4">
          {t.brand}
        </h1>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 bg-stone-100 p-1 rounded-full px-2">
            <button onClick={() => setLang('ar')} className={`text-[10px] font-bold px-2 py-1 rounded-full transition-all ${lang === 'ar' ? 'bg-gold text-white' : 'text-stone-400'}`}>AR</button>
            <button onClick={() => setLang('en')} className={`text-[10px] font-bold px-2 py-1 rounded-full transition-all ${lang === 'en' ? 'bg-gold text-white' : 'text-stone-400'}`}>EN</button>
            <button onClick={() => setLang('fr')} className={`text-[10px] font-bold px-2 py-1 rounded-full transition-all ${lang === 'fr' ? 'bg-gold text-white' : 'text-stone-400'}`}>FR</button>
          </div>
          <button 
            onClick={() => setCurrentTab('cart')}
            className={`relative p-2 hover:bg-stone-100 rounded-xl transition-colors ${currentUser?.role === 'artisan' ? 'hidden' : 'block'}`}
          >
            <ShoppingCart className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white font-bold">
                {cart.length}
              </span>
            )}
          </button>
          {currentUser?.role === 'artisan' && (
            <button 
              onClick={() => setCurrentTab('dash')}
              className="p-2 bg-gold/10 text-gold rounded-xl hover:bg-gold hover:text-white transition-all"
            >
              <LayoutDashboard className="w-6 h-6" />
            </button>
          )}
        </div>
      </nav>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 z-[140]"
            />
            <motion.aside
              initial={{ x: isRtl ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '100%' : '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 ${isRtl ? 'right-0' : 'left-0'} h-full w-80 bg-white z-[150] shadow-2xl flex flex-col`}
            >
              <div className="p-8 border-b border-stone-100 text-center">
                <div className="w-20 h-20 bg-gold/5 rounded-3xl flex items-center justify-center mx-auto mb-4 p-2">
                  <img src="/logo.png" className="w-full h-full object-contain" alt="Logo" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-stone-900 uppercase">
                  {t.brand}
                </h2>
              </div>

              <div className="flex-grow p-6 space-y-2 overflow-y-auto">
                <button 
                  onClick={() => { setCurrentTab('home'); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${currentTab === 'home' ? 'bg-gold text-white shadow-lg shadow-gold/20' : 'text-stone-500 hover:bg-stone-50'}`}
                >
                  <Home className="w-5 h-5" />
                  <span>{t.navigation.home}</span>
                </button>
                <button 
                  onClick={() => { setCurrentTab('shop'); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${currentTab === 'shop' ? 'bg-gold text-white shadow-lg shadow-gold/20' : 'text-stone-500 hover:bg-stone-50'}`}
                >
                  <Package className="w-5 h-5" />
                  <span>{t.navigation.shop}</span>
                </button>

                <button 
                  onClick={() => { setCurrentTab('services'); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${currentTab === 'services' ? 'bg-gold text-white shadow-lg shadow-gold/20' : 'text-stone-500 hover:bg-stone-50'}`}
                >
                  <Briefcase className="w-5 h-5" />
                  <span>{t.navigation.services}</span>
                </button>

                {currentUser && (
                   <button 
                    onClick={() => { setCurrentTab('profile'); setIsSidebarOpen(false); }}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${currentTab === 'profile' ? 'bg-gold text-white shadow-lg shadow-gold/20' : 'text-stone-500 hover:bg-stone-50'}`}
                  >
                    <User className="w-5 h-5" />
                    <span>{t.navigation.profile}</span>
                  </button>
                )}

                {currentUser?.role === 'artisan' && (
                  <div className="mt-8 pt-6 border-t border-stone-100 space-y-2">
                    <p className="text-[10px] font-black text-stone-400 px-4 mb-2 uppercase tracking-widest leading-none">Control Panel</p>
                    <button 
                       onClick={() => { setCurrentTab('dash'); setIsSidebarOpen(false); }}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${currentTab === 'dash' ? 'bg-gold text-white shadow-lg shadow-gold/20' : 'text-stone-600 hover:bg-stone-50'}`}
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      <span>{t.navigation.dashboard}</span>
                    </button>
                    <button 
                       onClick={() => { setCurrentTab('add'); setIsSidebarOpen(false); }}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${currentTab === 'add' ? 'bg-gold text-white shadow-lg shadow-gold/20' : 'text-stone-600 hover:bg-stone-50'}`}
                    >
                      <Plus className="w-5 h-5" />
                      <span>{t.navigation.addProduct}</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-stone-100">
                {!currentUser ? (
                  <button 
                    onClick={() => { setIsAuthModalOpen(true); setIsSidebarOpen(false); }}
                    className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <User className="w-5 h-5" />
                    {t.navigation.login}
                  </button>
                ) : (
                  <div className="bg-stone-50 p-4 rounded-2xl flex items-center justify-between border border-stone-100">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src={currentUser.role === 'artisan' ? "https://i.pravatar.cc/150?u=nour" : "https://i.pravatar.cc/150?u=khalil"} className="w-10 h-10 rounded-full border-2 border-gold object-cover" alt="User" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-700 leading-none">{currentUser.name}</p>
                        <p className="text-[9px] text-stone-400 mt-1 uppercase font-black">{currentUser.role}</p>
                      </div>
                    </div>
                    <button onClick={() => setCurrentUser(null)} className="p-2 hover:bg-stone-200 rounded-lg transition-colors text-stone-400">
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-24 pb-32 px-4 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {currentTab === 'home' && (
            <motion.section 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10"
            >
              {/* Search & Main Categories */}
              <div className="space-y-6">
                <div className="relative max-w-xl mx-auto">
                  <Search className={`absolute ${isRtl ? 'right-6' : 'left-6'} top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400`} />
                  <input 
                    type="text" 
                    placeholder={t.sections.search}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full ${isRtl ? 'pr-14 pl-6' : 'pl-14 pr-6'} py-5 bg-white border border-stone-100 rounded-[2rem] shadow-sm focus:outline-none focus:ring-2 focus:ring-gold/20 font-bold transition-all`}
                  />
                </div>

                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 px-1">
                  {Object.entries(t.sections.mainCategories).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedCategory(key);
                        if (key !== 'jewelry') {
                          setSelectedJewelryType('all');
                          setSelectedSubFilter('all');
                        }
                      }}
                      className={`whitespace-nowrap px-8 py-3 rounded-full font-bold transition-all border ${selectedCategory === key ? 'bg-gold text-white border-gold shadow-lg shadow-gold/20' : 'bg-white text-stone-400 border-stone-100 hover:border-gold/50'}`}
                    >
                      {label as string}
                    </button>
                  ))}
                </div>

                {/* Jewelry Types (Sub-categories) */}
                {selectedCategory === 'jewelry' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex flex-col gap-4 bg-stone-50/50 p-6 rounded-[2rem] border border-stone-100"
                  >
                    <div className="flex gap-2 overflow-x-auto no-scrollbar">
                      {Object.entries(t.sections.jewelryFilters).map(([key, label]) => (
                        <button
                          key={key}
                          onClick={() => setSelectedJewelryType(key)}
                          className={`whitespace-nowrap px-6 py-2 rounded-full font-bold text-sm transition-all border ${selectedJewelryType === key ? 'bg-stone-900 text-white border-stone-900 shadow-lg' : 'bg-white text-stone-500 border-stone-200'}`}
                        >
                          {label as string}
                        </button>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 overflow-x-auto no-scrollbar border-t border-stone-100 pt-4">
                      {Object.entries(t.sections.subFilters).map(([key, label]) => (
                        <button
                          key={key}
                          onClick={() => setSelectedSubFilter(key)}
                          className={`whitespace-nowrap flex items-center gap-2 px-4 py-2 font-bold text-xs transition-all ${selectedSubFilter === key ? 'text-gold fill-gold' : 'text-stone-400 hover:text-stone-600'}`}
                        >
                          {key === 'rated5' && <Star className="w-3 h-3" />}
                          {key === 'offers' && <Zap className="w-3 h-3" />}
                          {key === 'bestSellers' && <Trophy className="w-3 h-3" />}
                          {label as string}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Selection */}
               <div className="flex justify-between items-end">
                <h3 className="font-serif text-2xl font-bold">{t.sections.selected}</h3>
                <button onClick={() => { setCurrentTab('shop'); setSelectedCategory('all'); }} className="text-gold font-bold text-sm underline underline-offset-4">{t.sections.viewAll}</button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 md:gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} p={p} />
                ))}
              </div>
            </motion.section>
          )}

          {currentTab === 'shop' && (
            <motion.section 
              key="shop"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-4 mb-4">
                <h2 className="font-serif text-4xl md:text-5xl font-bold">{t.navigation.shop}</h2>
                <p className="text-stone-400 max-w-xl mx-auto">{isRtl ? 'تصفح مجموعتنا الكاملة من الحلي التقليدية الجزائرية' : 'Browse our full collection of traditional Algerian jewelry'}</p>
              </div>

              {/* Categories Filter in Shop */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 px-1">
                {Object.entries(t.sections.mainCategories).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`whitespace-nowrap px-6 py-2 rounded-full font-bold transition-all border text-xs md:text-sm ${selectedCategory === key ? 'bg-gold text-white border-gold shadow-lg shadow-gold/20' : 'bg-white text-stone-400 border-stone-100'}`}
                  >
                    {label as string}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 md:gap-8">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} p={p} />
                ))}
              </div>
            </motion.section>
          )}

          {currentTab === 'services' && (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-serif text-center mb-12">{t.services.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: t.services.photography, icon: <Camera className="w-8 h-8 text-gold" />, desc: isRtl ? "تصوير احترافي لمنتجاتك بطريقة تبرز جمال الحرفية التقليدية." : "Professional photo shoot for your traditional pieces." },
                { title: t.services.marketing, icon: <TrendingUp className="w-8 h-8 text-gold" />, desc: isRtl ? "حملات تسويقية مستهدفة للوصول إلى جمهورك المهتم بالتراث." : "Targeted marketing campaigns to reach heritage lovers." },
                { title: t.services.audience, icon: <Search className="w-8 h-8 text-gold" />, desc: isRtl ? "تحليل دقيق لسوق الحلي واللباس التقليدي في الجزائر." : "Deep analysis of the traditional Algerian market." }
              ].map((s, i) => (
                <div key={i} className="bg-white p-8 rounded-[3rem] shadow-sm border border-stone-100 flex flex-col items-center text-center hover:shadow-xl transition-all group">
                  <div className="mb-6 p-6 bg-gold/5 rounded-[2rem] group-hover:bg-gold/10 transition-colors">{s.icon}</div>
                  <h3 className="text-xl font-bold mb-4">{s.title as string}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{s.desc as string}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentTab === 'profile' && currentUser && (
          <motion.section 
            key="profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-stone-100 shadow-sm">
              <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                <div className="relative">
                  <img 
                    src={currentUser.role === 'artisan' ? "https://i.pravatar.cc/150?u=nour" : "https://i.pravatar.cc/150?u=khalil"} 
                    className="w-32 h-32 rounded-full border-4 border-gold/20 object-cover shadow-2xl" 
                    alt="User" 
                  />
                  <div className="absolute bottom-1 right-1 bg-gold text-white p-2 rounded-full border-4 border-white">
                    <Star className="w-4 h-4 fill-white" />
                  </div>
                </div>
                <div className="text-center md:text-start flex-grow">
                  <h2 className="text-3xl font-serif font-bold text-stone-900">{currentUser.name}</h2>
                  <p className="text-stone-400 font-bold uppercase tracking-widest text-xs mt-2">{currentUser.role === 'artisan' ? t.auth.artisan : t.auth.client}</p>
                  <button className="mt-4 px-6 py-2 border border-stone-100 rounded-full text-stone-400 text-xs font-bold hover:bg-stone-50 transition-all">
                    {t.profile.edit}
                  </button>
                </div>
                <button 
                  onClick={() => setCurrentUser(null)}
                  className="px-6 py-3 bg-red-50 text-red-500 rounded-2xl font-bold text-sm hover:bg-red-100 transition-all flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  {t.profile.logout}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-stone-50 p-8 rounded-[2.5rem] border border-stone-100">
                  <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-gold" />
                    {t.profile.personalInfo}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-stone-100 pb-2">
                      <span className="text-stone-400 text-xs font-bold uppercase">{isRtl ? 'البريد الإلكتروني' : 'Email'}</span>
                      <span className="text-sm font-bold text-stone-800">{currentUser.role === 'artisan' ? 'nour@artisan.dz' : 'nour@client.dz'}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-100 pb-2">
                      <span className="text-stone-400 text-xs font-bold uppercase">{t.auth.artisanForm.wilaya}</span>
                      <span className="text-sm font-bold text-stone-800">Alger</span>
                    </div>
                  </div>
                </div>

                <div className="bg-stone-50 p-8 rounded-[2.5rem] border border-stone-100">
                  <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                    {currentUser.role === 'artisan' ? <Package className="w-5 h-5 text-gold" /> : <ShoppingCart className="w-5 h-5 text-gold" />}
                    {currentUser.role === 'artisan' ? t.profile.myProducts : t.profile.myOrders}
                  </h3>
                  <div className="text-center py-10 opacity-30">
                    {currentUser.role === 'artisan' ? (
                      <p className="text-sm font-bold">{allProducts.filter(p => (p.artisan === currentUser.name || p.artisan.includes('Admin'))).length} {isRtl ? 'منتج' : 'Products'}</p>
                    ) : (
                      <p className="text-sm font-bold">{orders.length} {isRtl ? 'طلب' : 'Orders'}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {currentUser.role === 'artisan' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-serif font-bold px-6">{t.profile.myProducts}</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {allProducts.filter(p => (p.artisan === currentUser.name || p.artisan.includes('Admin'))).map(p => (
                    <ProductCard key={p.id} p={p} />
                  ))}
                </div>
              </div>
            )}
          </motion.section>
        )}

        {currentTab === 'cart' && (
            <motion.section 
              key="cart"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto space-y-8"
            >
              <h2 className="font-serif text-3xl font-bold text-center">{t.cart.title}</h2>
              
              {cart.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-stone-100 flex flex-col items-center gap-6">
                  <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center text-stone-300">
                    <ShoppingCart className="w-10 h-10" />
                  </div>
                  <p className="text-stone-400 font-bold text-lg">{t.cart.empty}</p>
                  <button 
                    onClick={() => setCurrentTab('shop')}
                    className="px-8 py-3 bg-gold text-white rounded-2xl font-bold shadow-xl shadow-gold/20"
                  >
                    {isRtl ? 'ابدأ التسوق' : 'Start Shopping'}
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {cart.map((item, idx) => (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        key={`${item.id}-${idx}`}
                        className="bg-white p-5 rounded-[2rem] flex gap-5 border border-stone-100 items-center shadow-sm"
                      >
                        <img src={item.img} className="w-24 h-24 rounded-2xl object-cover shadow-inner" alt={getName(item)} />
                        <div className="flex-grow">
                          <p className="text-[10px] text-stone-400 font-bold mb-1 uppercase tracking-widest">{item.artisan}</p>
                          <h4 className="font-bold text-base text-stone-800">{getName(item)}</h4>
                          <p className="text-gold font-black mt-1">{item.price.toLocaleString()} {isRtl ? 'دج' : 'DZD'}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(idx)}
                          className="w-12 h-12 flex items-center justify-center text-red-500 bg-red-50 rounded-2xl hover:bg-red-100 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-stone-900 p-8 md:p-12 rounded-[3.5rem] text-white space-y-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                      <Star className="w-32 h-32" />
                    </div>
                    <div className="flex justify-between items-center text-2xl font-bold relative z-10">
                      <span>{t.cart.total}</span>
                      <span className="text-gold">
                        {cart.reduce((sum, item) => sum + item.price, 0).toLocaleString()} {isRtl ? 'دج' : 'DZD'}
                      </span>
                    </div>
                    <button 
                      onClick={handleConfirmOrder}
                      className="w-full py-5 bg-gold rounded-2xl font-bold text-lg shadow-xl shadow-gold/20 active:scale-95 transition-all relative z-10"
                    >
                      {t.cart.confirm}
                    </button>
                  </div>
                </>
              )}
            </motion.section>
          )}

          {currentTab === 'dash' && currentUser?.role === 'artisan' && (
            <motion.section 
              key="dash"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white p-8 rounded-[3rem] border border-stone-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <img 
                    src="https://i.pravatar.cc/150?u=nour" 
                    className="w-24 h-24 rounded-full border-4 border-gold/20 object-cover" 
                    alt="Artisan"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-gold text-white p-1.5 rounded-full border-2 border-white shadow-lg">
                    <Zap className="w-3 h-3 fill-white" />
                  </div>
                </div>
                <div className="text-center md:text-start">
                  <h2 className="font-serif text-3xl font-bold text-stone-900">{t.dashboard.welcome}</h2>
                  <p className="text-stone-400 font-bold mt-1">{t.dashboard.subtitle}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: t.dashboard.views, value: '5.2k', icon: Eye, color: 'text-stone-900' },
                  { label: t.dashboard.sales, value: '124', icon: TrendingUp, color: 'text-gold' },
                  { label: t.dashboard.orders, value: '18', icon: ShoppingCart, color: 'text-stone-900' },
                  { label: t.dashboard.rating, value: '4.9/5', icon: Star, color: 'text-stone-900' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-stone-100 text-center space-y-2">
                    <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center mx-auto mb-2 text-stone-400">
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none">{stat.label}</p>
                    <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Notifications & Orders Table */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 bg-white p-8 rounded-[3rem] border border-stone-100 shadow-sm flex flex-col h-[500px]">
                  <div className="flex items-center gap-2 mb-6">
                    <Zap className="w-5 h-5 text-gold" />
                    <h3 className="font-bold text-lg">{t.dashboard.notifications}</h3>
                  </div>
                  <div className="space-y-4 overflow-y-auto flex-grow no-scrollbar">
                    {notifications.length === 0 ? (
                      <p className="text-stone-300 text-sm text-center mt-10">{t.sections.noAlerts}</p>
                    ) : (
                      notifications.map((note, i) => (
                        <div key={i} className="p-4 bg-stone-50 rounded-2xl border border-stone-100 flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                          <p className="text-sm text-stone-600 leading-tight">{note}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-stone-100 shadow-sm flex flex-col h-[500px]">
                  <div className="flex items-center gap-2 mb-6">
                    <ShoppingCart className="w-5 h-5 text-gold" />
                    <h3 className="font-bold text-lg">{t.dashboard.ordersTable}</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-start border-collapse">
                      <thead>
                        <tr className="border-b border-stone-100">
                          <th className="py-4 text-start text-[10px] uppercase font-black text-stone-400 px-2">ID</th>
                          <th className="py-4 text-start text-[10px] uppercase font-black text-stone-400 px-2">Client</th>
                          <th className="py-4 text-start text-[10px] uppercase font-black text-stone-400 px-2">Date</th>
                          <th className="py-4 text-start text-[10px] uppercase font-black text-stone-400 px-2">Total</th>
                          <th className="py-4 text-start text-[10px] uppercase font-black text-stone-400 px-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id} className="border-b border-stone-50 hover:bg-stone-50 transition-colors">
                            <td className="py-4 px-2 font-mono text-xs text-stone-400">#{order.id}</td>
                            <td className="py-4 px-2 font-bold text-sm">{order.customerName}</td>
                            <td className="py-4 px-2 text-sm text-stone-500">{order.date}</td>
                            <td className="py-4 px-2 font-black text-gold">{order.total.toLocaleString()} دج</td>
                            <td className="py-4 px-2">
                              <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full">
                                {t.sections.processing}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {orders.length === 0 && (
                      <p className="text-center text-stone-300 py-20 text-sm italic">{t.sections.noOrders}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Artisan's Products in Dashboard */}
              <div className="space-y-6">
                <div className="flex items-center justify-between px-6">
                   <h3 className="font-serif text-2xl font-bold">{t.profile.myProducts}</h3>
                   <button onClick={() => setCurrentTab('add')} className="p-2 bg-gold/10 text-gold rounded-full hover:bg-gold hover:text-white transition-all">
                      <Plus className="w-5 h-5" />
                   </button>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {allProducts.filter(p => (p.artisan === currentUser.name || p.artisan.includes('Admin'))).map(p => (
                    <ProductCard key={p.id} p={p} />
                  ))}
                </div>
              </div>

              {/* Packages Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { 
                    tag: 'Free',
                    title: t.dashboard.packages.free, 
                    limit: t.dashboard.packages.limit, 
                    icon: Package, 
                    features: [isRtl ? '3 منتجات فقط' : '3 products only'],
                    active: true
                  },
                  { 
                    tag: 'PRO',
                    title: t.dashboard.packages.pro, 
                    limit: t.dashboard.packages.unlimited, 
                    icon: Zap, 
                    features: [isRtl ? 'منتجات غير محدودة' : 'Unlimited products', isRtl ? 'تسويق رقمي' : 'Digital marketing'],
                    active: false,
                    accent: true
                  },
                  { 
                    tag: 'PREMIUM',
                    title: t.dashboard.packages.premium, 
                    limit: t.dashboard.packages.full, 
                    icon: Star, 
                    features: [isRtl ? 'دعم فني' : 'Technical support', isRtl ? 'الظهور مع الأوائل' : 'Top results', isRtl ? 'تصوير محترف' : 'Pro photography'],
                    active: false
                  }
                ].map((pkg, i) => (
                  <div key={i} className={`p-10 rounded-[3.5rem] border ${pkg.accent ? 'bg-stone-900 text-white border-stone-800' : 'bg-white border-stone-100'} shadow-sm flex flex-col`}>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${pkg.accent ? 'bg-gold text-white' : 'bg-gold/10 text-gold'}`}>
                      <pkg.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">{pkg.title}</h4>
                    <p className={`text-sm mb-8 ${pkg.accent ? 'text-stone-400 font-light' : 'text-stone-500 font-bold'}`}>{pkg.limit}</p>
                    <div className="space-y-3 mb-10 flex-grow">
                      {pkg.features.map((f, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-gold" />
                          <span className="text-sm">{f}</span>
                        </div>
                      ))}
                    </div>
                    <button className={`w-full py-4 rounded-2xl font-bold transition-all ${pkg.active ? 'bg-stone-100 text-stone-400 cursor-not-allowed' : (pkg.accent ? 'bg-gold text-white' : 'bg-stone-900 text-white')}`}>
                      {pkg.active ? (isRtl ? 'مفعلة' : 'Active') : (isRtl ? 'اختيار الباقة' : 'Choose Plan')}
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-stone-900 p-10 md:p-16 rounded-[4rem] relative overflow-hidden text-white group shadow-2xl">
                <div className="relative z-10 max-w-lg space-y-6">
                  <span className="bg-gold px-4 py-1.5 text-[10px] font-black rounded-full uppercase tracking-widest">
                    {t.dashboard.premium.badge}
                  </span>
                  <h3 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
                    {t.dashboard.premium.title}
                  </h3>
                  <p className="text-stone-400 text-lg font-light leading-relaxed">
                    {t.dashboard.premium.desc}
                  </p>
                  <button className="bg-white text-stone-900 px-10 py-5 rounded-2xl font-bold shadow-2xl hover:scale-105 transition-transform">
                    {t.dashboard.premium.cta}
                  </button>
                </div>
                <div className="absolute -left-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <Star className="w-[300px] h-[300px] stroke-1" />
                </div>
              </div>
            </motion.section>
          )}
          {currentTab === 'add' && currentUser?.role === 'artisan' && (
            <motion.section 
              key="add"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto space-y-8"
            >
              <div className="text-center mb-12">
                <h2 className="font-serif text-4xl font-bold">{t.product.addNew}</h2>
                <p className="text-stone-400 mt-2">{isRtl ? 'املأ التفاصيل لإضافة قطعة جديدة لمتجرك' : 'Fill details to add a new piece to your store'}</p>
              </div>

              <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-stone-100 shadow-sm space-y-8">
                {/* Image Upload */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{t.product.image}</label>
                  <div 
                    className="relative aspect-video rounded-3xl border-2 border-dashed border-stone-100 bg-stone-50 flex items-center justify-center overflow-hidden transition-all hover:border-gold group cursor-pointer"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    {newProduct.img ? (
                      <img src={newProduct.img} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 group-hover:scale-105 transition-transform">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                          <Plus className="w-6 h-6 text-gold" />
                        </div>
                        <span className="text-stone-400 font-bold text-sm tracking-tight">{t.product.upload}</span>
                      </div>
                    )}
                    <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{t.product.name} (AR)</label>
                      <input 
                        type="text" 
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gold/50 font-bold"
                        placeholder="مثال: خيط الروح العاصمي"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Catégorie / التصنيف</label>
                      <select 
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as Product['category'] })}
                        className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gold/50 font-bold appearance-none cursor-pointer"
                      >
                        {Object.entries(t.sections.mainCategories).filter(([key]) => key !== 'all').map(([key, label]) => (
                          <option key={key} value={key}>{label as string}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{t.product.price}</label>
                       <div className="relative">
                        <input 
                          type="number" 
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                          className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gold/50 font-bold"
                          placeholder="00"
                        />
                        <span className={`absolute ${isRtl ? 'left-6' : 'right-6'} top-1/2 -translate-y-1/2 font-black text-gold`}>دج</span>
                       </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{t.product.wilaya}</label>
                      <input 
                        type="text" 
                        value={newProduct.wilaya}
                        onChange={(e) => setNewProduct({ ...newProduct, wilaya: e.target.value })}
                        className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gold/50 font-bold"
                        placeholder={isRtl ? "الولاية (مثال: الجزائر)" : "Wilaya (e.g., Alger)"}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{t.product.description}</label>
                      <textarea 
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gold/50 font-bold min-h-[100px]"
                        placeholder={isRtl ? "وصف تفصيلي للقطعة..." : "Detailed description of the piece..."}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Name (EN)</label>
                        <input 
                          type="text" 
                          value={newProduct.nameEn}
                          onChange={(e) => setNewProduct({ ...newProduct, nameEn: e.target.value })}
                          className="w-full px-6 py-3 bg-stone-50 border border-stone-100 rounded-xl focus:outline-none text-sm"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Nom (FR)</label>
                        <input 
                          type="text" 
                          value={newProduct.nameFr}
                          onChange={(e) => setNewProduct({ ...newProduct, nameFr: e.target.value })}
                          className="w-full px-6 py-3 bg-stone-50 border border-stone-100 rounded-xl focus:outline-none text-sm"
                        />
                     </div>
                  </div>

                  <button 
                    onClick={saveProduct}
                    className="w-full py-5 bg-stone-900 text-white rounded-2xl font-bold shadow-xl active:scale-95 transition-all text-lg"
                  >
                    {t.product.save}
                  </button>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="hidden md:block py-20 border-t border-stone-100 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="w-32 mb-4">
              <img src="/logo.png" className="w-full object-contain" alt="Logo" />
            </div>
             <h4 className="font-serif text-2xl font-bold text-gold tracking-tighter">
              {t.brand}
            </h4>
            <p className="text-stone-400 text-sm leading-relaxed max-w-xs">{t.sections.about}</p>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:text-gold transition-colors"><Globe className="w-5 h-5" /></button>
            </div>
          </div>
          <div></div>
          <div></div>
          <div className="text-center md:text-right">
             <p className="text-stone-300 text-[10px] font-black uppercase tracking-widest mb-4">{t.sections.contactUs}</p>
             <p className="font-bold text-stone-900">contact@darlalahom.dz</p>
             <p className="text-stone-400 mt-2">© 2024 {t.brand}</p>
          </div>
        </div>
      </footer>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md" 
              onClick={() => setSelectedProduct(null)} 
            />
            <motion.div 
              layoutId={`product-${selectedProduct.id}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-4xl rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-[510] w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full flex items-center justify-center font-bold transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="md:w-1/2 overflow-hidden bg-stone-100">
                <img src={selectedProduct.img} className="w-full h-full object-cover" alt={getName(selectedProduct)} />
              </div>

              <div className="md:w-1/2 p-10 md:p-12 overflow-y-auto no-scrollbar space-y-8 flex flex-col justify-center">
                <ArtisanSignature artisan={selectedProduct.artisan} artisanImg={selectedProduct.artisanImg} variant="full" />

                <div className="flex flex-col gap-1">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-900 mb-2">{getName(selectedProduct)}</h2>
                  <div className="flex items-center gap-4">
                    <p className="text-3xl font-black text-gold">{selectedProduct.price.toLocaleString()} {isRtl ? 'دج' : 'DZD'}</p>
                    {selectedProduct.rentPrice && (
                      <div className="px-3 py-1 bg-stone-100 rounded-full flex items-center gap-2">
                        <span className="text-[10px] font-black text-stone-400 uppercase">{t.sections.rent}:</span>
                        <span className="text-sm font-bold text-stone-900">{selectedProduct.rentPrice.toLocaleString()} {isRtl ? 'دج' : 'DZD'}</span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-stone-500 text-sm leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div className="flex flex-col gap-4">
                  <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{t.sections.shareVia}</p>
                  <div className="flex gap-4">
                    <button onClick={() => showToast(t.sections.sharedVia + " Facebook")} className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center hover:scale-110 transition-transform"><Facebook className="w-5 h-5" /></button>
                    <button onClick={() => showToast(t.sections.sharedVia + " Instagram")} className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center hover:scale-110 transition-transform"><Instagram className="w-5 h-5" /></button>
                    <button onClick={() => showToast(t.sections.sharedVia + " WhatsApp")} className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center hover:scale-110 transition-transform"><MessageCircle className="w-5 h-5" /></button>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-stone-100">
                  <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Comments & Rating</p>
                  <div className="flex items-center gap-1 text-gold mb-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className={`w-4 h-4 ${star <= Math.floor(selectedProduct.rating) ? 'fill-gold' : 'text-stone-200'}`} />
                    ))}
                    <span className="text-xs font-bold ml-2 text-stone-900">{selectedProduct.rating} / 5</span>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-2xl">
                    <p className="text-xs text-stone-600 italic">"قطعة رائعة جداً، التفاصيل مذهلة والتغليف كان راقياً. شكراً دار لالاهم."</p>
                    <p className="text-[9px] text-stone-400 mt-2 font-bold">— زبائن موثقون</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => addToCart(selectedProduct)}
                    className="w-full bg-gold text-white py-5 rounded-[1.5rem] font-bold shadow-xl shadow-gold/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {t.product.addCart} ({t.sections.buy})
                  </button>
                  
                  {selectedProduct.rentPrice && (
                    <button 
                      onClick={() => {
                        if (!currentUser) setIsAuthModalOpen(true);
                        else showToast(isRtl ? 'تم إرسال طلب الكراء' : 'Rent inquiry sent');
                      }}
                      className="w-full bg-stone-900 text-white py-5 rounded-[1.5rem] font-bold active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <Star className="w-5 h-5 fill-gold text-gold" />
                      {t.sections.rent}
                    </button>
                  )}

                  <button 
                    onClick={() => {
                      if (!currentUser) setIsAuthModalOpen(true);
                      else showToast(t.product.inquirySent);
                    }}
                    className="w-full border-2 border-stone-100 text-stone-600 py-4 rounded-[1.5rem] font-bold active:scale-95 transition-all"
                  >
                    {t.product.inquiry}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Share Sheet */}
      <AnimatePresence>
        {isShareOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShareOpen(false)}
              className="fixed inset-0 z-[600] bg-black/40"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[610] bg-white rounded-t-[4rem] p-12 shadow-2xl text-center"
            >
              <div className="w-12 h-1.5 bg-stone-100 rounded-full mx-auto mb-10" />
              <h3 className="font-bold text-2xl mb-12">{t.sections.shareVia}</h3>
              <div className="grid grid-cols-4 gap-8 max-w-xl mx-auto">
                {['WhatsApp', 'Facebook', 'Telegram', 'Copy Link'].map((platform, i) => (
                   <button 
                    key={i} 
                    onClick={() => { showToast(`${t.sections.sharedVia} ${platform}`); setIsShareOpen(false); }}
                    className="flex flex-col items-center gap-4 group"
                  >
                    <div className="w-20 h-20 bg-stone-50 rounded-[2rem] flex items-center justify-center text-stone-600 shadow-inner group-hover:bg-gold/10 group-hover:text-gold transition-all">
                      {i === 3 ? <Globe className="w-8 h-8" /> : <Share2 className="w-8 h-8" />}
                    </div>
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest group-hover:text-gold">{platform}</span>
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setIsShareOpen(false)}
                className="mt-16 text-stone-300 font-black uppercase text-xs tracking-[0.2em] hover:text-stone-900 transition-colors"
              >
                {t.sections.close}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <div className="fixed inset-0 z-[700] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-stone-900/90 backdrop-blur-xl" 
              onClick={() => setIsAuthModalOpen(false)} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-[3.5rem] overflow-hidden shadow-2xl"
            >
              <div className="bg-gold p-8 text-center text-white relative">
                <h3 className="font-serif text-3xl font-bold uppercase">{t.auth.title}</h3>
                <p className="text-white/70 text-[10px] font-black uppercase tracking-widest mt-2">{t.auth.subtitle}</p>
                
                <div className="flex gap-2 mt-6 bg-black/10 p-1 rounded-full overflow-hidden">
                  <button 
                    onClick={() => setAuthMode('register-client')}
                    className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${authMode === 'register-client' ? 'bg-white text-gold' : 'text-white/60 hover:text-white'}`}
                  >
                    {t.auth.client}
                  </button>
                  <button 
                    onClick={() => setAuthMode('register-artisan')}
                    className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${authMode === 'register-artisan' ? 'bg-white text-gold' : 'text-white/60 hover:text-white'}`}
                  >
                    {t.auth.artisan}
                  </button>
                </div>
              </div>

              <div className="p-8 space-y-6">
                {authMode === 'register-client' ? (
                  <div className="space-y-4">
                    <button 
                      onClick={() => handleLogin()}
                      className="w-full py-4 bg-white border-2 border-stone-100 rounded-2xl flex items-center justify-center gap-4 hover:border-gold transition-all group"
                    >
                      <div className="w-6 h-6 flex items-center justify-center"><Globe className="w-5 h-5 text-red-500" /></div>
                      <span className="font-bold text-stone-600">{t.auth.google}</span>
                    </button>
                    <button 
                      onClick={() => handleLogin()}
                      className="w-full py-4 bg-[#1877F2] text-white rounded-2xl flex items-center justify-center gap-4 hover:bg-[#166fe5] transition-all"
                    >
                      <Facebook className="w-6 h-6" />
                      <span className="font-bold">{t.auth.facebook}</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        placeholder={t.auth.artisanForm.firstName}
                        className="w-full px-5 py-3 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-gold outline-none font-bold text-sm"
                        value={artisanForm.firstName}
                        onChange={(e) => setArtisanForm({...artisanForm, firstName: e.target.value})}
                      />
                      <input 
                        type="text" 
                        placeholder={t.auth.artisanForm.lastName}
                        className="w-full px-5 py-3 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-gold outline-none font-bold text-sm"
                        value={artisanForm.lastName}
                        onChange={(e) => setArtisanForm({...artisanForm, lastName: e.target.value})}
                      />
                    </div>
                    <input 
                      type="tel" 
                      placeholder={t.auth.artisanForm.phone}
                      className="w-full px-5 py-3 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-gold outline-none font-bold text-sm"
                      value={artisanForm.phone}
                      onChange={(e) => setArtisanForm({...artisanForm, phone: e.target.value})}
                    />
                    <select 
                      className="w-full px-5 py-3 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-gold outline-none font-bold text-sm appearance-none"
                      value={artisanForm.wilaya}
                      onChange={(e) => setArtisanForm({...artisanForm, wilaya: e.target.value})}
                    >
                      <option value="">{t.auth.artisanForm.wilaya}</option>
                      {['Alger', 'Oran', 'Constantine', 'Tizi Ouzou'].map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                    <input 
                      type="text" 
                      placeholder={t.auth.artisanForm.craft}
                      className="w-full px-5 py-3 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-gold outline-none font-bold text-sm"
                      value={artisanForm.craft}
                      onChange={(e) => setArtisanForm({...artisanForm, craft: e.target.value})}
                    />
                    <div className="p-4 bg-stone-50 border-2 border-dashed border-stone-100 rounded-xl flex flex-col items-center gap-2 cursor-pointer hover:border-gold group transition-all">
                      <FileText className="w-6 h-6 text-stone-300 group-hover:text-gold" />
                      <span className="text-[10px] font-black text-stone-400 uppercase text-center">{t.auth.artisanForm.documents}</span>
                    </div>

                    <button 
                      onClick={handleLogin}
                      className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold shadow-xl hover:bg-stone-800 transition-all uppercase tracking-widest text-sm"
                    >
                      {t.auth.artisanForm.submit}
                    </button>
                    {loginError && <p className="text-red-500 text-[10px] font-black text-center uppercase">{loginError}</p>}
                  </div>
                )}
                
                <p className="text-[10px] text-stone-400 mt-6 leading-relaxed italic px-4 text-center">
                  {t.auth.footer}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Electronic Payment Modal (Edahabia) */}
      <AnimatePresence>
        {isPaymentModalOpen && (
          <div className="fixed inset-0 z-[800] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-stone-900/80 backdrop-blur-md" 
              onClick={() => !isPaying && setIsPaymentModalOpen(false)} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <div className="bg-stone-900 p-8 text-center text-white relative">
                <div className="flex justify-between items-center mb-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <button onClick={() => setIsPaymentModalOpen(false)} className="text-white/50 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <h3 className="text-xl font-bold">{t.cart.confirmation}</h3>
                <p className="text-stone-400 text-sm mt-2">{t.cart.methodTitle}</p>
              </div>

              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <button 
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-6 rounded-2xl border-2 transition-all flex items-center justify-between group ${paymentMethod === 'cod' ? 'border-gold bg-gold/5' : 'border-stone-100 hover:border-gold/30'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${paymentMethod === 'cod' ? 'bg-gold text-white' : 'bg-stone-50 text-stone-400'}`}>
                        <Package className="w-6 h-6" />
                      </div>
                      <div className="text-start">
                        <p className="font-bold text-stone-900">{t.cart.cod}</p>
                        <p className="text-xs text-stone-400 font-medium">{isRtl ? 'الدفع عند باب منزلك' : 'Pay at your door'}</p>
                      </div>
                    </div>
                    {paymentMethod === 'cod' && <CheckCircle2 className="w-6 h-6 text-gold" />}
                  </button>

                  <button 
                    onClick={() => setPaymentMethod('online')}
                    className={`p-6 rounded-2xl border-2 transition-all flex items-center justify-between group ${paymentMethod === 'online' ? 'border-gold bg-gold/5' : 'border-stone-100 hover:border-gold/30'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${paymentMethod === 'online' ? 'bg-gold text-white' : 'bg-stone-50 text-stone-400'}`}>
                        <Trophy className="w-6 h-6" />
                      </div>
                      <div className="text-start">
                        <p className="font-bold text-stone-900">{t.cart.edahabia}</p>
                        <p className="text-xs text-stone-400 font-medium">{isRtl ? 'آمن وسريع' : 'Secure and fast'}</p>
                      </div>
                    </div>
                    {paymentMethod === 'online' && <CheckCircle2 className="w-6 h-6 text-gold" />}
                  </button>
                </div>

                {paymentMethod === 'online' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4 pt-4 border-t border-stone-100"
                  >
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{t.cart.cardNumber}</label>
                      <input 
                        type="text" 
                        placeholder="**** **** **** ****"
                        className="w-full px-5 py-4 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-gold outline-none font-bold text-center tracking-[0.2em]"
                        value={paymentData.cardNumber}
                        onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value.replace(/\D/g, '').slice(0, 16)})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{t.cart.expiryDate}</label>
                        <input 
                          type="text" 
                          placeholder="MM/YY"
                          className="w-full px-5 py-4 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-gold outline-none font-bold text-center"
                          value={paymentData.expiry}
                          onChange={(e) => setPaymentData({...paymentData, expiry: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{t.cart.cvv}</label>
                        <input 
                          type="password" 
                          placeholder="***"
                          className="w-full px-5 py-4 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-gold outline-none font-bold text-center"
                          value={paymentData.cvv}
                          onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value.replace(/\D/g, '').slice(0, 3)})}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="pt-4">
                  <button 
                    onClick={processPayment}
                    disabled={isPaying}
                    className="w-full py-5 bg-gold text-white rounded-2xl font-bold shadow-xl shadow-gold/20 flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50"
                  >
                    {isPaying ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5" />
                    )}
                    {paymentMethod === 'online' ? t.cart.payNow : t.cart.confirm}
                  </button>
                </div>

                {paymentMethod === 'online' && (
                  <div className="space-y-4 pt-4 border-t border-stone-100">
                     <div className="space-y-2">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{t.cart.cardHolder}</label>
                      <input 
                        type="text" 
                        placeholder="NOUR LALAHOM"
                        className="w-full px-5 py-4 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-gold outline-none font-bold uppercase transition-all"
                        value={paymentData.holder}
                        onChange={(e) => setPaymentData({...paymentData, holder: e.target.value})}
                      />
                    </div>
                  </div>
                )}
              </div>
                
              <div className="flex items-center justify-center gap-2 opacity-30 grayscale saturate-0 pb-8">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" className="h-4" alt="Visa" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="h-6" alt="Mastercard" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-[900]">
        <div className="bg-white/80 backdrop-blur-2xl border border-stone-200/50 rounded-[2.5rem] shadow-2xl flex items-center justify-around p-2">
          { (currentUser?.role === 'artisan' ? [
            { id: 'home', icon: Home, label: isRtl ? 'الرئيسية' : 'Home' },
            { id: 'add', icon: Plus, label: t.navigation.addProduct },
            { id: 'dash', icon: LayoutDashboard, label: t.navigation.dashboard },
            { id: 'profile', icon: User, label: t.navigation.profile }
          ] : [
            { id: 'home', icon: Home, label: isRtl ? 'الرئيسية' : 'Home' },
            { id: 'shop', icon: Search, label: t.navigation.explore },
            { id: 'cart', icon: ShoppingCart, label: t.navigation.cart, count: cart.length },
            { id: 'profile', icon: User, label: t.navigation.profile }
          ]).map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'profile' && !currentUser) setIsAuthModalOpen(true);
                else setCurrentTab(item.id as Tab);
              }}
              className={`relative flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${currentTab === item.id ? 'text-gold scale-110' : 'text-stone-400 hover:text-stone-600'}`}
            >
              <div className={`p-2 rounded-xl transition-colors ${currentTab === item.id ? 'bg-gold/10' : ''}`}>
                <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                {item.count ? item.count > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center border border-white font-bold">
                    {item.count}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest leading-none hidden sm:block">{item.label as string}</span>
              {currentTab === item.id && (
                <motion.div layoutId="bottom-indicator" className="absolute -bottom-1 w-1 h-1 bg-gold rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
