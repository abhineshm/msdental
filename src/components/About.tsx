import { useReveal } from '@/hooks/useReveal';
import { Award, HeartHandshake, Microscope, ShieldCheck } from 'lucide-react';

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Hospital-grade sterilization',
    desc: 'Every instrument is autoclaved and sealed for single-patient use — your safety, guaranteed.',
  },
  {
    icon: Microscope,
    title: 'Latest dental technology',
    desc: 'Digital X-rays, intra-oral scanners and rotary tools for precise, comfortable treatment.',
  },
  {
    icon: HeartHandshake,
    title: 'Pain-free, patient-first care',
    desc: 'We take time to explain, listen and go at your pace. No rushing, no upselling, ever.',
  },
  {
    icon: Award,
    title: 'Experienced specialists',
    desc: 'A team of specialists with 17+ years of combined experience across all dental fields.',
  },
];

export default function About() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="py-24 bg-ink-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative">
        {/* Image */}
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} relative`}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden shadow-xl aspect-[3/4]">
                <img
                  src="/images/Patient.jpg?auto=compress&cs=tinysrgb&w=600"
                  alt="Modern dental clinic"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-xl aspect-square">
                <img
                  src="https://images.pexels.com/photos/6627562/pexels-photo-6627562.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Dental tools"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="space-y-4 pt-10">
              <div className="rounded-3xl overflow-hidden shadow-xl aspect-square">
                <img
                  src="https://images.pexels.com/photos/6627564/pexels-photo-6627564.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Dental chair"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-xl aspect-[3/4]">
                <img
                  src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Dentist with patient"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-4">
            <span className="font-serif text-4xl font-semibold text-primary-600">17+</span>
            <span className="text-sm text-ink-600 leading-tight">years caring for<br />smiles in Hoodi</span>
          </div>
        </div>

        {/* Content */}
        <div>
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-primary-600">Why Choose Us</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-ink-900 mt-3 text-balance">
            Dentistry that feels different
          </h2>
          <p className="text-ink-600 mt-4 text-lg leading-relaxed">
            At MS Family Dental Clinic, we've reimagined the dental visit. Calm interiors, honest advice,
            and gentle techniques mean you leave smiling — not just with healthier teeth, but with peace of mind.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mt-10">
            {reasons.map((r, i) => (
              <Reason key={r.title} {...r} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Reason({
  icon: Icon,
  title,
  desc,
  index,
}: {
  icon: typeof ShieldCheck;
  title: string;
  desc: string;
  index: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} flex gap-4`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary-600 shrink-0">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="font-semibold text-ink-900">{title}</h3>
        <p className="text-sm text-ink-600 mt-1 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
