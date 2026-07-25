import { useEffect, useState } from "react";
import { Owl } from "../../components/Owl";
import { Icon } from "../../components/Icon";
import type { AuthRoute } from "../../core/routing";
import {
  loginWithEmail,
  loginWithGoogle,
  registerWithEmail,
  sendOTP,
  sendPasswordReset,
  signInAsGuest,
} from "../../services/authService";

type AuthView = AuthRoute;

function authErrorMessage(e: unknown): string {
  const msg = e instanceof Error ? e.message : String(e);
  return msg || "Something went wrong. Please try again.";
}

// ─── Welcome Screen ────────────────────────────────────────────────────
export function WelcomeAuthScreen({ onNavigate, configured }: { onNavigate: (v: AuthView) => void; configured?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGuest() {
    setLoading(true);
    setError("");
    try {
      await signInAsGuest();
    } catch (e) {
      setError(authErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-full w-full bg-mesh relative flex flex-col items-center justify-between py-10 px-6">
      <div />
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-400/15 blur-3xl rounded-full" />
          <Owl size={160} className="relative floaty" mood="happy" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-slate-900 font-display tracking-tight">Thabbit</h1>
        <p className="mt-2 text-sm text-slate-600 font-arabic text-center">رفيقك اليومي لحفظ القرآن ومراجعته.</p>
        <p className="mt-1 text-xs text-slate-400 font-display text-center max-w-[280px]">
          Your Daily Companion for Quran Memorization and Review.
        </p>
        {error && <p className="mt-3 text-xs text-red-600 text-center">{error}</p>}
      </div>
      <div className="w-full space-y-3">
        <button
          onClick={() => onNavigate("login")}
          className="w-full h-14 rounded-2xl bg-brand-gradient text-white font-semibold text-lg flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 font-display"
        >
          <Icon name="arrow_forward" size={20} /> Sign In
        </button>
        <button
          onClick={() => onNavigate("register")}
          className="w-full h-14 rounded-2xl bg-white border border-slate-200 text-slate-900 font-semibold text-lg flex items-center justify-center shadow-sm font-display"
        >
          Create Account
        </button>
        <div className="text-center text-xs text-slate-400 font-display uppercase tracking-wider my-2">or continue with</div>
        <div className="flex gap-3">
          <button onClick={handleGuest} disabled={loading} className="flex-1 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm">
            <Icon name="person" size={24} className="text-slate-500" />
          </button>
          <button onClick={() => onNavigate("phone-input")} className="flex-1 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm">
            <Icon name="phone" size={24} className="text-emerald-600" />
          </button>
          <button
            onClick={async () => {
              setLoading(true);
              try { await loginWithGoogle(); } catch (e) { setError(authErrorMessage(e)); } finally { setLoading(false); }
            }}
            className="flex-1 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm"
          >
            <span className="font-bold text-lg text-slate-700">G</span>
          </button>
        </div>
        {configured === false && (
          <p className="text-center text-[10px] text-amber-600 pt-2">Firebase is not configured.</p>
        )}
      </div>
    </div>
  );
}

// ─── Sign In Screen ──────────────────────────────────────────────────
export function SignInAuthScreen({ onNavigate }: { onNavigate: (v: AuthView) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGoogle() {
    setLoading(true); setError("");
    try { await loginWithGoogle(); } catch (e) { setError(authErrorMessage(e)); } finally { setLoading(false); }
  }
  async function handleGuest() {
    setLoading(true); setError("");
    try { await signInAsGuest(); } catch (e) { setError(authErrorMessage(e)); } finally { setLoading(false); }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) { setError("Please fill in all fields."); return; }
    setLoading(true); setError("");
    try {
      await loginWithEmail(email, password);
      // onAuthStateChanged handles navigation
    } catch (err) { setError(authErrorMessage(err)); } finally { setLoading(false); }
  }

  return (
    <div className="h-full w-full bg-mesh relative overflow-y-auto phone-scroll">
      <div className="px-7 pt-10">
        <button onClick={() => onNavigate("welcome")} className="w-11 h-11 rounded-2xl glass flex items-center justify-center">
          <Icon name="arrow_back" className="text-slate-700" size={20} />
        </button>
      </div>

      <div className="px-7 mt-6 flex items-center gap-3">
        <Owl size={48} />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-xs text-slate-500">Sign in to continue your journey</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-7 mt-8 space-y-4 pb-10">
        {error && <div className="text-xs text-red-600 bg-red-50 rounded-xl px-3 py-2">{error}</div>}
        <div>
          <label className="text-xs font-semibold text-slate-500 ml-1">Email</label>
          <div className="mt-1.5 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center px-4 gap-3">
            <Icon name="mail" className="text-slate-400" size={20} />
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="yusuf@thabbit.app"
              className="min-w-0 flex-1 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400" autoComplete="email"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 ml-1">Password</label>
          <div className="mt-1.5 h-14 rounded-2xl bg-white shadow-sm border border-emerald-200 ring-2 ring-emerald-100 flex items-center px-4 gap-3">
            <Icon name="lock" className="text-emerald-600" size={20} />
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
              className="min-w-0 flex-1 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400" autoComplete="current-password"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs text-slate-600">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="hidden" />
            <span className="w-5 h-5 rounded-md bg-brand-gradient flex items-center justify-center">
              <Icon name="check" className="text-white" size={14} />
            </span>
            Remember me
          </label>
          <button type="button" onClick={() => onNavigate("forgot")} className="text-xs font-semibold text-emerald-700">Forgot?</button>
        </div>

        <button type="submit" disabled={loading} className="w-full h-14 rounded-2xl bg-brand-gradient text-white font-semibold shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2">
          Sign In
          <Icon name="arrow_forward" size={20} />
        </button>

        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-[10px] uppercase tracking-widest text-slate-400">or continue with</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button type="button" onClick={handleGuest} className="h-14 rounded-2xl neu flex items-center justify-center">
            <Icon name="person" className="text-emerald-700" size={26} />
          </button>
          <button type="button" onClick={handleGoogle} className="h-14 rounded-2xl neu flex items-center justify-center">
            <span className="text-lg font-bold">G</span>
          </button>
          <button type="button" onClick={() => onNavigate("phone-input")} className="h-14 rounded-2xl neu flex items-center justify-center">
            <Icon name="phone" className="text-emerald-700" size={22} />
          </button>
        </div>

        <p className="text-center text-xs text-slate-500 pt-3">
          New to Thabbit? <button type="button" onClick={() => onNavigate("register")} className="font-semibold text-emerald-700">Create account</button>
        </p>
      </form>
    </div>
  );
}

// ─── Register Screen ─────────────────────────────────────────────────
export function RegisterAuthScreen({ onNavigate }: { onNavigate: (v: AuthView) => void }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim()) { setError("Please enter your name."); return; }
    if (!email.trim()) { setError("Please enter your email."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (password !== confirmPw) { setError("Passwords do not match."); return; }
    setLoading(true); setError(""); setSuccess("");
    try {
      await registerWithEmail(fullName, email, password);
      setSuccess("Account created! A verification email has been sent to " + email + ". Please check your inbox.");
      // onAuthStateChanged will auto-login the user
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-full w-full bg-mesh relative overflow-y-auto phone-scroll">
      <div className="px-7 pt-10">
        <button onClick={() => onNavigate("welcome")} className="w-11 h-11 rounded-2xl glass flex items-center justify-center">
          <Icon name="arrow_back" className="text-slate-700" size={20} />
        </button>
      </div>
      <div className="px-7 mt-6">
        <h1 className="text-2xl font-bold text-slate-900">Create account</h1>
        <p className="text-xs text-slate-500 mt-1">Start your memorization journey with Thabbit.</p>
      </div>
      <form onSubmit={handleSubmit} className="px-7 mt-8 space-y-4 pb-10">
        {success && <div className="text-xs text-emerald-700 bg-emerald-50 rounded-xl px-3 py-2">{success}</div>}
        {error && <div className="text-xs text-red-600 bg-red-50 rounded-xl px-3 py-2">{error}</div>}
        <div className="h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center px-4 gap-3">
          <Icon name="person" className="text-slate-400" size={20} />
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full name" className="min-w-0 flex-1 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400" />
        </div>
        <div className="h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center px-4 gap-3">
          <Icon name="mail" className="text-slate-400" size={20} />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="min-w-0 flex-1 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400" />
        </div>
        <div className="h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center px-4 gap-3">
          <Icon name="lock" className="text-slate-400" size={20} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="min-w-0 flex-1 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400" />
        </div>
        <div className="h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center px-4 gap-3">
          <Icon name="lock" className="text-slate-400" size={20} />
          <input type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} placeholder="Confirm password" className="min-w-0 flex-1 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400" />
        </div>
        <button type="submit" disabled={loading} className="w-full h-14 rounded-2xl bg-brand-gradient text-white font-semibold shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2">
          Create Account
          <Icon name="arrow_forward" size={20} />
        </button>
        <p className="text-center text-xs text-slate-500 pt-3">
          Already have an account? <button type="button" onClick={() => onNavigate("login")} className="font-semibold text-emerald-700">Sign in</button>
        </p>
      </form>
    </div>
  );
}

// ─── Forgot Password Screen ─────────────────────────────────────────
export function ForgotPasswordScreen({ onNavigate }: { onNavigate: (v: AuthView) => void }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) { setError("Please enter your email address."); return; }
    setError(""); setMsg(""); setLoading(true);
    try {
      await sendPasswordReset(email);
      setMsg("Password reset email sent to " + email + ". Check your inbox and spam folder.");
    } catch (err) { setError(authErrorMessage(err)); } finally { setLoading(false); }
  }

  return (
    <div className="h-full w-full bg-mesh relative overflow-y-auto phone-scroll">
      <div className="px-7 pt-10">
        <button onClick={() => onNavigate("login")} className="w-11 h-11 rounded-2xl glass flex items-center justify-center">
          <Icon name="arrow_back" className="text-slate-700" size={20} />
        </button>
      </div>
      <div className="px-7 mt-6">
        <Icon name="lock_reset" className="text-emerald-700" size={36} />
        <h1 className="text-2xl font-bold text-slate-900 mt-3">Forgot password?</h1>
        <p className="text-xs text-slate-500 mt-1">Enter your email and we'll send a reset link.</p>
      </div>
      <form onSubmit={handleSubmit} className="px-7 mt-8 space-y-4">
        {msg && <div className="text-xs text-emerald-700 bg-emerald-50 rounded-xl px-3 py-2">{msg}</div>}
        {error && <div className="text-xs text-red-600 bg-red-50 rounded-xl px-3 py-2">{error}</div>}
        <div className="h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center px-4 gap-3">
          <Icon name="mail" className="text-slate-400" size={20} />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="min-w-0 flex-1 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400" />
        </div>
        <button type="submit" disabled={loading} className="w-full h-14 rounded-2xl bg-brand-gradient text-white font-semibold shadow-lg shadow-emerald-600/30">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

// ─── Phone Login Screen ──────────────────────────────────────────────
export function PhoneLoginScreen({
  onNavigate, onSetConfirmationResult, onSetPhoneNumber,
}: {
  onNavigate: (v: AuthView) => void; onSetConfirmationResult: (r: any) => void; onSetPhoneNumber: (n: string) => void;
}) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!document.getElementById("recaptcha-container")) {
      const div = document.createElement("div");
      div.id = "recaptcha-container"; div.style.position = "absolute"; div.style.bottom = "0"; div.style.visibility = "hidden";
      document.body.appendChild(div);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phoneNumber.trim()) { setError("Please enter your phone number."); return; }
    setLoading(true); setError("");
    try {
      const formatted = phoneNumber.startsWith("+") ? phoneNumber : `+966${phoneNumber.replace(/^0+/, "")}`;
      const result = await sendOTP(formatted, "recaptcha-container");
      onSetConfirmationResult(result); onSetPhoneNumber(formatted); onNavigate("otp-verify");
    } catch (err) { setError(authErrorMessage(err)); } finally { setLoading(false); }
  }

  return (
    <div className="h-full w-full bg-mesh relative flex flex-col justify-between">
      <div>
        <div className="px-7 pt-6">
          <button onClick={() => onNavigate("welcome")} className="w-11 h-11 rounded-2xl glass flex items-center justify-center">
            <Icon name="arrow_back" className="text-slate-700" size={20} />
          </button>
        </div>
        <div className="px-7 mt-6 flex items-center gap-3">
          <Owl size={44} mood="listen" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Phone Sign In</h1>
            <p className="text-xs text-slate-500">Enter your phone number to continue</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="px-7 mt-8 space-y-4">
          {error && <div className="text-xs text-red-600 bg-red-50 rounded-xl px-3 py-2">{error}</div>}
          <div>
            <label className="text-xs font-semibold text-slate-500 ml-1">Phone Number</label>
            <div className="mt-1.5 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center px-4 gap-3">
              <span className="text-sm font-semibold text-slate-600">+966</span>
              <div className="w-px h-6 bg-slate-200" />
              <input
                value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="5XXXXXXXX"
                className="min-w-0 flex-1 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400" autoComplete="tel"
              />
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full h-14 rounded-2xl bg-brand-gradient text-white font-semibold shadow-lg shadow-emerald-600/30">
            Send Code
          </button>
        </form>
      </div>
      <p className="text-center text-[10px] text-slate-400 font-arabic pb-6">ثبّت — رفيقك اليومي لحفظ القرآن ومراجعته.</p>
    </div>
  );
}

// ─── OTP Verification Screen ─────────────────────────────────────────
export function OTPVerifyScreen({
  onNavigate, confirmationResult, phoneNumber,
}: {
  onNavigate: (v: AuthView) => void; confirmationResult: any; phoneNumber: string;
}) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length !== 6) { setError("Please enter the 6-digit code."); return; }
    setLoading(true); setError("");
    try { await confirmationResult.confirm(otp); } catch (err) { setError(authErrorMessage(err)); } finally { setLoading(false); }
  }

  return (
    <div className="h-full w-full bg-mesh relative flex flex-col justify-between">
      <div>
        <div className="px-7 pt-6">
          <button onClick={() => onNavigate("phone-input")} className="w-11 h-11 rounded-2xl glass flex items-center justify-center">
            <Icon name="arrow_back" className="text-slate-700" size={20} />
          </button>
        </div>
        <div className="px-7 mt-6 flex items-center gap-3">
          <Owl size={44} mood="thinking" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Verification Code</h1>
            <p className="text-xs text-slate-500">Enter the code sent to {phoneNumber}</p>
          </div>
        </div>
        <form onSubmit={handleVerify} className="px-7 mt-8 space-y-4">
          {error && <div className="text-xs text-red-600 bg-red-50 rounded-xl px-3 py-2">{error}</div>}
          <div className="h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center px-4 gap-3">
            <Icon name="password" className="text-slate-400" size={20} />
            <input
              value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="••••••"
              className="min-w-0 flex-1 bg-transparent outline-none text-lg tracking-[0.4em] text-slate-800 placeholder:text-slate-400 text-center"
            />
          </div>
          <button type="submit" disabled={loading} className="w-full h-14 rounded-2xl bg-brand-gradient text-white font-semibold shadow-lg shadow-emerald-600/30">
            Verify & Proceed
          </button>
        </form>
      </div>
      <p className="text-center text-[10px] text-slate-400 font-arabic pb-6">ثبّت — رفيقك اليومي لحفظ القرآن ومراجعته.</p>
    </div>
  );
}
