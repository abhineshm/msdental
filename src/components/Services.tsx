import { useReveal } from '@/hooks/useReveal';
import {
  Stethoscope,
  Smile,
  Sparkles,
  Activity,
  Wrench,
  Baby,
  Scan,
  Crown,
  ArrowUpRight,
} from 'lucide-react';

const services = [
  {
    icon: Smile,
    title: 'Teeth Cleaning & Scaling',
    desc: 'Plaque and tartar removal with ultrasonic scaling and polishing for a fresh, healthy mouth.',
  },
  {
    icon: Sparkles,
    title: 'Teeth Whitening',
    desc: 'In-clinic and take-home whitening that brightens your smile by several shades safely.',
  },
  {
    icon: Wrench,
    title: 'Root Canal Treatment',
    desc: 'Painless single-sitting RCT using rotary endodontics to save your natural tooth.',
  },
  {
    icon: Crown,
    title: 'Crowns & Bridges',
    desc: 'Tooth-coloured ceramic crowns and bridges that restore strength and aesthetics.',
  },
  {
    icon: Stethoscope,
    title: 'Dental Implants',
    desc: 'Permanent titanium implants that replace missing teeth with natural-looking results.',
  },
  {
    icon: Scan,
    title: 'Invisible Aligners',
    desc: 'Clear aligners and braces to straighten teeth discreetly and comfortably.',
  },
  {
    icon: Baby,
    title: 'Kids Dentistry',
    desc: 'Gentle, fun-filled dental care for children that builds healthy habits early.',
  },
  {
    icon: Activity,
    title: 'Gum Treatment',
    desc: 'Periodontal therapy to treat bleeding gums and prevent tooth loss.',
  },
];

export default function Services() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} text-center max-w-2xl mx-auto`}>
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-primary-600">Our Services</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-ink-900 mt-3 text-balance">
            Complete dental care under one roof
          </h2>
          <p className="text-ink-600 mt-4 text-lg">
            From routine check-ups to advanced cosmetic and restorative treatments — everything your smile needs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {services.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  desc,
  index,
}: {
  icon: typeof Smile;
  title: string;
  desc: string;
  index: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} group relative bg-white rounded-2xl p-6 border border-ink-100 hover:border-primary-200 hover:shadow-2xl hover:shadow-primary-900/10 transition-all duration-500 hover:-translate-y-1.5`}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center text-primary-600 group-hover:from-primary-500 group-hover:to-primary-700 group-hover:text-white transition-all duration-500">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="font-serif text-xl font-semibold text-ink-900 mt-5">{title}</h3>
      <p className="text-sm text-ink-600 mt-2 leading-relaxed">{desc}</p>
      <a
        href="#appointment"
        className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        Book this <ArrowUpRight className="w-4 h-4" />
      </a>
    </div>
  );
}
