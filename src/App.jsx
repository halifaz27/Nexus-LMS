import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { courses as courseCatalog, initialCompletedLessons, upcomingClasses } from './assets/lmsData';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import LearningRoom from './pages/LearningRoom';
import CourseDetail from './pages/CourseDetail';
import Schedule from './pages/Schedule';
import Certificates from './pages/Certificates';
import Discussions from './pages/Discussions';
import Settings from './pages/Settings';
import { useAuth } from './auth/AuthContext';
import AuthScreen from './auth/AuthScreen';
import { supabase } from './auth/supabase';

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved === null ? fallback : JSON.parse(saved);
  } catch {
    return fallback;
  }
}

const startingEnrollment = courseCatalog.filter((course) => course.enrolled).map((course) => course.id);
const pageLabels = {
  dashboard: 'Your overview', courses: 'My learning', schedule: 'Learning schedule',
  certificates: 'Your certificates', discussions: 'Community discussions', settings: 'Settings',
};

export default function App() {
  const { user, loading, configured } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    try { return localStorage.getItem('nexus-theme') === 'dark'; } catch { return false; }
  });
  const [enrolledIds, setEnrolledIds] = useState(() => readStorage('nexus-enrolled', startingEnrollment));
  const [completedLessonIds, setCompletedLessonIds] = useState(() => readStorage('nexus-completed-lessons', initialCompletedLessons));
  const [selectedCourseId, setSelectedCourseId] = useState(courseCatalog[0].id);
  const [selectedLessonId, setSelectedLessonId] = useState(courseCatalog[0].lessons[0].id);
  const [profileName, setProfileName] = useState(() => {
    try { return localStorage.getItem('nexus-profile-name') || 'Dimas'; } catch { return 'Dimas'; }
  });
  const [toast, setToast] = useState('');

  async function signOut() {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) notify(error.message);
  }

  const allCourses = useMemo(() => courseCatalog.map((course) => ({ ...course, enrolled: enrolledIds.includes(course.id) })), [enrolledIds]);
  const selectedCourse = allCourses.find((course) => course.id === selectedCourseId) ?? allCourses[0];
  const progressByCourse = useMemo(() => Object.fromEntries(allCourses.map((course) => {
    const done = course.lessons.filter((lesson) => completedLessonIds.includes(lesson.id)).length;
    return [course.id, Math.round((done / course.lessons.length) * 100)];
  })), [allCourses, completedLessonIds]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    try { localStorage.setItem('nexus-theme', darkMode ? 'dark' : 'light'); } catch { /* Theme still changes for this session. */ }
  }, [darkMode]);

  useEffect(() => {
    try { localStorage.setItem('nexus-enrolled', JSON.stringify(enrolledIds)); } catch { /* In-memory state still works. */ }
  }, [enrolledIds]);
  useEffect(() => {
    try { localStorage.setItem('nexus-completed-lessons', JSON.stringify(completedLessonIds)); } catch { /* In-memory state still works. */ }
  }, [completedLessonIds]);

  if (loading) return <div className="grid min-h-screen place-items-center bg-slate-950 text-sm font-semibold text-white">Loading your secure learning space…</div>;
  if (!configured || !user) return <AuthScreen />;

  function notify(message) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2800);
  }

  function openCourse(courseId) {
    const course = allCourses.find((item) => item.id === courseId);
    if (!course) return;
    setSelectedCourseId(courseId);
    const nextLesson = course.lessons.find((lesson) => !completedLessonIds.includes(lesson.id)) ?? course.lessons[0];
    setSelectedLessonId(nextLesson.id);
    setActiveTab(course.enrolled ? 'learning' : 'detail');
  }

  function enrollCourse(courseId) {
    const course = allCourses.find((item) => item.id === courseId);
    if (!course) return;
    if (!enrolledIds.includes(courseId)) {
      setEnrolledIds((current) => [...current, courseId]);
      notify(`You're enrolled in ${course.title}.`);
    }
    setSelectedCourseId(courseId);
    const nextLesson = course.lessons.find((lesson) => !completedLessonIds.includes(lesson.id)) ?? course.lessons[0];
    setSelectedLessonId(nextLesson.id);
    setActiveTab('learning');
  }

  function toggleLesson(lessonId) {
    setCompletedLessonIds((current) => current.includes(lessonId) ? current.filter((id) => id !== lessonId) : [...current, lessonId]);
  }

  function resetProgress() {
    const confirmed = window.confirm('Reset all lesson progress and course enrollments to the original demo data? This cannot be undone.');
    if (!confirmed) return;
    setCompletedLessonIds(initialCompletedLessons);
    setEnrolledIds(startingEnrollment);
    setActiveTab('dashboard');
    setSelectedCourseId(courseCatalog[0].id);
    setSelectedLessonId(courseCatalog[0].lessons[0].id);
    try {
      localStorage.setItem('nexus-completed-lessons', JSON.stringify(initialCompletedLessons));
      localStorage.setItem('nexus-enrolled', JSON.stringify(startingEnrollment));
    } catch { /* Reset remains in memory for this session. */ }
    notify('Demo learning data has been reset.');
  }

  const pageTitle = activeTab === 'learning' ? selectedCourse.title : activeTab === 'detail' ? 'Course overview' : pageLabels[activeTab] ?? 'Nexus LMS';
  const showSearch = !['learning', 'detail', 'settings', 'certificates', 'discussions', 'schedule'].includes(activeTab);

  return <div className="min-h-screen bg-slate-50 dark:bg-slate-950"><div className="flex min-h-screen"><Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} enrolledCount={enrolledIds.length}/><div className="flex min-w-0 flex-1 flex-col"><Navbar title={pageTitle} search={search} setSearch={setSearch} darkMode={darkMode} setDarkMode={setDarkMode} setIsSidebarOpen={setIsSidebarOpen} showSearch={showSearch} userEmail={user.email} onSignOut={signOut}/><main className="w-full flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8"><div className="mx-auto w-full max-w-[1440px]">
    {activeTab === 'dashboard' && <Dashboard courses={allCourses} progressByCourse={progressByCourse} search={search} onOpenCourse={openCourse} onEnroll={enrollCourse} setActiveTab={setActiveTab} sessions={upcomingClasses}/>}
    {activeTab === 'courses' && <Courses courses={allCourses} progressByCourse={progressByCourse} search={search} onOpenCourse={openCourse} onEnroll={enrollCourse}/>}
    {activeTab === 'detail' && <CourseDetail course={selectedCourse} progress={progressByCourse[selectedCourse.id] ?? 0} onBack={() => setActiveTab('courses')} onEnroll={() => enrollCourse(selectedCourse.id)} onOpenLesson={(lessonId) => { setSelectedLessonId(lessonId); setActiveTab('learning'); }}/>}
    {activeTab === 'learning' && <LearningRoom key={selectedCourse.id} course={selectedCourse} completedLessonIds={completedLessonIds} progress={progressByCourse[selectedCourse.id] ?? 0} activeLessonId={selectedLessonId} setActiveLessonId={setSelectedLessonId} onToggleLesson={toggleLesson} onBack={() => setActiveTab('courses')}/>}
    {activeTab === 'schedule' && <Schedule sessions={upcomingClasses}/>}
    {activeTab === 'certificates' && <Certificates courses={allCourses} progressByCourse={progressByCourse}/>}
    {activeTab === 'discussions' && <Discussions profileName={profileName}/>}
    {activeTab === 'settings' && <Settings profileName={profileName} setProfileName={setProfileName} darkMode={darkMode} setDarkMode={setDarkMode} onResetProgress={resetProgress}/>}
  </div></main><footer className="border-t border-slate-200/80 px-5 py-4 text-center text-[10px] text-slate-400 dark:border-slate-800">© 2026 Nexus LMS · Frontend portfolio demo · Data stored locally in your browser</footer></div></div>
    {toast && <div role="status" className="fixed bottom-5 right-5 z-[70] flex max-w-[calc(100vw-40px)] items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-xl dark:border-emerald-900 dark:bg-slate-900 dark:text-white"><CheckCircle2 size={18} className="shrink-0 text-emerald-500"/>{toast}<button aria-label="Dismiss notification" onClick={() => setToast('')} className="ml-2 rounded-md p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"><X size={14}/></button></div>}
  </div>;
}
