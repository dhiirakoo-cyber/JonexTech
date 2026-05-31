/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, Award, CheckCircle, Award as AwardIcon, Image as ImageIcon, Flame, Trash2, ArrowUpRight, GraduationCap } from 'lucide-react';
import { Course, Language, UserProgress, SavedDesign } from '../types';

interface DashboardProps {
  courses: Course[];
  lang: Language;
  progress: UserProgress;
  onSelectCourse: (course: Course) => void;
  onUpdateProgress: (newProgress: UserProgress) => void;
  userEmail: string;
}

export default function Dashboard({ courses, lang, progress, onSelectCourse, onUpdateProgress, userEmail }: DashboardProps) {
  
  // Calculate aggregate metrics
  const totalLessons = courses.reduce((acc, c) => acc + c.lessons.length, 0);
  const completedCount = progress.completedLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  
  const certificatesCount = progress.completedQuizzes.length;

  const handleDeleteSavedItem = (id: string) => {
    onUpdateProgress({
      ...progress,
      savedDesigns: progress.savedDesigns.filter(i => i.id !== id)
    });
  };

  const getCourseProgressPercent = (course: Course) => {
    const courseLessonsList = course.lessons.map(l => l.id);
    const completedForThisCourse = courseLessonsList.filter(id => progress.completedLessons.includes(id));
    if (courseLessonsList.length === 0) return 0;
    return Math.round((completedForThisCourse.length / courseLessonsList.length) * 100);
  };

  return (
    <div id="student-main-dashboard" className="space-y-10 animate-fade-in">
      
      {/* HEADER SECTION IN ELEGANT DARK */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 pb-4 border-b border-white/5">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-light text-white leading-tight">
            {lang === 'om' ? 'Baga nagaan deebite,' : 'Welcome back,'} <span className="font-bold">{userEmail.split('@')[0]}</span>
          </h2>
          <p className="text-slate-400 mt-2 text-lg">
            {lang === 'om' 
              ? <>Gulaallii kee itti fufi. Kooziiwwan barachaa jirtu <span className="text-blue-400 font-medium">kooziiwwan premium 3</span> dandeettii keeti.</> 
              : <>Your creative journey continues. You have <span className="text-blue-400 font-medium">3 premium courses</span> active in your dashboard.</>}
          </p>
        </div>

        {/* Dynamic Aggregations in premium cards */}
        <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex gap-8 shadow-2xl w-full sm:w-auto self-stretch sm:self-auto justify-around">
          <div className="text-center">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">
              {lang === 'om' ? 'Syllabus' : 'Syllabus'}
            </p>
            <p className="text-2xl font-mono font-bold text-white">{progressPercent}%</p>
          </div>
          <div className="w-px bg-white/10"></div>
          <div className="text-center">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">
              {lang === 'om' ? 'Milkaa\'ina' : 'Achievements'}
            </p>
            <p className="text-2xl font-mono font-bold text-white">{certificatesCount}</p>
          </div>
        </div>
      </header>

      {/* COURSE COLLECTION SECTION */}
      <div className="space-y-6">
        {/* Course Cards Grid - Elegant Dark transition presets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => {
            const courseProgressVal = getCourseProgressPercent(course);
            
            // Dynamic theme properties from Design spec
            const hoverBorder = 
              course.id === 'photo' ? 'hover:border-blue-500/30' :
              course.id === 'graphic' ? 'hover:border-emerald-500/30' :
              'hover:border-purple-500/30';
              
            const tagLabel = 
              course.id === 'photo' ? 'Advanced Photo' :
              course.id === 'graphic' ? 'Graphic Design' :
              'Video Editing';

            const tagColorClass = 
              course.id === 'photo' ? 'bg-blue-500/10 text-blue-400' :
              course.id === 'graphic' ? 'bg-emerald-500/10 text-emerald-400' :
              'bg-purple-500/10 text-purple-400';

            const statusLabel = 
              course.id === 'photo' ? 'Premium Access' :
              course.id === 'graphic' ? 'Best Seller' :
              'Trending';

            return (
              <div 
                key={course.id}
                className={`group relative bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden flex flex-col shadow-2xl transition-all duration-300 ${hoverBorder}`}
              >
                <div className="h-40 bg-slate-800 overflow-hidden relative">
                  <img 
                    src={course.image} 
                    alt={course.titleEn}
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-transparent opacity-80" />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className={`text-[10px] font-black px-2 py-1 rounded-md tracking-wider uppercase ${tagColorClass}`}>
                        {tagLabel}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 italic">
                        {statusLabel}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                      {lang === 'om' ? course.titleOm : course.titleEn}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                      {lang === 'om' ? course.descOm : course.descEn}
                    </p>
                  </div>

                  {/* Syllabus progress bar */}
                  <div className="space-y-1.5 pt-4">
                    <div className="flex justify-between text-[10px] font-mono font-bold text-slate-500">
                      <span>{lang === 'om' ? 'BARAMEERA' : 'PROGRESS'}</span>
                      <span>{courseProgressVal}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          courseProgressVal === 100 ? 'bg-emerald-500' : 'bg-blue-600'
                        }`}
                        style={{ width: `${courseProgressVal}%` }}
                      />
                    </div>
                  </div>

                  <button 
                    onClick={() => onSelectCourse(course)}
                    className="mt-6 w-full py-3 bg-white/5 hover:bg-blue-600 hover:text-white border border-white/10 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 shadow-md"
                  >
                    {lang === 'om' ? 'Resume Learning' : 'Resume Learning'}
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PORTFOLIO STUDENT GALLERY DESK (Saved elements) */}
      <div className="space-y-6 pt-6 border-t border-white/5">
        <div>
          <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-indigo-400" />
            {lang === 'om' ? 'Galaalii Diizaayiniifi Suuraa keeti:' : 'Your Interactive Student Portfolio Gallery:'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'om' ? 'Hojiiwwan ati labii keessatti gulaaltee ol-kaayte hunda asitti arguun fiverr dhiyeessi.' : 'Showcases visual creations or simulation schemas compiled during your laboratory sessions.'}
          </p>
        </div>

        {progress.savedDesigns.length === 0 ? (
          <div className="bg-slate-900/20 border border-dashed border-white/5 rounded-3xl p-10 text-center space-y-3 max-w-xl mx-auto">
            <p className="text-xs font-semibold text-slate-450">
              {lang === 'om' ? 'Hojii uumte tokkollee hin olkaanne.' : 'No portfolio assets constructed yet.'}
            </p>
            <p className="text-[10px] text-slate-550 leading-relaxed font-mono">
              {lang === 'om' 
                ? 'Kallattiin koozicha banaatii labuwwan keessatti suuraa, beeksisa, fi timeline qulleesiti olkaayi!' 
                : 'Enter any course dashboard, click the Practice Lab menu, edit assets, and check here.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {progress.savedDesigns.map((item) => (
              <div 
                key={item.id}
                className="bg-slate-900/30 border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between group shadow-xl hover:border-white/10 transition"
              >
                {/* Visual rendering */}
                <div className="aspect-square bg-black/40 flex items-center justify-center relative overflow-hidden border-b border-white/5">
                  {item.imageUrl.startsWith('data:') ? (
                    <img src={item.imageUrl} className="w-full h-full object-cover" />
                  ) : (
                    <div className="p-4 text-center space-y-1.5">
                      <Film className="w-6 h-6 text-purple-400 mx-auto animate-pulse" />
                      <p className="text-[9px] text-slate-550 font-mono tracking-tighter truncate max-w-[120px]">{item.imageUrl}</p>
                    </div>
                  )}
                  {/* Category tag */}
                  <span className="absolute bottom-2 left-2 bg-black/80 text-[9px] font-mono font-bold border border-white/5 px-2 py-0.5 rounded text-indigo-350 pointer-events-none">
                    {item.courseId.toUpperCase()}
                  </span>
                </div>

                {/* Subinfo */}
                <div className="p-3.5 space-y-2.5 bg-slate-900/40">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-white truncate">{item.title}</p>
                    <span className="text-[9px] font-mono text-slate-500 block">{item.createdAt}</span>
                  </div>

                  <button
                    onClick={() => handleDeleteSavedItem(item.id)}
                    className="w-full bg-red-500/5 hover:bg-red-500/20 text-red-400 border border-red-500/10 py-2 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3" />
                    {lang === 'om' ? 'Haqi' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

// Simple fallback helper component for movie clip iconography
function Film(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 3v18" />
      <path d="M17 3v18" />
      <path d="M3 7.5h4" />
      <path d="M3 12h4" />
      <path d="M3 16.5h4" />
      <path d="M17 7.5h4" />
      <path d="M17 12h4" />
      <path d="M17 16.5h4" />
    </svg>
  );
}
