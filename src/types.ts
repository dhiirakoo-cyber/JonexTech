/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'om' | 'en';

export interface Lesson {
  id: string;
  titleEn: string;
  titleOm: string;
  duration: string;
  contentEn: string;
  contentOm: string;
  practiceType: 'photo' | 'graphic' | 'video';
  practiceData?: any;
}

export interface QuizQuestion {
  id: string;
  questionEn: string;
  questionOm: string;
  optionsEn: string[];
  optionsOm: string[];
  correctIndex: number;
  explanationEn: string;
  explanationOm: string;
}

export interface Course {
  id: string;
  tag: string;
  titleEn: string;
  titleOm: string;
  descEn: string;
  descOm: string;
  image: string;
  colorClass: string;
  bgTagClass: string;
  lessons: Lesson[];
  quizzes: QuizQuestion[];
}

export interface UserProgress {
  completedLessons: string[]; // lessonIds
  completedQuizzes: string[]; // courseIds
  scores: Record<string, number>; // courseId -> score
  savedDesigns: SavedDesign[];
}

export interface SavedDesign {
  id: string;
  courseId: string;
  title: string;
  imageUrl: string;
  createdAt: string;
}

export interface LocalizedStrings {
  globalBtn: string;
  lTitle: string;
  lSubtitle: string;
  lEmail: string;
  lPassword: string;
  lBtn: string;
  lLoading: string;
  dWelcome: string;
  dDesc: string;
  c1T: string;
  c1D: string;
  c2T: string;
  c2D: string;
  c3T: string;
  c3D: string;
  cBtn: string;
  alertSuccess: string;
  alertError: string;
  logOut: string;
  demoMode: string;
  demoMessage: string;
  activeCourse: string;
  allLessons: string;
  practiceLab: string;
  takeQuiz: string;
  congrats: string;
  completed: string;
  nextLesson: string;
  prevLesson: string;
  finishQuiz: string;
  startBtnText: string;
  ownerInfo: string;
}
