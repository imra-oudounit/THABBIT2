import { useMemo, useState } from "react";
import { Icon } from "../components/Icon";

export type QuranSurah = {
  n: number;
  name: string;
  transliteration?: string;
  ar: string;
  verses: number;
  type: "Meccan" | "Medinan" | string;
  revelationOrder?: number;
  startPage?: number;
  endPage?: number;
  juz?: number;
  hizb?: number;
  rub?: number;
  sajdah?: boolean;
  favorite?: boolean;
  lastProgress?: number;
  theme?: string;
  description?: string;
  color?: string;
};

const surahs: QuranSurah[] = [
  { n: 1, name: "Al-Fatihah", transliteration: "The Opening", ar: "الفاتحة", verses: 7, type: "Meccan", revelationOrder: 5, startPage: 1, endPage: 1, juz: 1, hizb: 1, rub: 1, favorite: true, lastProgress: 100 },
  { n: 2, name: "Al-Baqarah", transliteration: "The Cow", ar: "البقرة", verses: 286, type: "Medinan", revelationOrder: 87, startPage: 2, endPage: 49, juz: 1, hizb: 1, rub: 2, lastProgress: 18 },
  { n: 3, name: "Aali Imran", transliteration: "Family of Imran", ar: "آل عمران", verses: 200, type: "Medinan", revelationOrder: 89, startPage: 50, endPage: 76, juz: 3, hizb: 6, rub: 24, lastProgress: 8 },
  { n: 4, name: "An-Nisa", transliteration: "The Women", ar: "النساء", verses: 176, type: "Medinan", revelationOrder: 92, startPage: 77, endPage: 106, juz: 4, hizb: 10, rub: 39, lastProgress: 0 },
  { n: 5, name: "Al-Maidah", transliteration: "The Table", ar: "المائدة", verses: 120, type: "Medinan", revelationOrder: 112, startPage: 106, endPage: 127, juz: 6, hizb: 12, rub: 48, lastProgress: 0 },
  { n: 18, name: "Al-Kahf", transliteration: "The Cave", ar: "الكهف", verses: 110, type: "Meccan", revelationOrder: 69, startPage: 293, endPage: 304, juz: 15, hizb: 30, rub: 119, favorite: true, lastProgress: 45 },
  { n: 36, name: "Yaseen", transliteration: "Yaseen", ar: "يس", verses: 83, type: "Meccan", revelationOrder: 41, startPage: 440, endPage: 445, juz: 22, hizb: 44, rub: 176, lastProgress: 82 },
  { n: 55, name: "Ar-Rahman", transliteration: "The Most Merciful", ar: "الرحمن", verses: 78, type: "Medinan", revelationOrder: 97, startPage: 531, endPage: 534, juz: 27, hizb: 53, rub: 211, lastProgress: 30 },
  { n: 67, name: "Al-Mulk", transliteration: "The Sovereignty", ar: "الملك", verses: 30, type: "Meccan", revelationOrder: 77, startPage: 562, endPage: 564, juz: 29, hizb: 57, rub: 226, favorite: true, lastProgress: 100 },
  { n: 114, name: "An-Nas", transliteration: "Mankind", ar: "الناس", verses: 6, type: "Meccan", revelationOrder: 21, startPage: 604, endPage: 604, juz: 30, hizb: 60, rub: 240, lastProgress: 100 },
];

const filters = ["جميع السور", "مكية", "مدنية", "المفضلة", "آخر قراءة"];

export function QuranScreen({
  onBack,
  onOpenReader,
}: {
  onBack?: () => void;
  onOpenReader?: (surah: QuranSurah) => void;
} = {}) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("جميع السور");

  const filteredSurahs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return surahs.filter((s) => {
      const matchesQuery = !q || s.ar.includes(query.trim()) || s.name.toLowerCase().includes(q) || s.transliteration?.toLowerCase().includes(q) || String(s.n) === q;
      const matchesFilter =
        activeFilter === "جميع السور" ||
        (activeFilter === "مكية" && s.type === "Meccan") ||
        (activeFilter === "مدنية" && s.type === "Medinan") ||
        (activeFilter === "المفضلة" && s.favorite) ||
        (activeFilter === "آخر قراءة" && (s.lastProgress || 0) > 0);
      return matchesQuery && matchesFilter;
    });
  }, [query, activeFilter]);

  const continueSurah = surahs.find((s) => (s.lastProgress || 0) > 0 && (s.lastProgress || 0) < 100) || surahs[1];

  return (
    <div className="h-full w-full bg-slate-50 relative overflow-hidden flex flex-col" dir="rtl">
      
      {/* Header Section */}
      <div className="px-6 pt-12 pb-6 bg-white border-b border-slate-100 z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition">
              <Icon name="arrow_back" className="text-slate-700" size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 font-arabic">القرآن الكريم</h1>
              <p className="text-xs text-slate-500 font-arabic mt-0.5">اقرأ وتدبر كتاب الله</p>
            </div>
          </div>
          <button className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition">
            <Icon name="tune" className="text-slate-700" size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center px-4 gap-3 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition">
          <Icon name="search" className="text-slate-400" size={20} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن سورة أو رقم..."
            className="flex-1 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400 font-arabic"
          />
          <button className="text-emerald-600 hover:text-emerald-700 transition">
            <Icon name="mic" size={20} />
          </button>
        </div>

        {/* Filters */}
        <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`shrink-0 px-4 h-9 rounded-full text-[11px] font-semibold font-arabic transition active:scale-95 ${
                activeFilter === f 
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/20" 
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 pb-24 no-scrollbar">
        
        {/* Continue Reading Card */}
        <button
          onClick={() => onOpenReader?.(continueSurah)}
          className="w-full rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-5 text-white shadow-xl shadow-emerald-600/20 relative overflow-hidden text-right block group active:scale-[0.98] transition-transform"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10 blur-2xl group-hover:scale-110 transition-transform duration-500" />
          <div className="relative flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] text-emerald-100 font-arabic flex items-center gap-1">
                <Icon name="history" size={12} /> متابعة القراءة
              </div>
              <div className="mt-1 text-xl font-bold font-arabic">{continueSurah.ar}</div>
              <div className="mt-1 text-[10px] text-emerald-100 font-arabic">صفحة {continueSurah.startPage} · الجزء {continueSurah.juz}</div>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:bg-white/30 transition">
              <Icon name="play_arrow" size={24} filled />
            </div>
          </div>
        </button>

        {/* Surah List */}
        {filteredSurahs.map((surah) => (
          <button
            key={surah.n}
            onClick={() => onOpenReader?.(surah)}
            className="w-full rounded-2xl bg-white border border-slate-100 p-4 shadow-sm hover:shadow-md active:scale-[0.98] transition text-right block group"
          >
            <div className="flex items-center gap-4">
              {/* Surah Number Badge */}
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 48 48" className="w-full h-full rotate-45">
                  <rect x="4" y="4" width="40" height="40" rx="8" fill="#EEF5F0" stroke="#1F5F47" strokeWidth="1.5" />
                </svg>
                <span className="absolute text-[10px] font-bold text-emerald-700 -rotate-45">{surah.n}</span>
              </div>
              
              {/* Surah Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-bold text-slate-900 font-arabic text-lg truncate">{surah.ar}</div>
                  {surah.favorite && <Icon name="favorite" className="text-rose-400 shrink-0 ml-2" size={18} filled />}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-arabic">
                  <span>{surah.name}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span>{surah.type === "Meccan" ? "مكية" : "مدنية"}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span>{surah.verses} آية</span>
                </div>
              </div>
            </div>
            
            {/* Progress Bar (if started) */}
            {(surah.lastProgress || 0) > 0 && (
              <div className="mt-3 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${surah.lastProgress}%` }} />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
