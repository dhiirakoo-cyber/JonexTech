/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, Award, CheckCircle, ArrowLeft, ArrowRight, Play, RefreshCw, Star, HelpCircle, ShieldCheck, Download, ChevronRight } from 'lucide-react';
import { Course, Language, UserProgress, SavedDesign } from '../types';
import PhotoLab from './PhotoLab';
import GraphicLab from './GraphicLab';
import VideoLab from './VideoLab';

interface CourseViewProps {
  course: Course;
  lang: Language;
  progress: UserProgress;
  onUpdateProgress: (newProgress: UserProgress) => void;
  onBack: () => void;
}

export default function CourseView({ course, lang, progress, onUpdateProgress, onBack }: CourseViewProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'practice' | 'quiz'>('content');
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  
  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAttempted, setQuizAttempted] = useState(false);

  const activeLesson = course.lessons[activeLessonIndex];

  // Progress metrics helpers
  const isLessonCompleted = (lessonId: string) => progress.completedLessons.includes(lessonId);

  const toggleLessonComplete = (lessonId: string) => {
    const isCompleted = progress.completedLessons.includes(lessonId);
    let updatedLessons = [...progress.completedLessons];
    
    if (isCompleted) {
      updatedLessons = updatedLessons.filter(id => id !== lessonId);
    } else {
      updatedLessons.push(lessonId);
    }

    onUpdateProgress({
      ...progress,
      completedLessons: updatedLessons
    });
  };

  const handleSaveDesign = (imageUrl: string) => {
    const newDesign: SavedDesign = {
      id: `design-${Date.now()}`,
      courseId: course.id,
      title: lang === 'om' ? `Hojii ${course.tag}` : `${course.tag} Portfolio Item`,
      imageUrl: imageUrl,
      createdAt: new Date().toLocaleDateString(lang === 'om' ? 'om-ET' : 'en-US')
    };

    onUpdateProgress({
      ...progress,
      savedDesigns: [newDesign, ...progress.savedDesigns]
    });
  };

  const handleSelectAnswer = (qId: string, index: number) => {
    if (submittedQuiz) return;
    setQuizAnswers(prev => ({ ...prev, [qId]: index }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    course.quizzes.forEach(q => {
      if (quizAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });

    setQuizScore(score);
    setSubmittedQuiz(true);
    setQuizAttempted(true);

    if (score === course.quizzes.length) {
      // Completed full quiz correctly
      if (!progress.completedQuizzes.includes(course.id)) {
        onUpdateProgress({
          ...progress,
          completedQuizzes: [...progress.completedQuizzes, course.id],
          scores: { ...progress.scores, [course.id]: score }
        });
      }
    }
  };

  const handleRetakeQuiz = () => {
    setQuizAnswers({});
    setSubmittedQuiz(false);
    setQuizScore(0);
  };

  const currentCourseScore = progress.scores[course.id] || 0;
  const isQuizPassed = progress.completedQuizzes.includes(course.id);

  return (
    <div className="w-full space-y-6">
      
      {/* HEADER CONTROLS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
        <div>
          <button 
            onClick={onBack}
            className="text-xs font-bold text-slate-400 hover:text-white transition flex items-center gap-1.5 mb-2 hover:translate-x-[-2px] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            {lang === 'om' ? 'Gara Dashboarditti Deebi\'i' : 'Back to Dashboard'}
          </button>
          <div className="flex items-center gap-2.5">
            <span className={`px-2.5 py-1 text-[11px] font-black tracking-widest rounded-md uppercase ${course.bgTagClass}`}>
              {course.tag}
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              {lang === 'om' ? course.titleOm : course.titleEn}
            </h2>
          </div>
        </div>

        {/* TABS SELECTOR */}
        <div className="flex bg-slate-900/40 p-1.5 rounded-2xl border border-white/5 backdrop-blur-xl w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('content')}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'content' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            {lang === 'om' ? 'Syllabus Barnootaa' : 'Syllabus lessons'}
          </button>
          
          <button
            onClick={() => setActiveTab('practice')}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'practice' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Play className="w-4 h-4" />
            {lang === 'om' ? 'Yaalii Lab' : 'Practice Desk'}
          </button>
          
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'quiz' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white font-medium'
            }`}
          >
            <Award className="w-4 h-4" />
            {lang === 'om' ? 'Madaallii (Quiz)' : 'Quiz & Accolades'}
          </button>
        </div>
      </div>

      {/* SYLLABUS CONTENT LAYOUT */}
      {activeTab === 'content' && (
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* L: Lesson Outline Menu list */}
          <div className="w-full lg:w-80 shrink-0 space-y-3.5">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">
              {lang === 'om' ? 'Dura-Teessoo Barnootaa:' : 'Course Study Timeline:'}
            </h3>
            <div className="space-y-2">
              {course.lessons.map((lesson, idx) => {
                const isActive = activeLessonIndex === idx;
                const done = isLessonCompleted(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLessonIndex(idx)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3 transition cursor-pointer ${
                      isActive 
                        ? 'bg-blue-600/10 border-blue-500 text-white font-bold' 
                        : 'bg-slate-900/30 border-white/5 text-slate-300 hover:bg-slate-900 hover:border-white/10'
                    }`}
                  >
                    <div className="mt-0.5">
                      {done ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400 fill-emerald-500/10 shrink-0" />
                      ) : (
                        <div className={`w-4 h-4 rounded-full border shrink-0 ${isActive ? 'border-blue-400' : 'border-slate-700'}`} />
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold leading-tight">
                        {lang === 'om' ? lesson.titleOm : lesson.titleEn}
                      </p>
                      <span className="text-[10px] font-mono font-medium text-slate-500 block">⏱️ {lesson.duration}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Practice shortcut banner */}
            <div className="bg-slate-900/30 border border-white/5 rounded-2xl p-4 space-y-3 shadow-md">
              <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                {lang === 'om' ? 'Barachuurra Yaalii Salphaa:' : 'Applied Learning Theory:'}
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {lang === 'om' 
                  ? 'Kallattiin yaalii gochuun dandeettii kee dabala. Lab Practice banuudhaan fakkummaa suuraa fidi.' 
                  : 'Synthesize the design principles inside the Practice Desk with custom filter systems.'}
              </p>
              <button
                onClick={() => setActiveTab('practice')}
                className="w-full bg-white/5 hover:bg-blue-650 hover:text-white border border-white/10 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                {lang === 'om' ? 'Studio Banuuf' : 'Launch Practice Lab'}
              </button>
            </div>
          </div>

          {/* R: Detailed Lesson Reader workspace */}
          <div className="flex-1 bg-slate-900/40 border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl backdrop-blur-xl">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-blue-450 tracking-wider">LESSON {activeLessonIndex + 1} OF {course.lessons.length}</span>
                <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                  {lang === 'om' ? activeLesson.titleOm : activeLesson.titleEn}
                </h3>
              </div>
              
              <button
                onClick={() => toggleLessonComplete(activeLesson.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center gap-1.5 ${
                  isLessonCompleted(activeLesson.id)
                    ? 'bg-emerald-500/25 text-emerald-400 border-emerald-500/30'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                {isLessonCompleted(activeLesson.id) 
                  ? (lang === 'om' ? 'Xumureera! ✓' : 'Completed! ✓') 
                  : (lang === 'om' ? 'Dubbiseera' : 'Mark Completed')}
              </button>
            </div>

            {/* Structured Markdown Rendering Layout */}
            <div className="prose prose-invert max-w-none text-slate-300 text-sm md:text-md leading-relaxed space-y-4">
              {(() => {
                const text = lang === 'om' ? activeLesson.contentOm : activeLesson.contentEn;
                return text.split('\n\n').map((paragraph, pIdx) => {
                  if (paragraph.startsWith('###')) {
                    return <h4 key={pIdx} className="text-lg font-extrabold text-white mt-5 mb-2">{paragraph.replace('###', '').trim()}</h4>;
                  }
                  if (paragraph.startsWith('####')) {
                    return <h5 key={pIdx} className="text-md font-bold text-slate-200 mt-4 mb-2">{paragraph.replace('####', '').trim()}</h5>;
                  }
                  if (paragraph.startsWith('1.') || paragraph.startsWith('-')) {
                    return (
                      <ul key={pIdx} className="list-disc pl-5 space-y-2 text-slate-350">
                        {paragraph.split('\n').map((li, liIdx) => (
                          <li key={liIdx}>{li.replace(/^(\d+\.|\-)\s*/, '').trim()}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={pIdx} className="text-slate-300 font-normal">{paragraph}</p>;
                });
              })()}
            </div>

            {/* Multi-Buttons Next / Previous */}
            <div className="flex justify-between items-center pt-6 border-t border-slate-750">
              <button
                onClick={() => setActiveLessonIndex(prev => Math.max(0, prev - 1))}
                disabled={activeLessonIndex === 0}
                className="bg-slate-850 hover:bg-slate-800 disabled:opacity-40 text-slate-200 font-bold text-xs py-2.5 px-4 rounded-xl border border-slate-700/60 transition flex items-center gap-1 hover:translate-x-[-2px] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                {lang === 'om' ? 'Diri' : 'Prev Lesson'}
              </button>

              <button
                onClick={() => {
                  if (activeLessonIndex < course.lessons.length - 1) {
                    setActiveLessonIndex(prev => prev + 1);
                  } else {
                    setActiveTab('practice');
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition flex items-center gap-1 hover:translate-x-[2px] cursor-pointer"
              >
                {activeLessonIndex < course.lessons.length - 1 
                  ? (lang === 'om' ? 'Itti aani' : 'Next Lesson') 
                  : (lang === 'om' ? 'Gara Practice Lab deemi' : 'Go to Practice Lab')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRACTICE HANDS-ON DESK PLAYGROUND */}
      {activeTab === 'practice' && (
        <div className="space-y-4">
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-4 mb-4 flex items-center justify-between">
            <p className="text-xs text-slate-400">
              {lang === 'om' 
                ? 'Dandeettii kee qabatamaan yaalii godhi. Hojii kee portfolio student keessa galchuuf "Portfolio Olkaayi" fayyadami.' 
                : 'Construct and test your learning outputs in real-time. Hit "Save Portfolio" to view completed artifacts.'}
            </p>
          </div>

          {course.id === 'photo' && <PhotoLab lang={lang} onSave={handleSaveDesign} />}
          {course.id === 'graphic' && <GraphicLab lang={lang} onSave={handleSaveDesign} />}
          {course.id === 'video' && <VideoLab lang={lang} onSave={handleSaveDesign} />}
        </div>
      )}

      {/* ACCOLEDES AND CERTIFICATION PANEL */}
      {activeTab === 'quiz' && (
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* QUIZ PORTAL BOARD */}
          {!isQuizPassed ? (
            <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl backdrop-blur-xl">
              <div className="space-y-1.5 border-b border-white/5 pb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-400" />
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {lang === 'om' ? 'Madaallii Beekumsaa: Quiz Malleen' : 'Certification Exam Module:'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {lang === 'om' ? 'Gaaffilee hundaa qulqulleessi saphala certificate fudhachuuf.' : 'Answer all analytical questions accurately to authorize your academic certification.'}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {course.quizzes.map((q, qIndex) => {
                  const selectedAnswer = quizAnswers[q.id];
                  const hasSelected = selectedAnswer !== undefined;
                  const isCorrect = selectedAnswer === q.correctIndex;
                  return (
                    <div key={q.id} className="space-y-3 bg-black/40 p-4 rounded-2xl border border-white/5">
                      <p className="text-xs font-mono text-purple-400">QUESTION 0{qIndex + 1} OF 0{course.quizzes.length}</p>
                      <h4 className="text-sm font-semibold text-slate-100">
                        {lang === 'om' ? q.questionOm : q.questionEn}
                      </h4>
                      
                      <div className="grid grid-cols-1 gap-2.5 pt-1">
                        {q.optionsEn.map((option, oIdx) => {
                          const optionText = lang === 'om' ? q.optionsOm[oIdx] : q.optionsOm[oIdx] ? q.optionsOm[oIdx] : option;
                          const isOptionSelected = selectedAnswer === oIdx;
                          const isOptionCorrect = q.correctIndex === oIdx;
                          
                          let btnStyle = 'bg-slate-900/30 text-slate-350 border-white/5 hover:bg-slate-900';
                          if (isOptionSelected) {
                            if (submittedQuiz) {
                              btnStyle = isOptionCorrect 
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' 
                                : 'bg-red-500/20 text-red-500 border-red-500/50';
                            } else {
                              btnStyle = 'bg-blue-600/30 text-blue-300 border-blue-500';
                            }
                          } else if (submittedQuiz && isOptionCorrect) {
                            btnStyle = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
                          }

                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleSelectAnswer(q.id, oIdx)}
                              disabled={submittedQuiz}
                              className={`w-full p-3 text-left text-xs font-medium rounded-xl border transition cursor-pointer flex justify-between items-center ${btnStyle}`}
                            >
                              <span>{optionText}</span>
                              {isOptionSelected && (
                                <span className="text-[10px] font-black uppercase font-mono tracking-wider">
                                  {submittedQuiz ? (isCorrect ? '✓ Correct' : '✗ Incorrect') : 'Selected'}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation toggle */}
                      {submittedQuiz && (
                        <div className="mt-3.5 p-3 rounded-xl bg-slate-950/40 text-[11px] text-slate-400 leading-relaxed border-l-2 border-indigo-500">
                          <span className="font-bold text-indigo-400 block mb-0.5">Explanation:</span>
                          {lang === 'om' ? q.explanationOm : q.explanationEn}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Quiz Submit metrics */}
              <div className="pt-4 border-t border-slate-750 flex flex-col sm:flex-row justify-between items-center gap-4">
                {submittedQuiz ? (
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm">
                      {lang === 'om' ? `Score kessan: ${quizScore}/${course.quizzes.length}` : `Exam Score: ${quizScore}/${course.quizzes.length}`}
                    </span>
                    {quizScore === course.quizzes.length ? (
                      <span className="bg-emerald-500/15 text-emerald-400 text-[11px] font-black tracking-wider uppercase px-2.5 py-1 rounded">Passed 🏆</span>
                    ) : (
                      <span className="bg-red-500/15 text-red-400 text-[11px] font-black tracking-wider uppercase px-2.5 py-1 rounded">Try Again</span>
                    )}
                  </div>
                ) : (
                  <div className="text-xs text-slate-400">
                    {lang === 'om' ? '* Barnoonni hundi sirriitti madaallamuuf hojjetameera.' : '* Pass with 100% score to generate completion credentials.'}
                  </div>
                )}

                <div className="flex gap-2 w-full sm:w-auto">
                  {submittedQuiz && quizScore < course.quizzes.length && (
                    <button
                      onClick={handleRetakeQuiz}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-750 text-xs font-bold py-2.5 px-4 rounded-xl cursor-pointer transition flex-1 sm:flex-none justify-center flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      {lang === 'om' ? 'Irra Deebi\'i' : 'Retake Exam'}
                    </button>
                  )}

                  {!submittedQuiz ? (
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={Object.keys(quizAnswers).length < course.quizzes.length}
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold text-xs py-3 px-5 rounded-xl cursor-pointer transition active:scale-95"
                    >
                      {lang === 'om' ? 'Gala Madaallii' : 'Submit Quiz'}
                    </button>
                  ) : (
                    quizScore === course.quizzes.length && (
                      <button
                        onClick={() => {
                          // Force trigger re-render / unlock
                          onUpdateProgress({
                            ...progress,
                            completedQuizzes: [...progress.completedQuizzes, course.id]
                          });
                        }}
                        className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-5 rounded-xl cursor-pointer transition active:scale-95 flex items-center justify-center gap-1"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        {lang === 'om' ? 'Kallattiin Certificate Fudhachuu' : 'Generate Certificate'}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          ) : (
            
            /* GORGEOUS COMPLETION CERTIFICATE */
            <div className="space-y-6">
              <div className="bg-slate-900 border border-yellow-500/30 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-md">
                
                {/* Vintage certificate grid patterns / borders */}
                <div className="absolute inset-2 border-2 border-dashed border-yellow-500/20 rounded-2xl pointer-events-none" />
                <div className="absolute inset-4 border border-yellow-500/10 rounded-xl pointer-events-none" />
                
                {/* Gold Seal Design in background */}
                <div className="absolute bottom-6 right-6 opacity-8">
                  <Star className="w-32 h-32 text-yellow-400 rotate-12" />
                </div>

                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                  <div className="space-y-1.5 flex flex-col items-center">
                    <Award className="w-12 h-12 text-yellow-400" />
                    <span className="text-[11px] font-mono tracking-widest text-yellow-500 font-bold uppercase mt-2">OFFICIAL TRAINING CERTIFICATE</span>
                  </div>

                  <div className="space-y-2">
                    <h1 className="text-2xl md:text-3.5xl font-black text-white tracking-tight leading-none uppercase">
                      AMOO ACADEMY
                    </h1>
                    <p className="text-[10px] uppercase tracking-widest font-mono text-slate-400">
                      Premium Training & Freelance Agency • Harar, Ethiopia
                    </p>
                  </div>

                  {/* Certificate Main Claim text */}
                  <div className="space-y-5 max-w-lg pt-4">
                    <p className="text-xs sm:text-sm text-slate-350 italic">
                      {lang === 'om' 
                        ? 'Kanaanis kan mirkanaa\'u, barataan dandeettii dammaqaa barachuu qulqulluun hojii' 
                        : 'This certifies that the authenticated student portfolio holder has successfully completed'}
                    </p>

                    <h3 className="text-xl sm:text-2xl font-black text-yellow-400 tracking-tight leading-none uppercase">
                      {lang === 'om' ? course.titleOm : course.titleEn}
                    </h3>

                    <p className="text-xs text-slate-350 leading-relaxed">
                      {lang === 'om' 
                        ? 'Mastering level madaallii hunda dhibbatti dhibba (100%) xumuruun hojiilee premium Fiverr portfolio fitti dhiyaachisuuf, qulqullina ol\'aanaadhaan beekamtii argateera.' 
                        : 'by answering 100% of the course quizzes, completing every core lesson, and submitting real-time functional edit components directly verified by our instruction academy.'}
                    </p>
                  </div>

                  {/* Authorized Signatures Layout */}
                  <div className="grid grid-cols-2 gap-12 w-full max-w-md pt-8 border-t border-slate-800/80 mt-6">
                    <div className="text-center space-y-1">
                      <div className="font-serif italic text-xs text-slate-300">Amanuel M.</div>
                      <div className="h-0.5 w-16 bg-slate-700 mx-auto" />
                      <p className="text-[9px] font-mono uppercase tracking-wider text-slate-500">Amanuel • Founder</p>
                    </div>

                    <div className="text-center space-y-1">
                      <div className="font-serif italic text-xs text-emerald-400">#AMOO-ACC-{course.id.toUpperCase()}-2026</div>
                      <div className="h-0.5 w-16 bg-slate-700 mx-auto" />
                      <p className="text-[9px] font-mono uppercase tracking-wider text-slate-500">Certification ID</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action commands */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                <button
                  onClick={handleRetakeQuiz}
                  className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-750 py-3 px-6 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-lg active:scale-95"
                >
                  <RefreshCw className="w-4 h-4" />
                  {lang === 'om' ? 'Irra Deebi\'ii' : 'Retake Quiz'}
                </button>

                <button
                  onClick={() => {
                    const printWindow = window.open('', '_blank');
                    if (printWindow) {
                      printWindow.document.write(`
                        <html>
                          <head>
                            <title>Amoo Academy Certification - ${course.titleEn}</title>
                            <style>
                              body { background: #0b0f19; color: #f1f5f9; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
                              .cert { border: 4px solid #eab308; padding: 40px; border-radius: 20px; text-align: center; max-width: 600px; width: 100%; box-sizing: border-box; }
                              .title { font-weight: 900; letter-spacing: -0.05em; margin: 20px 0; font-size: 32px; color: #eab308; }
                              .tag { font-family: monospace; letter-spacing: 0.1em; color: #a1a1aa; }
                              .sig { margin-top: 40px; display: grid; grid-template-cols: 1fr 1fr; gap: 40px; }
                            </style>
                          </head>
                          <body>
                            <div class="cert">
                              <div class="tag">OFFICIAL GRADUATION ACCREDITATION</div>
                              <div class="title">AMOO ACADEMY</div>
                              <p>This certifies that our certified student portfolio holder has successfully customized and completed the coursework in:</p>
                              <h2 style="color: #ffffff; text-transform: uppercase;">${course.titleEn}</h2>
                              <p>under training of Owner Amanuel in Harar, Ethiopia.</p>
                              <div class="sig">
                                <div>
                                  <div style="font-style: italic;">Amanuel M.</div>
                                  <div style="height: 1px; background: #3f3f46; margin: 5px 0;"></div>
                                  <div style="font-size: 10px; color: #71717a;">Founder & CEO</div>
                                </div>
                                <div>
                                  <div style="color: #10b981; font-family: monospace;">#AMOO-ACC-${course.id.toUpperCase()}-2026</div>
                                  <div style="height: 1px; background: #3f3f46; margin: 5px 0;"></div>
                                  <div style="font-size: 10px; color: #71717a;">Certification ID</div>
                                </div>
                              </div>
                            </div>
                          </body>
                        </html>
                      `);
                      printWindow.document.close();
                      printWindow.print();
                    }
                  }}
                  className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-650 hover:to-amber-700 text-slate-950 font-black py-3 px-6 rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-lg active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  {lang === 'om' ? 'Waraqaa Print/PDF' : 'Export/Print Certificate'}
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
