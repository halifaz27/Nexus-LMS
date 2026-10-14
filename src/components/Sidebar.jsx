import { Award, BookOpen, CalendarDays, GraduationCap, LayoutDashboard, MessageCircle, Settings2, X } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'courses', label: 'My learning', icon: BookOpen },
  { id: 'schedule', label: 'Schedule', icon: CalendarDays },
  { id: 'certificates', label: 'Certificates', icon: Award },
  { id: 'discussions', label: 'Discussions', icon: MessageCircle },
];

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen, enrolledCount }) {
  return (
    <>
      {isOpen && <button aria-label="Close navigation overlay" className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[2px] lg:hidden" onClick={() => setIsOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[264px] flex-col border-r border-slate-200 bg-white transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900 lg:static lg:z-auto lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-[76px] items-center justify-between border-b border-slate-100 px-6 dark:border-slate-800">
          <button onClick={() => { setActiveTab('dashboard'); setIsOpen(false); }} className="flex items-center gap-3 text-left">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"><GraduationCap size={23} /></span>
            <span><span className="block text-[17px] font-extrabold tracking-tight text-slate-900 dark:text-white">nexus<span className="text-indigo-600">.</span></span><span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Learning space</span></span>
          </button>
          <button aria-label="Close menu" onClick={() => setIsOpen(false)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800"><X size={19} /></button>
        </div>
        <div className="px-4 pt-7">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Workspace</p>
          <nav className="space-y-1" aria-label="Main navigation">
            {navItems.map(({ id, label, icon: Icon }) => {
              const active = activeTab === id || ((activeTab === 'learning' || activeTab === 'detail') && id === 'courses');
              return <button key={id} onClick={() => { setActiveTab(id); setIsOpen(false); }} aria-current={active ? 'page' : undefined} className={`group flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition ${active ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/15' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'}`}>
                <Icon size={18} strokeWidth={active ? 2.4 : 1.9} /><span className="flex-1 text-left">{label}</span>
                {id === 'courses' && <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>{enrolledCount}</span>}
              </button>;
            })}
          </nav>
        </div>
        <div className="mt-8 px-4">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Preferences</p>
          <button onClick={() => { setActiveTab('settings'); setIsOpen(false); }} className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition ${activeTab === 'settings' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'}`}><Settings2 size={18} /><span>Settings</span></button>
        </div>
        <div className="mt-auto p-4">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 p-4 text-white">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/15"><GraduationCap size={20} /></div>
            <p className="text-sm font-bold">Small steps. Big progress.</p>
            <p className="mt-1 text-xs leading-relaxed text-indigo-100">Keep your learning streak alive and make today count.</p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/20"><div className="h-full w-3/4 rounded-full bg-white" /></div>
            <p className="mt-2 text-[10px] text-indigo-100">Your learning journey, your pace.</p>
          </div>
          <div className="mt-4 flex items-center gap-3 px-2 py-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-amber-100 text-xs font-extrabold text-amber-800">DM</div>
            <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-slate-800 dark:text-slate-100">Dimas</p><p className="truncate text-xs text-slate-400">Learner account · Demo</p></div>
            <span className="h-2 w-2 rounded-full bg-emerald-500" title="Active" />
          </div>
        </div>
      </aside>
    </>
  );
}
