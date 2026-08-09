import { useReveal } from '@/hooks/useReveal';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Nair',
    role: 'Koramangala resident',
    text: 'I used to dread dental visits. MS Family Dental Clinic completely changed that. The team is so gentle and patient — my root canal was genuinely painless!',
    rating: 5,
  },
  {
    name: 'Rahul Menon',
    role: 'IT Professional, Hoodi',
    text: 'Booked an appointment online, got a same-day slot. Cleaning was thorough and the clinic is spotless. This is now my family dentist.',
    rating: 5,
  },
  {
    name: 'Sneha Reddy',
    role: 'Mom of two',
    text: 'My kids actually ask to go to the dentist now! Dr. Meera is wonderful with children and the whole clinic feels calming, not clinical.',
    rating: 5,
  },
  {
    name: 'Arjun Kumar',
    role: 'Whitefield resident',
    text: 'Got my implants done here after years of avoiding it. Honest pricing, clear explanations, and results that look completely natural.',
    rating: 5,
  },
  {
    name: 'Divya Sharma',
    role: 'Teacher, KR Puram',
    text: 'Whitening treatment exceeded my expectations. The staff explained every step and made sure I was comfortable throughout.',
    rating: 5,
  },
  {
    name: 'Karthik Bhat',
    role: 'Marathahalli resident',
    text: 'Best dental experience in Bangalore. Modern equipment, on-time appointments, and doctors who actually listen. Highly recommend.',
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
            Loved by 100s of smiles
          </h2>
          <div className="flex items-center justify-center gap-2 mt-5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-accent-400 text-accent-400" />
              ))}
            </div>
            <span className="text-ink-700 font-semibold">4.9 / 5</span>
            <span className="text-ink-500">· 800+ reviews</span>
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
