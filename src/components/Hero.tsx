import { Star, ShieldCheck, Clock, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50" />
        <div className="absolute top-0 right-0 w-[60%] h-full opacity-60">
          <div className="absolute top-1/4 right-10 w-72 h-72 rounded-full bg-primary-200/40 blur-3xl float-anim" />
          <div className="absolute bottom-10 right-1/3 w-80 h-80 rounded-full bg-accent-200/40 blur-3xl float-anim" style={{ animationDelay: '2s' }} />
        </div>
        <svg className="absolute bottom-0 inset-x-0 w-full" viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
          <path d="M0 120L1440 120L1440 60C1320 90 1080 110 720 95C360 80 120 40 0 70L0 120Z" fill="white" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left */}
        <div className="reveal is-visible">
          <span className="inline-flex items-center gap-2 bg-white/70 backdrop-blur border border-primary-200 text-primary-700 text-sm font-medium px-4 py-2 rounded-full shadow-sm">
            <Star className="w-4 h-4 fill-accent-400 text-accent-400" />
            4.8/5 from happy patients
          </span>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] text-ink-900 mt-6 text-balance">
            A beautiful smile <br />
            begins with <span className="text-primary-600 italic">gentle</span> care
          </h1>

          <p className="text-lg text-ink-600 mt-6 max-w-xl leading-relaxed">
            MS Family Dental Clinic in Hoodi, Bangalore blends advanced technology with a calm,
            patient-first approach — so every visit feels effortless and every smile lasts.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            <a
              href="tel:+919483547455"
              className="group inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-7 py-4 rounded-full shadow-xl shadow-primary-600/25 transition-all hover:-translate-y-0.5"
            >
              Call to book your visit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 text-ink-800 font-semibold px-7 py-4 rounded-full border border-ink-200 hover:border-primary-300 hover:bg-white transition-all"
            >
              Explore services
            </a>
          </div>

          <div className="flex flex-wrap gap-8 mt-10">
            <Stat icon={<ShieldCheck className="w-5 h-5" />} label="Sterilized tools" sub="Hospital-grade safety" />
            <Stat icon={<Clock className="w-5 h-5" />} label="Same-day visits" sub="Emergency slots open" />
            <Stat icon={<Star className="w-5 h-5" />} label="17+ years" sub="Trusted in Hoodi" />
          </div>
        </div>

        {/* Right - Image */}
        <div className="relative reveal is-visible" style={{ animationDelay: '0.15s' }}>
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary-900/20 aspect-[4/5]">
            <img
              src="/images/DrBeulaClinic.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Dentist caring for a smiling patient"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 via-transparent to-transparent" />
          </div>

          {/* Floating card */}
          <div className="absolute -left-4 bottom-10 glass rounded-2xl shadow-xl p-4 flex items-center gap-3 max-w-[220px] float-anim">
            <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-primary-700" />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink-900">Painless dentistry</p>
              <p className="text-xs text-ink-500">Gentle, anxiety-free care</p>
            </div>
          </div>

          <div className="absolute -right-2 top-10 glass rounded-2xl shadow-xl p-4 flex items-center gap-3 max-w-[220px] float-anim" style={{ animationDelay: '1.5s' }}>
            <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center shrink-0">
              <Star className="w-6 h-6 text-accent-600 fill-accent-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink-900">Top-rated clinic</p>
              <p className="text-xs text-ink-500">Google Patient Choice</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, label, sub }: { icon: React.ReactNode; label: string; sub: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-primary-600">
        {icon}
      </span>
      <div>
        <p className="text-sm font-semibold text-ink-900">{label}</p>
        <p className="text-xs text-ink-500">{sub}</p>
      </div>
    </div>
  );
}
