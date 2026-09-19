import { ShoeReview, ShoeFeature } from './types';

export const SHOE_DETAILS = {
  name: "OUTDOOR SPORTS Trail Trekker Pro",
  arabicName: "حذاء المغامرات والمسارات الوعرة OUTDOOR SPORTS",
  tagline: "Comfort • Style • Adventure",
  arabicTagline: "راحة استثنائية، أناقة رياضية، وثبات فائق في كل خطوة",
  price: 299,
  originalPrice: 450,
  discountPercentage: 34,
  twoPairsPrice: 499,
  twoPairsDiscount: 99,
  currency: "درهم",
  deliveryTime: "خلال 24 إلى 48 ساعة",
  defaultSize: 38,
  sizes: [
    { size: 36, footLength: "23.0 cm", inStock: true, stockLeft: 4 },
    { size: 37, footLength: "23.5 cm", inStock: true, stockLeft: 6 },
    { size: 38, footLength: "24.0 cm", inStock: true, stockLeft: 8 },
    { size: 39, footLength: "24.5 cm", inStock: true, stockLeft: 7 },
    { size: 40, footLength: "25.0 cm", inStock: true, stockLeft: 5 },
    { size: 41, footLength: "25.5 cm", inStock: true, stockLeft: 3 },
  ],
  colors: [
    { 
      id: "stealth-black", 
      name: "أسود فحمي كربوني (Stealth Black)", 
      colorLabel: "أسود كربوني",
      hex: "#1F2124", 
      secondaryHex: "#3E4347",
      imageUrl: "https://i.ibb.co/F4LrczqB/Gemini-Generated-Image-82s1gl82s1gl82s1.jpg"
    },
    { 
      id: "ice-grey", 
      name: "رمادي ثلجي فاتح (Ice Grey)", 
      colorLabel: "رمادي ثلجي",
      hex: "#D4D2CB", 
      secondaryHex: "#8E8B83",
      imageUrl: "https://i.ibb.co/spLvQ5qz/Gemini-Generated-Image-rkymnerkymnerkym.jpg"
    },
    { 
      id: "desert-khaki", 
      name: "بيج صحراوي كاكي (Desert Khaki)", 
      colorLabel: "كاكي صحراوي",
      hex: "#C4A77D", 
      secondaryHex: "#5E6953",
      imageUrl: "https://i.ibb.co/dJ0JDy5T/IMG-20260919-WA0003.jpg"
    },
  ],
  images: [
    {
      url: "https://i.ibb.co/F4LrczqB/Gemini-Generated-Image-82s1gl82s1gl82s1.jpg",
      caption: "اللون الأسود الفحمي الكربوني (Stealth Black)",
      alt: "OUTDOOR SPORTS حذاء المغامرات - أسود كربوني",
      colorId: "stealth-black"
    },
    {
      url: "https://i.ibb.co/spLvQ5qz/Gemini-Generated-Image-rkymnerkymnerkym.jpg",
      caption: "اللون الرمادي الثلجي الفاتح (Ice Grey)",
      alt: "OUTDOOR SPORTS حذاء المغامرات - رمادي ثلجي",
      colorId: "ice-grey"
    },
    {
      url: "https://i.ibb.co/dJ0JDy5T/IMG-20260919-WA0003.jpg",
      caption: "اللون البيج الصحراوي الكاكي (Desert Khaki)",
      alt: "OUTDOOR SPORTS حذاء المغامرات - كاكي صحراوي",
      colorId: "desert-khaki"
    }
  ]
};

export const SHOE_FEATURES: ShoeFeature[] = [
  {
    icon: "Mountain",
    title: "نعل تراكشن جبلي سميك ومضاد للانزلاق",
    description: "مطاط مقوى بنقشات عميقة مخصصة لامتصاص الصدمات وتوفير ثبات كامل على الصخور والمنحدرات والأراضي الرطبة."
  },
  {
    icon: "Wind",
    title: "قماش شبكي تنفسي (Breathable Tech-Mesh)",
    description: "ألياف نسيجية عالية الجودة تسمح بتدفق الهواء للقدم باستمرار وتمنع التعرق وتراكم الروائح أثناء المشي الطويل."
  },
  {
    icon: "Shield",
    title: "حماية مصفحة لمقدمة الأصابع والكعب",
    description: "هيكل قوي مدعم بمصدات واقية تحمي أصابع قدمك من الاصطدام بالحجارة والأسطح الصلبة مع الحفاظ على مرونة الخطوة."
  },
  {
    icon: "HeartHandshake",
    title: "نعل داخلي طبي مريح (Ergonomic Insole)",
    description: "بطانة من رغوة الذاكرة المرنة توزع وزن الجسم بالتساوي وتخفف آلام الركبة ومفاصل الظهر أثناء الوقوف الطويل."
  }
];

export const REVIEWS: ShoeReview[] = [
  {
    id: "1",
    name: "سناء هلال",
    city: "الرباط",
    rating: 5,
    date: "منذ يومين",
    comment: "سبرديلة كتحمق وخفيفة بزااف فالرجلين، واللاطاي جاتني مضبوطة. شكراً ليكم!",
    sizeBought: 38,
    verified: true
  },
  {
    id: "2",
    name: "مريم نعيم",
    city: "الدار البيضاء",
    rating: 5,
    date: "منذ 4 أيام",
    comment: "فينيسيون واعرة ومريحة بزاف فالمشي، خديت النمرة 39 وجاتني لاصقة. شكراً!",
    sizeBought: 39,
    verified: true
  },
  {
    id: "3",
    name: "فاطمة الزهراء التازي",
    city: "فاس",
    rating: 5,
    date: "منذ أسبوع",
    comment: "زوينة بزاف وأنيقة فاللبسة، صراحة كتستاهل كل درهم وخدمتكم ممتازة.",
    sizeBought: 37,
    verified: true
  }
];

export const SIZE_CHART = [
  { eu: 36, cm: "23.0 cm", us: "5.5", recommendation: "مناسب للمقاس المعتاد" },
  { eu: 37, cm: "23.5 cm", us: "6.0", recommendation: "مناسب للمقاس المعتاد" },
  { eu: 38, cm: "24.0 cm", us: "7.0", recommendation: "المقاس الأكثر طلباً" },
  { eu: 39, cm: "24.5 cm", us: "7.5", recommendation: "المقاس الأكثر طلباً" },
  { eu: 40, cm: "25.0 cm", us: "8.5", recommendation: "مناسب للمقاس المعتاد" },
  { eu: 41, cm: "25.5 cm", us: "9.0", recommendation: "مناسب للمقاس المعتاد" },
];
