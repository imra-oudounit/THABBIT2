import { Icon } from "../components/Icon";


const verses = [
  { n: 1, ar: "يسٓ", memorized: true },
  { n: 2, ar: "وَالْقُرْآنِ الْحَكِيمِ", memorized: true, active: true },
  { n: 3, ar: "إِنَّكَ لَمِنَ الْمُرْسَلِينَ", memorized: false },
];

export function MemorizationScreen({ onBack }: { onBack?: () => void } = {}) {
  return (
    <div className="h-full w-full bg-mesh relative pb-6 overflow-y-auto" dir="rtl">

      <div className="px-5 pt-10 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-2xl glass flex items-center justify-center shrink-0">
          <Icon name="arrow_back" className="text-slate-700" size={20} />
        </button>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Yaseen</div>
          <h1 className="text-2xl font-bold text-slate-900 mt-0.5 font-arabic">حفظ جديد</h1>
        </div>
      </div>

      <div className="mx-5 mt-5 space-y-3">
        {verses.map((v) => (
          <div
            key={v.n}
            className={`rounded-2xl p-4 ${
              v.active ? "bg-emerald-50 border-emerald-200 shadow-md shadow-emerald-200/50" : "bg-white border-slate-100"
            } border`}
          >
            <div className="flex items-center justify-between">
              <span className="relative inline-flex items-center justify-center">
                <svg viewBox="0 0 32 32" width="28" height="28">
                  <polygon
                    points="16,2 19,12 30,12 21,18 24,29 16,22 8,29 11,18 2,12 13,12"
                    fill={v.active ? "#1F5F47" : "#E8E1D6"}
                  />
                </svg>
                <span className={`absolute text-[9px] font-bold ${v.active ? "text-white" : "text-slate-700"}`}>
                  {v.n}
                </span>
              </span>
              {v.memorized && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold flex items-center gap-1">
                  <Icon name="check_circle" size={12} filled /> Memorized
                </span>
              )}
            </div>
            <div className="mt-3 font-quran text-2xl text-slate-900 leading-loose" dir="rtl">
              {v.ar}
            </div>
            {v.active && (
              <div className="mt-2 text-xs text-slate-500 italic">
                "By the Wise Quran."
              </div>
            )}
            {v.active && (
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 flex items-end gap-0.5 h-6">
                  {Array.from({ length: 22 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-0.5 rounded-full bg-emerald-500 wave-bar"
                      style={{ height: `${8 + Math.sin(i) * 8}px`, animationDelay: `${i * 0.05}s` }}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-semibold text-emerald-700">0:14</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
