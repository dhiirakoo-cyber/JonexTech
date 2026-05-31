/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Sun, Contrast, Sliders, RotateCcw, Download, Sparkles, Image as ImageIcon, Upload, Save } from 'lucide-react';
import { Language } from '../types';

interface PhotoLabProps {
  lang: Language;
  onSave: (imageUrl: string) => void;
}

const PRESET_IMAGES = [
  { id: 'portrait', nameOm: 'Suuraa Portfolio', nameEn: 'Portfolio Portrait', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600' },
  { id: 'scenery', nameOm: 'Samii / Nature', nameEn: 'Landscapes & Sky', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600' },
  { id: 'studio', nameOm: 'Studio Light', nameEn: 'Creative Studio', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600' }
];

const DEFAULT_FILTERS = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  sepia: 0,
  grayscale: 0,
  hueRotate: 0,
  blur: 0,
  invert: 0
};

export default function PhotoLab({ lang, onSave }: PhotoLabProps) {
  const [selectedImage, setSelectedImage] = useState(PRESET_IMAGES[0].url);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const handleFilterChange = (key: keyof typeof DEFAULT_FILTERS, value: number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  };

  // Generate the CSS filter string
  const getFilterCSS = () => {
    return `brightness(${filters.brightness}%) ` +
           `contrast(${filters.contrast}%) ` +
           `saturate(${filters.saturation}%) ` +
           `sepia(${filters.sepia}%) ` +
           `grayscale(${filters.grayscale}%) ` +
           `hue-rotate(${filters.hueRotate}deg) ` +
           `blur(${filters.blur}px) ` +
           `invert(${filters.invert}%)`;
  };

  // Render filter modifications on a hidden canvas and return or download it
  const generateProcessedImage = (): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = selectedImage;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(selectedImage);
          return;
        }

        // Apply filters to canvas context
        ctx.filter = `brightness(${filters.brightness}%) ` +
                     `contrast(${filters.contrast}%) ` +
                     `saturate(${filters.saturation}%) ` +
                     `sepia(${filters.sepia}%) ` +
                     `grayscale(${filters.grayscale}%) ` +
                     `hue-rotate(${filters.hueRotate}deg) ` +
                     `blur(${filters.blur}px) ` +
                     `invert(${filters.invert}%)`;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        try {
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          resolve(dataUrl);
        } catch (e) {
          // If tainted due to CORS, fallback to original URL
          resolve(selectedImage);
        }
      };
      img.onerror = () => {
        resolve(selectedImage);
      };
    });
  };

  const handleDownload = async () => {
    setIsProcessing(true);
    const dataUrl = await generateProcessedImage();
    const link = document.createElement('a');
    link.download = `amoo-academy-edit-${Date.now()}.jpg`;
    link.href = dataUrl;
    link.click();
    setIsProcessing(false);
  };

  const handleSaveToPortfolio = async () => {
    setIsProcessing(true);
    const dataUrl = await generateProcessedImage();
    onSave(dataUrl);
    setSuccessMsg(lang === 'om' ? 'Gulaallii keessan portfolio irratti ol-keessaniiru! 🏆' : 'Saved edit to your portfolio! 🏆');
    setIsProcessing(false);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div id="photo-lab-container" className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left column: Preview & image selector */}
        <div className="flex-1 space-y-6">
          <div className="relative aspect-square md:aspect-video lg:aspect-square bg-slate-950/80 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center group">
            <img 
              ref={imageRef}
              src={selectedImage} 
              alt="Workspace Edit Preview" 
              className="max-h-full max-w-full object-contain transition-all duration-75"
              style={{ filter: getFilterCSS() }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] text-blue-400 font-mono font-bold flex items-center gap-1.5 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              {lang === 'om' ? 'REAL-TIME WORKSPACE' : 'REAL-TIME WORKSPACE'}
            </div>
          </div>

          {/* Quick choices & Custom Upload */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
              {lang === 'om' ? 'Filadhu ykn Suuraa Kee Fidi:' : 'Select Preset Image or Upload custom:'}
            </label>
            <div className="flex flex-wrap gap-2.5">
              {PRESET_IMAGES.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.url)}
                  className={`px-3 py-2 text-xs font-semibold rounded-xl border transition cursor-pointer flex items-center gap-1.5 ${
                    selectedImage === img.url 
                      ? 'bg-blue-600/20 text-blue-300 border-blue-500/50' 
                      : 'bg-slate-800/40 text-slate-400 border-slate-700/50 hover:bg-slate-800'
                  }`}
                >
                  <img src={img.url} className="w-4 h-4 rounded object-cover" referrerPolicy="no-referrer" />
                  {lang === 'om' ? img.nameOm : img.nameEn}
                </button>
              ))}
              
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 px-3.5 py-2 text-xs font-semibold rounded-xl cursor-pointer flex items-center gap-1.5 transition"
              >
                <Upload className="w-4 h-4" />
                {lang === 'om' ? 'Suuraa Kee Fidi' : 'Upload Image'}
              </button>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleCustomUpload} 
              />
            </div>
          </div>
        </div>

        {/* Right column: Filters and controls */}
        <div className="w-full lg:w-96 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-400" />
                {lang === 'om' ? 'Sirreeffamoota Filitaraa:' : 'Advanced Retouch Filters:'}
              </h4>
              <button 
                onClick={resetFilters}
                className="text-slate-400 hover:text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer bg-slate-800/60 px-2 py-1 rounded"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {lang === 'om' ? 'Deebisi' : 'Reset'}
              </button>
            </div>

            {/* Brightness */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1"><Sun className="w-3.5 h-3.5 text-amber-400" /> {lang === 'om' ? 'Brightness' : 'Brightness'}</span>
                <span className="font-mono text-blue-400">{filters.brightness}%</span>
              </div>
              <input 
                type="range" min="0" max="200" value={filters.brightness} 
                onChange={(e) => handleFilterChange('brightness', Number(e.target.value))}
                className="w-full accent-blue-500 bg-slate-800" 
              />
            </div>

            {/* Contrast */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1"><Contrast className="w-3.5 h-3.5 text-sky-400" /> {lang === 'om' ? 'Contrast' : 'Contrast'}</span>
                <span className="font-mono text-blue-400">{filters.contrast}%</span>
              </div>
              <input 
                type="range" min="0" max="200" value={filters.contrast} 
                onChange={(e) => handleFilterChange('contrast', Number(e.target.value))}
                className="w-full accent-blue-500 bg-slate-800" 
              />
            </div>

            {/* Saturation */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span>🎨 {lang === 'om' ? 'Saturation' : 'Saturation'}</span>
                <span className="font-mono text-blue-400">{filters.saturation}%</span>
              </div>
              <input 
                type="range" min="0" max="200" value={filters.saturation} 
                onChange={(e) => handleFilterChange('saturation', Number(e.target.value))}
                className="w-full accent-blue-500 bg-slate-800" 
              />
            </div>

            {/* Hue-Rotate */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span>🌈 {lang === 'om' ? 'Hue Offset' : 'Hue Offset'}</span>
                <span className="font-mono text-blue-400">{filters.hueRotate}°</span>
              </div>
              <input 
                type="range" min="0" max="360" value={filters.hueRotate} 
                onChange={(e) => handleFilterChange('hueRotate', Number(e.target.value))}
                className="w-full accent-blue-500 bg-slate-800" 
              />
            </div>

            {/* Sepia */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span>🍂 {lang === 'om' ? 'Sepia Vintage' : 'Sepia Vintage'}</span>
                <span className="font-mono text-blue-400">{filters.sepia}%</span>
              </div>
              <input 
                type="range" min="0" max="100" value={filters.sepia} 
                onChange={(e) => handleFilterChange('sepia', Number(e.target.value))}
                className="w-full accent-blue-500 bg-slate-800" 
              />
            </div>

            {/* Grayscale */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span>🖤 {lang === 'om' ? 'Grayscale' : 'Grayscale'}</span>
                <span className="font-mono text-blue-400">{filters.grayscale}%</span>
              </div>
              <input 
                type="range" min="0" max="100" value={filters.grayscale} 
                onChange={(e) => handleFilterChange('grayscale', Number(e.target.value))}
                className="w-full accent-blue-500 bg-slate-800" 
              />
            </div>

            {/* Blur */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span>🌫️ {lang === 'om' ? 'Bokeh Blur' : 'Bokeh Blur'}</span>
                <span className="font-mono text-blue-400">{filters.blur}px</span>
              </div>
              <input 
                type="range" min="0" max="10" step="0.5" value={filters.blur} 
                onChange={(e) => handleFilterChange('blur', Number(e.target.value))}
                className="w-full accent-blue-500 bg-slate-800" 
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            {successMsg && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs py-2 px-3 rounded-xl font-medium animate-fade-in">
                {successMsg}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleSaveToPortfolio}
                disabled={isProcessing}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 px-4 rounded-xl text-xs font-bold font-sans tracking-wide transition cursor-pointer flex items-center justify-center gap-1.5 shadow-lg active:scale-95"
              >
                <Save className="w-4 h-4" />
                {lang === 'om' ? 'Portfolio Olkaayi' : 'Save Portfolio'}
              </button>

              <button
                onClick={handleDownload}
                disabled={isProcessing}
                className="bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 border border-slate-700 py-3 px-4 rounded-xl text-xs font-bold font-sans tracking-wide transition cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Download className="w-4 h-4" />
                {lang === 'om' ? 'Gadi Buusi' : 'Download'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
