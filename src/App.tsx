/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, Globe, Sparkles, BookOpen, GraduationCap, Phone, MapPin, Database, ArrowRight, UserCheck } from 'lucide-react';
import { Language, UserProgress, Course } from './types';
import { LOCALIZATION, COURSES } from './data';
import { supabase, isRealSupabaseConfigured, mockSignIn } from './lib/supabase';
import Dashboard from './components/Dashboard';
import CourseView from './components/CourseView';

export default function App() {
  const [lang, setLang] = useState<Language>('om');
  const [user, setUser] = useState<{ email: string } | null>(null);
  
  // Auth Form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // App routing & progress state
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [progress, setProgress] = useState<UserProgress>({
    completedLessons: [],
    completedQuizzes: [],
    scores: {},
    savedDesigns: []
  });

  const t = LOCALIZATION[lang];

  // Load progress and user session on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('amoo_academy_student_progress_rev2');
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (e) {
        console.error("Failed to restore progress", e);
      }
    }

    // Restore user session if preserved
    const savedUser = localStorage.getItem('amoo_academy_student_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    if (isRealSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const userObj = { email: session.user.email || 'student@amoo.academy' };
          setUser(userObj);
          localStorage.setItem('amoo_academy_student_user', JSON.stringify(userObj));
        }
      });
    }
  }, []);

  // Save progress changes
  const handleUpdateProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('amoo_academy_student_progress_rev2', JSON.stringify(newProgress));
  };

  // Auth Action
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthLoading(true);

    const formatEmail = email.trim();
    const formatPassword = password.trim();

    if (!formatEmail || !formatPassword) {
      setAuthError(lang === 'om' ? 'Email fi password barreesi.' : 'Please enter both email and password.');
      setIsAuthLoading(false);
      return;
    }

    try {
      if (isRealSupabaseConfigured && supabase) {
        // Real Supabase Authorization
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formatEmail,
          password: formatPassword,
        });

        if (error) {
          setAuthError(error.message);
        } else if (data?.user) {
          const userObj = { email: data.user.email || formatEmail };
          setUser(userObj);
          localStorage.setItem('amoo_academy_student_user', JSON.stringify(userObj));
        }
      } else {
        // Demo Sandbox Mode Authorization
        const { data, error } = await mockSignIn(formatEmail, formatPassword);
        if (error) {
          setAuthError(error.message);
        } else if (data?.user) {
          const userObj = { email: data.user.email };
          setUser(userObj);
          localStorage.setItem('amoo_academy_student_user', JSON.stringify(userObj));
        }
      }
    } catch (err: any) {
      setAuthError(err?.message || 'Access failure.');
    } finally {
      setIsAuthLoading(false);
    }
  };

  // Logout action
  const handleSignOut = async () => {
    if (isRealSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setActiveCourse(null);
    localStorage.removeItem('amoo_academy_student_user');
  };

  // Language conversion toggle
  const toggleLanguage = () => {
    setLang(prev => (prev === 'om' ? 'en' : 'om'));
  };

  return (
    <div className="bg-[#0B0E14] min-h-screen text-slate-200 antialiased font-sans flex flex-col justify-between">
      
      {/* ==================== NAVIGATION BAR ==================== */}
      <nav className="sticky top-0 z-50 px-6 py-5 md:px-10 bg-slate-900/40 border-b border-white/5 backdrop-blur-xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h1 
            onClick={() => setActiveCourse(null)}
            className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 cursor-pointer select-none leading-none"
          >
            AMOO ACADEMY
          </h1>
          <div className="flex gap-3 justify-center md:justify-start mt-2 text-[10px] uppercase tracking-widest text-slate-500 font-bold font-mono">
            <span>Harar, Ethiopia</span>
            <span className="text-blue-500/50">/</span>
            <span>+251 967 145 146</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex gap-2 p-1 bg-black/40 rounded-lg border border-white/5">
            <button 
              onClick={() => { if (lang !== 'en') toggleLanguage(); }}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                lang === 'en' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              English
            </button>
            <button 
              onClick={() => { if (lang !== 'om') toggleLanguage(); }}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                lang === 'om' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Oromoo
            </button>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <button 
                onClick={handleSignOut} 
                className="bg-red-500/10 hover:bg-red-500 hover:text-white border border-red-500/20 text-red-400 text-xs font-bold px-3 py-1.5 rounded-lg transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                {t.logOut}
              </button>
            )}
            
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-400 flex items-center justify-center text-sm font-bold border-2 border-white/10 shadow-xl text-white select-none">
              {user ? user.email.slice(0, 2).toUpperCase() : 'AM'}
            </div>
          </div>
        </div>
      </nav>

      {/* ==================== MAIN PANEL ==================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 py-8 md:p-8 flex flex-col justify-start">
        <AnimatePresence mode="wait">
          
          {/* 1. AUTHENTICATION SHIELD */}
          {!user ? (
            <motion.div 
              key="auth-section"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex-1 flex flex-col items-center justify-center p-2 mb-8"
            >
              <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-2xl w-full max-w-md space-y-6">
                <div className="text-center space-y-2">
                  <div className="inline-flex p-3 bg-blue-500/10 border border-white/5 rounded-2xl text-blue-400 mb-1">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black text-white tracking-tight">
                    {t.lTitle}
                  </h2>
                  <p className="text-slate-400 text-xs font-medium">
                    {t.lSubtitle}
                  </p>
                </div>

                {/* DB CONFIGURATION SUMMARY */}
                <div className="bg-black/30 p-3.5 rounded-2xl text-[11px] text-slate-400 leading-relaxed border border-white/5 flex items-start gap-2.5">
                  <Database className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-300 block">
                      {isRealSupabaseConfigured 
                        ? (lang === 'om' ? 'Moode Supabase Koduu' : 'Database Status: Supabase Online') 
                        : (lang === 'om' ? 'Kallattii Sandbox Hojjetaa jira' : 'Demo Sandbox Enabled')}
                    </span>
                    {isRealSupabaseConfigured 
                      ? (lang === 'om' ? 'Kallattii Supabase dhiyeessitanii seeni.' : 'Your customized Supabase project is active with real user tables.')
                      : (lang === 'om' ? 'Email keessaniifi password kamiyyuu fayyadamuun seeni.' : 'Enter any sample email (e.g., dhiirakoo@gmail.com) and password to begin immediately.')}
                  </div>
                </div>

                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  {authError && (
                    <div className="bg-red-500/10 border border-red-550/20 text-red-400 text-xs py-2 px-3.5 rounded-xl font-medium">
                      ⚠️ {lang === 'om' ? `Dogoggora: ${authError}` : `Authentication issue: ${authError}`}
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
                      {t.lEmail}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. dhiirakoo@gmail.com"
                      className="w-full p-3 bg-black/45 border border-white/5 rounded-2xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition font-sans"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
                      {t.lPassword}
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-3 bg-black/45 border border-white/5 rounded-2xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition font-sans"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isAuthLoading}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold rounded-2xl transition shadow-lg active:scale-[0.98] cursor-pointer text-xs font-sans tracking-widest uppercase flex items-center justify-center gap-1.5"
                  >
                    {isAuthLoading ? (
                      t.lLoading
                    ) : (
                      <>
                        {t.lBtn}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          ) : (
            
            /* 2. LOGGED IN PORTAL SCREEN */
            <motion.div 
              key="portal-area"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              {/* Info alert banner if in demo sandbox mode */}
              {!isRealSupabaseConfigured && (
                <div className="bg-blue-500/10 border border-white/5 p-3 px-4 rounded-2xl mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-blue-300">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-600/20 px-2 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase border border-blue-500/30">
                      OFFLINE MODE
                    </span>
                    <span>
                      {lang === 'om' ? 'Mode Offlayiniin hojjetaa jira.' : 'Local sandbox active. Progress preserved in your browser storage.'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 hover:underline">
                    {lang === 'om' ? 'Amanuel | Harar' : 'Harar Central'}
                  </span>
                </div>
              )}

              {/* RENDER VIEW CONTROLLER */}
              {!activeCourse ? (
                <Dashboard 
                  courses={COURSES}
                  lang={lang}
                  progress={progress}
                  onSelectCourse={(course) => setActiveCourse(course)}
                  onUpdateProgress={handleUpdateProgress}
                  userEmail={user?.email || 'dhiirakoo@gmail.com'}
                />
              ) : (
                <CourseView 
                  course={activeCourse}
                  lang={lang}
                  progress={progress}
                  onUpdateProgress={handleUpdateProgress}
                  onBack={() => setActiveCourse(null)}
                />
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="px-10 py-6 flex flex-col md:flex-row justify-between items-center border-t border-white/5 bg-black/20 text-[11px] font-medium text-slate-600 max-w-7xl mx-auto w-full gap-4">
        <div>&copy; 2026 AMOO ACADEMY &mdash; ALL RIGHTS RESERVED</div>
        <div className="flex gap-6 uppercase tracking-widest font-mono text-slate-500">
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
          <span>Help Desk</span>
        </div>
      </footer>

    </div>
  );
}
