import { useReveal } from '@/hooks/useReveal';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Lokesh Raghuraman',
    text: 'Had a RCT done here for a nominal price with great guidance by RCT specialist Abhiraj and doctor Beula David. Lab Assistant is also good in coordinating for multiple visit',
    rating: 5,
  },
  {
    name: 'Shahanur Choudhury',
    text: 'I had a very good experience at this dental clinic. The RCT treatment was done smoothly and professionally. The doctor was friendly, explained everything clearly, and the pricing was very reasonable. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Andra Monish',
    text: 'I recently visited this dental clinic for wisdom teeth extraction. It went smoothly and doctors guided me very well through out the process. Doctors are very responsive.',
    rating: 5,
  },
  {
    name: 'Kamakhya Prasad Mohanty',
    text: 'I recently visited this dental clinic for a cavity between my tooth. The doctor has explained my tooth condition and the treatment to me in detail. I was very satisfied with the consultation and went ahead with tooth filling. The whole procedure was painless and smooth and i had no difficulty afterwards. Cost of the procedure is very reasonable and they genuinely suggest the treatment that suits your teeth condition. No overcharging and fully transparent. I will highly recommend you to consult in this clinic for your dental conditions.',
    rating: 5,
  },
  {
    name: 'Prasad Garimilla',
    text: 'I got 3 molar implants done one each on either sides of jaw as at MS family dental. And 2 bridges on the front. All done perfectly and professionally. They call in experienced specialists depending on the what is required. As good as a multi speciality dental clinic. Economical , efficient and professional. Very Good experience. Dr Beula is kind, friendly and handles very delicately. Charges are reasonable. Explains the problem clearly. Gives realistic solutions. Gets specialists based on the treatment and procedure required. Everything under one roof.',
    rating: 5,
  },
  {
    name: 'Kumara Vel',
    text: 'I had an excellent experience with MS Family dental clinic and orthopedic treatment! The entire process was smooth, and the staff was incredibly professional and knowledgeable. My dentist took the time to explain every step of the treatment and made sure I was comfortable throughout. The results have been fantastic, I highly recommend this clinic to anyone considering dental orthopedic care. They truly care about their patients well-being!',
    rating: 5,
  },
];

export default function Testimonials() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-primary-50/50 to-white relative overflow-hidden">
      <div className="absolute top-20 right-0 w-80 h-80 bg-accent-100/40 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} text-center max-w-2xl mx-auto`}>
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-primary-600">Patient Stories</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-ink-900 mt-3 text-balance">
            Loved by 100s of   smiles
          </h2>
          <div className="flex items-center justify-center gap-2 mt-5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-accent-400 text-accent-400" />
              ))}
            </div>
            <span className="text-ink-700 font-semibold">4.8 / 5</span>
            <span className="text-ink-500">· 120+ reviews</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {testimonials.map((t, i) => (
            <Card key={t.name} {...t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({
  name,
  role,
  text,
  rating,
  index,
}: {
  name: string;
  role: string;
  text: string;
  rating: number;
  index: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} relative bg-white rounded-2xl p-6 shadow-lg shadow-ink-900/5 border border-ink-100 hover:shadow-xl transition-shadow`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <Quote className="w-10 h-10 text-primary-200 absolute top-5 right-5" />
      <div className="flex gap-1 mb-3">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-accent-400 text-accent-400" />
        ))}
      </div>
      <p className="text-ink-700 leading-relaxed relative z-10">"{text}"</p>
      <div className="flex items-center gap-3 mt-5 pt-4 border-t border-ink-100">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-ink-900 text-sm">{name}</p>
          <p className="text-xs text-ink-500">{role}</p>
        </div>
      </div>
    </div>
  );
}
