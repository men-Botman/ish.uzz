import { BriefcaseBusiness, CircleDollarSign, MapPin } from "lucide-react";

import type { JobPosting } from "@/types";

type JobCardProps = {
  job: JobPosting;
  onSelect: (job: JobPosting) => void;
};

export function JobCard({ job, onSelect }: JobCardProps) {
  const salaryText =
    job.salaryFrom || job.salaryTo
      ? `${job.salaryFrom ? `${job.salaryFrom.toLocaleString()} ${job.currency}` : "-"} — ${job.salaryTo ? `${job.salaryTo.toLocaleString()} ${job.currency}` : "-"}`
      : "Kelishuv asosida";

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-base font-bold text-red-600">
            {job.companyName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">{job.companyName}</p>
            <h3 className="mt-1 text-xl font-bold text-slate-900">{job.title}</h3>
          </div>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          Yangi
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
          <MapPin className="h-4 w-4 text-red-500" />
          {job.city}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
          <BriefcaseBusiness className="h-4 w-4 text-red-500" />
          To&apos;liq vaqt
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
          <CircleDollarSign className="h-4 w-4 text-red-500" />
          {salaryText}
        </span>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{job.description}</p>

      <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Yaratildi</p>
          <p className="mt-1 text-sm font-medium text-slate-700">{new Date(job.createdAt).toLocaleDateString("uz-UZ")}</p>
        </div>
        <button
          type="button"
          onClick={() => onSelect(job)}
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Batafsil
        </button>
      </div>
    </article>
  );
}
