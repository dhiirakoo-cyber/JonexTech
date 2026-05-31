/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Type, Palette, Layout, Award, Sparkles, Download, Save, Star, Flame, Trophy, Heart } from 'lucide-react';
import { Language } from '../types';

interface GraphicLabProps {
  lang: Language;
  onSave: (imageUrl: string) => void;
}

const TEMPLATES = [
  { id: 'fiverr', nameOm: 'Fiverr Gig Cover', nameEn: 'Fiverr Gig Cover', bg: 'linear-gradient(135deg, #1e1b4b, #311042)', tag: 'FIVERR' },
  { id: 'amoo', nameOm: 'Amoo Academy Flyer', nameEn: 'Amoo Academy Ads', bg: 'linear-gradient(135deg, #0f172a, #1e293b, #1d4ed8)', tag: 'STUDENT' },
  { id: 'minimalist', nameOm: 'Logo Minimalist', nameEn: 'Minimalist Branding', bg: 'linear-gradient(135deg, #18181b, #27272a)', tag: 'CREATIVE' }
];

const GRADIENTS = [
  { id: 'slate', name: 'Midnight', css: 'linear-gradient(135deg, #0f172a, #1e293b)' },
  { id: 'berry', name: 'Dark Purple', css: 'linear-gradient(135deg, #1e1b4b, #311042)' },
  { id: 'ethio', name: 'Harar Sunset', css: 'linear-gradient(135deg, #1e1b4b, #1e293b, #16a34a)' },
  { id: 'neon', name: 'Cyber Blue', css: 'linear-gradient(135deg, #03001e, #7303c0, #ec38bc)' },
  { id: 'emerald', name: 'Forest', css: 'linear-gradient(135deg, #022c22, #064e3b)' }
];

const STICKERS = [
  { id: 'star', icon: Star, label: 'Star' },
  { id: 'flame', icon: Flame, label: 'Hot' },
  { id: 'trophy', icon: Trophy, label: 'Prime' },
  { id: 'heart', icon: Heart, label: 'Love' }
];

export default function GraphicLab({ lang, onSave }: GraphicLabProps) {
  const [background, setBackground] = useState(GRADIENTS[0].css);
  const [title, setTitle] = useState(lang === 'om' ? 'Gulaallii Suuraa Portfoliyoo' : 'Pro Freelance Editor');
  const [subtitle, setSubtitle] = useState(lang === 'om' ? 'Fiverr koorporiit gig kiyya' : 'Fiverr Professional Gig');
  const [badgeText, setBadgeText] = useState('PREMIUM');
  const [layout, setLayout] = useState<'centered' | 'brutalist' | 'rounded'>('centered');
  const [activeSticker, setActiveSticker] = useState('star');
  const [textColor, setTextColor] = useState('#ffffff');
  const [accentColor, setAccentColor] = useState('#60a5fa');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const getActiveStickerIcon = () => {
    const found = STICKERS.find(s => s.id === activeSticker);
    return found ? found.icon : Star;
  };

  const drawToCanvas = (): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 450;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve('');
        return;
      }

      // Draw Gradient Background
      const width = canvas.width;
      const height = canvas.height;
      
      const grad = ctx.createLinearGradient(0, 0, width, height);
      // Rough parsing of CSS gradient to canvas (fallback to simple dual-color logic)
      if (background.includes('#ec38bc')) {
        grad.addColorStop(0, '#03001e');
        grad.addColorStop(0.5, '#7303c0');
        grad.addColorStop(1, '#ec38bc');
      } else if (background.includes('#311042')) {
        grad.addColorStop(0, '#1e1b4b');
        grad.addColorStop(1, '#311042');
      } else if (background.includes('#16a34a')) {
        grad.addColorStop(0, '#1e1b4b');
        grad.addColorStop(0.5, '#1e293b');
        grad.addColorStop(1, '#16a34a');
      } else if (background.includes('#064e3b')) {
        grad.addColorStop(0, '#022c22');
        grad.addColorStop(1, '#064e3b');
      } else {
        grad.addColorStop(0, '#0f172a');
        grad.addColorStop(1, '#1e293b');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw GRID guidelines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Design Layout variations
      if (layout === 'rounded') {
        // Rounded card inside
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.beginPath();
        ctx.roundRect(40, 40, width - 80, height - 80, 24);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      } else if (layout === 'brutalist') {
        // Heavy border
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 12;
        ctx.strokeRect(20, 20, width - 40, height - 40);
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(40, 40, width - 80, height - 80);
      }

      // Draw Badge
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.roundRect(width / 2 - 70, 75, 140, 30, 8);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px "JetBrains Mono", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(badgeText.toUpperCase(), width / 2, 75 + 15);

      // Title Text
      ctx.fillStyle = textColor;
      ctx.font = 'bold 36px "Inter", sans-serif';
      ctx.fillText(title, width / 2, height / 2 - 10);

      // Subtitle Text
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '500 18px "Inter", sans-serif';
      ctx.fillText(subtitle, width / 2, height / 2 + 40);

      // Brand info
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.font = '11px "JetBrains Mono", sans-serif';
      ctx.fillText('AMOO ACADEMY | DIRECT CERTIFIED WORK', width / 2, height - 60);

      // Draw sticker
      ctx.fillStyle = accentColor;
      ctx.font = '40px serif';
      const stickerSymbol = activeSticker === 'star' ? '⭐' : activeSticker === 'flame' ? '🔥' : activeSticker === 'trophy' ? '🏆' : '❤️';
      ctx.fillText(stickerSymbol, width / 2, height / 2 - 80);

      resolve(canvas.toDataURL('image/png'));
    });
  };

  const handleDownload = async () => {
    setIsProcessing(true);
    const dataUrl = await drawToCanvas();
    const link = document.createElement('a');
    link.download = `amoo-design-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
    setIsProcessing(false);
  };

  const handleSave = async () => {
    setIsProcessing(true);
    const dataUrl = await drawToCanvas();
    onSave(dataUrl);
    setSuccessMsg(lang === 'om' ? 'Diizaayiniin keessan portfolio irratti ol-keessaniiru! 🗂️' : 'Saved graphic layout to portfolio! 🗂️');
    setIsProcessing(false);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const StickerIcon = getActiveStickerIcon();

  return (
    <div id="graphic-lab-container" className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left column: Visual Canvas */}
        <div className="flex-1 space-y-6">
          <div 
            ref={canvasContainerRef}
            style={{ backgroundImage: background }}
            className={`aspect-video w-full rounded-2xl flex flex-col justify-between p-8 relative border border-white/5 overflow-hidden transition-all duration-300 ${
              layout === 'brutalist' ? 'border-4 border-indigo-500' : ''
            }`}
          >
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Layout Rounding Card overlay */}
            {layout === 'rounded' && (
              <div className="absolute inset-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-xs -z-0" />
            )}

            {/* Content Container (Ensure higher index than overlays) */}
            <div className="relative z-10 flex flex-col items-center justify-between h-full w-full text-center">
              
              {/* Badge & Sticker */}
              <div className="flex flex-col items-center gap-2 mt-4">
                <div className="animate-bounce">
                  <StickerIcon className="w-8 h-8" style={{ color: accentColor }} />
                </div>
                <span 
                  className="px-3.5 py-1 text-[11px] font-black tracking-widest text-white rounded-full uppercase"
                  style={{ backgroundColor: accentColor }}
                >
                  {badgeText || 'CREATIVE'}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-2 max-w-md">
                <h3 
                  className="text-2xl md:text-3xl font-black tracking-tight leading-none"
                  style={{ color: textColor }}
                >
                  {title || (lang === 'om' ? 'Barreeffama Keessi' : 'Enter Title')}
                </h3>
                <p className="text-xs md:text-sm text-slate-300 font-medium tracking-wide">
                  {subtitle || (lang === 'om' ? 'Barreeffama Xiqqaa' : 'Enter Subtitle')}
                </p>
              </div>

              {/* Verified Ribbon Footer */}
              <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mt-2">
                🏆 Amoo Academy • {lang === 'om' ? 'Portfoliyoo barataa' : 'Verified Student Asset'}
              </div>
            </div>
          </div>

          {/* Preset templates selector */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Layout className="w-3.5 h-3.5 text-emerald-400" />
              {lang === 'om' ? 'Preset-oota Jalqabaa:' : 'Quick Starts Templates:'}
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setBackground(t.bg);
                    setBadgeText(t.tag);
                  }}
                  className="bg-slate-800/40 hover:bg-slate-800 text-[11px] font-bold text-slate-300 px-3 py-2.5 rounded-xl border border-slate-700/50 transition truncate cursor-pointer text-center"
                >
                  {lang === 'om' ? t.nameOm : t.nameEn}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Design Station Control panel */}
        <div className="w-full lg:w-96 space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Palette className="w-4 h-4 text-emerald-400" />
              {lang === 'om' ? 'Diizaayina Moodii:' : 'Branding Controls:'}
            </h4>
          </div>

          {/* Background Gradients */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 tracking-wider uppercase block">
              {lang === 'om' ? '1. Halluu Duubaa:' : '1. Background Gradients:'}
            </label>
            <div className="flex flex-wrap gap-2">
              {GRADIENTS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setBackground(g.css)}
                  title={g.name}
                  style={{ backgroundImage: g.css }}
                  className={`w-9 h-9 rounded-full border-2 transition cursor-pointer ${
                    background === g.css ? 'border-white scale-110 shadow-lg' : 'border-slate-800 hover:border-slate-500'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Customize Typography Content */}
          <div className="space-y-3.5 pt-1">
            <label className="text-xs font-bold text-slate-400 tracking-wider uppercase flex items-center gap-1">
              <Type className="w-3.5 h-3.5 text-blue-400" />
              {lang === 'om' ? '2. Maxxansa Barreeffamaa:' : '2. Typography Content:'}
            </label>
            
            <div className="space-y-2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={lang === 'om' ? 'Gulaallii Suuraa Portfoliyoo' : 'Core Focus Title'}
                maxLength={40}
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder={lang === 'om' ? 'Fiverr koorporiit gig kiyya' : 'Sub-Header descriptor'}
                maxLength={50}
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <input
                type="text"
                value={badgeText}
                onChange={(e) => setBadgeText(e.target.value)}
                placeholder="Badge tag text (e.g. PREMIUM)"
                maxLength={12}
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
              />
            </div>
          </div>

          {/* Sticker / Icon Accent */}
          <div className="space-y-2 pt-1">
            <label className="text-xs font-bold text-slate-400 tracking-wider uppercase flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-purple-400" />
              {lang === 'om' ? '3. Badge Sticker:' : '3. Accent Sticker:'}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {STICKERS.map((s) => {
                const ItemIcon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveSticker(s.id)}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition cursor-pointer ${
                      activeSticker === s.id 
                        ? 'bg-purple-600/20 text-purple-300 border-purple-500/50' 
                        : 'bg-slate-800/50 text-slate-400 border-slate-700/60 hover:bg-slate-800'
                    }`}
                  >
                    <ItemIcon className="w-4 h-4" />
                    <span className="text-[9px] font-mono">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Layout Themes */}
          <div className="space-y-2 pt-1">
            <label className="text-xs font-bold text-slate-400 tracking-wider uppercase block">
              {lang === 'om' ? '4. Layout Diizaayini:' : '4. Layout Framework:'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'centered', labelOm: 'Saphala', labelEn: 'Default' },
                { id: 'rounded', labelOm: 'Makuu', labelEn: 'Overlay' },
                { id: 'brutalist', labelOm: 'Brutal', labelEn: 'Heavy' }
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => setLayout(style.id as any)}
                  className={`py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                    layout === style.id
                      ? 'bg-blue-600/20 text-blue-300 border-blue-500/50'
                      : 'bg-slate-800/50 text-slate-400 border-slate-700/60 hover:bg-slate-800'
                  }`}
                >
                  {lang === 'om' ? style.labelOm : style.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Save / Download */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            {successMsg && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs py-2 px-3 rounded-xl font-medium">
                {successMsg}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 animate-fade-in">
              <button
                onClick={handleSave}
                disabled={isProcessing}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-lg active:scale-95 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {lang === 'om' ? 'Portfolio Kaayi' : 'Save Portfolio'}
              </button>

              <button
                onClick={handleDownload}
                disabled={isProcessing}
                className="bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 border border-slate-700 py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                {lang === 'om' ? 'Diizaayini Buusi' : 'Download PNG'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
