import { useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { supabase, type Appointment } from '@/lib/supabase';
import {
  CalendarCheck,
  Loader2,
} from 'lucide-react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

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
      window.gtag?.('event', 'conversion', {
        send_to: 'AW-875922294/gfHoCJb7n4UBEPaG1qED',
      });
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
      <div className="max-w-7xl mx-auto px-6 relative grid lg:grid-cols-[1.05fr_1.2fr] gap-12 items-center">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''}`}>
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary-900/20">
            <img
              src="/images/Smile.jpg"
              alt="Smiling patient at the dental clinic"
              className="w-full h-[620px] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-ink-900/10 to-transparent" />
          </div>
        </div>

        <div className="relative">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-primary-300">Book an appointment</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-white mt-3">A brighter smile starts here</h2>
          <p className="text-ink-300 mt-4 text-lg leading-relaxed max-w-xl">
            Tell us what you need, and our team will recommend the best time slot for your visit.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 rounded-[2rem] bg-white p-6 sm:p-8 shadow-2xl">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Full name">
                <input required value={form.name} onChange={(e) => update('name', e.target.value)}
                  className="w-full rounded-xl border border-ink-200 bg-ink-50 px-3 py-2.5 text-ink-900"
                  placeholder="Your name" />
              </Field>
              <Field label="Email address">
                <input required type="email" value={form.email} onChange={(e) => update('email', e.target.value)}
                  className="w-full rounded-xl border border-ink-200 bg-ink-50 px-3 py-2.5 text-ink-900"
                  placeholder="you@example.com" />
              </Field>
              <Field label="Phone number">
                <input required value={form.phone} onChange={(e) => update('phone', e.target.value)}
                  className="w-full rounded-xl border border-ink-200 bg-ink-50 px-3 py-2.5 text-ink-900"
                  placeholder="Your mobile number" />
              </Field>
              <Field label="Service">
                <select value={form.service} onChange={(e) => update('service', e.target.value)}
                  className="w-full rounded-xl border border-ink-200 bg-ink-50 px-3 py-2.5 text-ink-900">
                  {services.map((service) => <option key={service} value={service}>{service}</option>)}
                </select>
              </Field>
              <Field label="Preferred date">
                <input required type="date" min={today} value={form.preferred_date}
                  onChange={(e) => update('preferred_date', e.target.value)}
                  className="w-full rounded-xl border border-ink-200 bg-ink-50 px-3 py-2.5 text-ink-900" />
              </Field>
              <Field label="Preferred time">
                <select value={form.preferred_time} onChange={(e) => update('preferred_time', e.target.value)}
                  className="w-full rounded-xl border border-ink-200 bg-ink-50 px-3 py-2.5 text-ink-900">
                  {timeSlots.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Message">
              <textarea rows={4} value={form.message} onChange={(e) => update('message', e.target.value)}
                className="mt-5 w-full rounded-xl border border-ink-200 bg-ink-50 px-3 py-2.5 text-ink-900 resize-none"
                placeholder="Tell us about your dental concern or treatment goal" />
            </Field>
            {errorMsg && <p className="mt-4 text-sm text-red-600">{errorMsg}</p>}
            {status === 'success' && <p className="mt-4 text-sm text-emerald-600">Your appointment request has been sent successfully.</p>}
            <button type="submit" disabled={status === 'loading'}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 px-6 py-3 font-semibold text-white disabled:opacity-60">
              {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <CalendarCheck className="w-4 h-4" />}
              {status === 'loading' ? 'Sending...' : 'Request appointment'}
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
