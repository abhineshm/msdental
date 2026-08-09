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
    <section id="appointment" className="py-24 bg-ink-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[50%] h-full opacity-30">
        <div className="absolute top-1/4 right-10 w-72 h-72 rounded-full bg-primary-500/40 blur-3xl" />
        <div className="absolute bottom-10 right-1/3 w-80 h-80 rounded-full bg-accent-500/30 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start relative">
        {/* Left info */}
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} text-white`}>
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-primary-300">Book a Visit</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold mt-3 text-balance">
            Your healthiest smile starts here
          </h2>
          <p className="text-ink-300 mt-4 text-lg leading-relaxed">
            Fill in the form and our front desk will call you within 2 working hours to confirm your slot.
            Prefer to talk? Call us directly — we're happy to help.
          </p>

          <div className="mt-10 space-y-5">
            <InfoRow icon={<MapPin className="w-5 h-5" />} title="Visit us" lines={['Hoodi Main Road, Hoodi', 'Bangalore, Karnataka 560048']} />
            <InfoRow icon={<Phone className="w-5 h-5" />} title="Call us" lines={['+91 9483547455', 'Mon–Sun, 10am–9pm']} />
            <InfoRow icon={<Clock className="w-5 h-5" />} title="Clinic hours" lines={['Mon – Sun: 10:00 AM – 9:00 PM' ]} />
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          {status === 'success' ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9 text-primary-600" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-ink-900 mt-5">Request received!</h3>
              <p className="text-ink-600 mt-2 max-w-sm mx-auto">
                Thank you for choosing MS Family Dental Clinic. Our team will call you shortly to confirm your appointment.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-6 inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
              >
                Book another appointment
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <CalendarCheck className="w-5 h-5 text-primary-600" />
                <h3 className="font-serif text-2xl font-semibold text-ink-900">Request appointment</h3>
              </div>

              {status === 'error' && (
                <div className="flex items-start gap-2 bg-red-50 text-red-700 text-sm p-3 rounded-xl border border-red-200">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full name">
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="input"
                  />
                </Field>
                <Field label="Phone">
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="+91 98XXX XXXXX"
                    className="input"
                  />
                </Field>
              </div>

              <Field label="Email">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="you@example.com"
                  className="input"
                />
              </Field>

              <Field label="Service needed">
                <select
                  value={form.service}
                  onChange={(e) => update('service', e.target.value)}
                  className="input"
                >
                  {services.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </Field>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Preferred date">
                  <input
                    required
                    type="date"
                    min={today}
                    value={form.preferred_date}
                    onChange={(e) => update('preferred_date', e.target.value)}
                    className="input"
                  />
                </Field>
                <Field label="Preferred time">
                  <select
                    value={form.preferred_time}
                    onChange={(e) => update('preferred_time', e.target.value)}
                    className="input"
                  >
                    {timeSlots.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Notes (optional)">
                <textarea
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  rows={3}
                  placeholder="Anything we should know? Pain, allergies, preferred days..."
                  className="input resize-none"
                />
              </Field>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white font-semibold px-6 py-4 rounded-xl shadow-lg shadow-primary-600/25 transition-all hover:-translate-y-0.5 disabled:translate-y-0"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Sending request...
                  </>
                ) : (
                  <>
                    <CalendarCheck className="w-5 h-5" /> Confirm appointment request
                  </>
                )}
              </button>
              <p className="text-xs text-ink-400 text-center">
                We'll never share your details. This request is not a confirmed booking until our team confirms.
              </p>
            </form>
          )}
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
