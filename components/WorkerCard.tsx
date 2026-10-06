'use client';

import { BriefcaseBusiness, MapPin, Phone, Star } from "lucide-react";

import type { WorkerProfile } from "@/types";

type WorkerCardProps = {
  worker: WorkerProfile;
  onSelect: (worker: WorkerProfile) => void;
};

export function WorkerCard({ worker, onSelect }: WorkerCardProps) {
  return (
    <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-base font-bold text-sky-700">
            {worker.fullName
              .split(" ")
              .slice(0, 2)
              .map((part) => part[0])
              .join("")
              .toUpperCase()}
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">{worker.fullName}</h3>
            <p className="text-sm text-slate-600">{worker.profession}</p>
          </div>
        </div>

        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${worker.isAvailableForHire ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
          {worker.isAvailableForHire ? "Mavjud" : "Band"}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {worker.skills.slice(0, 4).map((skill) => (
          <span key={skill} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <BriefcaseBusiness className="h-4 w-4 text-sky-500" />
          Tajriba: {worker.experienceYears} yil
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-sky-500" />
          {worker.city}
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-sky-500" />
          +998 XX XXX XX XX
        </div>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{worker.bio}</p>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-200 pt-4">
        <div className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
          <Star className="h-4 w-4" />
          {worker.expectedSalary ? `${worker.expectedSalary.toLocaleString()} ${worker.currency}` : "Kelishuv asosida"}
        </div>

        <button
          type="button"
          onClick={() => onSelect(worker)}
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Ish taklif qilish
        </button>
      </div>
    </article>
  );
}
