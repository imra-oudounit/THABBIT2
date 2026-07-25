import { useUserProfile } from "../hooks/useUserProfile";
import { Owl } from "../components/Owl";
import { Icon } from "../components/Icon";


export function ProfileScreen({
  onBack,
  onOpenSettings,
  onOpenPremium,
}: {
  onBack?: () => void;
  onOpenSettings?: () => void;
  onOpenPremium?: () => void;
} = {}) {
  const { profile } = useUserProfile();

  const displayName = profile.displayName || (profile.isAnonymous ? "Guest" : "User");
  const streak = profile.streak ?? 0;
  const totalVerses = profile.totalVersesMemorized ?? 0;
  const totalSurahs = 0;

  return (
    <div className="h-full w-full bg-mesh relative pb-24 overflow-y-auto phone-scroll">

      <div className="px-5 pt-10 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-2xl glass flex items-center justify-center shrink-0">
          <Icon name="arrow_back" className="text-slate-700" size={20} />
        </button>
        <h1 className="text-xl font-bold text-slate-900 font-arabic flex-1">الملف الشخصي</h1>
        <button onClick={onOpenSettings} className="w-10 h-10 rounded-2xl glass flex items-center justify-center">
          <Icon name="settings" className="text-slate-700" size={20} />
        </button>
      </div>

      {/* Hero card */}
      <div className="mx-5 mt-4 rounded-[28px] bg-night-gradient p-5 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-emerald-500/20 blur-3xl" />
        <button onClick={onOpenPremium} className="absolute top-4 left-4 rounded-full px-3 py-1 text-[10px] font-bold bg-gold-gradient text-amber-950">
          Premium 🏆
        </button>
        <div className="flex items-center gap-3 relative mt-6">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/20 shrink-0 bg-white/10 flex items-center justify-center">
            {profile.photoURL ? (
              <img src={profile.photoURL} alt="" className="w-full h-full object-cover" />
            ) : (
              <Owl size={56} mood="happy" />
            )}
          </div>
          <div className="flex-1">
            <div className="text-lg font-bold">{displayName}</div>
            <div className="text-xs text-slate-300 font-display">Level 12 · Hafidh in training</div>
            <div className="flex gap-2 mt-1.5">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 font-semibold flex items-center gap-1">
                <Icon name="local_fire_department" size={10} filled /> {streak} days
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-200 font-semibold flex items-center gap-1">
                <Icon name="paid" size={10} filled /> 1,240
              </span>
            </div>
          </div>
        </div>
        {/* XP bar */}
        <div className="mt-4 relative">
          <div className="flex items-center justify-between text-[10px] text-slate-300 mb-1">
            <span>Lv 12</span>
            <span>2,340 / 3,000 XP</span>
            <span>Lv 13</span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gold-gradient rounded-full" style={{ width: "78%" }} />
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="mx-5 mt-4 grid grid-cols-3 gap-2">
        <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm text-center">
          <Icon name="menu_book" className="text-emerald-700 mx-auto" size={18} />
          <div className="mt-1 text-sm font-bold text-slate-900">{totalVerses}</div>
          <div className="text-[10px] text-slate-500">Verses</div>
        </div>
        <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm text-center">
          <Icon name="library_books" className="text-emerald-700 mx-auto" size={18} />
          <div className="mt-1 text-sm font-bold text-slate-900">{totalSurahs}</div>
          <div className="text-[10px] text-slate-500">Surahs</div>
        </div>
        <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm text-center">
          <Icon name="schedule" className="text-emerald-700 mx-auto" size={18} />
          <div className="mt-1 text-sm font-bold text-slate-900">186h</div>
          <div className="text-[10px] text-slate-500">Time</div>
        </div>
      </div>

      {/* Calendar heatmap */}
      <div className="mx-5 mt-4 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold text-slate-900">Activity</div>
          <span className="text-[10px] text-slate-500">last 8 weeks</span>
        </div>
        <div className="mt-3 grid gap-1" style={{ gridTemplateColumns: "repeat(14, minmax(0, 1fr))" }}>
          {Array.from({ length: 56 }).map((_, i) => {
            const lvl = (i * 37) % 5;
            const colors = ["bg-slate-100", "bg-emerald-100", "bg-emerald-300", "bg-emerald-500", "bg-emerald-700"];
            return <span key={i} className={`h-4 rounded-md ${colors[lvl]}`} />;
          })}
        </div>
        <div className="mt-2 flex items-center gap-1 justify-end text-[10px] text-slate-400">
          <span>Less</span>
          <span className="h-2 w-2 rounded bg-slate-100" />
          <span className="h-2 w-2 rounded bg-emerald-200" />
          <span className="h-2 w-2 rounded bg-emerald-400" />
          <span className="h-2 w-2 rounded bg-emerald-700" />
          <span>More</span>
        </div>
      </div>

      {/* Achievements row */}
      <div className="mx-5 mt-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold text-slate-900">Achievements</div>
          <span className="text-[10px] text-emerald-700 font-semibold">28 / 86</span>
        </div>
        <div className="mt-2 flex gap-2 overflow-x-auto phone-scroll">
          {[
            { i: "local_fire_department", c: "from-orange-400 to-rose-500", l: "Streak" },
            { i: "auto_awesome", c: "from-emerald-400 to-teal-600", l: "AI Pro" },
            { i: "diamond", c: "from-sky-400 to-blue-600", l: "Hafidh" },
            { i: "stars", c: "from-amber-400 to-yellow-600", l: "5★" },
            { i: "bolt", c: "from-violet-400 to-purple-600", l: "Fast" },
          ].map((a, i) => (
            <div key={i} className="shrink-0 w-20 text-center">
              <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${a.c} flex items-center justify-center shadow-sm`}>
                <Icon name={a.i} className="text-white" size={22} filled />
              </div>
              <p className="text-[10px] font-semibold text-slate-700 mt-1">{a.l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
