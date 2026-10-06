'use client';

import { FormEvent, useState } from "react";
import { ArrowRight, MapPin, Phone, X } from "lucide-react";

import type { Currency, JobPosting } from "@/types";

type JobPostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (job: JobPosting) => void;
};

type JobFormState = {
  title: string;
  companyName: string;
  city: string;
  salaryFrom: string;
  salaryTo: string;
  currency: Currency;
  phone: string;
  telegram: string;
  description: string;
};

const defaultForm: JobFormState = {
  title: "",
  companyName: "",
  city: "Toshkent",
  salaryFrom: "",
  salaryTo: "",
  currency: "UZS",
  phone: "",
  telegram: "",
  description: "",
};

export function JobPostModal({ isOpen, onClose, onSubmit }: JobPostModalProps) {
  const [form, setForm] = useState<JobFormState>(defaultForm);
  const [error, setError] = useState<string>("");

  if (!isOpen) {
    return null;
  }

  const handleFieldChange = <K extends keyof JobFormState>(field: K, value: JobFormState[K]) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.title.trim() || !form.companyName.trim() || !form.description.trim()) {
      setError("Lavozim, kompaniya nomi va ish tavsifi majburiy maydonlardir.");
      return;
    }

    const phonePattern = /^\+998\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/;
    if (!phonePattern.test(form.phone.trim())) {
      setError("Telefon raqami formati: +998 XX XXX XX XX bo'lishi kerak.");
      return;
    }

    const parsedSalaryFrom = Number(form.salaryFrom || 0);
    const parsedSalaryTo = Number(form.salaryTo || 0);

    const newJob: JobPosting = {
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
      title: form.title.trim(),
      companyName: form.companyName.trim(),
      city: form.city.trim() || "Toshkent",
      salaryFrom: parsedSalaryFrom > 0 ? parsedSalaryFrom : undefined,
      salaryTo: parsedSalaryTo > 0 ? parsedSalaryTo : undefined,
      currency: form.currency,
      description: form.description.trim(),
      phone: form.phone.trim(),
      telegram: form.telegram.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    onSubmit(newJob);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="w-full max-w-2xl overflow-hidden rounded-[28px] bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">Ish beruvchi</p>
              <h2 className="mt-1 text-2xl font-black text-slate-900">Vakansiya e&apos;lon qilish</h2>
            </div>
            <button
              type="button"
              aria-label="Yopish"
              onClick={onClose}
              className="rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Lavozim</span>
                <input
                  value={form.title}
                  onChange={(event) => handleFieldChange("title", event.target.value)}
                  placeholder="Masalan: Frontend dasturchi"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none transition focus:border-red-400 focus:bg-white"
                />
              </label>

              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Kompaniya nomi</span>
                <input
                  value={form.companyName}
                  onChange={(event) => handleFieldChange("companyName", event.target.value)}
                  placeholder="Domla Studio"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none transition focus:border-red-400 focus:bg-white"
                />
              </label>

              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Shahar</span>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    value={form.city}
                    onChange={(event) => handleFieldChange("city", event.target.value)}
                    placeholder="Toshkent"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-red-400 focus:bg-white"
                  />
                </div>
              </label>

              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Valyuta</span>
                <select
                  value={form.currency}
                  onChange={(event) => handleFieldChange("currency", event.target.value as Currency)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none transition focus:border-red-400 focus:bg-white"
                >
                  <option value="UZS">UZS</option>
                  <option value="USD">USD</option>
                </select>
              </label>

              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Maosh min</span>
                <input
                  type="number"
                  min="0"
                  value={form.salaryFrom}
                  onChange={(event) => handleFieldChange("salaryFrom", event.target.value)}
                  placeholder="4000000"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none transition focus:border-red-400 focus:bg-white"
                />
              </label>

              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Maosh max</span>
                <input
                  type="number"
                  min="0"
                  value={form.salaryTo}
                  onChange={(event) => handleFieldChange("salaryTo", event.target.value)}
                  placeholder="7000000"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none transition focus:border-red-400 focus:bg-white"
                />
              </label>

              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Telefon raqami</span>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    value={form.phone}
                    onChange={(event) => handleFieldChange("phone", event.target.value)}
                    placeholder="+998 90 123 45 67"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-red-400 focus:bg-white"
                  />
                </div>
              </label>

              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Telegram</span>
                <input
                  value={form.telegram}
                  onChange={(event) => handleFieldChange("telegram", event.target.value)}
                  placeholder="@domla_hr"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none transition focus:border-red-400 focus:bg-white"
                />
              </label>
            </div>

            <label className="block space-y-2 text-sm font-medium text-slate-700">
              <span>Ish tavsifi</span>
              <textarea
                value={form.description}
                onChange={(event) => handleFieldChange("description", event.target.value)}
                placeholder="Kandidatlardan qaysi ko'nikmalarni talab qilasiz?"
                rows={5}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none transition focus:border-red-400 focus:bg-white"
              />
            </label>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-5">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
              >
                Bekor qilish
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-500"
              >
                E&apos;lonni chop etish
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
