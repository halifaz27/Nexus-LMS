import { ArrowUpRight, BookOpen, CheckCircle2, Clock3, Play, Star } from 'lucide-react';

export default function CourseCard({ course, progress = 0, isEnrolled = false, onOpen, onEnroll }) {
  const complete = progress >= 100;
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/20">
      <button onClick={onOpen} className="relative block h-44 w-full overflow-hidden bg-slate-100 text-left dark:bg-slate-800" aria-label={`Open ${course.title}`}>
        <img src={course.thumbnail} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        <div className={`absolute inset-0 -z-0 bg-gradient-to-br ${course.accent} opacity-10`} />
        <span className="absolute left-3 top-3 rounded-lg bg-white/95 px-2.5 py-1.5 text-[10px] font-bold text-slate-700 shadow-sm backdrop-blur dark:bg-slate-950/90 dark:text-slate-200">{course.category}</span>
        {complete && <span className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-emerald-500 px-2.5 py-1.5 text-[10px] font-bold text-white"><CheckCircle2 size={12}/> Completed</span>}
        <span className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-white text-indigo-600 shadow-lg transition group-hover:scale-105"><Play size={16} fill="currentColor"/></span>
      </button>
      <div className="p-5">
        <div className="mb-2 flex items-center gap-2 text-[11px] font-medium text-slate-400"><span>{course.level}</span><span className="h-1 w-1 rounded-full bg-slate-300"/><span className="flex items-center gap-1"><Clock3 size={12}/>{course.duration}</span><span className="h-1 w-1 rounded-full bg-slate-300"/><span>{course.lessonsCount} lessons</span></div>
        <button onClick={onOpen} className="line-clamp-2 min-h-[48px] w-full text-left text-[15px] font-extrabold leading-6 text-slate-900 transition hover:text-indigo-600 dark:text-slate-100 dark:hover:text-indigo-400">{course.title}</button>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">with <span className="font-semibold text-slate-700 dark:text-slate-200">{course.instructor}</span></p>
        <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
          {isEnrolled ? <><div className="mb-2 flex items-center justify-between text-[11px]"><span className="font-semibold text-slate-500 dark:text-slate-400">Your progress</span><span className="font-extrabold tabular-nums text-slate-800 dark:text-white">{progress}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className={`h-full rounded-full transition-all duration-500 ${complete ? 'bg-emerald-500' : 'bg-indigo-600'}`} style={{ width: `${progress}%` }}/></div></> : <div className="flex items-center justify-between text-xs"><span className="flex items-center gap-1 font-bold text-amber-500"><Star size={14} fill="currentColor"/>{course.rating}</span><span className="text-slate-400">{course.reviewsCount.toLocaleString()} reviews</span></div>}
          <div className="mt-4 flex items-center justify-between"><span className="flex items-center gap-1 text-xs font-bold text-amber-500"><Star size={13} fill="currentColor"/>{course.rating}<span className="font-normal text-slate-400">({course.reviewsCount.toLocaleString()})</span></span>{isEnrolled ? <button onClick={onOpen} className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-indigo-700">{complete ? 'Review course' : 'Continue'}<ArrowUpRight size={14}/></button> : <button onClick={onEnroll} className="rounded-xl border border-indigo-200 px-3.5 py-2 text-xs font-bold text-indigo-600 transition hover:bg-indigo-600 hover:text-white dark:border-indigo-900 dark:text-indigo-300">Enroll now</button>}</div>
        </div>
      </div>
    </article>
  );
}
