'use client';

import { FormEvent, useState } from "react";
import { MessageSquareText, Phone, Send, X } from "lucide-react";

import type { DirectMessage, WorkerProfile } from "@/types";

type WorkerModalProps = {
  worker: WorkerProfile | null;
  employerPhone: string;
  onClose: () => void;
  onSendMessage: (payload: DirectMessage) => void;
};

export function WorkerModal({ worker, employerPhone, onClose, onSendMessage }: WorkerModalProps) {
  const [isPhoneVisible, setIsPhoneVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  if (!worker) {
    return null;
  }

  const phoneLink = `tel:${worker.phone.replace(/\s+/g, "")}`;
  const telegramLink = worker.telegram ? `https://t.me/${worker.telegram.replace(/^@/, "")}` : "#";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!message.trim()) {
      setStatus("Iltimos, ish taklifi yoki xabar matnini kiriting.");
      return;
    }

    onSendMessage({
      workerId: worker.id,
      employerPhone,
      message: message.trim(),
    });

    setStatus("Xabar muvaffaqiyatli yuborildi.");
    setMessage("");
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-[30px] bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Ishchi</p>
            <h3 className="mt-2 text-2xl font-black text-slate-900">{worker.fullName}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
            aria-label="Yopish"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-600">
            {worker.profession} • {worker.city}
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">{worker.bio}</p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setIsPhoneVisible((current) => !current)}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
          >
            <Phone className="h-4 w-4" />
            {isPhoneVisible ? "Raqamni yashirish" : "Telefon qilish"}
          </button>

          <a
            href={telegramLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
          >
            <MessageSquareText className="h-4 w-4" />
            Telegram orqali yozish
          </a>
        </div>

        {isPhoneVisible ? (
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <a href={phoneLink} className="font-semibold underline-offset-2 hover:underline">
              {worker.phone}
            </a>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-slate-200 p-3">
          <label htmlFor="worker-message" className="block text-sm font-medium text-slate-700">
            Ish taklif qilish / Xabar yuborish
          </label>
          <div className="mt-3 flex gap-2">
            <input
              id="worker-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Salom, ish bo'yicha taklifni yuborish..."
              className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-red-400 focus:bg-white"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-red-600 p-3 text-white transition hover:bg-red-500"
              aria-label="Xabar yuborish"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          {status ? <p className="mt-3 text-sm font-medium text-emerald-600">{status}</p> : null}
        </form>
      </div>
    </div>
  );
}
