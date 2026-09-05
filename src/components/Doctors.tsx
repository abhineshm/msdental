import { useReveal } from '@/hooks/useReveal';
import { GraduationCap, Award } from 'lucide-react';

const doctors = [
  {
    name: 'Dr. Sneha PK',
    role: 'MDS – Endodontics & Cosmetic Dentistry',
    creds: ['University Topper, RGUHS', 'Specialized in advanced and microscopic endodontics','Expertised in complex root canal treatments and retreatments','Expertised in composite and ceramic veneers'],
    img: '/images/DrSneha.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Dr. Abhiraj G',
    role: 'MDS – Conservative Dentistry & Endodontics',
    creds: ['Expertised in Root Canal Treatment (RCT), Re-RCT, and management of complex root canal cases', 'Dedicated to providing precise, pain-free, and patient-centered endodontic care'],
    img: '/images/DrAbhiraj.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Dr. Naveen',
    role: 'MDS – Conservative Dentistry & Endodontics',
    creds: ['University Topper, RGUHS', 'Former Assistant Professor, Vydehi Institute', 'Specialized in advanced endodontics and restorative dentistry', 'Expertised in complex root canal treatments and retreatments'],
    img: '/images/DrNaveen.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Dr. Praveen',
    role: 'BDS, MDS – Oral and Maxillofacial Surgeon',
    creds: ['Specialized in surgical management of conditions related to mouth, jaws, face, and oral cavity'],
    img: '/images/DrPraveen.jpeg?auto=compress&cs=tinysrgb&w=600',
  }/*,
  {
    name: 'Dr. Beula',
    role: 'Dental Surgeon',
    creds: ['17 years of experience in general dentistry and preventive care', 'Expertised in patient education and oral health promotion'],
    img: '/images/DrBeula.jpeg?auto=compress&cs=tinysrgb&w=600',
  }*/
];

export default function Doctors() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="doctors" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} text-center max-w-2xl mx-auto`}>
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-primary-600">Meet the Team</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-ink-900 mt-3 text-balance">
            Specialists who genuinely care
          </h2>
          <p className="text-ink-600 mt-4 text-lg">
            Friendly, highly-trained dentists who put your comfort and confidence first.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {doctors.map((d, i) => (
            <DoctorCard key={d.name} {...d} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DoctorCard({
  name,
  role,
  creds,
  img,
  index,
}: {
  name: string;
  role: string;
  creds: string[];
  img: string;
  index: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} group bg-white rounded-3xl overflow-hidden shadow-lg shadow-ink-900/5 border border-ink-100 hover:shadow-2xl hover:shadow-primary-900/10 transition-all duration-500 hover:-translate-y-2`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/0 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 p-5 text-white">
          <h3 className="font-serif text-2xl font-semibold">{name}</h3>
          <p className="text-primary-200 text-sm font-medium">{role}</p>
        </div>
      </div>
      <div className="p-5 space-y-2">
        {creds.map((c) => (
          <div key={c} className="flex items-center gap-2 text-sm text-ink-600">
            <GraduationCap className="w-4 h-4 text-primary-500 shrink-0" />
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}
