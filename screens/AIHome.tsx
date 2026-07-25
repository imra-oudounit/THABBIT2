import { useState } from "react";
import { Icon } from "../components/Icon";

import { Owl } from "../components/Owl";
import { useLanguage } from "../i18n/LanguageContext";

export function AIHomeScreen({ onBack, onOpenTafsirMode }: { onBack?: () => void; onOpenTafsirMode?: () => void } = {}) {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  const [searchValue, setSearchValue] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const quickActions = [
    { icon: "auto_awesome", title: isAr ? "اشرح آية" : "Explain a verse" },
    { icon: "compare_arrows", title: isAr ? "قارن التفاسير" : "Compare Tafsir" },
    { icon: "history_edu", title: isAr ? "سبب النزول" : "Reason of revelation" },
    { icon: "translate", title: isAr ? "معنى كلمة" : "Word meaning" },
  ];

  function handleSearchSubmit() {
    onOpenTafsirMode?.();
  }

  return (
    <div className="h-full w-full bg-night-gradient relative overflow-hidden flex flex-col text-white" dir={isAr ? "rtl" : "ltr"}>

      <div className="px-5 pt-6 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
          <Icon name="arrow_back" className="text-white" size={20} />
        </button>
        <div className="flex-1 flex items-center gap-2">
          <Owl size={32} mood="happy" />
          <div>
            <div className="text-sm font-bold">THABBIT AI</div>
            <div className="text-[10px] text-slate-300">{isAr ? "رفيقك المعرفي" : "Your knowledge companion"}</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto phone-scroll px-5 py-4 pb-8 z-10">
        {/* Animated Mascot */}
        <div className="flex flex-col items-center mt-2 mb-6">
          <Owl size={90} mood="wise" className="floaty" />
        </div>

        {/* Premium Search Bar with Integrated Button */}
        <div
          className={`mb-6 h-14 rounded-[28px] bg-white/10 backdrop-blur-md border transition-all duration-300 flex items-center px-4 gap-2 ${
            searchFocused ? "border-emerald-400 shadow-lg shadow-emerald-500/20" : "border-white/10"
          }`}
        >
          <Icon name="search" className="text-white/60" size={20} />
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder={isAr ? "ابحث عن تفسير آية أو سؤال عن القرآن..." : "Search for verse tafsir or ask about the Quran..."}
            className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-white/40 font-arabic"
            dir="rtl"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearchSubmit();
            }}
          />
          <button onClick={handleSearchSubmit} className="w-9 h-9 rounded-full bg-brand-gradient flex items-center justify-center shrink-0">
            <Icon name="arrow_forward" size={16} className="text-white" />
          </button>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {quickActions.map((action, index) => (
            <button key={index} className="rounded-2xl bg-white/10 backdrop-blur p-4 text-center border border-white/10">
              <Icon name={action.icon} className="text-emerald-300 mx-auto" size={22} />
              <div className="mt-2 text-xs font-semibold">{action.title}</div>
            </button>
          ))}
        </div>

        {/* Recent Searches / Suggestions */}
        <div className="mb-4">
          <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-2">
            {isAr ? "المقترحات" : "Suggestions"}
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              isAr ? "فضل سورة الملك" : "Virtue of Surah Al-Mulk",
              isAr ? "تفسير آية الكرسي" : "Tafsir of Ayat Al-Kursi",
              isAr ? "قصص الأنبياء" : "Stories of Prophets",
              isAr ? "أحكام التجويد" : "Tajweed Rules",
            ].map((suggestion, index) => (
              <button key={index} onClick={() => setSearchValue(suggestion)} className="px-3 py-2 rounded-full bg-white/10 border border-white/10 text-xs">
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
