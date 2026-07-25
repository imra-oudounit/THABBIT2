import { useState } from "react";
import { Icon } from "../components/Icon";
import { Owl } from "../components/Owl";
import { useLanguage } from "../i18n/LanguageContext";

const sources = [
  { id: 1, source: "Tafsir Ibn Kathir", surah: "Yaseen", ayah: "36:2", book: "Ibn Kathir", volume: "Vol. 6", page: "p. 574", excerpt: "Allah swears by the Wise Quran — its words are perfectly placed, its meanings are precise, and its commands are filled with wisdom for all of mankind." },
  { id: 2, source: "Tafsir Al-Tabari", surah: "Yaseen", ayah: "36:2", book: "Al-Tabari", volume: "Vol. 20", page: "p. 12", excerpt: "The Wise Quran refers to its firm and precise wording, free of contradiction or confusion." },
];

export function WordByWordScreen({ onBack }: { onBack?: () => void } = {}) {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  const isFr = locale === "fr";
  const [expandedSource, setExpandedSource] = useState<number | null>(null);
  const [showTafsirMode, setShowTafsirMode] = useState(true);

  const suggestions = [
    isAr ? "اشرح هذه الآية" : isFr ? "Explique ce verset" : "Explain this verse",
    isAr ? "قارن التفاسير" : isFr ? "Comparer les tafsirs" : "Compare tafsirs",
    isAr ? "معنى هذه الكلمة" : isFr ? "Signification de ce mot" : "Meaning of this word",
    isAr ? "سبب النزول" : isFr ? "Raison de la révélation" : "Reason of revelation",
  ];

  return (
    <div className="h-full w-full bg-[#fafafa] relative overflow-hidden flex flex-col" dir={isAr ? "rtl" : "ltr"}>
      <div className="flex-1 overflow-y-auto phone-scroll pb-28">
        <div className="px-5 pt-10 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0">
              <Icon name="arrow_back" className="text-slate-700" size={20} />
            </button>
            <div>
              <div className="text-base font-bold text-slate-900">
                THABBIT Companion <span className="text-gold-gradient">✨</span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {isAr
                  ? "اسأل عن القرآن والتفسير"
                  : isFr
                    ? "Posez vos questions sur le Coran et le Tafsir"
                    : "Ask anything about the Quran & Tafsir"}
              </div>
            </div>
          </div>
        </div>

        {/* Empty / welcome state */}
        <div className="mx-5 mt-6 rounded-[28px] bg-white border border-slate-100 shadow-sm p-6 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-emerald-50" />
          <Owl size={98} mood="happy" className="floaty relative" />
          <div className="relative mt-3 text-lg font-bold text-slate-900">
            السلام عليكم 🌿
          </div>
          <p className="relative mt-2 text-sm text-slate-500 max-w-[260px] leading-relaxed mx-auto">
            {isAr
              ? "كيف يمكنني مساعدتك في فهم القرآن اليوم؟"
              : isFr
                ? "Comment puis-je vous aider à comprendre le Coran aujourd'hui ?"
                : "How can I help you understand the Quran today?"}
          </p>
        </div>

        {/* Suggestion chips */}
        <div className="mx-5 mt-4">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((chip) => (
              <button key={chip} className="px-3.5 h-9 rounded-full bg-white border border-slate-200 text-[11px] font-semibold text-slate-700">
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation area */}
        <div className="mx-5 mt-5 space-y-4">
          {/* User bubble */}
          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-brand-gradient text-white px-4 py-3">
              <p className="text-sm leading-relaxed" dir="rtl">
                {isAr
                  ? "اشرح لي معنى قوله تعالى: ﴿وَالْقُرْآنِ الْحَكِيمِ﴾"
                  : isFr
                    ? "Explique-moi le sens de : وَالْقُرْآنِ الْحَكِيمِ"
                    : "Explain the meaning of: وَالْقُرْآنِ الْحَكِيمِ"}
              </p>
              <p className="text-[10px] text-white/70 mt-1">09:41</p>
            </div>
          </div>

          {/* Assistant bubble/card */}
          <div className="rounded-[28px] bg-white border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 pt-5 pb-4">
              <div className="text-xs font-bold text-emerald-700">THABBIT Companion</div>
              <p className="mt-2 text-sm text-slate-700 leading-relaxed" dir="rtl">
                {isAr
                  ? "الآية تشير إلى عظمة القرآن وكمال حكمته. وصف القرآن بالحكيم يدل على إحكام ألفاظه، وصدق معانيه، وأنه مشتمل على الهدى والرحمة والأحكام النافعة للناس."
                  : isFr
                    ? "Ce verset met en évidence la grandeur du Coran et la perfection de sa sagesse. Le qualificatif « sage » indique la précision de ses mots, la véracité de ses sens et la guidance qu'il contient."
                    : "This verse highlights the greatness of the Qur'an and the perfection of its wisdom. Describing the Qur'an as Wise points to the precision of its wording, the truthfulness of its meanings, and the guidance it contains."}
              </p>
              <p className="text-[10px] text-slate-400 mt-2">09:42</p>
            </div>

            {/* Trusted Sources */}
            <div className="px-5 pb-4">
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
                {isAr ? "المصادر الموثوقة" : isFr ? "Sources fiables" : "Trusted Sources"}
              </div>
              <div className="space-y-2">
                {sources.map((source) => {
                  const expanded = expandedSource === source.id;
                  return (
                    <div key={source.id} className="rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden">
                      <button
                        onClick={() => setExpandedSource(expanded ? null : source.id)}
                        className="w-full flex items-center justify-between px-4 py-3"
                      >
                        <span className="text-xs font-semibold text-slate-800">{source.source}</span>
                        <Icon name={expanded ? "expand_less" : "expand_more"} size={16} className="text-slate-400" />
                      </button>
                      {expanded && (
                        <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed">
                          <p>{source.excerpt}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Tafsir Mode */}
        <div className="mx-5 mt-6 rounded-[28px] bg-white border border-slate-100 shadow-sm overflow-hidden">
          <button onClick={() => setShowTafsirMode(!showTafsirMode)} className="w-full px-5 pt-5 pb-4 flex items-center justify-between">
            <div className="text-sm font-bold text-slate-900">
              {isAr ? "وضع التفسير" : isFr ? "Mode Tafsir" : "Tafsir Mode"}
            </div>
            <div className="text-[10px] text-slate-400">
              {isAr ? "عند البحث عن آية" : isFr ? "Lors de la recherche d'un verset" : "When searching a verse"}
            </div>
          </button>

          {showTafsirMode && (
            <div className="px-5 pb-5">
              {/* Verse card */}
              <div className="rounded-[24px] bg-brand-soft p-4 border border-emerald-100">
                <div className="text-[10px] uppercase tracking-widest text-emerald-700 font-semibold">
                  {isAr ? "الآية المختارة" : isFr ? "Verset sélectionné" : "Selected Verse"}
                </div>
                <div className="mt-2 font-quran text-xl text-emerald-900 text-right" dir="rtl">
                  وَالْقُرْآنِ الْحَكِيمِ
                </div>
              </div>

              {/* Sources counter */}
              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs font-semibold text-slate-700">
                  {isAr ? "٤ مصادر" : isFr ? "4 sources" : "4 Sources"}
                </div>
                <div className="text-[10px] text-emerald-700 font-semibold">
                  {isAr ? "موثقة" : isFr ? "Authentifiées" : "Verified"}
                </div>
              </div>

              {/* Filter chips */}
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  isAr ? "الكل" : isFr ? "Tous" : "All",
                  "Ibn Kathir",
                  "Al-Tabari",
                  "Al-Sa'di",
                  "Al-Qurtubi",
                ].map((chip, i) => (
                  <button key={chip} className={`px-3 h-7 rounded-full text-[10px] font-semibold ${i === 0 ? "bg-brand-gradient text-white" : "bg-slate-100 text-slate-600"}`}>
                    {chip}
                  </button>
                ))}
              </div>

              {/* Scrollable tafsir cards */}
              <div className="mt-4 space-y-3">
                {sources.map((source) => (
                  <div key={`tafsir-${source.id}`} className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-xs font-bold text-slate-800">{source.source}</div>
                      <div className="text-[10px] text-slate-400">{source.surah} · {source.ayah}</div>
                    </div>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      {source.excerpt}
                    </p>
                    <p className="mt-2 text-[10px] text-slate-400">
                      {isAr ? "مرجع" : isFr ? "Référence" : "Reference"}: {source.book} · {source.volume} · {source.page}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating chat input */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-2 z-40 bg-gradient-to-t from-[#fafafa] via-[#fafafa]/95 to-transparent">
        <div className="flex items-center gap-2 bg-white rounded-2xl shadow-md px-4 py-2.5 border border-slate-100">
          <Icon name="mic" size={20} className="text-slate-400" />
          <input
            placeholder={
              isAr
                ? "اكتب سؤالك عن القرآن أو التفسير..."
                : isFr
                  ? "Écrivez votre question sur le Coran ou le Tafsir..."
                  : "Ask about the Quran or Tafsir..."
            }
            className="flex-1 bg-transparent outline-none text-sm text-right font-arabic text-slate-700"
            dir="rtl"
          />
          <button className="w-9 h-9 rounded-full bg-brand-gradient flex items-center justify-center shrink-0">
            <Icon name="arrow_forward" size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}


