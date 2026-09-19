import React, { useState, useEffect, useRef } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight, Hand } from 'lucide-react';
import { ShoeColorImage, ShoeColor } from '../types';

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: ShoeColorImage[];
  colorName: string;
  colorLabel: string;
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  colors?: ShoeColor[];
  activeColorIndex?: number;
  onSelectColorIndex?: (idx: number) => void;
}

export const ImageZoomModal: React.FC<ImageZoomModalProps> = ({
  isOpen,
  onClose,
  images,
  colorName,
  colorLabel,
  activeIndex,
  onSelectIndex,
  colors,
  activeColorIndex,
  onSelectColorIndex
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset zoom & pan when switching images or opening
  useEffect(() => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  }, [activeIndex, activeColorIndex, isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onSelectIndex((activeIndex + 1) % images.length);
      } else if (e.key === 'ArrowRight') {
        onSelectIndex((activeIndex - 1 + images.length) % images.length);
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-') {
        handleZoomOut();
      } else if (e.key === '0') {
        handleResetZoom();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, images.length]);

  if (!isOpen) return null;

  const currentImage = images[activeIndex] || images[0];

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3.5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleDoubleTap = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (zoomLevel > 1) {
      handleResetZoom();
    } else {
      setZoomLevel(2.2);
    }
  };

  // Mouse Drag handlers for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomLevel <= 1) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Drag handlers for mobile panning
  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoomLevel <= 1 || e.touches.length !== 1) return;
    setIsDragging(true);
    setDragStart({
      x: e.touches[0].clientX - position.x,
      y: e.touches[0].clientY - position.y
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || zoomLevel <= 1) return;
    setPosition({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between select-none animate-in fade-in duration-200"
      dir="rtl"
      onMouseUp={handleMouseUp}
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/95 border-b border-neutral-800 text-white z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-full transition-colors flex items-center justify-center cursor-pointer"
            title="إغلاق (Esc)"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-neutral-100">
                {colorName}
              </h3>
              <span className="text-[11px] bg-neutral-800 text-amber-400 px-2 py-0.5 rounded font-mono">
                صورة {activeIndex + 1} من {images.length}
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 truncate max-w-[200px] sm:max-w-md">
              {currentImage.caption || currentImage.alt}
            </p>
          </div>
        </div>

        {/* Color Switcher inside Modal if available */}
        {colors && colors.length > 1 && onSelectColorIndex && (
          <div className="hidden md:flex items-center gap-2 bg-neutral-800/80 px-2 py-1 rounded-full border border-neutral-700">
            <span className="text-[11px] text-neutral-400 font-bold px-1">اللون:</span>
            {colors.map((c, cIdx) => (
              <button
                key={c.id}
                onClick={() => onSelectColorIndex(cIdx)}
                className={`text-xs px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer ${
                  activeColorIndex === cIdx
                    ? 'bg-amber-400 text-neutral-950 shadow'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                {c.colorLabel}
              </button>
            ))}
          </div>
        )}

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={handleZoomOut}
            disabled={zoomLevel <= 1}
            className="p-2 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed rounded text-white transition-colors cursor-pointer"
            title="تصغير (-)"
            aria-label="تصغير"
          >
            <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <span className="text-xs font-mono font-bold bg-neutral-800 px-2 sm:px-2.5 py-1.5 rounded min-w-[48px] text-center text-amber-400">
            {Math.round(zoomLevel * 100)}%
          </span>

          <button
            onClick={handleZoomIn}
            disabled={zoomLevel >= 3.5}
            className="p-2 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed rounded text-white transition-colors cursor-pointer"
            title="تكبير (+)"
            aria-label="تكبير"
          >
            <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={handleResetZoom}
            className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="إعادة ضبط المقاس الأصلي (0)"
            aria-label="إعادة ضبط المقاس"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div 
        ref={containerRef}
        className={`relative flex-1 flex items-center justify-center overflow-hidden p-2 sm:p-6 ${
          zoomLevel > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={handleDoubleTap}
      >
        <img
          src={currentImage.url}
          alt={currentImage.alt}
          loading="eager"
          decoding="async"
          draggable={false}
          className="max-h-[78vh] max-w-[95vw] object-contain transition-transform duration-100 ease-out select-none drop-shadow-2xl"
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${zoomLevel})`,
            transformOrigin: 'center center'
          }}
          referrerPolicy="no-referrer"
        />

        {/* Navigation Arrows inside Zoom View (for the selected color photos) */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectIndex((activeIndex > 0 ? activeIndex - 1 : images.length - 1));
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-neutral-900/80 hover:bg-neutral-800 text-white rounded-full border border-neutral-700 transition-all opacity-80 hover:opacity-100 z-20 cursor-pointer"
              aria-label="الصورة السابقة لهذا اللون"
              title="الصورة السابقة"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectIndex((activeIndex < images.length - 1 ? activeIndex + 1 : 0));
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-3 bg-neutral-900/80 hover:bg-neutral-800 text-white rounded-full border border-neutral-700 transition-all opacity-80 hover:opacity-100 z-20 cursor-pointer"
              aria-label="الصورة التالية لهذا اللون"
              title="الصورة التالية"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Helper Hint Badge */}
        <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none z-20">
          <span className="bg-neutral-900/90 text-neutral-300 text-[11px] font-bold px-3 py-1.5 rounded-full border border-neutral-700 flex items-center gap-1.5 shadow-lg backdrop-blur-sm">
            {zoomLevel > 1 ? (
              <>
                <Hand className="w-3.5 h-3.5 text-amber-400" />
                اسحب بأصبعك لتحريك الحذاء • انقر مرتين للرجوع
              </>
            ) : (
              <>
                <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                انقر مرتين للتكبير أو استخدم الأسهم للتنقل بين زوايا هذا اللون
              </>
            )}
          </span>
        </div>
      </div>

      {/* Bottom Thumbnails Strip (Showing angles of CURRENT COLOR) */}
      <div className="px-4 py-3 bg-neutral-900/95 border-t border-neutral-800 flex flex-col items-center gap-2 z-30">
        
        {/* Mobile color switcher */}
        {colors && colors.length > 1 && onSelectColorIndex && (
          <div className="flex md:hidden items-center gap-2 pb-1">
            {colors.map((c, cIdx) => (
              <button
                key={c.id}
                onClick={() => onSelectColorIndex(cIdx)}
                className={`text-[11px] px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${
                  activeColorIndex === cIdx
                    ? 'bg-amber-400 text-neutral-950 font-bold'
                    : 'bg-neutral-800 text-neutral-300'
                }`}
              >
                {c.colorLabel}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center justify-center gap-3">
          {images.map((img, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectIndex(idx);
                }}
                className={`h-14 sm:h-16 aspect-square rounded overflow-hidden border-2 transition-all p-0.5 bg-neutral-800 flex flex-col items-center justify-center relative cursor-pointer ${
                  isSelected
                    ? 'border-amber-400 ring-2 ring-amber-400/40 scale-105'
                    : 'border-neutral-700 opacity-60 hover:opacity-100'
                }`}
              >
                <img 
                  src={img.url} 
                  alt={img.caption} 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
                {img.angleLabel && (
                  <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[9px] text-amber-300 font-bold text-center truncate py-0.5">
                    {img.angleLabel}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
