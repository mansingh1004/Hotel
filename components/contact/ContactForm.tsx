"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Please add a subject"),
  message: z.string().min(10, "Please tell us a little more (10+ characters)"),
});

type FormValues = z.infer<typeof schema>;

/** Validated contact form. Simulates submission — no backend wired up. */
export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    // Emulate a network request so the loading state is visible.
    await new Promise((r) => setTimeout(r, 900));
    console.info("Contact form submitted:", data);
    setSent(true);
    reset();
  };

  if (sent) {
    return (
      <div className="grid place-items-center rounded-3xl border border-emerald/30 bg-emerald/5 p-10 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald text-white">
          <Check size={28} />
        </span>
        <h3 className="mt-4 font-display text-2xl font-semibold text-primary">
          Message sent
        </h3>
        <p className="mt-2 max-w-sm text-ink-soft">
          Thank you for reaching out. A member of our concierge team will respond
          within 24 hours.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 text-sm font-medium text-primary underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.name?.message}>
          <input
            {...register("name")}
            placeholder="Jane Doe"
            className={inputCls(!!errors.name)}
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            placeholder="jane@example.com"
            className={inputCls(!!errors.email)}
          />
        </Field>
        <Field label="Phone (optional)" error={errors.phone?.message}>
          <input
            {...register("phone")}
            placeholder="+1 800 555 0100"
            className={inputCls(!!errors.phone)}
          />
        </Field>
        <Field label="Subject" error={errors.subject?.message}>
          <input
            {...register("subject")}
            placeholder="Booking enquiry"
            className={inputCls(!!errors.subject)}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Message" error={errors.message?.message}>
          <textarea
            {...register("message")}
            rows={5}
            placeholder="How can we help you plan the perfect stay?"
            className={cn(inputCls(!!errors.message), "resize-none")}
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-medium text-white transition-all hover:bg-primary-dark hover:-translate-y-0.5 disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send size={18} /> Send message
          </>
        )}
      </button>
    </form>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-muted focus:ring-2",
    hasError
      ? "border-red-400 focus:ring-red-100"
      : "border-line focus:border-primary focus:ring-primary/15"
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  );
}
