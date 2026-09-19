import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Star, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Ruler, 
  PhoneCall, 
  PackageCheck,
  Mountain,
  Wind,
  Shield,
  HeartHandshake
} from 'lucide-react';
import { OutdoorLogo } from './components/OutdoorLogo';
import { SHOE_DETAILS, SHOE_FEATURES, REVIEWS, SIZE_CHART } from './data';
import { FormDataState, FormErrorsState } from './types';

export default function App() {
  const [selectedSize, setSelectedSize] = useState<number>(SHOE_DETAILS.defaultSize);
  const [selectedColor, setSelectedColor] = useState<string>(SHOE_DETAILS.colors[0].name);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    phone: '',
    city: '',
    address: '',
    size: SHOE_DETAILS.defaultSize,
    quantity: 1,
    color: SHOE_DETAILS.colors[0].name,
    notes: ''
  });

  const [errors, setErrors] = useState<FormErrorsState>({
    name: '',
    phone: '',
    city: '',
    address: '',
    size: ''
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Timer & Viewers state
  const [timeLeft, setTimeLeft] = useState<number>(2 * 3600 + 18 * 60 + 45);
  const [viewers, setViewers] = useState<number>(6);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const viewersTimer = setInterval(() => {
      setViewers(Math.floor(Math.random() * (7 - 4 + 1)) + 4);
    }, 8000);

    return () => {
      clearInterval(timer);
      clearInterval(viewersTimer);
    };
  }, []);

  // Synchronize size and quantity with form data
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      size: selectedSize,
      quantity: quantity,
      color: selectedColor
    }));
  }, [selectedSize, quantity, selectedColor]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const scrollToCheckout = () => {
    document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' });
  };

  const calculateTotalPrice = () => {
    if (quantity === 1) {
      return SHOE_DETAILS.price;
    } else if (quantity === 2) {
      return SHOE_DETAILS.twoPairsPrice;
    }
    return SHOE_DETAILS.price * quantity;
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', phone: '', city: '', address: '', size: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'الرجاء إدخال الاسم الكامل';
      valid = false;
    }
    if (!formData.city.trim()) {
      newErrors.city = 'الرجاء تحديد المدينة';
      valid = false;
    }
    if (!formData.address.trim()) {
      newErrors.address = 'الرجاء إدخال عنوان التوصيل بالتفصيل';
      valid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'الرجاء إدخال رقم الهاتف للتواصل معك';
      valid = false;
    } else if (!/^[0-9\-\+\s]{8,15}$/.test(formData.phone)) {
      newErrors.phone = 'الرجاء إدخال رقم هاتف صحيح';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const payload = {
          fullName: formData.name,
          phone: formData.phone,
          city: formData.city,
          address: formData.address,
          shoeSize: formData.size,
          quantity: formData.quantity,
          color: formData.color,
          totalPrice: `${calculateTotalPrice()} ${SHOE_DETAILS.currency}`,
          product: "حذاء OUTDOOR SPORTS الجبلي",
          orderDate: new Date().toLocaleString('ar-MA')
        };

        await fetch('https://script.google.com/macros/s/AKfycbxDzEe9HXeBTy5k-CiG2zxjZBTfleRQDd86nPDZbhn8zLFLQKYk5z8-98J2yi1dtHdlCw/exec', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(payload),
        });
        setIsSubmitted(true);
        // Scroll to confirmation view
        document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' });
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('حدث خطأ أثناء إرسال الطلب. يرجى التأكد من اتصالك والمحاولة مرة أخرى.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const activeImage = SHOE_DETAILS.images[activeImageIndex]?.url || SHOE_DETAILS.images[0].url;

  const renderFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mountain':
        return <Mountain className="w-7 h-7 text-brand-accent" />;
      case 'Wind':
        return <Wind className="w-7 h-7 text-brand-accent" />;
      case 'Shield':
        return <Shield className="w-7 h-7 text-brand-accent" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-7 h-7 text-brand-accent" />;
      default:
        return <Sparkles className="w-7 h-7 text-brand-accent" />;
    }
  };

  return (
    <div className="bg-brand-bg text-brand-ink min-h-screen font-sans selection:bg-brand-accent selection:text-white">
      
      {/* Top Announcement Bar */}
      <div className="bg-brand-surface border-b border-brand-faint py-2.5 px-4 text-center text-xs md:text-sm font-bold text-brand-ink flex items-center justify-center gap-2">
        <Truck className="w-4 h-4 shrink-0 text-brand-accent animate-bounce" />
        <span>توصيل سريع ومجاني لجميع مدن المغرب — الدفع نقداً عند الاستلام !</span>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-brand-bg/90 border-b border-brand-faint px-[4vw] py-3.5 flex justify-between items-center transition-all">
        <OutdoorLogo size="md" tagline={true} />

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-brand-muted">
          <a href="#features" className="hover:text-brand-accent transition-colors">المميزات</a>
          <a href="#reviews" className="hover:text-brand-accent transition-colors">آراء الزبائن</a>
          <a href="#guarantee" className="hover:text-brand-accent transition-colors">الضمانات</a>
        </div>

        <button 
          onClick={scrollToCheckout}
          className="bg-brand-accent hover:bg-brand-accent-hover text-white px-5 md:px-7 py-2.5 text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-md shadow-brand-accent/20 cursor-pointer flex items-center gap-2"
        >
          <span>اطلب الآن</span>
          <span className="text-xs opacity-90 hidden sm:inline">({SHOE_DETAILS.price} {SHOE_DETAILS.currency})</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-[1240px] mx-auto px-[4vw] py-8 md:py-14 space-y-16 md:space-y-24">
        
        {/* Hero Section */}
        <section className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Product Visual Showcase (Desktop col-span-7) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Primary Image Stage */}
            <div className="relative aspect-[4/3] sm:aspect-square w-full bg-brand-surface border border-brand-faint overflow-hidden group shadow-2xl rounded-sm">
              <img 
                src={activeImage} 
                alt="OUTDOOR SPORTS حذاء المغامرات"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Badges on Image */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <span className="bg-brand-bg/90 backdrop-blur-md border border-brand-accent text-brand-accent px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  إصدار أصلي محدود
                </span>
                <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold">
                  خصم {SHOE_DETAILS.discountPercentage}%
                </span>
              </div>

              {/* Image Navigation Arrows */}
              <button 
                onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : SHOE_DETAILS.images.length - 1))}
                aria-label="Previous image"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-brand-surface/80 hover:bg-brand-surface text-brand-ink p-2 border border-brand-faint transition-all opacity-80 hover:opacity-100"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setActiveImageIndex((prev) => (prev < SHOE_DETAILS.images.length - 1 ? prev + 1 : 0))}
                aria-label="Next image"
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-brand-surface/80 hover:bg-brand-surface text-brand-ink p-2 border border-brand-faint transition-all opacity-80 hover:opacity-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Navigation Row - 3 Colors */}
            <div className="grid grid-cols-3 gap-3">
              {SHOE_DETAILS.images.map((img, idx) => {
                const isSelected = activeImageIndex === idx;
                const colorInfo = SHOE_DETAILS.colors[idx];
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveImageIndex(idx);
                      if (colorInfo) {
                        setSelectedColor(colorInfo.name);
                      }
                    }}
                    className={`aspect-[4/3] sm:aspect-square border transition-all p-1 bg-brand-surface relative overflow-hidden group/thumb cursor-pointer ${
                      isSelected 
                        ? 'border-brand-accent ring-2 ring-brand-accent shadow-lg' 
                        : 'border-brand-faint opacity-70 hover:opacity-100 hover:border-brand-border'
                    }`}
                  >
                    <img src={img.url} alt={img.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105" />
                    <div className="absolute bottom-0 inset-x-0 bg-brand-bg/90 backdrop-blur-sm py-1 px-1 text-center border-t border-brand-faint/60">
                      <span className="text-[11px] font-bold text-brand-ink block truncate">
                        {colorInfo?.colorLabel || img.caption}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quality Badges */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-brand-faint text-center">
              <div className="p-3 bg-brand-surface/60 border border-brand-faint/60">
                <Truck className="w-5 h-5 mx-auto text-brand-accent mb-1" />
                <span className="text-xs font-bold block">شحن مجاني</span>
                <span className="text-[11px] text-brand-muted">24-48 ساعة</span>
              </div>
              <div className="p-3 bg-brand-surface/60 border border-brand-faint/60">
                <ShieldCheck className="w-5 h-5 mx-auto text-brand-accent mb-1" />
                <span className="text-xs font-bold block">دفع عند الاستلام</span>
                <span className="text-[11px] text-brand-muted">أداء نقدي آمن</span>
              </div>
              <div className="p-3 bg-brand-surface/60 border border-brand-faint/60">
                <Ruler className="w-5 h-5 mx-auto text-brand-accent mb-1" />
                <span className="text-xs font-bold block">استبدال سهل</span>
                <span className="text-[11px] text-brand-muted">إذا لم يناسبك المقاس</span>
              </div>
            </div>

          </div>

          {/* Right Column: Title, Sizing & Immediate Action (Desktop col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Tagline & Slogan */}
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-surface border border-brand-border px-3 py-1 mb-3">
                <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping"></span>
                <span className="text-xs font-mono uppercase tracking-widest text-brand-accent font-bold">
                  Comfort • Style • Adventure
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-brand-ink leading-tight">
                {SHOE_DETAILS.arabicName}
              </h1>
              <p className="text-brand-muted text-sm md:text-base mt-2.5 leading-relaxed">
                {SHOE_DETAILS.arabicTagline}. صُمم الحذاء بنعل سميك مانع للانزلاق وقماش شبكي عالي التهوية ليمنحك ثباتاً تاماً وراحة استثنائية طوال اليوم.
              </p>
            </div>

            {/* Urgency Box (Timer + Viewers) */}
            <div className="p-4 bg-brand-surface border-r-4 border-brand-accent border border-brand-faint space-y-2.5 shadow-lg">
              <div className="flex items-center justify-between text-brand-accent text-sm font-bold">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 animate-spin text-brand-accent" />
                  <span>عرض حصري ينتهي بعد:</span>
                </div>
                <span className="font-mono text-base md:text-lg bg-brand-bg px-2.5 py-0.5 border border-brand-border text-brand-ink font-bold" dir="ltr">
                  {formatTime(timeLeft)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-brand-muted font-medium pt-1 border-t border-brand-faint">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span>
                  <strong className="text-brand-ink font-bold text-sm ml-1">{viewers}</strong> 
                  أشخاص يتصفحون هذا الحذاء ويختارون مقاساتهم الآن
                </span>
              </div>
            </div>

            {/* Price Block */}
            <div className="p-5 bg-brand-surface/80 border border-brand-border/60 flex items-center justify-between">
              <div>
                <div className="text-xs text-brand-muted mb-1">السعر المخفض لليوم فقط:</div>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl md:text-5xl font-extrabold text-brand-accent font-heading">
                    {SHOE_DETAILS.price}
                  </span>
                  <span className="text-lg font-bold text-brand-accent">{SHOE_DETAILS.currency}</span>
                  <span className="text-lg text-brand-muted line-through opacity-60 mr-2">
                    {SHOE_DETAILS.originalPrice} {SHOE_DETAILS.currency}
                  </span>
                </div>
              </div>
              <div className="text-left bg-brand-accent/15 border border-brand-accent/30 px-3 py-2 rounded-sm">
                <span className="text-xs font-bold text-brand-accent block">وفر {SHOE_DETAILS.originalPrice - SHOE_DETAILS.price} {SHOE_DETAILS.currency}</span>
                <span className="text-[11px] text-emerald-700 font-bold">شحن مجاني 100%</span>
              </div>
            </div>

            {/* 3 Color Variants Selector */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-brand-ink flex items-center gap-2">
                  <span>الألوان المتوفرة (3 ألوان أصلية):</span>
                </span>
                <span className="text-xs text-brand-accent font-bold">
                  {selectedColor}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {SHOE_DETAILS.colors.map((c, idx) => {
                  const isSelected = selectedColor === c.name;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setSelectedColor(c.name);
                        setActiveImageIndex(idx);
                      }}
                      className={`p-2 border text-right transition-all cursor-pointer relative flex flex-col gap-2 rounded-none ${
                        isSelected
                          ? 'border-brand-accent bg-brand-accent/15 ring-2 ring-brand-accent shadow-md'
                          : 'border-brand-faint bg-brand-surface hover:border-brand-border hover:bg-brand-surface-light'
                      }`}
                    >
                      <div className="aspect-[4/3] w-full overflow-hidden border border-brand-faint/80 relative">
                        <img src={c.imageUrl} alt={c.name} className="w-full h-full object-cover" />
                        {isSelected && (
                          <span className="absolute top-1 right-1 w-4 h-4 bg-brand-accent text-brand-bg rounded-full flex items-center justify-center text-[10px] font-bold">
                            ✓
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-brand-ink block truncate leading-tight">
                          {c.colorLabel}
                        </span>
                        <span className="text-[10px] text-brand-muted block truncate mt-0.5">
                          {c.id === 'stealth-black' ? 'فحمي كربوني' : c.id === 'ice-grey' ? 'رمادي ثلجي' : 'بيج صحراوي'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selector (Crucial for Shoe Conversion!) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-brand-ink flex items-center gap-2">
                  <span>اختر مقاسك المعتاد:</span>
                  <span className="text-xs font-normal text-brand-muted">(المقاسات قياسية ومضبوطة)</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-xs text-brand-accent hover:underline flex items-center gap-1 cursor-pointer font-medium"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>دليل القياس</span>
                </button>
              </div>

              {/* Size Buttons Grid */}
              <div className="grid grid-cols-6 gap-2">
                {SHOE_DETAILS.sizes.map((s) => {
                  const isSelected = selectedSize === s.size;
                  return (
                    <button
                      key={s.size}
                      type="button"
                      onClick={() => setSelectedSize(s.size)}
                      className={`py-3 px-1 text-center font-heading font-bold text-base md:text-lg border transition-all cursor-pointer relative ${
                        isSelected
                          ? 'bg-brand-accent text-brand-bg border-brand-accent shadow-md shadow-brand-accent/30 scale-105 z-10'
                          : 'bg-brand-surface text-brand-ink border-brand-faint hover:border-brand-accent/50 hover:bg-brand-surface-light'
                      }`}
                    >
                      <span>{s.size}</span>
                      {isSelected && (
                        <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-green-500 rounded-full flex items-center justify-center text-[8px] text-white">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Sizing stock alert */}
              <p className="text-xs text-brand-muted flex items-center gap-1.5 pt-1">
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span>المقاس المختار: <strong>{selectedSize} EU</strong> (متوفر بالمستودع — جاهز للشحن السريع)</span>
              </p>

              {/* Size Guide Collapse */}
              {showSizeGuide && (
                <div className="p-4 bg-brand-surface border border-brand-border/60 text-xs space-y-2 mt-3 animate-fadeIn">
                  <div className="font-bold text-brand-ink flex items-center justify-between">
                    <span>جدول المقاسات بالسنتيمتر (cm):</span>
                    <button onClick={() => setShowSizeGuide(false)} className="text-brand-muted hover:text-brand-ink">✕</button>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center pt-2">
                    {SIZE_CHART.map((sc) => (
                      <div key={sc.eu} className={`p-2 border ${sc.eu === selectedSize ? 'border-brand-accent bg-brand-accent/10 font-bold' : 'border-brand-faint'}`}>
                        <div className="text-brand-accent">{sc.eu} EU</div>
                        <div className="text-brand-muted">{sc.cm}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-brand-muted pt-1">
                    💡 نصيحة: إذا كنت تفضل مساحة أكبر للأصابع مع جوارب رياضية سميكة، فإن الحذاء مصمم بقالب مريح ومرن.
                  </p>
                </div>
              )}
            </div>

            {/* Main Action Button with Attention-Grabbing Shake */}
            <div className="space-y-3 pt-2">
              <button
                onClick={scrollToCheckout}
                className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white py-4 px-6 text-lg md:text-xl font-bold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-brand-accent/20 cursor-pointer animate-shake flex items-center justify-center gap-3 border-2 border-brand-accent"
              >
                <span>اطلب مقاسك الآن — والدفع عند الاستلام</span>
              </button>

              <div className="flex items-center justify-center gap-6 text-xs text-brand-muted">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>ضمان استبدال المقاس</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <PackageCheck className="w-4 h-4 text-emerald-600" />
                  <span>الدفع نقداً عند الاستلام</span>
                </span>
              </div>
            </div>

          </div>

        </section>

        {/* Brand Philosophy Banner */}
        <section className="bg-brand-surface border border-brand-border/60 p-8 md:p-12 text-center space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-2xl"></div>
          <OutdoorLogo size="lg" tagline={true} className="justify-center mb-2" />
          <h2 className="text-2xl md:text-3xl font-bold text-brand-ink">
            صُمم لعشاق المغامرة، المسارات الوعرة، والراحة اليومية
          </h2>
          <p className="text-brand-muted max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            يجمع حذاء <strong className="text-brand-accent">OUTDOOR SPORTS</strong> بين هندسة الأحذية الجبلية المتينة وأناقة الأحذية الرياضية العصرية. سواء كنت في رحلة استكشاف جبلية، مشي رياضي في الطبيعة، أو في يومك العادي المزدحم، يمنحك خفة وزن لا مثيل لها مع حماية تامة لقدميك.
          </p>
        </section>

        {/* Detailed Features Section */}
        <section id="features" className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-accent">لماذا يفضل زبائننا هذا الحذاء؟</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-ink">المواصفات التقنية والراحة الفائقة</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SHOE_FEATURES.map((feat, idx) => (
              <div 
                key={idx}
                className="p-6 bg-brand-surface border border-brand-faint hover:border-brand-accent/50 transition-all duration-300 space-y-3 group"
              >
                <div className="w-12 h-12 bg-brand-bg border border-brand-border flex items-center justify-center transition-transform group-hover:scale-110">
                  {renderFeatureIcon(feat.icon)}
                </div>
                <h3 className="text-lg font-bold text-brand-ink group-hover:text-brand-accent transition-colors">
                  {feat.title}
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works (3 Steps to Order) */}
        <section className="space-y-8 border-t border-b border-brand-faint py-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-accent">سهولة وأمان تام</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-ink">كيف تتم عملية الشراء؟</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-brand-surface border border-brand-faint space-y-3 text-center md:text-right relative">
              <span className="font-heading text-4xl font-extrabold text-brand-accent/40 block">01</span>
              <h3 className="text-xl font-bold text-brand-ink">اختر مقاسك وأكمل معلوماتك</h3>
              <p className="text-sm text-brand-muted">
                اختر المقاس المناسب لك وأدخل اسمك ورقم هاتفك وعنوانك في نموذج الطلب أدناه.
              </p>
            </div>

            <div className="p-6 bg-brand-surface border border-brand-faint space-y-3 text-center md:text-right relative">
              <span className="font-heading text-4xl font-extrabold text-brand-accent/40 block">02</span>
              <h3 className="text-xl font-bold text-brand-ink">تأكيد فوري عبر الهاتف</h3>
              <p className="text-sm text-brand-muted">
                سيتصل بك فريق خدمة العملاء خلال ساعات قليلة لتأكيد المقاس وتفاصيل الشحن قبل الإرسال.
              </p>
            </div>

            <div className="p-6 bg-brand-surface border border-brand-faint space-y-3 text-center md:text-right relative">
              <span className="font-heading text-4xl font-extrabold text-brand-accent/40 block">03</span>
              <h3 className="text-xl font-bold text-brand-ink">استلم الحذاء وادفع نقداً</h3>
              <p className="text-sm text-brand-muted">
                يصلك الموزع إلى باب بيتك، تستلم الحذاء ، ثم تدفع نقداً.
              </p>
            </div>
          </div>
        </section>

        {/* Customer Reviews */}
        <section id="reviews" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-brand-accent">تجارب حقيقية</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-brand-ink mt-1">آراء الزبائن الذين جربوا الحذاء</h2>
            </div>
            <div className="flex items-center gap-2 text-brand-accent">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current text-brand-accent" />
                ))}
              </div>
              <span className="text-sm font-bold text-brand-ink">4.9 / 5 تقييم ممتاز</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((rev) => (
              <div key={rev.id} className="p-6 bg-brand-surface border border-brand-faint space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-brand-ink text-base">{rev.name}</h4>
                    <span className="text-xs text-brand-muted">{rev.city} • مقاس {rev.sizeBought}</span>
                  </div>
                  <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 border border-emerald-200 font-bold">
                    طلب مؤكد ✓
                  </span>
                </div>
                <div className="flex gap-1 text-brand-accent">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-brand-muted leading-relaxed">
                  "{rev.comment}"
                </p>
                <div className="text-[11px] text-brand-muted/70 pt-2 border-t border-brand-faint">
                  {rev.date}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Guarantees Badges */}
        <section id="guarantee" className="p-8 bg-brand-surface border border-brand-border/50 grid sm:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-full bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center mx-auto text-brand-accent">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-brand-ink">ضمان الجودة والمتانة</h4>
            <p className="text-xs text-brand-muted">مواد مختارة بعناية تدوم طويلاً وتتحمل المسارات الوعرة.</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-full bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center mx-auto text-brand-accent">
              <Ruler className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-brand-ink">استبدال المقاس مجاناً</h4>
            <p className="text-xs text-brand-muted">في حال لم يناسبك المقاس، نوفر خدمة استبدال سريعة وبدون تعقيد.</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-full bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center mx-auto text-brand-accent">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-brand-ink">خدمة زبناء على مدار الساعة</h4>
            <p className="text-xs text-brand-muted">فريقنا معك في كل خطوة من تأكيد الطلب حتى ما بعد الاستلام.</p>
          </div>
        </section>

        {/* Checkout Form Section */}
        <section id="checkout" className="border-2 border-brand-accent/60 p-6 md:p-12 lg:p-16 bg-brand-surface shadow-2xl relative">
          
          <div className="max-w-[650px] mx-auto">
            
            {isSubmitted ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-20 h-20 bg-brand-accent/20 border-2 border-brand-accent rounded-full flex items-center justify-center mx-auto text-brand-accent">
                  <Check className="w-10 h-10 stroke-[3]" />
                </div>
                <h2 className="text-3xl font-heading font-extrabold text-brand-ink">
                  تم تسجيل طلبك بنجاح! 🎉
                </h2>
                <div className="p-5 bg-brand-bg border border-brand-border text-right space-y-2 text-sm">
                  <div className="flex justify-between border-b border-brand-faint pb-2">
                    <span className="text-brand-muted">المنتج:</span>
                    <span className="font-bold text-brand-ink">حذاء OUTDOOR SPORTS الجبلي</span>
                  </div>
                  <div className="flex justify-between border-b border-brand-faint pb-2">
                    <span className="text-brand-muted">المقاس المختار:</span>
                    <span className="font-bold text-brand-accent">{formData.size} EU</span>
                  </div>
                  <div className="flex justify-between border-b border-brand-faint pb-2">
                    <span className="text-brand-muted">اللون المختار:</span>
                    <span className="font-bold text-brand-accent">{formData.color}</span>
                  </div>
                  <div className="flex justify-between border-b border-brand-faint pb-2">
                    <span className="text-brand-muted">الكمية:</span>
                    <span className="font-bold text-brand-ink">{formData.quantity} زوج</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-brand-muted">المبلغ الإجمالي عند الاستلام:</span>
                    <span className="font-bold text-brand-accent text-base">{calculateTotalPrice()} {SHOE_DETAILS.currency} (توصيل مجاني)</span>
                  </div>
                </div>
                <p className="text-brand-muted text-base leading-relaxed">
                  شكراً لثقتك بمتجر <strong className="text-brand-accent">OUTDOOR SPORTS</strong>. سيتصل بك فريقنا هاتفياً في أقرب وقت لتأكيد موعد التوصيل وعنوانك بدقة قبل إرسال الشحنة.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-brand-surface hover:bg-brand-surface-light border border-brand-faint text-brand-muted hover:text-brand-ink px-6 py-2.5 text-xs uppercase tracking-wider transition-colors"
                >
                  إجراء طلب جديد
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="text-center space-y-2 mb-8">
                  <div className="inline-flex items-center gap-2 bg-brand-accent/15 text-brand-accent px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    <span>الدفع عند الاستلام — شحن مجاني</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-brand-ink uppercase">
                    املأ معلوماتك لتأكيد الطلب
                  </h2>
                </div>

                {/* Offer & Quantity Selector */}
                <div className="space-y-3 p-4 bg-brand-bg border border-brand-border">
                  <span className="text-xs font-bold text-brand-muted uppercase block">اختر العرض المناسب لك:</span>
                  <div className="grid sm:grid-cols-2 gap-3">
                    
                    <button
                      type="button"
                      onClick={() => setQuantity(1)}
                      className={`p-3 text-right border transition-all cursor-pointer ${
                        quantity === 1 
                          ? 'border-brand-accent bg-brand-accent/10 ring-1 ring-brand-accent' 
                          : 'border-brand-faint hover:border-brand-border bg-brand-surface'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm text-brand-ink">1 زوج حذاء</span>
                        <span className="text-brand-accent font-heading font-bold">{SHOE_DETAILS.price} {SHOE_DETAILS.currency}</span>
                      </div>
                      <span className="text-xs text-brand-muted">توصيل سريع ومجاني لجميع المدن</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setQuantity(2)}
                      className={`p-3 text-right border transition-all cursor-pointer relative ${
                        quantity === 2 
                          ? 'border-brand-accent bg-brand-accent/10 ring-1 ring-brand-accent' 
                          : 'border-brand-faint hover:border-brand-border bg-brand-surface'
                      }`}
                    >
                      <span className="absolute -top-2 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5">
                        وفر {SHOE_DETAILS.price * 2 - SHOE_DETAILS.twoPairsPrice} درهم إضافية
                      </span>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm text-brand-ink">2 أزواج أحذية</span>
                        <span className="text-brand-accent font-heading font-bold">{SHOE_DETAILS.twoPairsPrice} {SHOE_DETAILS.currency}</span>
                      </div>
                      <span className="text-xs text-emerald-700 font-bold">العرض الأكثر توفيراً للطلب المشترك</span>
                    </button>

                  </div>
                </div>

                {/* Form Color Picker */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-ink flex justify-between items-center">
                    <span>اللون المطلوب:</span>
                    <span className="text-brand-accent font-bold text-xs">{selectedColor}</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {SHOE_DETAILS.colors.map((c, idx) => {
                      const isSelected = selectedColor === c.name;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => {
                            setSelectedColor(c.name);
                            setActiveImageIndex(idx);
                          }}
                          className={`p-2 border text-right transition-all cursor-pointer flex items-center gap-2 ${
                            isSelected
                              ? 'border-brand-accent bg-brand-accent/15 ring-1 ring-brand-accent'
                              : 'border-brand-faint bg-brand-bg hover:border-brand-border'
                          }`}
                        >
                          <img src={c.imageUrl} alt={c.name} className="w-9 h-9 object-cover border border-brand-faint shrink-0" />
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-brand-ink block truncate">{c.colorLabel}</span>
                            <span className="text-[10px] text-brand-muted block truncate">
                              {c.id === 'stealth-black' ? 'فحمي' : c.id === 'ice-grey' ? 'رمادي' : 'صحراوي'}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Form Size Picker Check */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-ink flex justify-between">
                    <span>المقاس المطلوب:</span>
                    <span className="text-brand-accent font-mono font-bold">{selectedSize} EU</span>
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {SHOE_DETAILS.sizes.map((s) => (
                      <button
                        key={s.size}
                        type="button"
                        onClick={() => setSelectedSize(s.size)}
                        className={`py-2 text-center text-sm font-bold border transition-colors cursor-pointer ${
                          selectedSize === s.size 
                            ? 'bg-brand-accent text-brand-bg border-brand-accent font-heading' 
                            : 'bg-brand-bg text-brand-muted border-brand-faint hover:text-brand-ink hover:border-brand-border'
                        }`}
                      >
                        {s.size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-brand-muted uppercase">الاسم الكامل *</label>
                  <input 
                    type="text" 
                    placeholder="الاسم الكامل" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full p-3.5 bg-brand-bg border ${
                      errors.name ? 'border-red-500' : 'border-brand-faint'
                    } text-brand-ink rounded-none outline-none focus:border-brand-accent transition-colors`}
                  />
                  {errors.name && <p className="text-red-600 text-xs font-bold">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-brand-muted uppercase">رقم الهاتف *</label>
                  <input 
                    type="tel" 
                    placeholder="رقم الهاتف" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full p-3.5 bg-brand-bg border ${
                      errors.phone ? 'border-red-500' : 'border-brand-faint'
                    } text-brand-ink rounded-none outline-none focus:border-brand-accent transition-colors`}
                  />
                  {errors.phone && <p className="text-red-600 text-xs font-bold">{errors.phone}</p>}
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-brand-muted uppercase">المدينة *</label>
                  <input 
                    type="text" 
                    placeholder="المدينة" 
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`w-full p-3.5 bg-brand-bg border ${
                      errors.city ? 'border-red-500' : 'border-brand-faint'
                    } text-brand-ink rounded-none outline-none focus:border-brand-accent transition-colors`}
                  />
                  {errors.city && <p className="text-red-600 text-xs font-bold">{errors.city}</p>}
                </div>

                {/* Detailed Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-brand-muted uppercase">العنوان *</label>
                  <input 
                    type="text" 
                    placeholder="العنوان" 
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={`w-full p-3.5 bg-brand-bg border ${
                      errors.address ? 'border-red-500' : 'border-brand-faint'
                    } text-brand-ink rounded-none outline-none focus:border-brand-accent transition-colors`}
                  />
                  {errors.address && <p className="text-red-600 text-xs font-bold">{errors.address}</p>}
                </div>

                {/* Summary Box */}
                <div className="p-4 bg-brand-bg border border-brand-faint flex items-center justify-between text-sm">
                  <span className="text-brand-muted">المجموع الإجمالي المؤكد:</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading font-extrabold text-2xl text-brand-accent">
                      {calculateTotalPrice()}
                    </span>
                    <span className="font-bold text-brand-accent">{SHOE_DETAILS.currency}</span>
                    <span className="text-xs text-emerald-700 font-bold mr-2">(توصيل مجاني)</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white py-4 md:py-5 font-bold uppercase tracking-wider text-base md:text-lg transition-all duration-300 shadow-xl shadow-brand-accent/25 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 border-2 border-brand-accent"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Clock className="w-5 h-5 animate-spin" />
                      جاري إرسال طلبك...
                    </span>
                  ) : (
                    <span>تأكيد الطلب الآن — الدفع عند الاستلام</span>
                  )}
                </button>

                <p className="text-center text-xs text-brand-muted">
                  🔒 بياناتك آمنة 100% ومحمية. الدفع يتم نقداً فقط بعد استلام الحذاء ومعاينته.
                </p>

              </form>
            )}

          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-brand-faint mt-16 bg-brand-surface py-12 px-[4vw]">
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-right">
          <OutdoorLogo size="md" tagline={true} />

          <div className="text-xs text-brand-muted font-mono uppercase tracking-wider">
            OUTDOOR SPORTS © {new Date().getFullYear()}. Comfort • Style • Adventure. جميع الحقوق محفوظة.
          </div>

          <div className="flex items-center gap-4 text-xs text-brand-muted">
            <span>شحن لجميع مدن المغرب</span>
            <span>•</span>
            <span>الدفع عند الاستلام</span>
            <span>•</span>
            <span>استبدال مجاني للمقاس</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
