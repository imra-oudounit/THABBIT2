import { Icon } from "../components/Icon";
import { Owl } from "../components/Owl";


const features = [
  { icon: "hearing", title: "AI Correction", desc: "Real-time tajweed feedback" },
  { icon: "cloud_off", title: "Offline Mode", desc: "Learn without internet" },
  { icon: "auto_stories", title: "Full Tafsir", desc: "Ibn Kathir, Tabari & more" },
  { icon: "record_voice_over", title: "All Reciters", desc: "Warsh & Hafs narrations" },
  { icon: "psychology", title: "Adaptive Review", desc: "Smart spaced repetition" },
  { icon: "support_agent", title: "Priority Support", desc: "Get help anytime" },
];

export function PremiumScreen({ onBack }: { onBack?: () => void } = {}) {
  return (
    <div className="h-full w-full bg-night-gradient relative overflow-hidden text-white">

      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="px-6 pt-8 flex items-center justify-between">
        <button onClick={onBack} className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
          <Icon name="close" className="text-white" size={20} />
        </button>
        <span className="text-[10px] uppercase tracking-widest text-amber-300 font-semibold">Premium</span>
      </div>

      <div className="px-6 mt-4 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-[24px] bg-gold-gradient flex items-center justify-center shadow-lg shadow-amber-500/30">
          <Owl size={56} mood="celebrate" />
        </div>
        <h1 className="mt-5 text-2xl font-bold">Unlock the full Thabbit experience</h1>
        <p className="mt-2 text-sm text-slate-300 max-w-[280px]">
          Warsh-accurate AI recitation, offline mode, and advanced Tafsir — all in one subscription.
        </p>
      </div>

      <div className="relative mt-6 px-5 grid grid-cols-2 gap-3">
        {features.map((f, i) => (
          <div key={i} className="rounded-2xl bg-white/15 backdrop-blur p-3 text-center">
            <Icon name={f.icon} className="text-amber-300 mx-auto" size={22} />
            <div className="mt-2 text-xs font-bold">{f.title}</div>
            <div className="mt-0.5 text-[10px] text-slate-300">{f.desc}</div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <button className="w-full h-14 rounded-2xl bg-gold-gradient text-amber-950 font-bold shadow-lg shadow-amber-500/30">
          Go Premium
        </button>
        <p className="mt-3 text-center text-[10px] text-slate-400">Cancel anytime · Secure payment</p>
      </div>
    </div>
  );
}
