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
  Facebook, Instagram, MessageCircle, Briefcase, Camera, Trophy, ChevronDown, FileText,
  ArrowLeft, ArrowRight, Calendar
} from 'lucide-react';
import { translations, Language, Translation } from './translations';

interface Product {
  id: number;
  name: string;
  nameEn: string;
  nameFr: string;
  description: string;
  descriptionEn?: string;
  descriptionFr?: string;
  price: number;
  rentPrice?: number;
  img: string;
  gallery?: string[];
  artisan: string;
  artisanImg: string;
  category: 'jewelry' | 'clothing' | 'copper' | 'homeDecor' | 'hennaSetup' | 'hennaInk';
  jewelryType?: 'constantinois' | 'kabyle' | 'chaoui' | 'sahraoui' | 'other';
  wilaya?: string;
  rating: number;
  isOffer?: boolean;
  isBestSeller?: boolean;
  
  // Optional Rental details if added to cart
  isRentalCartItem?: boolean;
  rentalDuration?: number;
  rentalStartDate?: string;
  rentalReturnDate?: string;
  rentalNotes?: string;
  rentalTotalPrice?: number;
}

const products: Product[] = [
  // Jewelry

  { 
    id: 4, 
    name: "سكاب تلمساني أصيل", 
    nameEn: "Authentic Tlemcen Skab", 
    nameFr: "Skab Tlemcen Authentique", 
    description: "عقد السكاب التقليدي التلمساني، يتميز برائحته الزكية المرتبطة بالعنبر والمسك والذهب.",
    descriptionEn: "Classic Tlemcen ceremonial necklace, famously scented with premium amber, musk, and adorned with golden details.",
    descriptionFr: "Collier traditionnel de Tlemcen, réputé pour sa fragrance envoûtante de musc et d'ambre et ses perles dorées.",
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


  // Copper (N'hass)
  {
    id: 7,
    name: "صينية نحاس منقوشة يدوياً",
    nameEn: "Hand-Engraved Copper Tray",
    nameFr: "Plateau Cuivre Gravé",
    description: "صينية نحاس حمراء كبيرة منقوشة باليد بزخارف إسلامية معقدة. قطعة ديكور فاخرة.",
    descriptionEn: "Large red copper tray meticulously hand-engraved with intricate geometric Islamic patterns. A superb decorative piece.",
    descriptionFr: "Grand plateau en cuivre rouge ciselé à la main aux motifs géométriques islamiques. Un objet de décoration somptueux.",
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
    descriptionEn: "Traditional coffee server crafted in pure copper, fully preserves the deep classic aroma of Algerian coffee.",
    descriptionFr: "Cafetière traditionnelle en cuivre rouge pur, idéale pour préserver le goût authentique du café algérien.",
    price: 12000,
    img: "https://m.media-amazon.com/images/I/81OHi2zIB0L._AC_UF1000,1000_QL80_.jpg",
    artisan: "نور (Admin)",
    artisanImg: "https://i.pravatar.cc/150?u=nour",
    category: 'copper',
    wilaya: 'Tlemcen',
    rating: 4.6
  },
  // Home Decor
  
  {
    id: 10,
    name: "فخار مشلل بالأزهار الملونة",
    nameEn: "Kabyle Glazed Pottery",
    nameFr: "Poterie Kabyle Vernissée",
    description: "مجموعة فخارية لتزيين المنزل مكونة من جرة وصحن كبير، مزينة بالألوان الطبيعية لمنطقة القبائل.",
    descriptionEn: "Decorative clay pottery set including a water jar and a large serving dish, painted with beautiful organic colors of Kabylie.",
    descriptionFr: "Service décoratif en poterie comprenant une jarre et un grand plat, peint avec les couleurs naturelles de Kabylie.",
    price: 18000,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxHNC2UPBgT1w0DmlndhN8H24iDyyp4IDGnA&s",
    artisan: "نور (Admin)",
    artisanImg: "https://i.pravatar.cc/150?u=nour",
    category: 'homeDecor',
    wilaya: 'Tizi Ouzou',
    rating: 4.8
  },
  // Henna Setup
  
  {
    id: 15,
    name: "محرمة عاصمية",
    nameEn: "Aâssimia Mahrama",
    nameFr: "mahrama Algéroise",
    description: "محرمة عاصمية انيقة مزينة بالكريستال و الخرز اللامع ’ تجمع بين الاصالة و الفخامة لتكمل اطلالتك التقليدية مع لباس الكاراكو العاصمي بكل رقي متوفرة باللون الاسود ’الذهبي ’ و الابيض",
    descriptionEn: "El mahrama-algiers bridal headpiece with Crystal fringes available in black gold white",
    descriptionFr: "El mahrama Algéroise à franges disponible trois couleur noir, blanc doré cristal",
    price: 3500,
    img: "/15.jpg",
    gallery: ["/155.jpeg", "/156.jpeg", "/157.jpeg"],
    artisan: "لالة الباي",
    artisanImg: "https://i.pravatar.cc/150?u=pay",
    category: 'clothing',
    wilaya: 'alger',
    rating: 5,
    isBestSeller: true
  },
  {
    id: 16,
    name: "مقياس قبائلي تقليدي",
    nameEn: "Traditional Kabyle Cuff Bracelet",
    nameFr: "Manchette kabyle traditionnelle",
    description: "مقياس قبائلي تقليدي مصنوع من النحاس الاصلي مستوحى من التراث الامازيغي العريق ’ يتميز بزخارف هندسية دقيقة و الوان زاهية تعكس الهوية الثقافية لمنطقة القبائل ",
    descriptionEn: "Traditional Kabyle cuff bracelet adorned with colorful Amazigh-inspired motifs. A handcrafted piece that combines authenticity and elegance.",
    descriptionFr: "Manchette kabyle traditionnel en cuivre, orné de motifs colorés inspirés du patrimoine amazigh. Une pièce artisanale alliant authenticité et élégance.",
    price: 5000,
    img: "/16.jpeg",
    gallery: ["/16.jpeg"],
    artisan: "أولاد نائل",
    artisanImg: "https://i.pravatar.cc/150?u=nail",
    category: 'jewelry',
    wilaya: 'kabyle',
    rating: 4.9
  },
  {
    id: 17,
    name: "حلق نجود الشاوي",
    nameEn: "Earrings Ndjoude chaoui",
    nameFr: "Boucle d’oreille Ndjoude",
    description: "حلق نجود الطويل مطلي بالذهب ،تتميز بتفاصيلها المنقوشة بعناية وعناصرها المتدلية التي تعكس براعة الصياغة التقليدية ليزين العروس في أجمل إطلالاتها بالشاوي او النايلي الجزائري",
    descriptionEn: "Majestic Annaba traditional dress with gold embroidery and beads, perfect for weddings.",
    descriptionFr: "Robe traditionnelle d'Annaba avec magnifique broderie artisanale en fil d'or.",
    price: 3500,
    img: "/17.jpg",
    gallery: ["/177.jpeg", "/178.jpeg"],
    artisan: "حرائر عنابة",
    artisanImg: "https://i.pravatar.cc/150?u=annaba",
    category: 'jewelry',
    wilaya: 'Batna',
    rating: 4.8
  },
  {
    id: 18,
    name: "سخاب العنبر",
    nameEn: "Skhab El Anbar",
    nameFr: "Skhab El Anbar",
    description: " سخاب العنبر هو نوع من الحلي التقليدية العطرية على شكل قلادة، يُعرف أساسًا in الجزائر . خاصة لدى قبيلة أولاد نائل في المناطق الوسطى والجنوبية مثل الجلفة وبوسعادة حتى قسنطينة، يُصنع يدويًا من عجينة طبيعية تتكون أساسًا من العنبر والمسك والقرنفل",
    descriptionEn: "Sakhab El Anbar is a traditional Algerian aromatic necklace, especially known among the Ouled Naïl. It is handmade from amber, musk, cloves, and natural spices, giving a long-lasting fragrance as a natural alternative to perfume.",
    descriptionFr: "Le Sakhab El Anbar est un collier traditionnel algérien parfumé, connu chez les Ouled Naïl. Il est fabriqué à base d’ambre, de musc et d’épices naturelles, offrant un parfum durable comme alternative au parfum classique.",
    price: 18000,
    rentPrice: 1500,
    img: "/18.jpg",
    gallery: ["/188.jpeg", "/189.jpeg"],
    artisan: "نور (Admin)",
    artisanImg: "https://i.pravatar.cc/150?u=nour",
    category: 'jewelry',
    wilaya: 'Alger',
    rating: 4.6
  },
  {
    id: 19,
    name: "سخاب الجوهر الابيض",
    nameEn: "white skhab jawhar",
    nameFr: " skhab djawhar blan",
    description: "سخاب جوهر أبيض حر يتوسطه عنبر معجون وعطور، مزين بتعليقة -المسكية-الفضية يلبس مع اللباس التقليدي الكراكو او البلوزة ",
    descriptionEn: "Sakhab Jawhar is a white silk-based traditional piece with a center of amber paste and perfumes, decorated with a silver “Meskia” pendant. It is worn with traditional outfits such as the Karakou or the Blouza.",
    descriptionFr: "Le Sakhab Jawhar est un bijou traditionnel en soie blanche, avec un centre en pâte d’ambre et de parfums, orné d’un pendentif en argent appelé “Meskia”. Il se porte avec des tenues traditionnelles comme le Karakou ou la Blouza.",
    price: 32000,
    rentPrice: 3000,
    img: "/19.jpg",
    gallery: ["/199.jpeg", "/1999.jpeg"],
    artisan: "محترف النحاس",
    artisanImg: "https://i.pravatar.cc/150?u=copper",
    category: 'jewelry',
    wilaya: 'Constantine',
    rating: 4.9,
    isOffer: true
  },
  {
    id: 20,
    name: "أقراط (حلق) أذن أمازيغية",
    nameEn: "Earrings amazigh kabyle ",
    nameFr: "Boucle d’oreille kabyle",
    description: "أقراط -حلق- أذن أمازيغية تقليدية شهيرة تنتمي إلى الزينة القبائلية في منطقة القبائل مصنوعة من الفضة الخالصة تتوسطها قطع من المرجان الأحمر حلق أمازيغي",
    descriptionEn: "Traditional Amazigh Kabyle earrings, made of pure silver and decorated with natural red coral pieces.",
    descriptionFr: "Boucles d’oreilles traditionnelles kabyles amazighes, en argent pur, ornées de corail rouge naturel.",
    price: 3500,
    img: "/20.jpg",
    gallery: ["/200.jpeg", "/2000.jpeg"],
    artisan: "نور (Admin)",
    artisanImg: "https://i.pravatar.cc/150?u=nour",
    category: 'jewelry',
    wilaya: 'Kabyle',
    rating: 4.7
  },
  {
    id: 21,
    name: "حقيبة يد",
    nameEn: "clutch",
    nameFr: "pochette",
    description: "حقيبة يد مصممة خصيصاً لتتماشى بشكل مثالي مع الكاراكو العاصمي مصنوعة من المخمل الملكي (القطيفة) باللون الأزرق النيلي (الداكن) الفاخر مزينة بتطريز يدوي متقن بخيوط ذهبية ناعمة تشكل التواءات هندسية رشيقة ومنحنيات تشبه أجنحة الفراشة.",
    descriptionEn: "The clutch is made of midnight blue velvet to match the karakou. It features a vintage gold metal frame and gold thread embroidery. The center is decorated with white flowers and turquoise blue stones.",
    descriptionFr: "La pochette est en velours bleu nuit assorti au karakou. Elle possède un cadre métallique doré vintage et des broderies de fils d'or. Le centre est orné de fleurs blanches et de pierres bleu turquoise.",
    price: 4000,
    img: "/21.jpg",
    gallery: ["/221.jpeg", "/222.jpeg"],
    artisan: "نساجات الأوراس",
    artisanImg: "https://i.pravatar.cc/150?u=auras",
    category: 'clothing',
    wilaya: 'Alger',
    rating: 5,
    isBestSeller: true
  },
  {
    id: 22,
    name: "سخاب العنبر ",
    nameEn: "Skhab El Anbar ",
    nameFr: "Skhab El Anbar ",
    description: "سخاب العنبر هو نوع من الحلي التقليدية العطرية على شكل قلادة، يُعرف أساسًا في الجزائر وخاصة لدى قبيلة أولاد نائل في المناطق الوسطى والجنوبية مثل الجلفة وبوسعادة حتى قسنطينة، يُصنع يدويًا من عجينة طبيعية تتكون أساسًا من العنبر والمسك والقرنفل والتوابل الأخرى، مثل نوى التمر المحروق أو دقيق القمح والمحلب، مما يمنحه رائحة زكية دائمة تجعله بديلاً طبيعيًا عن العطور التقليدية",
    descriptionEn: "Sakhab El Anbar is a traditional Algerian aromatic necklace, especially known among the Ouled Naïl. It is handmade from amber, musk, cloves, and natural spices, giving a long-lasting fragrance as a natural alternative to perfume.",
    descriptionFr: "Le Sakhab El Anbar est un collier traditionnel algérien parfumé, connu chez les Ouled Naïl. Il est fabriqué à base d’ambre, de musc et d’épices naturelles, offrant un parfum durable comme alternative au parfum classique.",
    price: 18000,
    rentPrice: 1500,
    img: "/22.jpg",
    gallery: ["/1.jpeg", "/2.jpeg", "/3.jpeg"],
    artisan: "نور (Admin)",
    artisanImg: "https://i.pravatar.cc/150?u=nour",
    category: 'jewelry',
    wilaya: 'Tizi Ouzou',
    rating: 4.5
  },
  {
    id: 23,
    name: "محرمة الفتول العاصمية ",
    nameEn: "Meharma El Ftoul",
    nameFr: "Meharma El Ftoul",
    description: "محرمة (محرمة الفتول) مصنوعة من المخمل (القطيفة) الفاخر باللون الأزرق النيلي الداكن المتناسق مع اللباس مرصعة ببروش (مشبك) من الكريستال الذهبي البراق على شكل زهرة خماسية البتلات مع فص متدلي تنتهي من الأسفل بشراشيب (فتول) طويلة ومغزولة يدويًا من خيوط الذهب الصفراء اللامعة.",
    descriptionEn: "The Meharma is a traditional handkerchief made of midnight blue velvet to match the karakou. It is adorned with a gold crystal flower brooch and finished with long, hand-braided gold thread fringes (ftoul).",
    descriptionFr: "La Meharma est un mouchoir traditionnel en velours bleu nuit assorti au karakou. Elle est ornée d'une broche en cristaux dorés en forme de fleur et finie par de longues franges de fils d'or (ftoul) tressées à la main.",
    price: 2000,
    img: "/23.jpg",
    gallery: ["/4.jpeg"],
    artisan: "دار العرس",
    artisanImg: "https://i.pravatar.cc/150?u=wedding",
    category: 'clothing',
    wilaya: 'Alger',
    rating: 4.8
  },
  {
    id: 24,
    name: "السخاب الجزائري التقليدي",
    nameEn: "Algerian Skhab",
    nameFr: "Skhab algerie",
    description: "مصنوع منحبات من المسك الأسود مغلفة ومزينة بحبيبات اللؤلؤ الأبيض الصغيرة مزين بفواصلواسطوانات من الذهب الأصفر المشغّل بدقة تفصل بين ثناياه.",
    descriptionEn: "The Skhab is a traditional scented necklace. It combines black musk beads encased in white pearls, gold spacers, and a large teardrop golden pendant.",
    descriptionFr: "Le Skhab est un collier traditionnel parfumé. Il associe des billes de musc noir enveloppées de perles blanches, des intercalaires en or, et un grand pendentif doré en forme de goutte.",
    price: 20000,
    rentPrice: 1800,
    img: "/24.jpg",
    gallery: ["/5.jpeg", "/6.jpeg"],
    artisan: "خبير الحنة",
    artisanImg: "https://i.pravatar.cc/150?u=henna",
    category: 'jewelry',
    wilaya: 'alger',
    rating: 4.7
  },
  {
    id: 25,
    name: "الكراكو العاصمي الملكي",
    nameEn: "Royal Algiers Karakou",
    nameFr: "Karakou Algérois Royal",
    description: "كراكو عاصمي فاخر باللون الأحمر القرمزي مطرز يدوياً بخيوط ذهبية وفضية، يجسد أصالة اللباس التقليدي الجزائري ويمنح إطلالة ملكية راقية للمناسبات والأعراس. متوفر للكراء.",
    descriptionEn: "An exquisite crimson Algiers Karakou, handcrafted with intricate gold and silver embroidery. This traditional Algerian outfit combines elegance and heritage, offering a majestic look for weddings and special occasions. Available for rent.",
    descriptionFr: "Magnifique karakou algérois rouge brodé à la main avec des fils dorés et argentés. Une tenue traditionnelle algérienne élégante qui offre une allure royale et raffinée pour les mariages et les grandes occasions. Disponible à la location.",
    price: 50000,
    rentPrice: 10000,
    img: "/25.jpeg",
    gallery: ["/25.jpg","251.jpeg"],
    artisan: "نور (Admin)",
    artisanImg: "https://i.pravatar.cc/150?u=nour",
    category: 'clothing',
    wilaya: 'Alger',
    rating: 5.0,
    isBestSeller: true
  },
  {
    id: 26,
    name: "لباس شاوي تقليدى فاخر",
    nameEn: "Chaoui dress",
    nameFr: "Chaoui",
    description: "لباس شاوي تقليدي فاخر بلون أخضر زيتوني هادئ، مزين بتطريزات ذهبية دقيقة وأقمشة منسدلة تضفي لمسة من الأناقة والأصالة. مثالي للأعراس والمناسبات التقليدية الراقية، ومتوفر للكراء.",
    descriptionEn: "An elegant Chaoui traditional dress in soft olive green, adorned with intricate golden embroidery and flowing fabric details. Inspired by the rich heritage of the Aurès region, it offers a graceful and sophisticated look for weddings and special occasions. Available for rent.",
    descriptionFr: "Magnifique robe chaouie traditionnelle de couleur vert olive, sublimée par de délicates broderies dorées et un voile fluide qui lui confèrent une allure noble et raffinée. Idéale pour les mariages et les grandes occasions. Disponible à la location.",
    price: 60000,
    rentPrice: 15000,
    img: "/26.jpeg",
    gallery: ["/26.jpeg","/261.jpeg"],
    artisan: "نساجات الأوراس",
    artisanImg: "https://i.pravatar.cc/150?u=auras",
    category: 'clothing',
    wilaya: 'Batna',
    rating: 4.9
  },
  {
    id: 27,
    name: "كراكو عاصمي",
    nameEn: "Karakou",
    nameFr: "Karakou",
    description: "كراكو عاصمي فاخر من المخمل الأسود، مطرز يدوياً بخيوط ذهبية ولمسات ملونة مستوحاة من التراث العاصمي الأصيل. يجمع بين الفخامة والأناقة ليمنح إطلالة ملكية راقية في الأعراس والمناسبات الخاصة. متوفر للكراء.",
    descriptionEn: "A luxurious black velvet Algiers Karakou, handcrafted with exquisite golden embroidery and colorful details inspired by Algerian heritage. Designed for elegance and sophistication, it offers a royal look for weddings and special occasions. Available for rent.",
    descriptionFr: "Somptueux karakou algérois en velours noir, brodé à la main avec des fils dorés et des détails colorés inspirés du patrimoine algérois. Une tenue raffinée et majestueuse idéale pour les mariages et les grandes occasions. Disponible à la location.",
    price: 50000,
    rentPrice: 10000,
    img: "/27.jpeg",
    gallery: ["/27.jpeg","2777.jpeg"],
    artisan: "دار العرس",
    artisanImg: "https://i.pravatar.cc/150?u=wedding",
    category: 'clothing',
    wilaya: 'Alger',
    rating: 4.8
  },
  {
    id: 28,
    name: "الحايك الجزائري",
    nameEn: "Algerian Haik",
    nameFr: "Haïk Algérien",
    description: "حايك أبيض تقليدي فاخر يجمع بين أناقة الحايك الجزائري الأصيل وفخامة الكراكو المطرز بالذهب، ليمنح إطلالة راقية مستوحاة من التراث العاصمي الأندلسي في المناسبات والأعراس.",
    descriptionEn: "An elegant white traditional Haik paired with a luxurious black Karakou adorned with golden embroidery, creating a sophisticated look inspired by Algerian and Andalusian heritage for weddings and special occasions.",
    descriptionFr: "Un haïk blanc traditionnel raffiné associé à un karakou noir richement brodé de détails dorés, offrant une allure élégante inspirée du patrimoine algérois et andalou pour les mariages et les grandes occasions.",
    price: 15000,
    rentPrice: 2500,
    img: "/28.jpeg",
    gallery: ["/28.jpeg","/281.jpeg"],
    artisan: "دار العرس",
    artisanImg: "https://i.pravatar.cc/150?u=wedding",
    category: 'clothing',
    wilaya: 'Alger',
    rating: 4.9
  },
  {
    id: 29,
    name: "قعدة حنّة فاخرة",
    nameEn: "Luxury Henna Setup",
    nameFr: "Qâada Henna de Luxe",
    description: "قعدة حنّة فاخرة مستوحاة من التقاليد الجزائرية الأصيلة، تجمع بين الألوان الذهبية الراقية، الأواني النحاسية العتيقة، والورود الطبيعية لتمنح العروس أجواءً دافئة وملكية تضفي لمسة من السحر على ليلة الحنّة.",
    descriptionEn: "A luxurious henna ceremony setup inspired by Algerian traditions, featuring elegant golden accents, traditional copper décor, and floral arrangements to create a warm and royal atmosphere for an unforgettable bridal celebration.",
    descriptionFr: "Une décoration de cérémonie du henné raffinée inspirée du patrimoine algérien, alliant des touches dorées élégantes, des accessoires en cuivre traditionnel et des compositions florales délicates pour créer une ambiance royale et chaleureuse.",
    price: 65000,
    rentPrice: 9000,
    img: "/29.jpeg",
    gallery: ["/29.jpeg","/291.jpeg","/292.jpeg","/293.jpeg","/294.jpeg","/295.jpeg","/296.jpeg"],
    artisan: "خبير الحنة",
    artisanImg: "https://i.pravatar.cc/150?u=henna",
    category: 'hennaSetup',
    wilaya: 'Alger',
    rating: 5.0,
    isBestSeller: true
  },
  {
    id: 30,
    name: "قندورة فرقاني مخملية",
    nameEn: "Royal Fergani Dress",
    nameFr: "Gandoura Fergani",
    description: "قندورة فرقاني مخملية باللون الأزرق الملكي مطرزة بخيوط ذهبية مستوحاة من التراث القسنطيني الأصيل، لإطلالة ملكية راقية.",
    descriptionEn: "Royal blue velvet Fergani dress with exquisite golden embroidery, inspired by Constantine’s timeless heritage.",
    descriptionFr: "Gandoura Fergani en velours bleu royal, sublimée by de délicates broderies dorées inspirées du patrimoine constantinois.",
    price: 180000,
    img: "/300.jpeg",
    gallery: ["/300.jpeg"],
    artisan: "حرائر عنابة",
    artisanImg: "https://i.pravatar.cc/150?u=annaba",
    category: 'clothing',
    wilaya: 'Constantine',
    rating: 4.9
  },
  {
    id: 31,
    name: "سنيّة نحاس صفراء أصيلة بكامل لوازمها",
    nameEn: "Authentic Golden Brass Siniya Set",
    nameFr: "Siniya en Cuivre Jaune",
    description: "سنيّة نحاس صفراء أصيلة بكامل لوازمها مثالية لجميع مناسباتكم السعيدة (خطوبة، فاتحة، ختان، أعياد)\nالطقم يشمل:\nسنيّة نحاس كبيرة، سكرية، مرش، وحامل ملاعق (porte-cuillères)، وحامل مناديل (porte-serviettes).",
    descriptionEn: "Authentic golden brass \"Siniya\" set with all its accessories, perfect for all your happy occasions (Engagements, Fatiha, Circumcisions, Eids & Holidays).\nThe set includes:\n• A large brass Siniya (tray).\n• A sugar bowl.\n• A Merch (rosewater sprinkler).\n• A spoon holder.\n• A napkin holder.",
    descriptionFr: "Sublime Siniya en cuivre jaune authentique avec tous ses accessoires, idéale pour toutes vos heureuses occasions (Fiançailles, Fatiha, Circoncision, Fêtes).\nLe coffret comprend :\n• Une grande Siniya (plateau) en cuivre.\n• Une sucrière.\n• Un Merch (asperseur d'eau de fleur d'oranger).\n• Un porte-cuillères.\n• Un porte-serviettes.",
    price: 45000,
    rentPrice: 7200,
    img: "/31.jpg",
    gallery: ["/31.jpg"],
    artisan: "محترف النحاس",
    artisanImg: "https://i.pravatar.cc/150?u=copper",
    category: 'copper',
    wilaya: 'Constantine',
    rating: 4.9
  },
  {
    id: 32,
    name: "سنيّة نحاس أصفر للشاي",
    nameEn: "Luxury Golden Brass Tea Set",
    nameFr: "Service à Thé en Cuivre",
    description: "سنيّة نحاس أصفر بكامل مستلزماتها طقم فاخر ومنقوش باليد مخصص لشاي.\nيحتوي على: سنيّة صغيرة + براد (أبريق الشاي) + 6 فناجين بالأطباق + صحن صغير.",
    descriptionEn: "Luxury golden brass tea set, beautifully hand-engraved.\nThe set includes:\n• A small brass tray (Siniya).\n• A teapot (Berrad).\n• 6 cups with their saucers.\n• A small dish (saucer bowl).",
    descriptionFr: "Magnifique service à thé de luxe en cuivre jaune, entièrement ciselé à la main.\nLe service comprend :\n• Un petit plateau (Siniya) en cuivre.\n• Une théière (Berrad).\n• 6 tasses avec leurs sous-tasses.\n• Un petit récipient (coupelle).",
    price: 17000,
    img: "/32.jpg",
    gallery: ["/32.jpg"],
    artisan: "محترف النحاس",
    artisanImg: "https://i.pravatar.cc/150?u=copper",
    category: 'copper',
    wilaya: 'Constantine',
    rating: 4.8
  },
  {
    id: 33,
    name: "طقم سلسلة الجوهر الفاخرة",
    nameEn: "Luxury Pearl Necklace and Khayt Al-Rouh Set",
    nameFr: "Ensemble Collier de Perles et Khayt Al-Rouh",
    description: "طقماً متكاملاً وساحراً يجمع بين فخامة التراث وعصرية التصميم، لتكوني ملكة في مناسباتكِ السعيدة.\nمكونات الطقم:\nسلسلة الجوهر الفاخرة: أدوار متناسقة من اللؤلؤ الأبيض الذي يضفي إشراقة فريدة على عنقكِ.\nخيط الروح العريق ومناكش (أقراط) متطابقة",
    descriptionEn: "A complete and enchanting jewelry set that beautifully blends the luxury of heritage with modern design, making you feel like a queen on your special occasions.\nSet Components:\nLuxury Pearl Necklace (Silsilat Al-Jawhar): Harmonious strands of shimmering white pearls that add a unique neckline radiance.\nTraditional Heritage Headpiece (Khayt Al-Rouh) and matching earrings.",
    descriptionFr: "Un ensemble complet et envoûtant qui allie la somptuosité du patrimoine à la modernité du design, pour faire de vous une reine lors de vos heureuses occasions.\nComposition de l'ensemble :\nLe collier de perles précieux (Silsilat Al-Jawhar) : Des rangs harmonieux de perles blanches qui apportent un éclat unique à votre cou.\nLe diadème traditionnel (Khayt Al-Rouh) et ses boucles d'oreilles assorties.",
    price: 19900,
    img: "/33.jpg",
    gallery: ["/33.jpg"],
    artisan: "نور (Admin)",
    artisanImg: "https://i.pravatar.cc/150?u=nour",
    category: 'jewelry',
    jewelryType: 'constantinois',
    wilaya: 'Alger',
    rating: 5.0
  },
  {
    id: 34,
    name: "طقم حذاء وحقيبة قطيفة مطرز",
    nameEn: "Luxury Velvet Pumps and Clutch Set",
    nameFr: "Ensemble Escarpins et Pochette en Velours",
    description: "طقم نسائي فاخر للمناسبات والتصديرة، يجمع بين عصرية التصميم وأصالة التراث.\nطقم متناسق يتكون من حذاء كعب عالٍ وحقيبة يد كلاسيكية، مصنوع من قماش القطيفة الفاخرة باللون الأخضر الملكي، ومطرز بالكامل بزخارف نباتية ذهبية مستوحاة من طرز المجبود التقليدي.",
    descriptionEn: "Luxury women's set for special occasions and bridal trousseau (Tassdira), beautifully blending modern design with authentic heritage.\nThis matching set features high-heeled pumps and a classic evening clutch, exquisitely crafted from premium royal emerald green velvet. It is fully adorned with intricate golden floral embroideries inspired by the traditional heritage \"Majboud\" craftsmanship.",
    descriptionFr: "Ensemble de luxe pour femme, idéal pour les grands événements et le trousseau de la mariée (Tassdira), alliant avec élégance modernité du design et authenticité du patrimoine.\nCet ensemble assorti se compose d'escarpins à talons hauts et d'une pochette classique, confectionnés dans un velours somptueux de couleur vert émeraude royal. Il est entièrement sublimé par de riches broderies dorées aux motifs floraux, fidèlement inspirées de l'art artisanal traditionnel du \"Majboud\".",
    price: 32000,
    img: "/34.jpg",
    gallery: ["/34.jpg"],
    artisan: "حرائر عنابة",
    artisanImg: "https://i.pravatar.cc/150?u=annaba",
    category: 'clothing',
    wilaya: 'Constantine',
    rating: 4.9
  },
  {
    id: 35,
    name: "زوج أساور المقياس بولويزة",
    nameEn: "Pair of Mekyas Bouluiza Bangles",
    nameFr: "Paire de bracelets Mekyas Bouluiza",
    description: "تميزي بإطلالة ملكية ساحرة تعكس أصالة وعمق التراث الجزائري مع زوج من أساور \"المقياس بولويزة\" العريقة. القطعة مصنوعة بدقة عالية من الفضة النقية المشللة (المطلية) بالذهب اللامع عيار 18، لتمنحكِ فخامة الذهب الخالص وبأسعار جد مناسبة.\nالمواصفات:\n• الكمية: زوج متكامل (2 فردة).\n• المعدن الأساسي: فضة عالية الجودة.\n• الطلاء: ذهب عيار 18 (مقاوم لتغير اللون مع العناية).\n• التزيين: قطع لويز تقليدية + حبات جوهر ناعمة.",
    descriptionEn: "Embrace a majestic royal look that reflects the authenticity and depth of Algerian heritage with this exquisite pair of traditional \"Mekyas Bouluiza\" bangles. This piece is meticulously crafted with high precision from fine silver and plated in radiant 18k gold, offering you the opulence of solid gold at an exceptional and affordable price.\nSpecifications:\n• Quantity: A complete pair (2 pieces).\n• Base Metal: High-quality silver.\n• Plating: 18k gold (tarnish-resistant with proper care).\n• Decoration: Traditional Louis coins + delicate pearl accents.",
    descriptionFr: "Parfumez vos tenues d'une touche royale et intemporelle qui reflète l'authenticité et la richesse du patrimoine algérien avec cette superbe paire de bracelets traditionnels \"Mekyas Bouluiza\". Cette pièce est minutieusement façonnée avec une grande précision en argent fin et plaquée d'or éclatant 18 carats, vous offrant toute la splendeur de l'or pur à un prix très abordable.\nCaractéristiques :\n• Quantité : Une paire complète (2 pièces).\n• Métal de base : Argent de haute qualité.\n• Placage : Or 18 carats (résistant au ternissement avec un entretien approprié).\n• Ornements : Pièces de Louis d'or traditionnelles + perles délicates.",
    price: 40000,
    img: "/35.jpeg",
    gallery: ["/35.jpeg"],
    artisan: "لالة تلمسان",
    artisanImg: "https://i.pravatar.cc/150?u=tlem",
    category: 'jewelry',
    jewelryType: 'sahraoui',
    wilaya: 'Tlemcen',
    rating: 4.8
  },
  {
    id: 36,
    name: "طقم الحلي الفضية القبائلية العريقة",
    nameEn: "Authentic Antique Kabyle Silver Jewelry Set",
    nameFr: "Parure de Bijoux Kabyles en Argent",
    description: "طقم الحلي الفضية القبائلية العريقة – أصالة الهوية وسحر الألوان التراثية.\nمكونات الطقم ومواصفاته:\n• العصابة / التاج (الجبين): يزين الجبهة بنقوشه الهندسية والشرابات الفضية المتدلية.\n• المخنق / العقد الفاخر: طوق عريض يلتف حول الرقبة، غني بالتفاصيل المخرمة والمرجان.\n• بروش الصدر (الإبزيم / التخلالة): قطعة دائرية مركزية تضفي توازناً ساحراً على اللباس.\n• الأساور العريضة (المسايس): زوج من الأساور الفضية السميكة والمزخرفة بالكامل لحماية وتزيين المعصم.",
    descriptionEn: "Authentic Antique Kabyle Silver Jewelry Set – Heritage Identity & Vibrant Traditional Colors.\nSet Components & Specifications:\n• The Diadem / Tiara (El Jbine): Adorns the forehead with its geometric engravings and cascading silver tassels.\n• The Luxury Choker / Necklace (El Mekhneq): A wide collar wrapped around the neck, rich in intricate filigree work and coral beads.\n• The Breast Brooch (Fibula / Tabzimt / Takhallalet): A central circular piece that adds a mesmerizing balance to the traditional attire.\n• The Wide Bangles (Les Massais): A pair of thick, fully ornamented silver bracelets designed to protect and embellish the wrists.",
    descriptionFr: "Parure de Bijoux Traditionnels Kabyles en Argent – Authenticité de l'Identité & Magie des Couleurs du Terroir.\nComposition de la parure & Caractéristiques :\n• Le Diadème / Frontal (El Jbine) : Sublime le front grâce à ses gravures géométriques et ses pampilles d'argent pendantes.\n• Le Collier Ras-de-cou de Luxe (El Mekhneq) : Un large collier qui enlace le cou, riche en détails filigranés et serti de corail.\n• La Broche de Poitrine (Fibule / Tabzimt / Takhallalet) : Une pièce circulaire centrale qui apporte un équilibre majestueux à la tenue.\n• Les Larges Bracelets (Les Massais) : Une paire de bracelets épais en argent entièrement ciselé pour magnifier et parer les poignets.",
    price: 25000,
    rentPrice: 3000,
    img: "/36.jpg",
    gallery: ["/36.jpg"],
    artisan: "حرفي القبائل",
    artisanImg: "https://i.pravatar.cc/150?u=kab",
    category: 'jewelry',
    jewelryType: 'kabyle',
    wilaya: 'Tizi Ouzou',
    rating: 5.0
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

const getNameOuter = (p: Product, lang: Language) => {
  if (lang === 'en') return p.nameEn;
  if (lang === 'fr') return p.nameFr;
  return p.name;
};

const ProductCard = ({ 
  p, 
  lang, 
  t, 
  isRtl, 
  currentUser, 
  setIsAuthModalOpen, 
  setSelectedProduct, 
  setIsShareOpen, 
  showToast 
}: { 
  p: Product; 
  lang: Language; 
  t: any; 
  isRtl: boolean; 
  currentUser: any; 
  setIsAuthModalOpen: (o: boolean) => void; 
  setSelectedProduct: (p: Product | null) => void; 
  setIsShareOpen: (o: boolean) => void; 
  showToast: (msg: string) => void; 
}) => {
  return (
    <motion.div 
      layoutId={`product-${p.id}`}
      className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-stone-100 overflow-hidden group shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col h-full"
      onClick={() => setSelectedProduct(p)}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={p.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={getNameOuter(p, lang)} />
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
          <h4 className="font-bold text-xs md:text-sm text-stone-800 leading-tight flex-grow line-clamp-1">{getNameOuter(p, lang)}</h4>
          <div className="flex items-center gap-0.5 text-gold ml-1">
            <Star className="w-3 h-3 fill-gold" />
            <span className="text-[10px] font-black">{p.rating}</span>
          </div>
        </div>
        <p className="text-stone-400 text-[10px] mb-2 md:mb-4 line-clamp-2 leading-relaxed">
          {lang === 'en' && p.descriptionEn ? p.descriptionEn : lang === 'fr' && p.descriptionFr ? p.descriptionFr : p.description}
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
};

const ArtisanSignature = ({ 
  artisan, 
  artisanImg, 
  t, 
  variant = 'compact' 
}: { 
  artisan: string; 
  artisanImg: string; 
  t: any; 
  variant?: 'compact' | 'full'; 
}) => (
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

export default function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [currentTab, setCurrentTab] = useState<Tab>('home');
  const [cart, setCart] = useState<Product[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImgIndex, setActiveImgIndex] = useState<number>(0);

  useEffect(() => {
    setActiveImgIndex(0);
  }, [selectedProduct?.id]);
  const [currentUser, setCurrentUser] = useState<{ role: 'artisan' | 'client', name: string } | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  
  // New States
  const [allProducts, setAllProducts] = useState<Product[]>(products);
  const [productReviews, setProductReviews] = useState<Record<number, { userName: string; rating: number; comment: string; date: string }[]>>({
    1: [
      {
        userName: 'مريم بن علي',
        rating: 5,
        comment: 'قطعة رائعة جداً، التفاصيل مذهلة والتغليف كان راقياً. شكراً لِدَارِ لَالَّاهُمْ.',
        date: '2026-05-30'
      }
    ],
    2: [
      {
        userName: 'سامي ياحي',
        rating: 5,
        comment: 'طقم ممتاز جداً وجودة الفضة رائعة. أنصح به بشدة.',
        date: '2026-05-28'
      }
    ]
  });
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewName, setNewReviewName] = useState('');
  const [activePackage, setActivePackage] = useState<string>('free');
  const [isRentalModalOpen, setIsRentalModalOpen] = useState(false);
  const [rentingProduct, setRentingProduct] = useState<Product | null>(null);
  const [rentalDetails, setRentalDetails] = useState({
    duration: 3,
    startDate: '',
    returnDate: '',
    notes: ''
  });
  const [deliveryDetails, setDeliveryDetails] = useState({
    address: '',
    wilaya: '',
    type: 'home' as 'home' | 'office'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('jewelry');
  const [selectedJewelryType, setSelectedJewelryType] = useState<string>('all');
  const [selectedSubFilter, setSelectedSubFilter] = useState<string>('all');
  const [selectedWilaya, setSelectedWilaya] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number>(500000);
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [newProduct, setNewProduct] = useState({ name: '', nameEn: '', nameFr: '', description: '', descriptionEn: '', descriptionFr: '', wilaya: '', price: '', img: '', category: 'jewelry' as Product['category'] });
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

  const handleAddReview = (productId: number) => {
    if (!newReviewComment.trim()) {
      showToast(isRtl ? 'الرجاء كتابة تعليق' : 'Please write a comment');
      return;
    }
    const nameToUse = currentUser?.name || newReviewName.trim() || (isRtl ? 'زبون زائر' : 'Guest Client');
    const newRev = {
      userName: nameToUse,
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      date: new Date().toISOString().split('T')[0]
    };
    
    const existing = productReviews[productId] || [];
    const updated = [...existing, newRev];
    
    setProductReviews({
      ...productReviews,
      [productId]: updated
    });
    
    // Calculate new average
    const sum = updated.reduce((acc, r) => acc + r.rating, 0);
    const avg = parseFloat((sum / updated.length).toFixed(1));
    
    // Update products state
    setAllProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, rating: avg };
      }
      return p;
    }));
    
    // Update selected product modal if open
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(prev => prev ? { ...prev, rating: avg } : null);
    }
    
    // Reset form states
    setNewReviewComment('');
    setNewReviewName('');
    setNewReviewRating(5);
    showToast(isRtl ? 'شكراً لتقييمك؛ تم نشر تعليقك!' : 'Thank you for your rating; your comment has been published!');
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

  const getName = (p: Product) => getNameOuter(p, lang);

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
    // Validate delivery details first
    if (!deliveryDetails.wilaya || !deliveryDetails.address) {
      showToast(isRtl ? 'يرجى إدخال تفاصيل العنوان والولاية للتوصيل' : 'Please provide delivery address and wilaya');
      return;
    }

    // Only validate card data if online payment is chosen
    if (paymentMethod === 'online' && (!paymentData.cardNumber || !paymentData.expiry || !paymentData.cvv)) {
      showToast(t.product.fillAll);
      return;
    }

    setIsPaying(true);
    
    // Simulate payment / order processing
    setTimeout(() => {
      const newOrder: Order = {
        id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        customerName: currentUser?.name || 'Guest',
        items: [...cart],
        total: cart.reduce((sum: number, item: Product) => sum + (item.isRentalCartItem && item.rentalTotalPrice !== undefined ? item.rentalTotalPrice : item.price), 0),
        date: new Date().toLocaleDateString(lang === 'ar' ? 'ar-DZ' : 'en-US'),
        status: 'pending'
      };

      setOrders([newOrder, ...orders]);
      setNotifications([
        `${t.navigation.cart}: ${newOrder.total} DZD (${deliveryDetails.type === 'home' ? (isRtl ? 'توصيل للمنزل' : 'Home Delivery') : (isRtl ? 'استلام من المكتب' : 'Office Pick')})`, 
        ...notifications
      ]);
      
      showToast(paymentMethod === 'cod' ? (isRtl ? 'تم تسجيل طلبك بالدفع عند الاستلام بنجاح!' : 'Cash on delivery order placed successfully!') : t.cart.paymentSuccess);
      
      // Simulate notifying the artisan
      setTimeout(() => {
        showToast(t.cart.artisanNotified);
      }, 1500);

      setCart([]);
      setIsPaying(false);
      setIsPaymentModalOpen(false);
      setPaymentData({ cardNumber: '', expiry: '', cvv: '', holder: '' });
      setDeliveryDetails({ address: '', wilaya: '', type: 'home' });
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

    // Dynamic package upload limits check
    const currentArtisanProductsCount = allProducts.filter(p => p.artisan === (currentUser?.name || "نور (Admin)")).length;
    let productLimit = 3;
    if (activePackage === 'silver') productLimit = 20;
    else if (activePackage === 'gold') productLimit = 50;
    else if (activePackage === 'platinum' || activePackage === 'diamond') productLimit = 999999;

    if (currentArtisanProductsCount >= productLimit) {
      showToast(isRtl 
        ? `لقد وصلت للحد الأقصى المسموح به لهذه الباقة (${productLimit} منتجات). يرجى ترقيتها من قسم الخدمات.` 
        : `You have reached the maximum product limit for this plan (${productLimit} products). Please upgrade from Services.`
      );
      return;
    }

    const product: Product = {
      id: Date.now(),
      name: newProduct.name,
      nameEn: newProduct.nameEn || newProduct.name,
      nameFr: newProduct.nameFr || newProduct.name,
      description: newProduct.description || (isRtl ? "منتج جديد تم إضافته للحساب" : "New product added to account"),
      descriptionEn: newProduct.descriptionEn || newProduct.description,
      descriptionFr: newProduct.descriptionFr || newProduct.description,
      price: parseInt(newProduct.price),
      img: newProduct.img,
      artisan: currentUser?.name || "نور (Admin)",
      artisanImg: "https://i.pravatar.cc/150?u=nour",
      category: newProduct.category,
      rating: 5,
      wilaya: newProduct.wilaya || 'Alger'
    };

    setAllProducts([product, ...allProducts]);
    setNewProduct({ name: '', nameEn: '', nameFr: '', description: '', descriptionEn: '', descriptionFr: '', wilaya: '', price: '', img: '', category: 'jewelry' });
    setCurrentTab('home');
    showToast(t.sections.successAdd);
  };

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
          {currentTab !== 'home' ? (
            <button 
              onClick={() => setCurrentTab('home')}
              className="p-2 hover:bg-stone-100 rounded-xl transition-colors flex items-center justify-center text-gold"
              title={isRtl ? 'العودة للرئيسية' : 'Back to Home'}
            >
              {isRtl ? <ArrowRight className="w-6 h-6" /> : <ArrowLeft className="w-6 h-6" />}
            </button>
          ) : (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-stone-100 rounded-xl transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
          <div className="hidden sm:flex w-10 h-10 bg-transparent items-center justify-center">
            <img src="/logo.png" className="w-full h-full object-contain" alt="Logo" />
          </div>
        </div>

        <h1 className={`text-gold tracking-tighter text-center line-clamp-1 px-4 ${
          lang === 'ar' 
            ? 'font-arabic-brand text-2xl md:text-3xl font-bold' 
            : 'font-serif text-lg md:text-xl font-bold'
        }`}>
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
                <h2 className={`text-stone-900 uppercase ${
                  lang === 'ar' 
                    ? 'font-arabic-brand text-3xl font-bold' 
                    : 'font-serif text-2xl font-bold'
                }`}>
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

                <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between px-4">
                  <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none">{isRtl ? 'اللغة' : 'Language'}</span>
                  <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-full px-2">
                    <button onClick={() => setLang('ar')} className={`text-[10px] font-bold px-2 py-1 rounded-full transition-all ${lang === 'ar' ? 'bg-gold text-white' : 'text-stone-400'}`}>AR</button>
                    <button onClick={() => setLang('en')} className={`text-[10px] font-bold px-2 py-1 rounded-full transition-all ${lang === 'en' ? 'bg-gold text-white' : 'text-stone-400'}`}>EN</button>
                    <button onClick={() => setLang('fr')} className={`text-[10px] font-bold px-2 py-1 rounded-full transition-all ${lang === 'fr' ? 'bg-gold text-white' : 'text-stone-400'}`}>FR</button>
                  </div>
                </div>

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
                  <ProductCard 
                    key={p.id} 
                    p={p} 
                    lang={lang} 
                    t={t} 
                    isRtl={isRtl} 
                    currentUser={currentUser} 
                    setIsAuthModalOpen={setIsAuthModalOpen} 
                    setSelectedProduct={setSelectedProduct} 
                    setIsShareOpen={setIsShareOpen} 
                    showToast={showToast} 
                  />
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
                  <ProductCard 
                    key={p.id} 
                    p={p} 
                    lang={lang} 
                    t={t} 
                    isRtl={isRtl} 
                    currentUser={currentUser} 
                    setIsAuthModalOpen={setIsAuthModalOpen} 
                    setSelectedProduct={setSelectedProduct} 
                    setIsShareOpen={setIsShareOpen} 
                    showToast={showToast} 
                  />
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

            {/* Packages Section inside Services Tab */}
            <div className="mt-20 space-y-12">
              <div className="text-center space-y-4">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-900">
                  {isRtl ? 'باقات الاشتراك للحرفيين وأصحاب العلامات' : 'Subscription Plans for Artisans & Brands'}
                </h2>
                <p className="text-stone-400 max-w-xl mx-auto text-sm">
                  {isRtl 
                    ? 'اختر الباقة المناسبة لعرض إبداعاتك للزبائن والنمو بهويتك التجارية والصناعة التقليدية الجزائرية.' 
                    : 'Choose the right plan to showcase your creations, grow your brand, and reach Algerian heritage lovers.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-7xl mx-auto gap-6">
                {[
                  { 
                    id: 'free',
                    tag: 'Free',
                    title: isRtl ? 'الباقة المجانية' : 'Free Plan', 
                    price: '0',
                    period: isRtl ? 'دج / شهرياً' : 'DZD / mo',
                    limit: isRtl ? 'محدودة بـ 3 منتجات' : 'Limited to 3 products', 
                    icon: Package, 
                    features: [
                      isRtl ? 'خدمة عرض المنتجات الأساسية' : 'Basic product display',
                      isRtl ? 'الحد الأقصى للتنزيل: 3 منتجات' : 'Upload limit: 3 products'
                    ],
                    accent: false
                  },
                  { 
                    id: 'silver',
                    tag: 'Silver',
                    title: isRtl ? 'الباقة الفضية' : 'Silver Plan', 
                    price: '1,000',
                    period: isRtl ? 'دج / شهرياً' : 'DZD / mo',
                    limit: isRtl ? 'الحد الأقصى: 20 منتج' : 'Upload limit: 20 products', 
                    icon: Briefcase, 
                    features: [
                      isRtl ? 'خدمة عرض المنتجات داخل التطبيق' : 'Product display within the app'
                    ],
                    accent: false
                  },
                  { 
                    id: 'gold',
                    tag: 'Gold',
                    title: isRtl ? 'الباقة الذهبية' : 'Gold Plan', 
                    price: '2,000',
                    period: isRtl ? 'دج / شهرياً' : 'DZD / mo',
                    limit: isRtl ? 'الظهور المميز للزبائن' : 'Featured on home page', 
                    icon: Zap, 
                    features: [
                      isRtl ? 'خدمة عرض المنتجات في الصفحة الأولى' : 'Featured display on the home page'
                    ],
                    accent: true
                  },
                  { 
                    id: 'platinum',
                    tag: 'Platinum',
                    title: isRtl ? 'الباقة البلاتينية' : 'Platinum Plan', 
                    price: '8,500',
                    period: isRtl ? 'دج / شهرياً' : 'DZD / mo',
                    limit: isRtl ? 'منتجات غير محدودة وبناء الهوية' : 'Pro brand builder', 
                    icon: Star, 
                    features: [
                      isRtl ? 'خدمة عرض المنتجات' : 'Product display',
                      isRtl ? 'التصوير الاحترافي للمنتجات' : 'Professional product photography',
                      isRtl ? 'التسويق الفعال عبر وسائل التواصل' : 'Active social media marketing'
                    ],
                    accent: false
                  },
                  { 
                    id: 'diamond',
                    tag: 'Diamond',
                    title: isRtl ? 'الباقة الماسّية' : 'Diamond Plan', 
                    price: '10,500',
                    period: isRtl ? 'دج / شهرياً' : 'DZD / mo',
                    limit: isRtl ? 'التميز الشامل وبناء العلامة' : 'Elite Brand Tier', 
                    icon: Trophy, 
                    features: [
                      isRtl ? 'خدمة عرض المنتجات' : 'Product display',
                      isRtl ? 'التصوير الاحترافي للمنتجات' : 'Professional product photography',
                      isRtl ? 'دراسات جمهور وتحديد الفئة المستهدفة' : 'Audience studies & demographic research',
                      isRtl ? 'التسويق الفعال عبر وسائل التواصل' : 'Active social media marketing'
                    ],
                    accent: false
                  }
                ].map((pkg, i) => (
                  <div key={i} className={`p-6 rounded-[2.5rem] border flex flex-col ${pkg.accent ? 'bg-stone-900 text-white border-stone-800 ring-4 ring-gold/30' : 'bg-white border-stone-100'} shadow-sm relative transition-all hover:scale-[1.02] hover:shadow-xl`}>
                    {pkg.accent && (
                      <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-stone-900 font-extrabold text-[9px] uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                        {isRtl ? 'الأكثر طلباً' : 'Most Popular'}
                      </span>
                    )}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shrink-0 ${pkg.accent ? 'bg-gold text-stone-900' : 'bg-gold/10 text-gold'}`}>
                      <pkg.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold mb-1">{pkg.title}</h4>
                    <p className={`text-[10px] mb-4 font-bold tracking-wider uppercase ${pkg.accent ? 'text-stone-400' : 'text-stone-500'}`}>{pkg.limit}</p>
                    
                    {/* Price Tag */}
                    <div className="mb-6 flex items-baseline gap-1">
                      <span className="text-3xl font-serif font-black text-gold">{pkg.price}</span>
                      <span className={`text-[10px] font-bold ${pkg.accent ? 'text-stone-400' : 'text-stone-500'}`}>{pkg.period}</span>
                    </div>

                    <div className="space-y-3 mb-8 flex-grow">
                      {pkg.features.map((f, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                          <span className="text-xs shrink-1 leading-tight font-medium">{f}</span>
                        </div>
                      ))}
                    </div>
                    
                    <button 
                      onClick={() => {
                        if (!currentUser) {
                          setIsAuthModalOpen(true);
                          showToast(isRtl ? 'الرجاء تسجيل الدخول أولاً لاختيار باقة' : 'Please login first to choose a plan');
                        } else {
                          setActivePackage(pkg.id);
                          showToast(isRtl ? `تم تفعيل الباقة ${pkg.title} بنجاح!` : `Plan ${pkg.title} activated successfully!`);
                        }
                      }}
                      className={`w-full py-4 rounded-xl font-bold text-xs transition-all ${
                        activePackage === pkg.id 
                          ? 'bg-stone-100 text-stone-400 cursor-not-allowed border-2 border-stone-100' 
                          : (pkg.accent ? 'bg-gold text-stone-900 hover:bg-gold/90' : 'bg-stone-900 text-white hover:bg-stone-800')
                      }`}
                      disabled={activePackage === pkg.id}
                    >
                      {activePackage === pkg.id ? (isRtl ? 'مفعلة' : 'Active') : (isRtl ? 'اختيار الباقة' : 'Choose Plan')}
                    </button>
                  </div>
                ))}
              </div>
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
                    <ProductCard 
                      key={p.id} 
                      p={p} 
                      lang={lang} 
                      t={t} 
                      isRtl={isRtl} 
                      currentUser={currentUser} 
                      setIsAuthModalOpen={setIsAuthModalOpen} 
                      setSelectedProduct={setSelectedProduct} 
                      setIsShareOpen={setIsShareOpen} 
                      showToast={showToast} 
                    />
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
                          
                          {item.isRentalCartItem ? (
                            <div className="mt-2 space-y-1">
                              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 text-[10px] px-2.5 py-0.5 rounded-lg font-black border border-amber-100 uppercase tracking-wider">
                                <Calendar className="w-3 h-3" />
                                {isRtl ? 'حجز كراء' : 'Rental'} - {item.rentalDuration} {isRtl ? 'أيام' : 'Days'}
                              </span>
                              <p className="text-stone-500 text-xs">
                                {isRtl ? 'تاريخ الحجز:' : 'Booking Date:'} {item.rentalStartDate} {isRtl ? 'إلى' : 'to'} {item.rentalReturnDate}
                              </p>
                              {item.rentalNotes && (
                                <p className="text-stone-400 text-[11px] italic">
                                  "{item.rentalNotes}"
                                </p>
                              )}
                              <p className="text-gold font-black text-sm">
                                {item.rentalTotalPrice?.toLocaleString()} {isRtl ? 'دج إجمالي الكراء' : 'DZD Total'}
                              </p>
                            </div>
                          ) : (
                            <p className="text-gold font-black mt-1">{item.price.toLocaleString()} {isRtl ? 'دج' : 'DZD'}</p>
                          )}
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
                        {cart.reduce((sum, item) => sum + (item.isRentalCartItem && item.rentalTotalPrice !== undefined ? item.rentalTotalPrice : item.price), 0).toLocaleString()} {isRtl ? 'دج' : 'DZD'}
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
                    <ProductCard 
                      key={p.id} 
                      p={p} 
                      lang={lang} 
                      t={t} 
                      isRtl={isRtl} 
                      currentUser={currentUser} 
                      setIsAuthModalOpen={setIsAuthModalOpen} 
                      setSelectedProduct={setSelectedProduct} 
                      setIsShareOpen={setIsShareOpen} 
                      showToast={showToast} 
                    />
                  ))}
                </div>
              </div>

              {/* Packages Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-7xl mx-auto gap-6">
                {[
                  { 
                    id: 'free',
                    tag: 'Free',
                    title: isRtl ? 'الباقة المجانية' : 'Free Plan', 
                    price: '0',
                    period: isRtl ? 'دج / شهرياً' : 'DZD / mo',
                    limit: isRtl ? 'محدودة بـ 3 منتجات' : 'Limited to 3 products', 
                    icon: Package, 
                    features: [
                      isRtl ? 'خدمة عرض المنتجات الأساسية' : 'Basic product display',
                      isRtl ? 'الحد الأقصى للتنزيل: 3 منتجات' : 'Upload limit: 3 products'
                    ],
                    accent: false
                  },
                  { 
                    id: 'silver',
                    tag: 'Silver',
                    title: isRtl ? 'الباقة الفضية' : 'Silver Plan', 
                    price: '1,000',
                    period: isRtl ? 'دج / شهرياً' : 'DZD / mo',
                    limit: isRtl ? 'الحد الأقصى: 20 منتج' : 'Upload limit: 20 products', 
                    icon: Briefcase, 
                    features: [
                      isRtl ? 'خدمة عرض المنتجات داخل التطبيق' : 'Product display within the app'
                    ],
                    accent: false
                  },
                  { 
                    id: 'gold',
                    tag: 'Gold',
                    title: isRtl ? 'الباقة الذهبية' : 'Gold Plan', 
                    price: '2,000',
                    period: isRtl ? 'دج / شهرياً' : 'DZD / mo',
                    limit: isRtl ? 'الظهور المميز للزبائن' : 'Featured on home page', 
                    icon: Zap, 
                    features: [
                      isRtl ? 'خدمة عرض المنتجات في الصفحة الأولى' : 'Featured display on the home page'
                    ],
                    accent: true
                  },
                  { 
                    id: 'platinum',
                    tag: 'Platinum',
                    title: isRtl ? 'الباقة البلاتينية' : 'Platinum Plan', 
                    price: '8,500',
                    period: isRtl ? 'دج / شهرياً' : 'DZD / mo',
                    limit: isRtl ? 'منتجات غير محدودة وبناء الهوية' : 'Pro brand builder', 
                    icon: Star, 
                    features: [
                      isRtl ? 'خدمة عرض المنتجات' : 'Product display',
                      isRtl ? 'التصوير الاحترافي للمنتجات' : 'Professional product photography',
                      isRtl ? 'التسويق الفعال عبر وسائل التواصل' : 'Active social media marketing'
                    ],
                    accent: false
                  },
                  { 
                    id: 'diamond',
                    tag: 'Diamond',
                    title: isRtl ? 'الباقة الماسّية' : 'Diamond Plan', 
                    price: '10,500',
                    period: isRtl ? 'دج / شهرياً' : 'DZD / mo',
                    limit: isRtl ? 'التميز الشامل وبناء العلامة' : 'Elite Brand Tier', 
                    icon: Trophy, 
                    features: [
                      isRtl ? 'خدمة عرض المنتجات' : 'Product display',
                      isRtl ? 'التصوير الاحترافي للمنتجات' : 'Professional product photography',
                      isRtl ? 'دراسات جمهور وتحديد الفئة المستهدفة' : 'Audience studies & demographic research',
                      isRtl ? 'التسويق الفعال عبر وسائل التواصل' : 'Active social media marketing'
                    ],
                    accent: false
                  }
                ].map((pkg, i) => (
                  <div key={i} className={`p-6 rounded-[2.5rem] border flex flex-col ${pkg.accent ? 'bg-stone-900 text-white border-stone-800 ring-4 ring-gold/30' : 'bg-white border-stone-100'} shadow-sm relative transition-all hover:scale-[1.02] hover:shadow-xl`}>
                    {pkg.accent && (
                      <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-stone-900 font-extrabold text-[9px] uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                        {isRtl ? 'الأكثر طلباً' : 'Most Popular'}
                      </span>
                    )}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shrink-0 ${pkg.accent ? 'bg-gold text-stone-900' : 'bg-gold/10 text-gold'}`}>
                      <pkg.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold mb-1">{pkg.title}</h4>
                    <p className={`text-[10px] mb-4 font-bold tracking-wider uppercase ${pkg.accent ? 'text-stone-400' : 'text-stone-500'}`}>{pkg.limit}</p>
                    
                    {/* Price Tag */}
                    <div className="mb-6 flex items-baseline gap-1">
                      <span className="text-3xl font-serif font-black text-gold">{pkg.price}</span>
                      <span className={`text-[10px] font-bold ${pkg.accent ? 'text-stone-400' : 'text-stone-500'}`}>{pkg.period}</span>
                    </div>

                    <div className="space-y-3 mb-8 flex-grow">
                      {pkg.features.map((f, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                          <span className="text-xs shrink-1 leading-tight font-medium">{f}</span>
                        </div>
                      ))}
                    </div>
                    
                    <button 
                      onClick={() => {
                        setActivePackage(pkg.id);
                        showToast(isRtl ? `تم تفعيل الباقة ${pkg.title} بنجاح!` : `Plan ${pkg.title} activated successfully!`);
                      }}
                      className={`w-full py-4 rounded-xl font-bold text-xs transition-all ${
                        activePackage === pkg.id 
                          ? 'bg-stone-100 text-stone-400 cursor-not-allowed border-2 border-stone-100' 
                          : (pkg.accent ? 'bg-gold text-stone-900 hover:bg-gold/90' : 'bg-stone-900 text-white hover:bg-stone-800')
                      }`}
                      disabled={activePackage === pkg.id}
                    >
                      {activePackage === pkg.id ? (isRtl ? 'مفعلة' : 'Active') : (isRtl ? 'اختيار الباقة' : 'Choose Plan')}
                    </button>
                  </div>
                ))}
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Name (EN)</label>
                        <input 
                          type="text" 
                          value={newProduct.nameEn}
                          onChange={(e) => setNewProduct({ ...newProduct, nameEn: e.target.value })}
                          className="w-full px-6 py-3 bg-stone-50 border border-stone-100 rounded-xl focus:outline-none text-sm font-bold"
                          placeholder="e.g. Royal Karakou"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Nom (FR)</label>
                        <input 
                          type="text" 
                          value={newProduct.nameFr}
                          onChange={(e) => setNewProduct({ ...newProduct, nameFr: e.target.value })}
                          className="w-full px-6 py-3 bg-stone-50 border border-stone-100 rounded-xl focus:outline-none text-sm font-bold"
                          placeholder="ex: Karakou Royal"
                        />
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Description (EN)</label>
                        <textarea 
                          value={newProduct.descriptionEn}
                          onChange={(e) => setNewProduct({ ...newProduct, descriptionEn: e.target.value })}
                          className="w-full px-6 py-3 bg-stone-50 border border-stone-100 rounded-xl focus:outline-none text-sm font-bold min-h-[80px]"
                          placeholder="English description..."
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Description (FR)</label>
                        <textarea 
                          value={newProduct.descriptionFr}
                          onChange={(e) => setNewProduct({ ...newProduct, descriptionFr: e.target.value })}
                          className="w-full px-6 py-3 bg-stone-50 border border-stone-100 rounded-xl focus:outline-none text-sm font-bold min-h-[80px]"
                          placeholder="Description en français..."
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
             <h4 className={`text-gold tracking-tighter ${
               lang === 'ar' 
                 ? 'font-arabic-brand text-3xl font-bold' 
                 : 'font-serif text-2xl font-bold'
             }`}>
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
              className="relative bg-white w-full max-w-4xl rounded-[2.5rem] md:rounded-[3.5rem] overflow-y-auto md:overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-[510] w-10 h-10 md:w-12 md:h-12 bg-stone-900/80 hover:bg-stone-900 text-white rounded-full flex items-center justify-center font-bold transition-all shadow-lg"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <div className="relative w-full h-64 sm:h-72 md:h-auto md:w-1/2 shrink-0 overflow-hidden bg-stone-100">
                {/* Image Gallery/Slideshow */}
                <div className="w-full h-full relative">
                  <img 
                    src={selectedProduct.gallery && selectedProduct.gallery[activeImgIndex] ? selectedProduct.gallery[activeImgIndex] : selectedProduct.img} 
                    className="w-full h-full object-cover transition-all duration-300" 
                    alt={getName(selectedProduct)} 
                  />
                  
                  {/* Left & Right Arrows */}
                  {selectedProduct.gallery && selectedProduct.gallery.length > 1 && (
                    <>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImgIndex(prev => (prev - 1 + selectedProduct.gallery!.length) % selectedProduct.gallery!.length);
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 hover:bg-white text-stone-900 rounded-full flex items-center justify-center font-bold transition-all shadow-md z-10"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImgIndex(prev => (prev + 1) % selectedProduct.gallery!.length);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 hover:bg-white text-stone-900 rounded-full flex items-center justify-center font-bold transition-all shadow-md z-10"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {/* Pagination Indicator dots */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-stone-900/60 px-2.5 py-1.5 rounded-full backdrop-blur-sm">
                        {selectedProduct.gallery.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveImgIndex(idx);
                            }}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${idx === activeImgIndex ? 'bg-gold w-3' : 'bg-white/60 hover:bg-white'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="w-full md:w-1/2 p-6 sm:p-10 md:p-12 md:overflow-y-auto no-scrollbar space-y-6 md:space-y-8 flex flex-col justify-start md:justify-center">
                <ArtisanSignature artisan={selectedProduct.artisan} artisanImg={selectedProduct.artisanImg} t={t} variant="full" />

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
                  {lang === 'en' && selectedProduct.descriptionEn ? selectedProduct.descriptionEn : lang === 'fr' && selectedProduct.descriptionFr ? selectedProduct.descriptionFr : selectedProduct.description}
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
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                      {isRtl ? 'الآراء والتقييمات' : 'Reviews & Comments'}
                    </p>
                    <div className="flex items-center gap-1 text-gold">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} className={`w-3.5 h-3.5 ${star <= Math.floor(selectedProduct.rating) ? 'fill-gold text-gold' : 'text-stone-200'}`} />
                      ))}
                      <span className="text-xs font-black ml-1 text-stone-800 bg-gold/10 px-2 py-0.5 rounded-full">{selectedProduct.rating} / 5</span>
                    </div>
                  </div>

                  {/* List of active reviews */}
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                    {(productReviews[selectedProduct.id] || []).length === 0 ? (
                      <p className="text-xs text-stone-400 italic text-center py-4">
                        {isRtl ? 'لا توجد تقييمات بعد. كن أول من يشارك رأيه!' : 'No reviews yet. Be the first to share your opinion!'}
                      </p>
                    ) : (
                      (productReviews[selectedProduct.id] || []).map((rev, idx) => (
                        <div key={idx} className="bg-stone-50/70 p-4 rounded-2xl border border-stone-100/30 space-y-1.5">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-extrabold text-stone-700">{rev.userName}</span>
                            <span className="text-[9px] text-stone-400 font-bold">{rev.date}</span>
                          </div>
                          <div className="flex gap-0.5 text-gold">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star 
                                key={star} 
                                className={`w-3 h-3 ${star <= rev.rating ? 'fill-gold text-gold' : 'text-stone-200'}`} 
                              />
                            ))}
                          </div>
                          <p className="text-xs text-stone-600 leading-relaxed font-semibold">{rev.comment}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add review form */}
                  <div className="bg-stone-50/50 border border-stone-100/50 p-4 rounded-[2rem] space-y-3 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest">
                        {isRtl ? 'أضف تقييمك والتعليق' : 'Add your rating & comment'}
                      </span>
                      {/* Star Rating selector */}
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReviewRating(star)}
                            className="p-1 hover:scale-125 transition-transform"
                            title={`${star} stars`}
                          >
                            <Star
                              className={`w-5 h-5 transition-colors ${
                                star <= newReviewRating ? 'fill-gold text-gold' : 'text-stone-200'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {!currentUser && (
                      <input
                        type="text"
                        placeholder={isRtl ? 'اسمك الكريم (اختياري)' : 'Your name (optional)'}
                        value={newReviewName}
                        onChange={(e) => setNewReviewName(e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-stone-100 rounded-xl outline-none focus:ring-2 focus:ring-gold font-bold text-xs"
                      />
                    )}

                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder={isRtl ? 'اكتب تعليقك هنا...' : 'Write your comment here...'}
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        className="flex-grow px-4 py-2.5 bg-white border border-stone-100 rounded-xl outline-none focus:ring-2 focus:ring-gold text-xs font-medium"
                      />
                      <button
                        onClick={() => handleAddReview(selectedProduct.id)}
                        className="px-5 py-2.5 bg-stone-900 text-white rounded-xl font-bold text-xs hover:bg-stone-800 active:scale-95 transition-all shadow-md shrink-0"
                      >
                        {isRtl ? 'نشر' : 'Post'}
                      </button>
                    </div>
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
                        if (!currentUser) {
                          setIsAuthModalOpen(true);
                        } else {
                          const today = new Date().toISOString().split('T')[0];
                          const returnD = new Date();
                          returnD.setDate(returnD.getDate() + 3);
                          const returnStr = returnD.toISOString().split('T')[0];
                          
                          setRentalDetails({
                            duration: 3,
                            startDate: today,
                            returnDate: returnStr,
                            notes: ''
                          });
                          setRentingProduct(selectedProduct);
                          setIsRentalModalOpen(true);
                          setSelectedProduct(null);
                        }
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
              className="fixed inset-0 z-[1200] bg-black/40"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[1210] bg-white rounded-t-[4rem] p-12 shadow-2xl text-center"
            >
              <div className="w-12 h-1.5 bg-stone-100 rounded-full mx-auto mb-10" />
              <h3 className="font-serif text-2xl font-bold mb-12 uppercase">{t.sections.shareVia}</h3>
              <div className="grid grid-cols-4 gap-8 max-w-xl mx-auto">
                {['WhatsApp', 'Facebook', 'Telegram', 'Copy Link'].map((platform, i) => (
                  <button 
                    key={i} 
                    onClick={() => { showToast(`${t.sections.sharedVia} ${platform}`); setIsShareOpen(false); }}
                    className="flex flex-col items-center gap-4 group"
                  >
                    <div className="w-16 h-16 bg-stone-50 rounded-[1.5rem] flex items-center justify-center text-stone-600 shadow-inner group-hover:bg-gold/10 group-hover:text-gold transition-all">
                      {i === 3 ? <Globe className="w-6 h-6" /> : <Share2 className="w-6 h-6" />}
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
          <div className="fixed inset-0 z-[1500] flex items-center justify-center p-4">
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
              className="relative bg-white w-full max-w-md rounded-[3rem] overflow-hidden shadow-2xl z-[1510]"
            >
              <div className="bg-gold p-8 text-center text-white relative">
                <button 
                  onClick={() => setIsAuthModalOpen(false)}
                  className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} w-8 h-8 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center font-bold transition-all z-50`}
                >
                  <X className="w-4 h-4" />
                </button>

                <h3 className="font-serif text-3xl font-bold uppercase">{t.auth.title}</h3>
                <p className="text-white/70 text-[10px] font-black uppercase tracking-widest mt-2">{t.auth.subtitle}</p>
                
                <div className="flex gap-1 mt-6 bg-black/10 p-1 rounded-full overflow-hidden">
                  <button 
                    onClick={() => { setAuthMode('login'); setLoginError(null); }}
                    className={`flex-1 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${authMode === 'login' ? 'bg-white text-gold' : 'text-white/60 hover:text-white'}`}
                  >
                    {isRtl ? 'دخول' : 'Connexion'}
                  </button>
                  <button 
                    onClick={() => { setAuthMode('register-client'); setLoginError(null); }}
                    className={`flex-1 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${authMode === 'register-client' ? 'bg-white text-gold' : 'text-white/60 hover:text-white'}`}
                  >
                    {isRtl ? 'زبون' : 'Client'}
                  </button>
                  <button 
                    onClick={() => { setAuthMode('register-artisan'); setLoginError(null); }}
                    className={`flex-1 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${authMode === 'register-artisan' ? 'bg-white text-gold' : 'text-white/60 hover:text-white'}`}
                  >
                    {isRtl ? 'حرفي' : 'Artisan'}
                  </button>
                </div>
              </div>

              <div className="p-8 space-y-6">
                {authMode === 'login' && (
                  <div className="space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{isRtl ? 'اسم المستخدم' : 'Username'}</label>
                        <input 
                          type="text" 
                          placeholder="e.g. ADMIN or NOUR"
                          className="w-full px-5 py-3 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-gold outline-none font-bold text-sm"
                          value={loginCreds.username}
                          onChange={(e) => setLoginCreds({...loginCreds, username: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{isRtl ? 'كلمة المرور' : 'Password'}</label>
                        <input 
                          type="password" 
                          placeholder="••••••••"
                          className="w-full px-5 py-3 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-gold outline-none font-bold text-sm"
                          value={loginCreds.password}
                          onChange={(e) => setLoginCreds({...loginCreds, password: e.target.value})}
                        />
                      </div>
                    </div>

                    <button 
                      onClick={handleLogin}
                      className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold shadow-xl hover:bg-stone-800 transition-all uppercase tracking-widest text-sm"
                    >
                      {isRtl ? 'تسجيل الدخول' : 'Connexion'}
                    </button>

                    {loginError && <p className="text-red-500 text-[10px] font-black text-center uppercase">{loginError}</p>}

                    <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100/50 space-y-2 text-[11px]">
                      <p className="font-bold text-stone-500 uppercase tracking-wider">{isRtl ? 'حسابات التجربة آمنة:' : 'Secure Demo Accounts:'}</p>
                      <ul className="list-disc list-inside text-stone-400 font-medium space-y-1">
                        <li><strong className="text-stone-600">ADMIN / ADMIN</strong> — {isRtl ? 'لوحة تحكم الحرفي (نور)' : 'Artisan Dashboard (Nour)'}</li>
                        <li><strong className="text-stone-600">NOUR / NOUR</strong> — {isRtl ? 'حساب زبون للتجربة' : 'Client Demo Account'}</li>
                      </ul>
                    </div>
                  </div>
                )}

                {authMode === 'register-client' && (
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
                )}

                {authMode === 'register-artisan' && (
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

      {/* Rental Booking Modal */}
      <AnimatePresence>
        {isRentalModalOpen && rentingProduct && (
          <div className="fixed inset-0 z-[800] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-stone-900/80 backdrop-blur-md" 
              onClick={() => setIsRentalModalOpen(false)} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-[3rem] overflow-hidden shadow-2xl z-10"
            >
              <div className="bg-stone-900 p-8 text-center text-white relative">
                <button onClick={() => setIsRentalModalOpen(false)} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold mx-auto mb-4">
                  <Star className="w-6 h-6 fill-gold" />
                </div>
                <h3 className="text-xl font-bold">{isRtl ? 'تفاصيل حجز الكراء' : 'Rental Booking Details'}</h3>
                <p className="text-stone-400 text-sm mt-2">{isRtl ? rentingProduct.name : rentingProduct.nameEn}</p>
              </div>

              <div className="p-8 space-y-6">
                {/* Rental Duration Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex justify-between">
                    <span>{isRtl ? 'المدة (بالأيام)' : 'Duration (Days)'}</span>
                    <span className="text-gold font-bold">{rentalDetails.duration * (rentingProduct.rentPrice || 0)} {isRtl ? 'دج إجمالي' : 'DZD Total'}</span>
                  </label>
                  <div className="flex items-center justify-between bg-stone-50 p-2 rounded-2xl border border-stone-100">
                    <button 
                      type="button"
                      onClick={() => {
                        const newDur = Math.max(1, rentalDetails.duration - 1);
                        const start = new Date(rentalDetails.startDate || new Date());
                        start.setDate(start.getDate() + newDur);
                        setRentalDetails({
                          ...rentalDetails,
                          duration: newDur,
                          returnDate: start.toISOString().split('T')[0]
                        });
                      }}
                      className="w-10 h-10 bg-white rounded-xl shadow-sm border border-stone-100 flex items-center justify-center font-bold text-stone-600 hover:bg-stone-50 active:scale-95"
                    >
                      -
                    </button>
                    <span className="font-bold text-lg text-stone-900">{rentalDetails.duration} {isRtl ? 'أيام' : 'Days'}</span>
                    <button 
                      type="button"
                      onClick={() => {
                        const newDur = rentalDetails.duration + 1;
                        const start = new Date(rentalDetails.startDate || new Date());
                        start.setDate(start.getDate() + newDur);
                        setRentalDetails({
                          ...rentalDetails,
                          duration: newDur,
                          returnDate: start.toISOString().split('T')[0]
                        });
                      }}
                      className="w-10 h-10 bg-white rounded-xl shadow-sm border border-stone-100 flex items-center justify-center font-bold text-stone-600 hover:bg-stone-50 active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Start Date Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{isRtl ? 'تاريخ بداية الكراء' : 'Rental Start Date'}</label>
                  <input 
                    type="date" 
                    value={rentalDetails.startDate}
                    onChange={(e) => {
                      const startStr = e.target.value;
                      if (startStr) {
                        const start = new Date(startStr);
                        start.setDate(start.getDate() + rentalDetails.duration);
                        setRentalDetails({
                          ...rentalDetails,
                          startDate: startStr,
                          returnDate: start.toISOString().split('T')[0]
                        });
                      }
                    }}
                    className="w-full px-5 py-4 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-gold outline-none font-bold text-stone-900"
                  />
                </div>

                {/* Return Date Badge */}
                <div className="p-4 bg-amber-50/50 border border-amber-100/50 rounded-2xl flex items-center justify-between text-xs font-bold text-stone-800">
                  <div className="flex items-center gap-2 text-stone-500">
                    <Calendar className="w-4 h-4 text-gold shrink-0" />
                    <span>{isRtl ? 'تاريخ الارجاع المتوقع:' : 'Expected Return Date:'}</span>
                  </div>
                  <span className="px-3 py-1 bg-gold text-stone-900 rounded-lg">{rentalDetails.returnDate}</span>
                </div>

                {/* Additional Notes */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{isRtl ? 'ملاحظات إضافية' : 'Special Notes'}</label>
                  <textarea 
                    value={rentalDetails.notes}
                    onChange={(e) => setRentalDetails({...rentalDetails, notes: e.target.value})}
                    placeholder={isRtl ? "مثال: المقاس المطلوب، تفاصيل التوصيل المفضلة..." : "e.g. Preferred size, pickup requests..."}
                    className="w-full px-5 py-3 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-gold outline-none text-sm font-medium"
                    rows={2}
                  />
                </div>

                {/* Confirm Hire */}
                <button 
                  onClick={() => {
                    const priceTotal = rentalDetails.duration * (rentingProduct.rentPrice || 0);
                    
                    const rentalCartItem: Product = {
                      ...rentingProduct,
                      isRentalCartItem: true,
                      rentalDuration: rentalDetails.duration,
                      rentalStartDate: rentalDetails.startDate,
                      rentalReturnDate: rentalDetails.returnDate,
                      rentalNotes: rentalDetails.notes,
                      rentalTotalPrice: priceTotal
                    };

                    setCart([...cart, rentalCartItem]);
                    setNotifications([
                      `${isRtl ? 'حجز كراء بالسلة' : 'Rental booking in cart'} (${isRtl ? rentingProduct.name : rentingProduct.nameEn}): ${priceTotal} DZD`, 
                      ...notifications
                    ]);
                    showToast(isRtl ? 'تمت إضافة طلب حجز الكراء إلى السلة بنجاح!' : 'Rental booking added to cart successfully!');
                    setIsRentalModalOpen(false);
                    setRentingProduct(null);
                    setCurrentTab('cart');
                  }}
                  className="w-full py-5 bg-gold text-white rounded-2xl font-bold shadow-xl shadow-gold/20 flex items-center justify-center gap-3 active:scale-95 transition-all text-lg"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  {isRtl ? 'تأكيد حجز الكراء' : 'Confirm Rental'}
                </button>
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

              <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Shipping & Delivery Details */}
                <div className="p-5 bg-stone-50 rounded-[2rem] border border-stone-100 space-y-4">
                  <p className="text-xs font-black text-stone-900 uppercase tracking-widest border-b border-stone-200 pb-2">
                    {isRtl ? 'تفاصيل التوصيل والشحن' : 'Shipping & Delivery Details'}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">{isRtl ? 'الولاية *' : 'Wilaya *'}</label>
                      <input 
                        type="text" 
                        placeholder={isRtl ? "الجزائر، وهران..." : "e.g. Alger"}
                        className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-gold outline-none text-xs font-bold"
                        value={deliveryDetails.wilaya}
                        onChange={(e) => setDeliveryDetails({...deliveryDetails, wilaya: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">{isRtl ? 'العنوان الكامل *' : 'Full Address *'}</label>
                      <input 
                        type="text" 
                        placeholder={isRtl ? "شارع ديدوش، عمارة 5" : "e.g. 5 Rue Didouche"}
                        className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-gold outline-none text-xs font-bold"
                        value={deliveryDetails.address}
                        onChange={(e) => setDeliveryDetails({...deliveryDetails, address: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block">{isRtl ? 'مكان استلام التوصيل' : 'Delivery Destination'}</label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <button 
                        type="button"
                        onClick={() => setDeliveryDetails({...deliveryDetails, type: 'home'})}
                        className={`py-2 px-4 rounded-xl border text-xs font-bold transition-all ${deliveryDetails.type === 'home' ? 'bg-stone-900 text-white border-stone-900 font-extrabold shadow-sm' : 'bg-white text-stone-500 border-stone-200'}`}
                      >
                        {isRtl ? 'توصيل للمنزل' : 'Home Delivery'}
                      </button>
                      <button 
                        type="button"
                        onClick={() => setDeliveryDetails({...deliveryDetails, type: 'office'})}
                        className={`py-2 px-4 rounded-xl border text-xs font-bold transition-all ${deliveryDetails.type === 'office' ? 'bg-stone-900 text-white border-stone-900 font-extrabold shadow-sm' : 'bg-white text-stone-500 border-stone-200'}`}
                      >
                        {isRtl ? 'توصيل للمكتب' : 'Office Delivery'}
                      </button>
                    </div>
                  </div>
                </div>

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
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[90] bg-white/95 backdrop-blur-3xl border-t border-stone-200/60 shadow-[0_-8px_30px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom,16px)] pt-2 px-6">
        <div className="flex items-center justify-around">
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
