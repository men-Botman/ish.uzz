import { BriefcaseBusiness, MapPin, Phone } from "lucide-react";

import type { WorkerProfile } from "@/types";

type ResumeCardProps = {
  profile: WorkerProfile;
  onSelect: (profile: WorkerProfile) => void;
};

export function ResumeCard({ profile, onSelect }: ResumeCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-base font-bold text-sky-700">
            {profile.fullName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">{profile.fullName}</h3>
            <p className="text-sm text-slate-600">{profile.profession}</p>
          </div>
        </div>
        <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
          {profile.isAvailableForHire ? "Aktiv" : "Band"}
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-sky-500" />
          {profile.city}
        </div>
        <div className="flex items-center gap-2">
          <BriefcaseBusiness className="h-4 w-4 text-sky-500" />
          {profile.expectedSalary ? `${profile.expectedSalary.toLocaleString()} ${profile.currency}` : "Kelishuv asosida"}
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-sky-500" />
          {profile.phone}
        </div>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{profile.bio}</p>

      <button
        type="button"
        onClick={() => onSelect(profile)}
        className="mt-5 w-full rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
      >
        Rezyumeni ko&apos;rish
      </button>
    </article>
  );
}
