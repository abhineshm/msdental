import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-ink-900 text-ink-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <ToothIcon className="w-5 h-5 text-white" />
              </span>
              <div className="leading-tight">
                <span className="font-serif text-xl font-semibold text-white">Hoodi Dental</span>
                <span className="block text-[10px] tracking-[0.2em] uppercase text-primary-400">Bangalore</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Gentle, modern dentistry in Hoodi, Bangalore. Caring for healthy, confident smiles since 2010.
            </p>
            <div className="flex gap-3 mt-5">
              <Social href="#" icon={<Facebook className="w-4 h-4" />} />
              <Social href="#" icon={<Instagram className="w-4 h-4" />} />
              <Social href="#" icon={<Youtube className="w-4 h-4" />} />
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                ['Home', '#home'],
                ['Services', '#services'],
                ['About Us', '#about'],
                ['Our Doctors', '#doctors'],
                ['Reviews', '#testimonials'],
                ['Book Appointment', '#appointment'],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="hover:text-primary-300 transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Treatments</h4>
            <ul className="space-y-2.5 text-sm">
              {['Cleaning & Scaling', 'Root Canal', 'Dental Implants', 'Teeth Whitening', 'Invisible Aligners', 'Kids Dentistry'].map((s) => (
                <li key={s}>
                  <a href="#services" className="hover:text-primary-300 transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                <span>Hoodi Main Road, Hoodi,<br />Bangalore, Karnataka 560048</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                <a href="tel:+918000000000" className="hover:text-primary-300 transition-colors">+91 80 0000 0000</a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                <a href="mailto:hello@hoodidental.in" className="hover:text-primary-300 transition-colors">hello@hoodidental.in</a>
              </li>
              <li className="flex gap-3">
                <Clock className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                <span>Mon–Sat: 9am–8pm<br />Sun: Emergency only</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>© {new Date().getFullYear()} Hoodi Dental Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Social({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary-500 flex items-center justify-center text-white transition-colors"
    >
      {icon}
    </a>
  );
}

function ToothIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M7.5 3C6 3 4.5 4 4 6c-.5 2 0 4 .5 6 .3 1.2.5 2.5.7 4 .2 1.6.6 3.5 1.8 3.5 1.2 0 1.3-1.5 1.5-3 .2-1.3.6-2.5 1.5-2.5s1.3 1.2 1.5 2.5c.2 1.5.3 3 1.5 3 1.2 0 1.6-1.9 1.8-3.5.2-1.5.4-2.8.7-4 .5-2 1-4 .5-6C17.5 4 16 3 14.5 3c-1.2 0-1.8.5-2.5.5S9.7 3 7.5 3Z"
        fill="currentColor"
      />
    </svg>
  );
}
