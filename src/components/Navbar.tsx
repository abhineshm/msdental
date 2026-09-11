import { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass shadow-[0_8px_30px_-12px_rgba(15,27,45,0.15)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5 group">
          <span className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/30 transition-transform group-hover:scale-105">
            <ToothIcon className="w-5 h-5 text-white" />
          </span>
          <div className="leading-tight">
            <span className="font-serif text-xl font-semibold text-ink-900">MS Family Dental Clinic</span>
            <span className="block text-[10px] tracking-[0.2em] uppercase text-primary-600 font-medium">Hoodi, Bangalore</span>
          </div>
        </a>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-4 py-2 text-sm font-medium text-ink-700 hover:text-primary-700 rounded-full hover:bg-primary-50 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+919483547455"
            className="flex items-center gap-2 text-sm font-medium text-ink-700 hover:text-primary-700 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>+91 9483547455</span>
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 text-ink-800"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden glass mt-3 mx-4 rounded-2xl shadow-xl p-4 animate-[fadeIn_0.3s_ease]">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-xl text-ink-700 hover:bg-primary-50 hover:text-primary-700 font-medium"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
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
