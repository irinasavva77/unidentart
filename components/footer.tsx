import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <span className="text-2xl font-bold">
              Unident<span className="text-secondary">Art</span>
            </span>
            <p className="mt-4 text-white/70 text-sm leading-relaxed">
              Clinica stomatologica UnidentArt ofera servicii de calitate pentru sanatatea ta dentara. 
              Echipa noastra de specialisti este dedicata crearii zambelelor perfecte.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Linkuri Rapide</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/70 hover:text-white text-sm transition-colors">
                  Acasa
                </Link>
              </li>
              <li>
                <Link href="/servicii" className="text-white/70 hover:text-white text-sm transition-colors">
                  Servicii
                </Link>
              </li>
              <li>
                <Link href="/echipa" className="text-white/70 hover:text-white text-sm transition-colors">
                  Echipa Noastra
                </Link>
              </li>
              <li>
                <Link href="/programare" className="text-white/70 hover:text-white text-sm transition-colors">
                  Programare Online
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-white/70">
                <Phone className="h-4 w-4 text-secondary" />
                022 50 80 80
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <Mail className="h-4 w-4 text-secondary" />
                unidentartsrl@gmail.com
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                Blvd. Stefan cel Mare 167/1
              </li>
            </ul>
          </div>
          
          {/* Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Program</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-3 text-sm text-white/70">
                <Clock className="h-4 w-4 text-secondary" />
                <div>
                  <p>Luni - Vineri</p>
                  <p className="text-white">09:00 - 18:00</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <Clock className="h-4 w-4 text-secondary" />
                <div>
                  <p>Sambata</p>
                  <p className="text-white">09:00 - 12:00</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <Clock className="h-4 w-4 text-secondary" />
                <div>
                  <p>Duminica</p>
                  <p className="text-white">Inchis</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/50">
              &copy; {new Date().getFullYear()} UnidentArt. Toate drepturile rezervate.
            </p>
            <Link href="/admin" className="text-sm text-white/50 hover:text-white/70 transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
