import { ShoeReview, ShoeFeature, ShoeColor } from './types';

export const SHOE_DETAILS: {
  name: string;
  arabicName: string;
  tagline: string;
  arabicTagline: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  twoPairsPrice: number;
  twoPairsDiscount: number;
  currency: string;
  deliveryTime: string;
  defaultSize: number;
  sizes: { size: number; footLength: string; inStock: boolean; stockLeft: number }[];
  colors: ShoeColor[];
} = {
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
      imageUrl: "https://i.ibb.co/F4LrczqB/Gemini-Generated-Image-82s1gl82s1gl82s1.jpg",
      images: [
        {
          url: "https://i.ibb.co/F4LrczqB/Gemini-Generated-Image-82s1gl82s1gl82s1.jpg",
          caption: "اللون الأسود الفحمي - المنظر الرئيسي الجانبي",
          alt: "OUTDOOR SPORTS حذاء المغامرات - أسود كربوني منظر جانبي",
          angleLabel: "منظر جانبي"
        },
        {
          url: "https://i.ibb.co/HLxGQ6Y9/Gemini-Generated-Image-81s3xo81s3xo81s3.jpg",
          caption: "اللون الأسود الفحمي - تفاصيل النعل والمقدمة المقواة",
          alt: "OUTDOOR SPORTS حذاء المغامرات - أسود كربوني تفاصيل النعل",
          angleLabel: "زاوية أمامية"
        },
        {
          url: "https://i.ibb.co/CpwLyMm4/Gemini-Generated-Image-nehaoknehaokneha.jpg",
          caption: "اللون الأسود الفحمي - زاوية علوية ونسيج التهوية",
          alt: "OUTDOOR SPORTS حذاء المغامرات - أسود كربوني زاوية علوية",
          angleLabel: "زاوية علوية"
        }
      ]
    },
    { 
      id: "ice-grey", 
      name: "رمادي ثلجي فاتح (Ice Grey)", 
      colorLabel: "رمادي ثلجي",
      hex: "#D4D2CB", 
      secondaryHex: "#8E8B83",
      imageUrl: "https://i.ibb.co/spLvQ5qz/Gemini-Generated-Image-rkymnerkymnerkym.jpg",
      images: [
        {
          url: "https://i.ibb.co/spLvQ5qz/Gemini-Generated-Image-rkymnerkymnerkym.jpg",
          caption: "اللون الرمادي الثلجي - المنظر الجانبي الأنيق",
          alt: "OUTDOOR SPORTS حذاء المغامرات - رمادي ثلجي منظر جانبي",
          angleLabel: "منظر جانبي"
        },
        {
          url: "https://i.ibb.co/dsYN55pF/Gemini-Generated-Image-mpt7efmpt7efmpt7.jpg",
          caption: "اللون الرمادي الثلجي - زاوية أمامية ثلاثية الأبعاد",
          alt: "OUTDOOR SPORTS حذاء المغامرات - رمادي ثلجي زاوية أمامية",
          angleLabel: "زاوية أمامية"
        },
        {
          url: "https://i.ibb.co/q3yQh1dt/Gemini-Generated-Image-rxy4i0rxy4i0rxy4.jpg",
          caption: "اللون الرمادي الثلجي - تفاصيل النسيج التنفسي والدعامات",
          alt: "OUTDOOR SPORTS حذاء المغامرات - رمادي ثلجي تفاصيل النسيج",
          angleLabel: "تفاصيل النسيج"
        }
      ]
    },
    { 
      id: "army-green", 
      name: "أخضر زيتي جبلي (Army Green)", 
      colorLabel: "أخضر زيتي",
      hex: "#4E5B4B", 
      secondaryHex: "#2F3B2D",
      imageUrl: "https://i.ibb.co/dJ0JDy5T/IMG-20260919-WA0003.jpg",
      images: [
        {
          url: "https://i.ibb.co/dJ0JDy5T/IMG-20260919-WA0003.jpg",
          caption: "اللون الأخضر الزيتي - المنظر الجانبي الرياضي",
          alt: "OUTDOOR SPORTS حذاء المغامرات - أخضر زيتي منظر جانبي",
          angleLabel: "منظر جانبي"
        },
        {
          url: "https://i.ibb.co/N60K6v0F/green-upload.jpg",
          caption: "اللون الأخضر الزيتي - تفاصيل النعل والزاوية المقربة",
          alt: "OUTDOOR SPORTS حذاء المغامرات - أخضر زيتي زاوية مقربة",
          angleLabel: "زاوية مقربة"
        }
      ]
    },
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
