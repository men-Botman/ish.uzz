"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  MapPin,
  MessageSquareText,
  Phone,
  Search,
  Sparkles,
  Star,
} from "lucide-react";

import { Header } from "@/components/Header";
import { JobCard } from "@/components/JobCard";
import { JobPostModal } from "@/components/JobPostModal";
import { WorkerCard } from "@/components/WorkerCard";
import { WorkerModal } from "@/components/WorkerModal";
import type { DirectMessage, EmployerProfile, JobPosting, SearchMode, WorkerProfile } from "@/types";

const quickCategories = ["Frontend", "Buxgalter", "Sotuvchi", "Dasturchi"];

const seedJobs: JobPosting[] = [
  {
    id: "job-1",
    title: "Frontend Developer",
    companyName: "Nexa Digital",
    city: "Toshkent",
    salaryFrom: 7000000,
    salaryTo: 11000000,
    currency: "UZS",
    description:
      "React, Next.js va TypeScript bo'yicha tajribali frontend dasturchilarni qidiramiz. Produkt va UX prioritety bilan ishlaydigan jamoaga qo'shiling.",
    phone: "+998 90 123 45 67",
    telegram: "@nexa_hr",
    createdAt: "2026-10-01T09:30:00.000Z",
  },
  {
    id: "job-2",
    title: "Buxgalter",
    companyName: "GreenLeaf Agro",
    city: "Samarkand",
    salaryFrom: 5000000,
    salaryTo: 8000000,
    currency: "UZS",
    description:
      "Kassa, hisobot va moliyaviy monitoring bilan ishlaydigan buxgalterga e'tibor. O'z ishini yuqori darajada tartibga solishga qodir bo'lsangiz, tanlovga taklif qilamiz.",
    phone: "+998 91 456 78 90",
    telegram: "@greenleaf_jobs",
    createdAt: "2026-10-02T12:15:00.000Z",
  },
  {
    id: "job-3",
    title: "Sotuvchi",
    companyName: "Mebel House",
    city: "Farg'ona",
    salaryFrom: 4000000,
    salaryTo: 6500000,
    currency: "UZS",
    description:
      "Do'kon savdosi, mijozlar bilan ishlash va mahsulot ma'lumotlarini yetkazib berish bo'yicha tajribaga ega mutaxassis kerak.",
    phone: "+998 94 222 33 44",
    telegram: "@mebelhouse_sales",
    createdAt: "2026-10-03T08:00:00.000Z",
  },
];

const seedWorkers: WorkerProfile[] = [
  {
    id: "worker-1",
    fullName: "Aziza Karimova",
    profession: "Frontend Dasturchi",
    skills: ["React", "Next.js", "TypeScript", "Figma"],
    experienceYears: 4,
    city: "Toshkent",
    phone: "+998 99 987 65 43",
    telegram: "@aziza_design",
    expectedSalary: 12000000,
    currency: "UZS",
    bio: "Figma, UX research va product thinking bo'yicha 4 yillik tajribaga ega. SaaS mahsulotlari uchun ishlashni yaxshi bilaman.",
    isAvailableForHire: true,
  },
  {
    id: "worker-2",
    fullName: "Sardor Tursunov",
    profession: "Full-stack Dasturchi",
    skills: ["Node.js", "Next.js", "PostgreSQL", "API"],
    experienceYears: 5,
    city: "Toshkent",
    phone: "+998 93 111 22 33",
    telegram: "@sardor_fs",
    expectedSalary: 15000000,
    currency: "UZS",
    bio: "Node.js, Next.js, PostgreSQL bilan ishlashni yaxshi bilaman. API va dashboardlarini 2 yil davomida ishlab chiqdim.",
    isAvailableForHire: true,
  },
  {
    id: "worker-3",
    fullName: "Dilnoza Ismoilova",
    profession: "Aktiv sotuvchi",
    skills: ["CRM", "Lead Generation", "Sales", "Marketing"],
    experienceYears: 3,
    city: "Buxoro",
    phone: "+998 98 555 66 77",
    telegram: "@dilmarketing",
    expectedSalary: 9000000,
    currency: "UZS",
    bio: "Raqobatdosh bozorda brending va konversionni oshirish bo'yicha amaliy tajribam mavjud.",
    isAvailableForHire: true,
  },
];

const employerProfile: EmployerProfile = {
  id: "employer-1",
  companyName: "Domla Labs",
  city: "Toshkent",
  phone: "+998 97 345 67 89",
  telegram: "@domla_labs",
  description: "Biz startap va onlayn xizmatlar uchun ishlovchi jamoa bo'lib, qidiruv va ishga joylashishni soddalashtirishga xizmat qilamiz.",
  verified: true,
};

export default function Home() {
  const [mode, setMode] = useState<SearchMode>("candidate");
  const [jobs, setJobs] = useState<JobPosting[]>(seedJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("Toshkent");
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<WorkerProfile | null>(null);
  const [previewJob, setPreviewJob] = useState<JobPosting | null>(null);
  const [sentMessages, setSentMessages] = useState<DirectMessage[]>([]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesText =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCity = selectedCity === "Barcha shaharlar" || job.city === selectedCity;
      return matchesText && matchesCity;
    });
  }, [jobs, searchTerm, selectedCity]);

  const filteredWorkers = useMemo(() => {
    return seedWorkers.filter((worker) => {
      const matchesText =
        worker.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCity = selectedCity === "Barcha shaharlar" || worker.city === selectedCity;
      return matchesText && matchesCity;
    });
  }, [searchTerm, selectedCity]);

  const handleJobSubmit = (job: JobPosting) => {
    setJobs((current) => [job, ...current]);
    setPreviewJob(job);
    setMode("candidate");
  };

  const handleSendMessage = (payload: DirectMessage) => {
    setSentMessages((current) => [payload, ...current]);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Header mode={mode} onModeChange={setMode} onPostJob={() => setIsPostModalOpen(true)} />

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <section className="rounded-[32px] bg-[#222b45] px-5 py-7 text-white shadow-[0_20px_45px_rgba(17,24,39,0.25)] sm:px-8 lg:px-10">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-slate-200">
              <Sparkles className="h-3.5 w-3.5 text-red-400" />
              Domla: tezkor ish va jamoa topish
            </div>

            <h1 className="max-w-2xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Yaxshi ishni toping yoki topshiring birdek platformada.
            </h1>

            <div className="mt-7 rounded-[26px] bg-white p-3 text-slate-900 shadow-xl shadow-slate-950/10">
              <div className="flex flex-col gap-3 lg:flex-row">
                <label className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <Search className="h-5 w-5 text-slate-400" />
                  <input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Lavozim, ko'nikma yoki kompaniya nomi"
                    className="w-full border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                  />
                </label>

                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 lg:w-56">
                  <Building2 className="h-5 w-5 text-slate-400" />
                  <select
                    value={selectedCity}
                    onChange={(event) => setSelectedCity(event.target.value)}
                    className="w-full appearance-none border-none bg-transparent text-sm text-slate-700 outline-none"
                  >
                    <option>Barcha shaharlar</option>
                    <option>Toshkent</option>
                    <option>Samarkand</option>
                    <option>Farg&apos;ona</option>
                    <option>Buxoro</option>
                  </select>
                </label>

                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
                >
                  Qidirish
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {quickCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSearchTerm(category)}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-slate-200 transition hover:border-white/30 hover:bg-white/10"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.55fr_0.95fr]">
          <section id="jobs" className="space-y-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Vakansiyalar</p>
                <h2 className="mt-1 text-3xl font-black text-slate-900">Bugungi takliflar</h2>
              </div>
              <button type="button" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900">
                Barchasi
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => <JobCard key={job.id} job={job} onSelect={() => undefined} />)
              ) : (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
                  Ushbu qidiruv bo&apos;yicha vakansiya topilmadi.
                </div>
              )}
            </div>
          </section>

          <aside className="space-y-5">
            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Ish beruvchi</p>
                  <h3 className="mt-2 text-2xl font-black text-slate-900">Vakansiya e&apos;lon qilish</h3>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                  <BriefcaseBusiness className="h-5 w-5" />
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                Tez va qulay tarzda yangi vakansiya yarating. Qayta bog&apos;lanish uchun telefon, telegram va ish tavsifini bir joyda qo&apos;ying.
              </p>

              <button
                type="button"
                onClick={() => setIsPostModalOpen(true)}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
              >
                E&apos;lon berish
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Kompaniya</p>
                  <h3 className="mt-2 text-xl font-black text-slate-900">{employerProfile.companyName}</h3>
                </div>
                {employerProfile.verified ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Tasdiqlangan
                  </span>
                ) : null}
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-600">{employerProfile.description}</p>

              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-red-500" />
                  {employerProfile.city}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-red-500" />
                  {employerProfile.phone}
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquareText className="h-4 w-4 text-red-500" />
                  {employerProfile.telegram}
                </div>
              </div>
            </div>

            {previewJob ? (
              <div className="rounded-[28px] border border-red-200 bg-red-50 p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-500">E&apos;lon ko&apos;rinshi</p>
                <h3 className="mt-2 text-xl font-black text-slate-900">{previewJob.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{previewJob.companyName}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
                  <span className="rounded-full bg-white px-2.5 py-1">{previewJob.city}</span>
                  <span className="rounded-full bg-white px-2.5 py-1">{previewJob.currency}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-700">{previewJob.description}</p>
              </div>
            ) : (
              <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-500 shadow-sm">
                Sizning eloningiz shu yerda ko&apos;rinadi.
              </div>
            )}
          </aside>
        </div>

        <section id="workers" className="mt-10">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Ishchilar</p>
              <h2 className="mt-1 text-3xl font-black text-slate-900">Ishchilar ro&apos;yxati</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-700">
              <Star className="h-4 w-4" />
              {mode === "employer" ? "Ish beruvchilar uchun" : "Aktiv ishchilar"}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredWorkers.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} onSelect={setSelectedWorker} />
            ))}
          </div>
        </section>

        {sentMessages.length > 0 ? (
          <section className="mt-8 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-slate-900">
              <MapPin className="h-4 w-4 text-red-500" />
              <h3 className="text-xl font-black">Yuborilgan xabarlar</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {sentMessages.slice(0, 3).map((messageItem, index) => (
                <li key={`${messageItem.workerId}-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                  <span className="font-semibold">{messageItem.employerPhone}</span> • {messageItem.message}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>

      <WorkerModal
        worker={selectedWorker}
        employerPhone={employerProfile.phone}
        onClose={() => setSelectedWorker(null)}
        onSendMessage={handleSendMessage}
      />

      {isPostModalOpen ? (
        <JobPostModal
          isOpen={isPostModalOpen}
          onClose={() => setIsPostModalOpen(false)}
          onSubmit={handleJobSubmit}
        />
      ) : null}
    </div>
  );
}
