/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Film, Play, Square, Music, Volume2, Sparkles, RefreshCw, Layers, Save, Plus, Trash2 } from 'lucide-react';
import { Language } from '../types';

interface VideoLabProps {
  lang: Language;
  onSave: (imageUrl: string) => void;
}

interface Clip {
  id: string;
  type: 'hook' | 'body' | 'cta';
  titleEn: string;
  titleOm: string;
  subEn: string;
  subOm: string;
  duration: number; // in seconds
  visualPreset: string; // colors or class name
}

const AVAILABLE_CLIPS: Clip[] = [
  // Hooks
  { id: 'hook-1', type: 'hook', titleEn: '🚨 3 Mind-Blowing Secrets', titleOm: '🚨 Iccitii Gurguddaa 3', subEn: 'Designers hide this from you!', subOm: 'Kan diizaayinaroonni sirraa dhoksan!', duration: 3, visualPreset: 'from-amber-600 to-red-650' },
  { id: 'hook-2', type: 'hook', titleEn: '😱 Stop Doing This In Figma!', titleOm: '😱 Tapha Figma Kana Dhaabi!', subEn: 'You are wasting hours of work!', subOm: 'Yeroo kee hunda balleessaa jirta!', duration: 3, visualPreset: 'from-red-650 to-purple-650' },
  // Bodies
  { id: 'body-1', type: 'body', titleEn: '⚡ The Keyboard Shortcut Trick', titleOm: '⚡ Trick Shortcut Hojii Saffisiisu', subEn: 'Just press Alt + drag to clone components', subOm: 'Gulaallii figma Alt + drag gochuun baay\'isi', duration: 4, visualPreset: 'from-blue-600 to-indigo-650' },
  { id: 'body-2', type: 'body', titleEn: '🎨 Perfect Grayscale Conversion', titleOm: '🎨 Gulaallii Grayscale Guutuu', subEn: 'Control individual luminosity channels', subOm: 'Suuricha irratti channel dandeettii to\'adhu', duration: 4, visualPreset: 'from-emerald-600 to-teal-650' },
  // CTAs
  { id: 'cta-1', type: 'cta', titleEn: '📈 Join Amoo Academy Today!', titleOm: '📈 Barnoota Amoo Academy Seeni!', subEn: 'Call Amanuel at +251967145146', subOm: 'Amanueliin bilbilii +251967145146', duration: 3, visualPreset: 'from-indigo-600 to-violet-750' },
  { id: 'cta-2', type: 'cta', titleEn: '🔥 Level Up Your Fiverr Gig', titleOm: '🔥 Ogummaa Portfoliyoo kee guddisi', subEn: 'Start earning like a professional pro', subOm: 'Bifa professional kanaan fiverr irratti hojjadhu', duration: 3, visualPreset: 'from-pink-600 to-rose-650' }
];

const AUDIO_TRACKS = [
  { id: 'cyber', name: 'Upbeat Cyber Synth', energy: 'High' },
  { id: 'lofi', name: 'Chill Lofi Study Beat', energy: 'Low' },
  { id: 'cinematic', name: 'Amoo Academy Cinematic Theme', energy: 'Epic' }
];

export default function VideoLab({ lang, onSave }: VideoLabProps) {
  const [timeline, setTimeline] = useState<Clip[]>([
    AVAILABLE_CLIPS[0], // Hook 1
    AVAILABLE_CLIPS[2], // Body 1
    AVAILABLE_CLIPS[4]  // CTA 1
  ]);

  const [bgMusic, setBgMusic] = useState(AUDIO_TRACKS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [clipSecondsElapsed, setClipSecondsElapsed] = useState(0);
  const [textEffect, setTextEffect] = useState<'yellow-pop' | 'cyber-glow' | 'minimal'>('yellow-pop');
  
  const [successMsg, setSuccessMsg] = useState('');

  // Total Duration
  const totalDuration = timeline.reduce((acc, clip) => acc + clip.duration, 0);

  // Playback Loop Simulation
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setClipSecondsElapsed(prev => {
          const currentClip = timeline[currentClipIndex];
          if (!currentClip) {
            setIsPlaying(false);
            return 0;
          }

          if (prev >= currentClip.duration - 1) {
            // Move to next clip or end
            if (currentClipIndex < timeline.length - 1) {
              setCurrentClipIndex(prevIdx => prevIdx + 1);
              return 0;
            } else {
              setIsPlaying(false);
              setCurrentClipIndex(0);
              return 0;
            }
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentClipIndex, timeline]);

  const handleTogglePlay = () => {
    if (!isPlaying) {
      setCurrentClipIndex(0);
      setClipSecondsElapsed(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleUpdateSlot = (index: number, clip: Clip) => {
    setTimeline(prev => {
      const updated = [...prev];
      updated[index] = clip;
      return updated;
    });
  };

  const handleSaveProject = () => {
    // Save to study portfolio as a virtual snapshot
    const thumbnailCanvas = `VIDEO_SEQ_${bgMusic.toUpperCase()}_SLOTS_${timeline.map(c => c.id).join('_')}`;
    onSave(thumbnailCanvas);
    setSuccessMsg(lang === 'om' ? 'Projektiin viidiyoo keessanii ol-keessaniiru! 🎬' : 'Saved video project sequence successfully! 🎬');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const currentActiveClip = timeline[currentClipIndex];

  return (
    <div id="video-lab-container" className="bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl">
      <div className="space-y-6">
        
        {/* VIDEO PREVIEW SCREEN SIMULATOR */}
        <div className="relative aspect-video w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border border-slate-800 bg-black flex items-center justify-center">
          
          {/* Simulated Video Feed Background with glowing colored presets */}
          <div className={`absolute inset-0 bg-gradient-to-br ${isPlaying && currentActiveClip ? currentActiveClip.visualPreset : 'from-slate-950 to-slate-900'} transition-all duration-700 ease-out flex flex-col justify-end p-6 md:p-8 text-center`}>
            
            {/* Visual scanlines & ambient grain overlays */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
            
            {/* Live Interactive elements playing */}
            {isPlaying && currentActiveClip ? (
              <div className="h-full flex flex-col justify-between relative z-10">
                {/* HUD info */}
                <div className="flex justify-between items-center">
                  <span className="bg-red-600 px-2 py-0.5 rounded text-[9px] font-black tracking-widest text-white animate-pulse">● LIVE PREVIEW</span>
                  <span className="font-mono text-xs text-white bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-md">
                    {currentClipIndex + 1}/{timeline.length} • {clipSecondsElapsed + 1}s / {currentActiveClip.duration}s
                  </span>
                </div>

                {/* Captions Rendering - CapCut Viral Captions style */}
                <div className="my-auto space-y-4 px-4 anim-pulse-fast">
                  <h3 className={`text-xl md:text-3.5xl font-black tracking-tighter leading-none select-none uppercase ${
                    textEffect === 'yellow-pop' ? 'text-yellow-400 drop-shadow-[0_4px_12px_rgba(234,179,8,0.4)]' :
                    textEffect === 'cyber-glow' ? 'text-cyan-400 drop-shadow-[0_4px_12px_rgba(34,211,238,0.5)]' :
                    'text-white'
                  }`}>
                    {lang === 'om' ? currentActiveClip.titleOm : currentActiveClip.titleEn}
                  </h3>
                  <p className="text-xs md:text-md text-white font-semibold italic max-w-sm mx-auto bg-black/45 py-1 rounded-lg backdrop-blur-xs">
                    "{lang === 'om' ? currentActiveClip.subOm : currentActiveClip.subEn}"
                  </p>
                </div>

                {/* Sub-Track visual audio waves */}
                <div className="flex items-center justify-center gap-1.5 h-6">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1.5 bg-blue-400 rounded-full transition-all duration-300"
                      style={{ 
                        height: isPlaying ? `${Math.floor(Math.random() * 20) + 4}px` : '4px',
                        animationDelay: `${i * 80}ms`
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center space-y-3 z-10 text-slate-400">
                <Play className="w-10 h-10 text-slate-500 animate-pulse" />
                <p className="text-xs font-semibold uppercase tracking-widest">
                  {lang === 'om' ? 'Sagalee fi Viidiyoo Jalqabuuf PLAY cuqaasi' : 'Press Play to preview compiled timeline'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* TIMELINE SLOTS AREA */}
        <div className="space-y-3.5">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-purple-400" />
              {lang === 'om' ? 'Projekti Timeline Gulaallii (3 Slots):' : 'Project Editing Timeline Layout (3 Slots):'}
            </span>
            <span className="font-mono text-xs text-blue-400 font-semibold bg-slate-800/40 px-2 py-0.5 rounded-md">
              {lang === 'om' ? `Tursiisa: ${totalDuration}s` : `Total Duration: ${totalDuration}s`}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* SLOT 1: HOOK */}
            <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">SLOT 01: HOOK (3s)</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-400">{lang === 'om' ? 'Filadhu Attention Hook:' : 'Select attention grabbing hook:'}</p>
                <select 
                  onChange={(e) => handleUpdateSlot(0, AVAILABLE_CLIPS.find(c => c.id === e.target.value) || AVAILABLE_CLIPS[0])}
                  value={timeline[0]?.id || ''}
                  className="w-full text-xs p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none"
                >
                  {AVAILABLE_CLIPS.filter(c => c.type === 'hook').map(c => (
                    <option key={c.id} value={c.id}>{lang === 'om' ? c.titleOm : c.titleEn}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* SLOT 2: BODY */}
            <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">SLOT 02: CONTENT (4s)</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-400">{lang === 'om' ? 'Dandeettii / Content:' : 'Body demonstration content:'}</p>
                <select 
                  onChange={(e) => handleUpdateSlot(1, AVAILABLE_CLIPS.find(c => c.id === e.target.value) || AVAILABLE_CLIPS[2])}
                  value={timeline[1]?.id || ''}
                  className="w-full text-xs p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none"
                >
                  {AVAILABLE_CLIPS.filter(c => c.type === 'body').map(c => (
                    <option key={c.id} value={c.id}>{lang === 'om' ? c.titleOm : c.titleEn}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* SLOT 3: CTA */}
            <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">SLOT 03: OUTRO CTA (3s)</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-400">{lang === 'om' ? 'Action / Outro:' : 'Outro Call-to-action:'}</p>
                <select 
                  onChange={(e) => handleUpdateSlot(2, AVAILABLE_CLIPS.find(c => c.id === e.target.value) || AVAILABLE_CLIPS[3])}
                  value={timeline[2]?.id || ''}
                  className="w-full text-xs p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none"
                >
                  {AVAILABLE_CLIPS.filter(c => c.type === 'cta').map(c => (
                    <option key={c.id} value={c.id}>{lang === 'om' ? c.titleOm : c.titleEn}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* REEL SETTINGS (AUDIO & SUBTITLE EFFECTS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/40 p-4 rounded-2xl border border-slate-805">
          
          {/* Music track selector */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-blue-400" />
              {lang === 'om' ? 'Koreographie Musikaa:' : 'Active Music Track:'}
            </span>
            <div className="grid grid-cols-1 gap-2">
              {AUDIO_TRACKS.map((track) => (
                <button
                  key={track.id}
                  onClick={() => setBgMusic(track.id)}
                  className={`px-3 py-2.5 rounded-xl border text-left text-xs font-semibold flex justify-between items-center transition cursor-pointer ${
                    bgMusic === track.id 
                      ? 'bg-blue-600/25 text-blue-300 border-blue-500/50' 
                      : 'bg-slate-800/40 text-slate-400 border-slate-700/60 hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4" />
                    {track.name}
                  </span>
                  <span className="text-[10px] font-mono text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded uppercase">{track.energy} Energy</span>
                </button>
              ))}
            </div>
          </div>

          {/* Captions Customization & Saving options */}
          <div className="space-y-3.5 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                {lang === 'om' ? 'Captions Style:' : 'Captions Typography Styles:'}
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'yellow-pop', name: 'CapCut Yellow' },
                  { id: 'cyber-glow', name: 'Neon Cyber' },
                  { id: 'minimal', name: 'Minimal White' }
                ].map((eff) => (
                  <button
                    key={eff.id}
                    onClick={() => setTextEffect(eff.id as any)}
                    className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      textEffect === eff.id 
                        ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/50' 
                        : 'bg-slate-800/40 text-slate-400 border-slate-700/60 hover:bg-slate-800'
                    }`}
                  >
                    {eff.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Play & Saving Actions */}
            <div className="space-y-2.5 pt-2">
              {successMsg && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs py-2 px-3 rounded-xl font-medium">
                  {successMsg}
                </div>
              )}
              <div className="flex gap-3">
                <button
                  onClick={handleTogglePlay}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold font-sans tracking-wide transition cursor-pointer flex items-center justify-center gap-2 shadow-lg active:scale-95 ${
                    isPlaying 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Square className="w-4 h-4 fill-white" />
                      {lang === 'om' ? 'Dhaabi Gulaallii' : 'Stop Simulation'}
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" />
                      {lang === 'om' ? 'Viidiyoo Taphadhu (Play)' : 'Play Reel Preview'}
                    </>
                  )}
                </button>

                <button
                  onClick={handleSaveProject}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  {lang === 'om' ? 'Ol-kaayi' : 'Save Sequence'}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
