import { useState } from 'react';
import { ArrowRight, BookOpen, CheckCircle2, GraduationCap, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { isSupabaseConfigured, supabase } from './supabase';

export default function AuthScreen() {
  const [mode, setMode] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    setMessage(''); setError('');
    if (!isSupabaseConfigured) return;
    setBusy(true);
    try {
      if (mode === 'signup') {
        const { data, error: authError } = await supabase.auth.signUp({
          email: email.trim(), password,
          options: { data: { full_name: name.trim() || email.trim().split('@')[0] } },
        });
        if (authError) throw authError;
        if (!data.session) setMessage('Akun dibuat. Cek email untuk mengonfirmasi pendaftaran sebelum masuk.');
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (authError) throw authError;
      }
    } catch (authError) {
      setError(authError.message || 'Autentikasi gagal. Coba lagi.');
    } finally { setBusy(false); }
  }

  async function signInWithGoogle() {
    setMessage(''); setError('');
    if (!isSupabaseConfigured) return;
    setBusy(true);
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/Nexus-LMS/` },
    });
    if (authError) { setError(authError.message); setBusy(false); }
  }

  async function resetPassword() {
    setMessage(''); setError('');
    if (!isSupabaseConfigured) return;
    if (!email.trim()) { setError('Masukkan email terlebih dahulu.'); return; }
    setBusy(true);
    const { error: authError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/Nexus-LMS/`,
    });
    if (authError) setError(authError.message);
    else setMessage('Jika email terdaftar, tautan reset password akan dikirim ke email tersebut.');
    setBusy(false);
  }

  const inputClass = 'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10';

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10 text-slate-900">
      <div className="pointer-events-none absolute -left-28 -top-28 h-96 w-96 rounded-full bg-indigo-600/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-36 -right-20 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-black/30 md:grid-cols-2">
        <section className="hidden flex-col justify-between bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 p-10 text-white md:flex">
          <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15"><GraduationCap size={25}/></span><span className="text-xl font-black tracking-tight">nexus<span className="text-indigo-200">.</span></span></div>
          <div className="py-12"><p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold"><ShieldCheck size={14}/> YOUR LEARNING SPACE</p><h1 className="max-w-sm text-4xl font-black leading-tight tracking-tight">Your next skill starts here.</h1><p className="mt-5 max-w-sm text-sm leading-7 text-indigo-100">Satu tempat untuk menjelajahi kelas, mengikuti progres belajar, dan merayakan pencapaianmu.</p><div className="mt-8 flex items-center gap-3 text-sm text-indigo-100"><CheckCircle2 size={18}/> Progress belajar tersimpan di akunmu</div></div>
          <p className="text-xs text-indigo-200">Nexus LMS · Learn at your own pace</p>
        </section>
        <section className="p-6 sm:p-10 md:p-12">
          <div className="mb-8 flex items-center gap-3 md:hidden"><span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-white"><GraduationCap size={22}/></span><span className="text-xl font-black">nexus<span className="text-indigo-600">.</span></span></div>
          <div className="mb-7"><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-indigo-600">Welcome to Nexus</p><h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">{mode === 'signup' ? 'Create your account' : 'Welcome back'}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{mode === 'signup' ? 'Daftar untuk mulai menyimpan perjalanan belajarmu.' : 'Masuk untuk melanjutkan perjalanan belajarmu.'}</p></div>

          {!isSupabaseConfigured && <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900"><strong>Setup Supabase diperlukan.</strong><br/>Buat file <code className="rounded bg-amber-100 px-1">.env</code> dari <code className="rounded bg-amber-100 px-1">.env.example</code>, isi URL dan anon/publishable key dari project Supabase, lalu restart Vite. Panduan lengkap ada di README.</div>}
          {message && <div role="status" className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">{message}</div>}
          {error && <div role="alert" className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div>}

          <button type="button" onClick={signInWithGoogle} disabled={!isSupabaseConfigured || busy} className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"><GoogleMark/> Continue with Google</button>
          <div className="my-6 flex items-center gap-3"><span className="h-px flex-1 bg-slate-200"/><span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">or continue with email</span><span className="h-px flex-1 bg-slate-200"/></div>

          <form onSubmit={submit} className="space-y-4">
            {mode === 'signup' && <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Full name</span><input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name"/></label>}
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Email address</span><span className="relative block"><Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/><input className={`${inputClass} pl-10`} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email"/></span></label>
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Password</span><span className="relative block"><LockKeyhole size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/><input className={`${inputClass} pl-10`} type="password" minLength={6} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}/></span></label>
            {mode === 'signin' && <div className="-mt-1 text-right"><button type="button" onClick={resetPassword} disabled={!isSupabaseConfigured || busy} className="text-xs font-bold text-indigo-600 hover:text-indigo-800 disabled:opacity-50">Forgot password?</button></div>}
            <button disabled={!isSupabaseConfigured || busy} type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50">{busy ? 'Please wait…' : mode === 'signup' ? 'Create account' : 'Sign in'} {!busy && <ArrowRight size={17}/>}</button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">{mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}<button onClick={() => { setMode(mode === 'signup' ? 'signin' : 'signup'); setError(''); setMessage(''); }} className="font-extrabold text-indigo-600 hover:text-indigo-800">{mode === 'signup' ? 'Sign in' : 'Create one'}</button></p>
          <p className="mt-8 flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-400"><BookOpen size={13}/> Secure authentication powered by Supabase</p>
        </section>
      </div>
    </main>
  );
}

function GoogleMark() {
  return <svg aria-hidden="true" viewBox="0 0 48 48" className="h-5 w-5"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" transform="translate(0 4) scale(.92)"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.64 5.93c4.46-4.11 7.13-10.16 7.13-17.58Z"/><path fill="#FBBC05" d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.9 23.9 0 0 0 0 21.56l7.98-6.19Z" transform="translate(0 0) scale(.96)"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.79l-7.64-5.93c-2.12 1.42-4.84 2.27-8.27 2.27-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" transform="translate(0 -3) scale(.96)"/></svg>;
}
