import { useState } from "react";
import { Icon } from "../components/Icon";

function toArabicDigits(value: number | string): string {
  const ARABIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(value).replace(/[0-9]/g, (d) => ARABIC_DIGITS[Number(d)]);
}

const SPEEDS = ["0.75x", "1.0x", "1.25x", "1.5x"];

type ReaderSurah = {
  n: number;
  name: string;
  ar: string;
  verses: number;
  type: string;
  juz?: number;
  pct?: number;
};

const MOCK_VERSES: Record<number, string[]> = {
  1: [
    "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    "الرَّحْمَٰنِ الرَّحِيمِ",
    "مَالِكِ يَوْمِ الدِّينِ",
    "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
  ],
  2: [
    "الم",
    "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ",
    "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ",
    "وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ",
    "أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ",
  ],
  36: [
    "يس",
    "وَالْقُرْآنِ الْحَكِيمِ",
    "إِنَّكَ لَمِنَ الْمُرْسَلِينَ",
    "عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ",
    "تَنزِيلَ الْعَزِيزِ الرَّحِيمِ",
  ],
  67: [
    "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    "الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ",
  ],
};

const RECITERS = [
  { id: "mishary", name: "مشاري العفاسي", initials: "مع", color: "from-emerald-400 to-teal-600" },
  { id: "abdulbasit", name: "عبدالباسط عبدالصمد", initials: "عب", color: "from-amber-400 to-orange-600" },
  { id: "sudais", name: "عبدالرحمن السديس", initials: "عس", color: "from-indigo-400 to-blue-600" },
];

// Simple Islamic verse-end marker (clean badge)
function VerseMarker({ n, isActive }: { n: number; isActive: boolean }) {
  const color = isActive ? "#1F5F47" : "#B3A695";
  const bg = isActive ? "rgba(31,95,71,0.09)" : "rgba(140,129,114,0.06)";
  return (
    <span
      className="verse-medallion"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "1.7em",
        height: "1.7em",
        minWidth: "1.7em",
        borderRadius: "9999px",
        border: `1.5px solid ${color}`,
        background: bg,
        color,
        fontSize: "0.42em",
        fontWeight: 700,
        fontFamily: "'IBM Plex Sans Arabic', sans-serif",
        margin: "0 0.15em",
        verticalAlign: "middle",
        lineHeight: 1,
      }}
    >
      {toArabicDigits(n)}
    </span>
  );
}

function SettingBlock({
  icon, title, subtitle, isDark, children,
}: { icon: string; title: string; subtitle?: string; isDark: boolean; children: React.ReactNode }) {
  return (
    <div className={`rounded-3xl border p-4 ${isDark ? "bg-[#111827]/55 border-slate-700/70" : "bg-slate-50 border-slate-200/80"}`}>
      <div className="flex items-start gap-3 mb-4">
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${isDark ? "bg-white/5 text-amber-300" : "bg-white text-emerald-700 shadow-sm"}`}>
          <Icon name={icon} size={20} />
        </div>
        <div>
          <div className="font-arabic font-bold text-sm">{title}</div>
          {subtitle && <div className="text-[10px] opacity-60 mt-0.5 font-arabic">{subtitle}</div>}
        </div>
      </div>
      {children}
    </div>
  );
}

export function ReaderScreen({
  surah, onBack,
}: { surah?: ReaderSurah | null; onBack?: () => void; isFullscreen?: boolean } = {}) {
  const [isDark, setIsDark] = useState(false);
  const [fontSize, setFontSize] = useState(28);
  const [selectedReciter, setSelectedReciter] = useState("mishary");
  const [activeVerse, setActiveVerse] = useState<number | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState("1.0x");


  if (!surah) return null;

  const verses = MOCK_VERSES[surah.n] || MOCK_VERSES[1];
  const activeVerseText = activeVerse !== null ? verses[activeVerse] : "";

  const currentReciter = RECITERS.find((r) => r.id === selectedReciter) || RECITERS[0];

  const bg = isDark ? "bg-[#111827]" : "bg-[#FBF6EA]";
  const text = isDark ? "text-slate-200" : "text-slate-800";
  const accent = isDark ? "text-amber-400" : "text-emerald-700";
  const playerBg = isDark ? "bg-[#111827]/95 border-slate-700/70" : "bg-white/95 border-slate-200/80";
  const pill = isDark ? "bg-white/5 text-slate-300 border border-white/10" : "bg-slate-100 text-slate-600 border border-slate-200";

  return (
    <div className={`h-full w-full ${bg} ${text} relative overflow-hidden flex flex-col transition-colors duration-500`} dir="rtl">
      {/* Header */}
      <div className={`px-5 pt-10 pb-4 flex items-center justify-between z-20 backdrop-blur-md sticky top-0 ${isDark ? "bg-[#111827]/85" : "bg-[#FBF6EA]/85"}`}>
        <button onClick={onBack} className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm border ${isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-800"} active:scale-95 transition`}>
          <Icon name="arrow_back" size={20} />
        </button>
        <div className="flex flex-col items-center">
          <h2 className="font-islamic-140 text-xl tracking-wide">{surah.ar}</h2>
          <span className="text-[10px] opacity-60 font-arabic mt-0.5">جزء {toArabicDigits(surah.juz || 1)}</span>
        </div>
        <button onClick={() => setSettingsOpen(true)} className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm border ${isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-800"} active:scale-95 transition`}>
          <Icon name="tune" size={20} />
        </button>
      </div>

      <div className={`flex-1 overflow-y-auto px-4 z-10 no-scrollbar scroll-smooth ${activeVerse !== null ? "pb-52" : "pb-8"}`}>
        <div className="my-4 flex flex-col items-center justify-center relative">
          <div className="flex items-center gap-2.5">
            <span className={`w-5 h-px ${isDark ? "bg-amber-400/50" : "bg-[#C8A24B]/60"}`} />
            <span className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-amber-400/70" : "bg-[#C8A24B]/70"}`} />
            <h1 className={`font-islamic-140 text-xl ${accent} tracking-wide`}>{surah.ar}</h1>
            <span className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-amber-400/70" : "bg-[#C8A24B]/70"}`} />
            <span className={`w-5 h-px ${isDark ? "bg-amber-400/50" : "bg-[#C8A24B]/60"}`} />
          </div>
          <div className="flex items-center gap-2 text-[10px] font-arabic opacity-60 mt-1.5">
            <span>{surah.type === "Meccan" ? "مكية" : "مدنية"}</span>
            <span>·</span>
            <span>{toArabicDigits(surah.verses)} آية</span>
            <span>·</span>
            <span>جزء {toArabicDigits(surah.juz || 1)}</span>
          </div>
        </div>

        {surah.n !== 1 && surah.n !== 9 && (
          <div className="text-center mb-5">
            <p className={`text-2xl opacity-95 ${accent}`} style={{ fontFamily: "'Amiri Quran', serif" }}>
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>
        )}

        <div className="relative">
          <p
            className="text-justify"
            style={{ fontSize: `${fontSize}px`, lineHeight: "2.9", fontFamily: "'Amiri Quran', serif" }}
          >
            {verses.map((verse, idx) => {
              const isActive = activeVerse === idx;
              return (
                <span
                  key={idx}
                  onClick={() => {
                    setActiveVerse(isActive ? null : idx);
                    setIsPlaying(true);
                  }}
                  className={`inline cursor-pointer transition-all duration-300 rounded-xl px-2 -mx-1.5 py-1 ${
                    isActive
                      ? isDark
                        ? "bg-amber-500/15 text-amber-200 verse-active-dark"
                        : "bg-emerald-100/70 text-emerald-900 verse-active-light"
                      : "hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  {verse}
                  <VerseMarker n={idx + 1} isActive={isActive} />
                  {" "}
                </span>
              );
            })}
          </p>
        </div>
      </div>

      {/* Player */}
      <div className={`absolute bottom-0 left-0 right-0 ${playerBg} backdrop-blur-2xl border-t z-30 transition-transform duration-300 ${
        activeVerse !== null ? "translate-y-0" : "translate-y-full"
      }`}>
        <div className={`absolute top-0 left-0 right-0 h-[3px] ${isDark ? "bg-slate-700" : "bg-slate-200"}`}>
          <div className={`h-full ${isDark ? "bg-amber-400" : "bg-emerald-500"} w-1/3 rounded-r-full transition-all`} />
        </div>
        <div className="px-5 pt-4 pb-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${pill}`}>
                  الآية {activeVerse !== null ? toArabicDigits(activeVerse + 1) : "-"}
                </span>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${isDark ? "bg-amber-500/10 text-amber-300 border border-amber-500/20" : "bg-emerald-50 text-emerald-700 border border-emerald-100"}`}>
                  {speed}
                </span>
              </div>
              <p className="text-xs font-medium truncate" style={{ fontFamily: "'Amiri Quran', serif" }}>
                {activeVerseText}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <Icon name="record_voice_over" size={10} className={isDark ? "text-amber-400 opacity-70" : "text-emerald-600 opacity-70"} />
                <p className="text-[10px] opacity-60 font-arabic">{currentReciter.name}</p>
              </div>
            </div>
            <button onClick={() => setActiveVerse(null)} className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? "bg-white/5 hover:bg-white/10" : "bg-slate-100 hover:bg-slate-200"} transition shrink-0`}>
              <Icon name="close" size={16} className="opacity-70" />
            </button>
          </div>
          <div className="flex items-center justify-between text-[9px] opacity-50 mb-2 font-mono">
            <span>{toArabicDigits("00:00")}</span>
            <span>{toArabicDigits("00:23")}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <button className={`w-9 h-9 rounded-full flex items-center justify-center ${isDark ? "bg-white/5 hover:bg-white/10" : "bg-slate-100 hover:bg-slate-200"} transition`}>
              <Icon name="skip_next" size={18} className="opacity-75" />
            </button>
            <button className={`w-9 h-9 rounded-full flex items-center justify-center ${isDark ? "bg-white/5 hover:bg-white/10" : "bg-slate-100 hover:bg-slate-200"} transition`}>
              <Icon name="replay_10" size={16} className="opacity-75" />
            </button>
            <button onClick={() => setIsPlaying(!isPlaying)} className={`w-14 h-14 rounded-full ${isDark ? "bg-amber-400 text-slate-900 shadow-amber-500/30" : "bg-brand-gradient text-white shadow-emerald-900/30"} shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform`}>
              <Icon name={isPlaying ? "pause" : "play_arrow"} size={28} filled />
            </button>
            <button className={`w-9 h-9 rounded-full flex items-center justify-center ${isDark ? "bg-white/5 hover:bg-white/10" : "bg-slate-100 hover:bg-slate-200"} transition`}>
              <Icon name="forward_10" size={16} className="opacity-75" />
            </button>
            <button className={`w-9 h-9 rounded-full flex items-center justify-center ${isDark ? "bg-white/5 hover:bg-white/10" : "bg-slate-100 hover:bg-slate-200"} transition`}>
              <Icon name="skip_previous" size={18} className="opacity-75" />
            </button>
          </div>
        </div>
      </div>

      {/* Settings Sheet */}
      {settingsOpen && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center" onClick={() => setSettingsOpen(false)}>
          <div className={`w-full ${isDark ? "bg-[#17202C]" : "bg-white"} rounded-t-[2rem] p-5 shadow-2xl animate-slide-up max-h-[88vh] overflow-y-auto no-scrollbar`} onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto mb-5" />
            <div className="flex items-center justify-between mb-5">
              <button onClick={() => setSettingsOpen(false)} className={`w-9 h-9 rounded-full flex items-center justify-center ${isDark ? "bg-white/5 hover:bg-white/10" : "bg-slate-100 hover:bg-slate-200"}`}>
                <Icon name="close" size={18} />
              </button>
              <h3 className="text-lg font-bold font-arabic">إعدادات القراءة</h3>
              <div className="w-9" />
            </div>

            <div className={`mb-5 rounded-3xl border p-5 relative overflow-hidden ${isDark ? "bg-[#111827]/60 border-slate-700/70" : "bg-gradient-to-br from-emerald-50/50 to-white border-emerald-100"}`}>
              <div className="text-[10px] opacity-60 font-arabic mb-3 flex items-center gap-1.5">
                <Icon name="visibility" size={12} /> معاينة فورية
              </div>
              <p className={`text-center ${accent}`} style={{ fontSize: `${Math.max(20, fontSize - 2)}px`, lineHeight: "2.2", fontFamily: "'Amiri Quran', serif" }}>
                وَالْقُرْآنِ الْحَكِيمِ
                <VerseMarker n={2} isActive />
              </p>
            </div>

            <div className="space-y-4">
              <SettingBlock icon={isDark ? "dark_mode" : "light_mode"} title="الوضع الليلي" subtitle="تبديل مظهر القراءة بين النهاري والليلي" isDark={isDark}>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button onClick={() => setIsDark(false)} className={`px-4 h-10 rounded-2xl text-sm font-arabic font-semibold border transition ${!isDark ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/30" : isDark ? "bg-white/5 border-white/10 text-slate-300" : "bg-white border-slate-200 text-slate-600"}`}>☀️ نهاري</button>
                    <button onClick={() => setIsDark(true)} className={`px-4 h-10 rounded-2xl text-sm font-arabic font-semibold border transition ${isDark ? "bg-amber-400 text-slate-900 border-amber-400 shadow-md shadow-amber-500/30" : "bg-white border-slate-200 text-slate-600"}`}>🌙 ليلي</button>
                  </div>
                </div>
              </SettingBlock>

              <SettingBlock icon="format_size" title="حجم النص" subtitle="اضبط حجم الخط بما يناسب راحة عينيك" isDark={isDark}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold tabular-nums">{fontSize}px</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[20, 24, 30, 36].map((size) => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={`h-10 rounded-xl font-bold text-sm transition ${fontSize === size ? (isDark ? "bg-amber-400 text-slate-900" : "bg-emerald-600 text-white") : (isDark ? "bg-white/5 text-slate-400" : "bg-white border border-slate-200 text-slate-600")}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </SettingBlock>

              <SettingBlock icon="record_voice_over" title="صوت القارئ" subtitle="اختر القارئ المفضل للتلاوة" isDark={isDark}>
                <div className="space-y-2">
                  {RECITERS.map((r) => {
                    const active = selectedReciter === r.id;
                    return (
                      <button key={r.id} onClick={() => setSelectedReciter(r.id)} className={`w-full flex items-center gap-3 p-3 rounded-2xl border transition-all ${active ? (isDark ? "border-amber-500 bg-amber-500/10" : "border-emerald-500 bg-emerald-50") : (isDark ? "border-slate-700 hover:bg-slate-800" : "border-slate-200 hover:bg-white")}`}>
                        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>{r.initials}</div>
                        <span className="font-arabic text-sm font-medium flex-1 text-right">{r.name}</span>
                        {active && <Icon name="check_circle" size={20} className={isDark ? "text-amber-400" : "text-emerald-600"} filled />}
                      </button>
                    );
                  })}
                </div>
              </SettingBlock>

              <SettingBlock icon="speed" title="سرعة التلاوة" subtitle="تحكم بسرعة القراءة أثناء التشغيل" isDark={isDark}>
                <div className="grid grid-cols-4 gap-2">
                  {SPEEDS.map((sp) => (
                    <button
                      key={sp}
                      onClick={() => setSpeed(sp)}
                      className={`h-10 rounded-2xl text-sm font-bold transition ${speed === sp ? (isDark ? "bg-amber-400 text-slate-900" : "bg-emerald-600 text-white") : (isDark ? "bg-white/5 text-slate-300 border border-white/10" : "bg-white border border-slate-200 text-slate-600")}`}
                    >
                      {sp}
                    </button>
                  ))}
                </div>
              </SettingBlock>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
