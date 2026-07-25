import { useUserProfile } from "../hooks/useUserProfile";
import { Owl } from "../components/Owl";
import { Icon } from "../components/Icon";
import { ProfileMenu } from "../components/ProfileMenu";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { useState } from "react";
import { logout } from "../services/authService";

interface HomeScreenProps {
  onOpenProfile: () => void;
  onOpenSettings: () => void;
}

export function HomeScreen({ onOpenProfile, onOpenSettings }: HomeScreenProps) {
  const { profile, loading } = useUserProfile();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signOutOpen, setSignOutOpen] = useState(false);

  const displayName = profile.displayName || (profile.isAnonymous ? "زائر" : "مستخدم");
  const firstName = displayName.split(" ")[0];

  const streak = profile.streak ?? 0;
  const goalTotal = profile.dailyGoalVerses || 3;
  const goalDone = profile.dailyGoalCompleted || 0;
  const goalPct = goalTotal > 0 ? Math.min(100, Math.round((goalDone / goalTotal) * 100)) : 0;
  const goalRemaining = Math.max(0, goalTotal - goalDone);

  const reviewTotal = profile.dailyReviewGoal || 5;
  const reviewDone = profile.dailyReviewCompleted || 0;
  const reviewPct = reviewTotal > 0 ? Math.min(100, Math.round((reviewDone / reviewTotal) * 100)) : 0;

  const totalMinutes = profile.totalMinutesToday || 0;
  const totalVersesMemorized = profile.totalVersesMemorized || 0;
  const memPct = profile.memorizationProgress || 0;

  const lastSurah = profile.lastSurah || "سورة الملك";
  const lastVerse =
    profile.lastVerse ||
    "إِنَّ الَّذِينَ يَخْشَوْنَ رَبَّهُم بِالْغَيْبِ لَهُم مَّغْفِرَةٌ وَأَجْرٌ كَبِيرٌ";

  const recentActivity = profile.recentActivity?.length
    ? profile.recentActivity
    : [
        { label: "حفظ 3 آيات من سورة الملك", time: "قبل ساعة", icon: "auto_stories" },
        { label: "مراجعة سورة يس", time: "اليوم", icon: "replay" },
        { label: "اختبار سريع", time: "أمس", icon: "psychology" },
      ];

  if (loading) {
    return (
      <div className="h-full w-full bg-[#FAF8F5] flex items-center justify-center">
        <div className="text-center">
          <Owl size={80} mood="thinking" />
          <div className="mt-4 text-xs text-slate-500 font-arabic">جاري التحميل...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-[#FAF8F5] relative overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto phone-scroll pb-24">
        <div className="px-5 pt-12 pb-6">
          {/* 1. Welcome + Streak + Sign Out */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-500 font-arabic tracking-wide">صباح الخير</div>
              <h1 className="text-[26px] leading-tight font-bold text-slate-900 font-arabic mt-1">{firstName}</h1>
              {profile.isAnonymous && (
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-arabic mt-1.5 inline-block">وضع الزائر</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {streak > 0 && (
                <div className="h-10 px-3 rounded-2xl bg-gold-gradient shadow-sm shadow-amber-500/20 flex items-center gap-1.5">
                  <Icon name="local_fire_department" className="text-white" size={16} filled />
                  <span className="text-xs font-bold text-white">{streak}</span>
                </div>
              )}
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="w-12 h-12 rounded-full bg-white ring-1 ring-emerald-100 shadow-card flex items-center justify-center cursor-pointer active:scale-95 transition"
                >
                  {profile.photoURL ? (
                    <img src={profile.photoURL} alt="" className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <Owl size={36} mood="happy" />
                  )}
                </button>
                <ProfileMenu
                  open={menuOpen}
                  onClose={() => setMenuOpen(false)}
                  onProfile={() => onOpenProfile()}
                  onSettings={() => onOpenSettings()}
                  onSignOut={() => setSignOutOpen(true)}
                />
              </div>
            </div>
          </div>

          {/* 2. Daily Progress Card */}
          <div className="mt-7 rounded-[28px] bg-brand-gradient p-6 text-white shadow-xl shadow-emerald-900/25 relative overflow-hidden thabbit-surface">
            <div className="absolute -top-12 -right-10 w-40 h-40 rounded-full bg-white/8 blur-3xl" />
            <div className="absolute -bottom-14 -left-8 w-32 h-32 rounded-full bg-[#C8A24B]/15 blur-3xl" />
            <div className="relative flex items-center justify-between">
              <div>
                <div className="text-[11px] text-emerald-100/80 font-arabic tracking-wide">تقدم اليوم</div>
                <div className="mt-1.5 text-[26px] leading-none font-bold">{totalMinutes} <span className="text-sm font-medium text-emerald-100/70 font-arabic">دقيقة</span></div>
                <div className="mt-2 text-[11px] text-emerald-100/75 font-arabic">
                  {totalVersesMemorized > 0
                    ? `تم حفظ ${totalVersesMemorized} آيات`
                    : "ابدأ جلسة الحفظ الأولى"}
                </div>
              </div>
              <div className="relative w-[68px] h-[68px]">
                <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                  <circle cx="32" cy="32" r="26" stroke="rgba(255,255,255,0.16)" strokeWidth="4.5" fill="none" />
                  <circle
                    cx="32" cy="32" r="26" stroke="#C8A24B" strokeWidth="4.5" fill="none"
                    strokeDasharray={`${2 * Math.PI * 26}`}
                    strokeDashoffset={`${2 * Math.PI * 26 * (1 - memPct / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">{memPct}%</div>
              </div>
            </div>
          </div>

          {/* 4. Memorization Goal */}
          <div className="mt-5 rounded-[24px] bg-white p-5 border border-slate-100 shadow-card">
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-sm font-bold text-slate-900 font-arabic flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <Icon name="flag" size={14} className="text-emerald-700" filled />
                </span>
                هدف الحفظ
              </span>
              <span className="text-xs font-semibold text-slate-500 font-arabic">
                {goalDone} / {goalTotal} آيات
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-brand-gradient rounded-full transition-all" style={{ width: `${goalPct}%` }} />
            </div>
            <div className="mt-2.5 text-[11px] text-slate-500 font-arabic">
              {goalRemaining > 0
                ? `${goalRemaining === 1 ? "آية واحدة متبقية" : goalRemaining === 2 ? "آيتان متبقيتان" : `${goalRemaining} آيات متبقية`} لإكمال هدف اليوم`
                : "أحسنت! أكملت هدف الحفظ اليوم 🎉"}
            </div>
          </div>

          {/* 5. Review Goal */}
          <div className="mt-3.5 rounded-[24px] bg-white p-5 border border-slate-100 shadow-card">
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-sm font-bold text-slate-900 font-arabic flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Icon name="replay" size={14} className="text-amber-600" filled />
                </span>
                هدف المراجعة
              </span>
              <span className="text-xs font-semibold text-slate-500 font-arabic">
                {reviewDone} / {reviewTotal} آيات
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gold-gradient rounded-full transition-all" style={{ width: `${reviewPct}%` }} />
            </div>
          </div>

          {/* 6. Continue Last Session */}
          <div className="mt-6 rounded-[24px] bg-white p-5 border border-slate-100 shadow-card relative overflow-hidden">
            <div className="absolute top-0 bottom-0 right-0 w-1 bg-brand-gradient" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold text-slate-500 font-arabic tracking-wide flex items-center gap-1.5">
                <Icon name="history" size={14} className="text-slate-400" /> تابع من حيث توقفت
              </span>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-arabic font-semibold">{lastSurah}</span>
            </div>
            <div className="font-quran text-lg text-right text-slate-800 leading-loose" dir="rtl">
              {lastVerse}
            </div>
          </div>

          {/* 7. Recent Activity */}
          <div className="mt-7">
            <span className="text-[11px] font-bold text-slate-500 font-arabic mb-3 tracking-wide flex items-center gap-2">
              <Icon name="schedule" size={14} className="text-slate-400" /> النشاط الأخير
            </span>
            <div className="space-y-2">
              {recentActivity.map((item, i) => (
                <div className="rounded-2xl bg-white p-3.5 border border-slate-100 shadow-xs flex items-center gap-3 transition hover:shadow-card-hover" key={i}>
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                    <Icon name={item.icon} className="text-emerald-700" size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-slate-800 font-arabic truncate">{item.label}</div>
                    <div className="text-[10px] text-slate-400 font-arabic mt-0.5">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 8. Quick Stats Summary */}
          <div className="mt-6 grid grid-cols-3 gap-2.5">
            <div className="rounded-2xl bg-white border border-slate-100 shadow-xs p-3.5 text-center">
              <Icon name="menu_book" className="text-emerald-700 mx-auto" size={18} />
              <div className="mt-1.5 text-base font-bold text-slate-900">{totalVersesMemorized}</div>
              <div className="text-[10px] text-slate-500 font-arabic mt-0.5">آيات محفوظة</div>
            </div>
            <div className="rounded-2xl bg-white border border-slate-100 shadow-xs p-3.5 text-center">
              <Icon name="local_fire_department" className="text-amber-500 mx-auto" size={18} />
              <div className="mt-1.5 text-base font-bold text-slate-900">{streak}</div>
              <div className="text-[10px] text-slate-500 font-arabic mt-0.5">يوم متواصل</div>
            </div>
            <div className="rounded-2xl bg-white border border-slate-100 shadow-xs p-3.5 text-center">
              <Icon name="schedule" className="text-emerald-700 mx-auto" size={18} />
              <div className="mt-1.5 text-base font-bold text-slate-900">{totalMinutes}</div>
              <div className="text-[10px] text-slate-500 font-arabic mt-0.5">دقيقة اليوم</div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={signOutOpen}
        title="تسجيل الخروج"
        message="هل أنت متأكد أنك تريد تسجيل الخروج؟"
        confirmLabel="تسجيل الخروج"
        onCancel={() => setSignOutOpen(false)}
        onConfirm={async () => { setSignOutOpen(false); await logout(); }}
      />
    </div>
  );
}
