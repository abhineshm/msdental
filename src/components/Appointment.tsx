import { useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { supabase, type Appointment } from '@/lib/supabase';
import {
  CalendarCheck,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  Phone,
} from 'lucide-react';

const services = [
  'Teeth Cleaning & Scaling',
  'Teeth Whitening',
  'Root Canal Treatment',
  'Crowns & Bridges',
  'Dental Implants',
  'Invisible Aligners',
  'Kids Dentistry',
  'Gum Treatment',
  'General Consultation',
];

const timeSlots = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
];

export default function Appointment() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [form, setForm] = useState<Omit<Appointment, 'id' | 'status' | 'created_at'>>({
    name: '',
    email: '',
    phone: '',
    service: services[0],
    preferred_date: '',
    preferred_time: timeSlots[0],
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const { error } = await supabase.from('appointments').insert([form]);
      if (error) throw error;
      setStatus('success');
      setForm((f) => ({ ...f, name: '', email: '', phone: '', message: '', preferred_date: '' }));
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please call us.');
    }
  };

  const update = (field: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  return (
    <section id="appointment" className="relative py-24 bg-ink-900 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(53,125,110,0.2),_transparent_45%)]" />

      <div className="max-w-7xl mx-auto px-6 relative grid lg:grid-cols-[1.05fr_1.2fr] gap-12 items-center">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''}`}>
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary-900/20">
            <img
              src="/images/Smile.jpg?auto=compress&cs=tinysrgb&w=1200"
              alt="Smiling patient at the dental clinic"
              className="w-full h-[620px] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-ink-900/10 to-transparent" />

            <svg
              viewBox="0 0 280 180"
              className="absolute bottom-6 left-6 w-48 h-auto text-white/90"
              aria-hidden="true"
            >
              <path d="M20 110C45 65 85 40 140 40C195 40 235 65 260 110" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
              <path d="M60 96C75 115 95 125 120 125C145 125 165 115 180 96" stroke="currentColor" strokeWidth="7" fill="none" strokeLinecap="round" />
              <circle cx="85" cy="72" r="8" fill="currentColor" />
              <circle cx="195" cy="72" r="8" fill="currentColor" />
              <path d="M140 45v45" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div className="relative">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-primary-300">Book an appointment</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-white mt-3">A brighter smile starts here</h2>
          <p className="text-ink-300 mt-4 text-lg leading-relaxed max-w-xl">
            Tell us what you need, and our team will recommend the best time slot for your visit.
          </p>

          <div className="mt-8 space-y-5">
            <InfoRow
              icon={<CalendarCheck className="w-5 h-5" />}
              title="Easy scheduling"
              lines={['Flexible morning, afternoon & evening slots', 'Friendly support for first-time patients']}
            />
            <InfoRow
              icon={<MapPin className="w-5 h-5" />}
              title="Visit our clinic"
              lines={['MS Family Dental Clinic', 'Hoodi, Bengaluru']}
            />
            <InfoRow
              icon={<Phone className="w-5 h-5" />}
              title="Need help fast?"
              lines={['Call us to confirm your appointment', '+91 97418 42781']}
            />
          </div>

          <form onSubmit={handleSubmit} className="mt-10 rounded-[2rem] bg-white p-6 sm:p-8 shadow-2xl">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Full name">
                <input
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  className="w-full rounded-xl border border-ink-200 bg-ink-50 px-3 py-2.5 text-ink-900 focus:border-primary-500 focus:outline-none"
                  placeholder="Your name"
                  required
                />
              </Field>

              <Field label="Email address">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className="w-full rounded-xl border border-ink-200 bg-ink-50 px-3 py-2.5 text-ink-900 focus:border-primary-500 focus:outline-none"
                  placeholder="you@example.com"
                  required
                />
              </Field>

              <Field label="Phone number">
                <input
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  className="w-full rounded-xl border border-ink-200 bg-ink-50 px-3 py-2.5 text-ink-900 focus:border-primary-500 focus:outline-none"
                  placeholder="Your mobile number"
                  required
                />
              </Field>

              <Field label="Service">
                <select
                  value={form.service}
                  onChange={(e) => update('service', e.target.value)}
                  className="w-full rounded-xl border border-ink-200 bg-ink-50 px-3 py-2.5 text-ink-900 focus:border-primary-500 focus:outline-none"
                >
                  {services.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </Field>

              <Field label="Preferred date">
                <input
                  type="date"
                  min={today}
                  value={form.preferred_date}
                  onChange={(e) => update('preferred_date', e.target.value)}
                  className="w-full rounded-xl border border-ink-200 bg-ink-50 px-3 py-2.5 text-ink-900 focus:border-primary-500 focus:outline-none"
                  required
                />
              </Field>

              <Field label="Preferred time">
                <select
                  value={form.preferred_time}
                  onChange={(e) => update('preferred_time', e.target.value)}
                  className="w-full rounded-xl border border-ink-200 bg-ink-50 px-3 py-2.5 text-ink-900 focus:border-primary-500 focus:outline-none"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="mt-5">
              <Field label="Message">
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  className="w-full rounded-xl border border-ink-200 bg-ink-50 px-3 py-2.5 text-ink-900 focus:border-primary-500 focus:outline-none resize-none"
                  placeholder="Tell us about your dental concern or treatment goal"
                />
              </Field>
            </div>

            {errorMsg && (
              <div className="mt-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                <AlertCircle className="w-4 h-4" />
                {errorMsg}
              </div>
            )}

            {status === 'success' && (
              <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
                Your appointment request has been sent successfully.
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-600 px-5 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-600/25 transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending request...
                </>
              ) : (
                <>
                  <CalendarCheck className="w-5 h-5" />
                  Book appointment
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink-700 mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}

function InfoRow({ icon, title, lines }: { icon: React.ReactNode; title: string; lines: string[] }) {
  return (
    <div className="flex gap-4">
      <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-primary-300 shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        {lines.map((l) => (
          <p key={l} className="text-sm text-ink-300">{l}</p>
        ))}
      </div>
    </div>
  );
}
