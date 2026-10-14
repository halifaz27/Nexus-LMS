import { Bell, LogOut, Menu, Moon, Search, Sun, X } from 'lucide-react';

export default function Navbar({ search, setSearch, darkMode, setDarkMode, setIsSidebarOpen, title, onBack, showSearch = true, userEmail, onSignOut }) {
  return (
    <header className="sticky top-0 z-30 flex min-h-[76px] items-center justify-between gap-4 border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8 dark:border-slate-800 dark:bg-slate-900/90">
      <div className="flex min-w-0 items-center gap-3">
        <button aria-label="Open navigation" onClick={() => setIsSidebarOpen(true)} className="rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50 lg:hidden dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"><Menu size={19} /></button>
        <div className="min-w-0"><p className="hidden text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 sm:block">Your learning space</p><h1 className="truncate text-base font-extrabold tracking-tight text-slate-900 sm:mt-0.5 sm:text-lg dark:text-white">{title}</h1></div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        {showSearch && <label className="relative hidden w-44 md:block lg:w-64"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search courses..." aria-label="Search courses" className="w-full rounded-xl border border-transparent bg-slate-100 py-2.5 pl-9 pr-8 text-xs font-medium text-slate-700 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-indigo-500 dark:focus:bg-slate-800"/>{search && <button aria-label="Clear search" onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:text-slate-700"><X size={13}/></button>}</label>}
        <button aria-label="Toggle dark mode" onClick={() => setDarkMode((v) => !v)} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">{darkMode ? <Sun size={18}/> : <Moon size={18}/>}</button>
        <button aria-label="Notifications (demo)" onClick={() => window.alert('You are all caught up! This is demo notification behavior.')} className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"><Bell size={18}/><span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border-2 border-white bg-rose-500 dark:border-slate-900"/></button>
        <div className="hidden max-w-44 md:block"><p className="truncate text-[11px] font-bold text-slate-700 dark:text-slate-200">{userEmail}</p><p className="text-[10px] text-slate-400">Signed in</p></div>
        <button aria-label="Sign out" title="Sign out" onClick={onSignOut} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-rose-950"><LogOut size={18}/></button>
      </div>
      {onBack && <button onClick={onBack} className="hidden" aria-hidden="true">Back</button>}
    </header>
  );
}
