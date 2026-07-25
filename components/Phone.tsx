import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  label?: string;
  caption?: string;
  dark?: boolean;
};

export function Phone({ children, label, caption, dark }: Props) {
  return (
    <div className="flex flex-col items-center gap-4 shrink-0">
      <div className="phone-frame">
        <div
          className="phone-screen phone-scroll relative"
          style={{
            width: 340,
            height: 720,
            background: dark ? "#0f172a" : "#fafafa",
            overflowY: "auto",
          }}
        >
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50" />
          {children}
        </div>
      </div>
      {label && (
        <div className="text-center">
          <div className="text-sm font-semibold text-slate-800">{label}</div>
          {caption && <div className="text-xs text-slate-500 mt-0.5">{caption}</div>}
        </div>
      )}
    </div>
  );
}


