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
