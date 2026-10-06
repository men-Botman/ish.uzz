import { Building2, MapPin, UserRound } from "lucide-react";

import type { SearchMode } from "@/types";

type HeaderProps = {
  mode: SearchMode;
  onModeChange: (mode: SearchMode) => void;
  onPostJob: () => void;
};

export function Header({ mode, onModeChange, onPostJob }: HeaderProps) {
  return (
    <header className="bg-slate-900 text-white shadow-[0_12px_30px_rgba(15,23,42,0.2)]">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 lg:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-lg font-black shadow-lg shadow-red-500/30">
            D
          </div>
          <div>
            <div className="text-xl font-black tracking-tight">domla</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400">
              job platform
            </div>
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-3 py-2 text-sm text-slate-200 md:flex">
          <MapPin className="h-4 w-4 text-red-400" />
          <span>Toshkent</span>
        </div>

        <div className="ml-auto hidden items-center gap-1 rounded-full bg-slate-800 p-1 md:flex">
          <button
            type="button"
            onClick={() => onModeChange("candidate")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              mode === "candidate"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Ish qidiryapman
          </button>
          <button
            type="button"
            onClick={() => onModeChange("employer")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              mode === "employer"
                ? "bg-red-600 text-white shadow-sm shadow-red-600/30"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Ish beruvchiman
          </button>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-slate-200 lg:flex">
          <a href="#jobs" className="transition hover:text-white">
            Vakansiyalar
          </a>
          <a href="#workers" className="transition hover:text-white">
            Ishchilar / Rezyumelar
          </a>
          <a href="#companies" className="transition hover:text-white">
            Kompaniyalar
          </a>
          <button type="button" onClick={onPostJob} className="transition hover:text-white">
            E&apos;lon joylashtirish
          </button>
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <button
            type="button"
            className="hidden items-center gap-2 rounded-full border border-slate-700 px-3 py-2 text-sm text-slate-200 transition hover:border-slate-500 hover:text-white sm:flex"
          >
            <UserRound className="h-4 w-4" />
            Tizimga kirish
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500 lg:hidden"
            onClick={onPostJob}
          >
            <Building2 className="mr-2 h-4 w-4" />
            E&apos;lon
          </button>
        </div>
      </div>
    </header>
  );
}
