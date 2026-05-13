/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ShoppingCart, Home, LayoutDashboard, Plus, 
  ChevronRight, Star, Zap, Share2, Heart, User, 
  Globe, LogOut, CheckCircle2, TrendingUp, Eye, Package, Search
} from 'lucide-react';
import { translations, Language } from './translations';

interface Product {
  id: number;
  name: string;
  nameEn: string;
  nameFr: string;
  price: number;
  rentPrice?: number;
  img: string;
  artisan: string;
  artisanImg: string;
  category: 'constantinois' | 'kabyle' | 'chaoui' | 'sahraoui' | 'other';
}

const products: Product[] = [
  { id: 1, name: "خيط الروح ذهب خالص", nameEn: "Khait El Rouh Pure Gold", nameFr: "Khait El Rouh Or Pur", price: 125000, rentPrice: 5000, img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600", artisan: "نور (Admin)", artisanImg: "https://i.pravatar.cc/150?u=nour", category: 'constantinois' },
  { id: 2, name: "طقم مرجان أحمر أصلي", nameEn: "Original Red Coral Set", nameFr: "Parure Corail Rouge", price: 45000, rentPrice: 2500, img: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=600", artisan: "حرفي القبائل", artisanImg: "https://i.pravatar.cc/150?u=kab", category: 'kabyle' },
  { id: 3, name: "خلخال فضة منقوش", nameEn: "Engraved Silver Anklet", nameFr: "Chevillère en Argent", price: 32000, rentPrice: 1500, img: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=600", artisan: "نور (Admin)", artisanImg: "https://i.pravatar.cc/150?u=nour", category: 'chaoui' },
  { id: 4, name: "سكاب تلمساني أصيل", nameEn: "Authentic Tlemcen Skab", nameFr: "Skab Tlemcen Authentique", price: 28000, rentPrice: 2000, img: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=600", artisan: "لالة تلمسان", artisanImg: "https://i.pravatar.cc/150?u=tlem", category: 'sahraoui' }
];

type Tab = 'home' | 'shop' | 'cart' | 'dash' | 'add';

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
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [newProduct, setNewProduct] = useState({ name: '', nameEn: '', nameFr: '', price: '', img: '', category: 'other' as Product['category'] });
  const [loginCreds, setLoginCreds] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState<string | null>(null);

  const t = translations[lang];
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
  };

  const getName = (p: Product) => {
    if (lang === 'en') return p.nameEn;
    if (lang === 'fr') return p.nameFr;
    return p.name;
  };

  const filteredProducts = allProducts.filter(p => {
    const matchesSearch = getName(p).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleConfirmOrder = () => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      customerName: currentUser.name,
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.price, 0),
      date: new Date().toLocaleDateString(lang === 'ar' ? 'ar-DZ' : 'en-US'),
      status: 'pending'
    };

    setOrders([newOrder, ...orders]);
    setNotifications([`${t.navigation.cart}: ${newOrder.total} DZD`, ...notifications]);
    
    showToast(t.sections.orderConfirmed);
    setCart([]);
    setCurrentTab('home');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      price: parseInt(newProduct.price),
      img: newProduct.img,
      artisan: "نور (Admin)",
      artisanImg: "https://i.pravatar.cc/150?u=nour",
      category: newProduct.category
    };

    setAllProducts([product, ...allProducts]);
    setNewProduct({ name: '', nameEn: '', nameFr: '', price: '', img: '', category: 'other' });
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
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 hover:bg-stone-100 rounded-xl transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        <h1 className="font-serif text-xl font-bold text-gold tracking-tighter">
          {t.brand}
        </h1>

        <div className="flex items-center gap-2">
          <div className="w-12 h-12 bg-transparent flex items-center justify-center">
            <img src="/logo.png" className="w-full h-full object-contain" alt="Logo" />
          </div>
          <div className="hidden md:flex items-center gap-1 bg-stone-100 p-1 rounded-full px-2 ml-2">
            <button onClick={() => setLang('ar')} className={`text-[10px] font-bold px-2 py-1 rounded-full transition-all ${lang === 'ar' ? 'bg-gold text-white' : 'text-stone-400'}`}>AR</button>
            <button onClick={() => setLang('en')} className={`text-[10px] font-bold px-2 py-1 rounded-full transition-all ${lang === 'en' ? 'bg-gold text-white' : 'text-stone-400'}`}>EN</button>
            <button onClick={() => setLang('fr')} className={`text-[10px] font-bold px-2 py-1 rounded-full transition-all ${lang === 'fr' ? 'bg-gold text-white' : 'text-stone-400'}`}>FR</button>
          </div>
          <button 
            onClick={() => setCurrentTab('cart')}
            className="relative p-2 hover:bg-stone-100 rounded-xl transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white font-bold">
                {cart.length}
              </span>
            )}
          </button>
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
              {/* Hero */}
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] sm:aspect-[21/9] bg-stone-900 shadow-2xl flex items-center p-6 md:p-16">
                <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200" className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Hero" />
                <div className="relative z-10 space-y-6 max-w-2xl">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-40 md:w-64 mb-8"
                  >
                    <img src="/logo.png" className="w-full object-contain filter drop-shadow-2xl" alt="Hero Logo" />
                  </motion.div>
                  <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="inline-block px-4 py-1.5 bg-gold text-white text-[10px] font-black rounded-full uppercase tracking-widest"
                  >
                    {t.hero.badge}
                  </motion.span>
                  <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="font-serif text-4xl sm:text-7xl text-white font-bold leading-[1.1] mb-8"
                  >
                    {t.hero.title}
                  </motion.h2>
                  <motion.button 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    onClick={() => setCurrentTab('shop')}
                    className="bg-white text-stone-900 px-8 py-4 rounded-2xl font-bold shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2 group"
                  >
                    {t.hero.cta}
                    {isRtl ? <ChevronRight className="w-5 h-5 rotate-180" /> : <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                  </motion.button>
                </div>
              </div>

              {/* Search & Categories */}
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
                  {Object.entries(t.sections.categories).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key)}
                      className={`whitespace-nowrap px-8 py-3 rounded-full font-bold transition-all border ${selectedCategory === key ? 'bg-gold text-white border-gold shadow-lg shadow-gold/20' : 'bg-white text-stone-400 border-stone-100 hover:border-gold/50'}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selection */}
               <div className="flex justify-between items-end">
                <h3 className="font-serif text-2xl font-bold">{t.sections.selected}</h3>
                <button onClick={() => { setCurrentTab('shop'); setSelectedCategory('all'); }} className="text-gold font-bold text-sm underline underline-offset-4">{t.sections.viewAll}</button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
                {filteredProducts.map((p) => (
                  <motion.div 
                    key={p.id}
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-stone-100 overflow-hidden group shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col"
                    onClick={() => setSelectedProduct(p)}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img src={p.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={getName(p)} />
                      <div className="absolute top-2 right-2 md:top-4 md:right-4 flex flex-col gap-2">
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            if (!currentUser) setIsAuthModalOpen(true);
                            else showToast(t.sections.successAdd); 
                          }}
                          className="w-8 h-8 md:w-10 md:h-10 bg-white/90 rounded-lg md:rounded-xl flex items-center justify-center text-stone-400 hover:text-red-500 transition-colors shadow-lg"
                        >
                          <Heart className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                      </div>
                      <div className={`absolute bottom-2 ${isRtl ? 'right-2' : 'left-2'} flex gap-1`}>
                        <span className="px-2 py-0.5 md:px-3 md:py-1 bg-gold text-white text-[8px] md:text-[10px] font-black rounded-full uppercase shadow-lg">
                          {t.sections.buy}
                        </span>
                        {p.rentPrice && (
                          <span className="px-2 py-0.5 md:px-3 md:py-1 bg-stone-900 text-white text-[8px] md:text-[10px] font-black rounded-full uppercase shadow-lg">
                            {t.sections.rent}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-4 md:p-6 flex-grow flex flex-col">
                      <h4 className="font-bold text-xs md:text-sm truncate text-stone-800 mb-1">{getName(p)}</h4>
                      <p className="text-gold font-black text-sm md:text-lg mb-2 md:mb-4">{p.price.toLocaleString()} {isRtl ? 'دج' : 'DZD'}</p>
                      <div className="mt-auto pt-2 md:pt-4 border-t border-stone-50 hidden md:block">
                        <ArtisanSignature artisan={p.artisan} artisanImg={p.artisanImg} />
                      </div>
                    </div>
                  </motion.div>
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
                {Object.entries(t.sections.categories).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`whitespace-nowrap px-6 py-2 rounded-full font-bold transition-all border text-xs md:text-sm ${selectedCategory === key ? 'bg-gold text-white border-gold shadow-lg shadow-gold/20' : 'bg-white text-stone-400 border-stone-100'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8">
                {filteredProducts.map((p, i) => (
                  <div 
                    key={`${p.id}-${i}`}
                    className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-stone-100 overflow-hidden group shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col"
                    onClick={() => setSelectedProduct(p)}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img src={p.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={getName(p)} />
                      <div className="absolute top-2 right-2 md:top-4 md:right-4 flex flex-col gap-2">
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            if (!currentUser) setIsAuthModalOpen(true);
                            else showToast(t.sections.successAdd); 
                          }}
                          className="w-8 h-8 md:w-10 md:h-10 bg-white/90 rounded-lg md:rounded-xl flex items-center justify-center text-stone-400 hover:text-red-500 transition-colors shadow-lg"
                        >
                          <Heart className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                      </div>
                      <div className={`absolute bottom-2 ${isRtl ? 'right-2' : 'left-2'} flex gap-1`}>
                        <span className="px-2 py-0.5 md:px-3 md:py-1 bg-gold text-white text-[8px] md:text-[10px] font-black rounded-full uppercase">
                          {t.sections.buy}
                        </span>
                        {p.rentPrice && (
                          <span className="px-2 py-0.5 md:px-3 md:py-1 bg-stone-900 text-white text-[8px] md:text-[10px] font-black rounded-full uppercase">
                            {t.sections.rent}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-4 md:p-8 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-2 md:mb-4">
                        <div className="min-w-0">
                          <p className="text-[8px] md:text-[10px] text-stone-400 font-bold mb-1 uppercase tracking-widest truncate">{p.artisan}</p>
                          <h4 className="font-bold text-xs md:text-lg text-stone-800 truncate">{getName(p)}</h4>
                        </div>
                        <div className="hidden md:flex items-center gap-1 text-gold">
                          <Star className="w-4 h-4 fill-gold" />
                          <span className="text-xs font-bold">4.9</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-2 md:pt-6 border-t border-stone-50 mt-auto">
                        <p className="text-gold font-black text-xs md:text-xl truncate">{p.price.toLocaleString()} {isRtl ? 'دج' : 'DZD'}</p>
                        <button 
                          onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                          className="p-2 md:p-3 bg-stone-900 text-white rounded-lg md:rounded-2xl hover:bg-stone-800 transition-colors"
                        >
                          <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
                        {Object.entries(t.sections.categories).filter(([key]) => key !== 'all').map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                        <option value="other">{isRtl ? 'أخرى' : 'Autre / Other'}</option>
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
      <footer className="py-20 border-t border-stone-100 bg-white/50 backdrop-blur-sm">
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
                  {t.product.descPrefix} {t.product.descSuffix}
                </p>

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
              className="relative bg-white w-full max-w-sm rounded-[3.5rem] overflow-hidden shadow-2xl"
            >
              <div className="bg-gold p-12 text-center text-white relative">
                <h3 className="font-serif text-3xl font-bold uppercase">{t.auth.title}</h3>
                <p className="text-white/70 text-[10px] font-black uppercase tracking-widest mt-2">{t.auth.subtitle}</p>
              </div>
              <div className="p-10 space-y-6">
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="USERNAME"
                    className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gold font-bold text-center uppercase text-sm"
                    value={loginCreds.username}
                    onChange={(e) => setLoginCreds({ ...loginCreds, username: e.target.value })}
                  />
                  <input 
                    type="password" 
                    placeholder="PASSWORD"
                    className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gold font-bold text-center uppercase text-sm"
                    value={loginCreds.password}
                    onChange={(e) => setLoginCreds({ ...loginCreds, password: e.target.value })}
                  />
                  {loginError && <p className="text-red-500 text-[10px] font-black text-center uppercase">{loginError}</p>}
                </div>
                
                <button 
                  onClick={handleLogin}
                  className="w-full py-5 bg-stone-900 text-white rounded-2xl font-bold shadow-xl hover:bg-stone-800 transition-all uppercase tracking-widest"
                >
                  Confirm & Access
                </button>

                <div className="pt-6 border-t border-stone-100 text-center">
                  <p className="text-[10px] text-stone-300 font-black uppercase mb-4 italic">Quick Hints:</p>
                  <div className="flex justify-center gap-6">
                    <button onClick={() => setLoginCreds({ username: 'NOUR', password: 'NOUR' })} className="text-[10px] font-bold text-gold underline">{t.auth.client}</button>
                    <button onClick={() => setLoginCreds({ username: 'ADMIN', password: 'ADMIN' })} className="text-[10px] font-bold text-gold underline">{t.auth.artisan}</button>
                  </div>
                </div>

                <p className="text-[10px] text-stone-400 mt-6 leading-relaxed italic px-4 text-center">
                  {t.auth.footer}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
