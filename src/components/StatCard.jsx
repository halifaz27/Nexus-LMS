export default function StatCard({ label, value, note, icon: Icon, tone = 'indigo' }) {
  const tones = {
    indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300',
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300',
    rose: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300',
  };
  return <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-900"><div className="flex items-start justify-between gap-3"><div className={`grid h-10 w-10 place-items-center rounded-xl ${tones[tone]}`}><Icon size={19}/></div><span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">{note}</span></div><p className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">{value}</p><p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p></div>;
}
