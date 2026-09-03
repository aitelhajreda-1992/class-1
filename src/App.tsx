import React, { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({ name: '', address: '', phone: '' });
  const [errors, setErrors] = useState({ name: '', address: '', phone: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToCheckout = () => {
    document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', address: '', phone: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'الرجاء إدخال الاسم الكامل';
      valid = false;
    }
    if (!formData.address.trim()) {
      newErrors.address = 'الرجاء إدخال عنوان التوصيل بالتفصيل';
      valid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'الرجاء إدخال رقم الهاتف';
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
          address: formData.address,
          phone: formData.phone
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
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Helper classes for reusable styling
  const labelClass = "font-mono uppercase tracking-[0.1em] opacity-50";

  return (
    <div className="bg-brand-bg text-brand-ink min-h-screen font-sans grid grid-rows-[auto_1fr_auto]">
      
      {/* Header */}
      <header className="border-b border-brand-faint px-[5vw] py-6 flex justify-between items-center">
        <div className="font-heading text-3xl md:text-4xl font-extrabold uppercase tracking-wide">STOVEIT</div>
        <button 
          onClick={scrollToCheckout}
          className="bg-brand-accent text-brand-ink px-8 py-3 font-bold uppercase rounded-none hover:bg-orange-600 transition-colors"
        >
          اطلب الآن
        </button>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-[1200px] mx-auto px-[5vw] py-16 grid gap-16">
        
        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h1 className="font-heading text-[clamp(3rem,8vw,6rem)] leading-[0.9] mb-8 uppercase tracking-[-0.02em]">
              اطبخ في أي مكان <span className="text-brand-accent">🔥</span>
            </h1>
            <p className="text-xl mb-8 opacity-70">
              موقد خارجي قابل للطي — خفيف، عملي وسهل الحمل في جميع مغامراتك.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-baseline gap-3">
                <div className="text-5xl font-bold text-brand-accent font-heading">799 درهم</div>
                <div className="text-2xl font-bold text-red-500 line-through opacity-80">999 درهم</div>
              </div>
              <button 
                onClick={() => document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-brand-accent text-brand-bg hover:bg-brand-ink px-8 py-4 font-bold text-lg transition-colors cursor-pointer"
              >
                اطلب الآن
              </button>
            </div>
          </div>
          <div className="h-[400px] border border-brand-faint p-2 bg-[rgba(0,0,0,0.02)] order-1 md:order-2">
            <img 
              src="https://img.sanishtech.com/u/aca9dcde23564d6a352451f1fe24618f.jpg" 
              alt="STOVEIT" 
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Product Benefits */}
        <section className="border border-brand-faint p-8 md:p-12 lg:p-16">
          <p className="text-xl md:text-2xl leading-[1.8] opacity-80 font-medium max-w-4xl">
            صُمم هذا الموقد ليكون <span className="font-bold text-brand-accent">قوياً وعملياً</span> لتحضير وجباتك بسهولة تامة في قلب الطبيعة. يتميز بتصميم <span className="font-bold text-brand-accent">قابل للطي</span> لا يأخذ مساحة كبيرة في حقيبتك ويطوى في ثوانٍ معدودة. نضمن لك <span className="font-bold text-brand-accent">توصيلاً سريعاً</span> وموثوقاً مع خيار الدفع عند الاستلام بكل أمان.
          </p>
        </section>

        {/* Image Gallery */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-brand-faint aspect-square p-2 bg-[rgba(0,0,0,0.02)]">
              <img src="https://i.ibb.co/VnHwwtf/Gemini-Generated-Image-n0ud1gn0ud1gn0udf.jpg" alt="Gallery" className="w-full h-full object-cover" />
          </div>
          <div className="border border-brand-faint aspect-square p-2 bg-[rgba(0,0,0,0.02)]">
              <img src="https://img.sanishtech.com/u/a5840b4b85bc2b8c418d52a78513ebd2.jpg" alt="Gallery" className="w-full h-full object-cover" />
          </div>
          <div className="border border-brand-faint aspect-square p-2 bg-[rgba(0,0,0,0.02)]">
              <img src="https://i.ibb.co/d4qd4GpD/Gemini-Generated-Image-fy75exfy75exfy75-2.jpg" alt="Gallery" className="w-full h-full object-cover" />
          </div>
        </section>

        {/* How it Works */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-brand-faint p-8">
              <div className={`${labelClass} mb-4`}>المرحلة 01</div>
              <h3 className="text-2xl font-heading font-bold mb-2">اطلب الآن</h3>
              <p className="opacity-70">املأ معلوماتك البسيطة في نموذج الطلب.</p>
          </div>
          <div className="border border-brand-faint p-8">
              <div className={`${labelClass} mb-4`}>المرحلة 02</div>
              <h3 className="text-2xl font-heading font-bold mb-2">نتصل بك</h3>
              <p className="opacity-70">سنتواصل معك هاتفياً لتأكيد التفاصيل.</p>
          </div>
          <div className="border border-brand-faint p-8">
              <div className={`${labelClass} mb-4`}>المرحلة 03</div>
              <h3 className="text-2xl font-heading font-bold mb-2">استلم وادفع</h3>
              <p className="opacity-70">استلم المنتج عند باب بيتك وادفع نقداً.</p>
          </div>
        </section>

        {/* Checkout Section */}
        <section id="checkout" className="border border-brand-faint p-8 md:p-16">
          <div className="max-w-[600px] mx-auto">
            {isSubmitted ? (
              <div className="text-center py-12">
                  <div className="text-5xl mb-6">🎉</div>
                  <h2 className="text-3xl font-heading font-bold mb-4">تم استلام طلبك بنجاح!</h2>
                  <p className="opacity-70 text-lg">شكراً لك. سنتواصل معك هاتفياً لتأكيد طلبك قبل الشحن.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-6">
                  <h2 className="text-center font-heading text-3xl font-bold mb-4 uppercase">أكمل طلبك الآن</h2>
                  
                  <div>
                      <input 
                        type="text" 
                        placeholder="الاسم الكامل" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className={`w-full p-4 bg-transparent border ${errors.name ? 'border-brand-accent' : 'border-brand-faint'} text-brand-ink rounded-none outline-none focus:border-brand-ink transition-colors`}
                      />
                      {errors.name && <p className="text-brand-accent text-sm mt-2 font-bold">{errors.name}</p>}
                  </div>
                  <div>
                      <input 
                        type="text" 
                        placeholder="عنوان التوصيل بالتفصيل" 
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className={`w-full p-4 bg-transparent border ${errors.address ? 'border-brand-accent' : 'border-brand-faint'} text-brand-ink rounded-none outline-none focus:border-brand-ink transition-colors`}
                      />
                      {errors.address && <p className="text-brand-accent text-sm mt-2 font-bold">{errors.address}</p>}
                  </div>
                  <div>
                      <input 
                        type="tel" 
                        placeholder="رقم الهاتف" 
                        dir="ltr"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className={`w-full p-4 bg-transparent border text-right ${errors.phone ? 'border-brand-accent' : 'border-brand-faint'} text-brand-ink rounded-none outline-none focus:border-brand-ink transition-colors`}
                      />
                      {errors.phone && <p className="text-brand-accent text-sm mt-2 font-bold">{errors.phone}</p>}
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-brand-ink hover:bg-brand-accent text-brand-bg py-6 mt-4 font-bold rounded-none uppercase transition-colors cursor-pointer text-lg disabled:opacity-70 disabled:cursor-not-allowed">
                    {isSubmitting ? 'جاري الإرسال...' : 'تأكيد الطلب — الدفع عند الاستلام'}
                  </button>
              </form>
            )}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-brand-faint p-8 text-center opacity-50">
          <div className="font-mono tracking-[0.1em] uppercase">STOVEIT © {new Date().getFullYear()}. جميع الحقوق محفوظة.</div>
      </footer>
    </div>
  );
}
