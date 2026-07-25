import { Owl } from "../components/Owl";


export function SplashScreen() {
  return (
    <div className="h-full w-full bg-night-gradient relative overflow-hidden">

      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full border border-white/10 spin-slow" />

      {/* Subtle islamic star */}
      <svg viewBox="0 0 100 100" className="absolute top-24 left-8 w-16 h-16 opacity-20">
        <polygon points="50,5 61,39 95,39 67,59 78,93 50,72 22,93 33,59 5,39 39,39" fill="none" stroke="#fde68a" strokeWidth="1" />
      </svg>

      <div className="h-full flex flex-col items-center justify-center px-8 -mt-10">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-400/20 blur-3xl rounded-full" />
          <Owl size={140} mood="happy" className="relative floaty" />
        </div>

        <h2 className="mt-8 text-5xl font-arabic font-bold text-gold-gradient">ثبت</h2>
        <p className="mt-1 text-sm font-bold tracking-[0.3em] text-slate-300">THABBIT</p>
        <p className="mt-3 text-sm text-slate-300 text-center max-w-[240px]">
          The Intelligent Quran Memorization Companion
        </p>
      </div>

      <p className="absolute bottom-10 left-0 right-0 text-center text-xs text-slate-400 font-arabic">
        بسم الله الرحمن الرحيم
      </p>
    </div>
  );
}
