"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useStore } from '@/lib/store'
import { Clock, ArrowRight, Stethoscope, Sparkles, Sun, Syringe, Wrench, Smile } from 'lucide-react'

function ToothIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3 C9 3 7 4 7 7 C7 9 7.5 11 8 13 C8.5 15.5 9 20 10.5 20 C11.5 20 11.5 17 12 17 C12.5 17 12.5 20 13.5 20 C15 20 15.5 15.5 16 13 C16.5 11 17 9 17 7 C17 4 15 3 12 3 Z" />
    </svg>
  )
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  stethoscope: Stethoscope,
  sparkles: Sparkles,
  tooth: Stethoscope,
  sun: Sun,
  scissors: Syringe,
  wrench: Wrench,
  grid: ToothIcon,
  smile: Smile,
}

export default function ServiciiPage() {
  const { services } = useStore()

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance">Serviciile Noastre</h1>
            <p className="mt-4 text-lg text-white/80">
              Oferim o gama completa de servicii stomatologice utilizand cele mai moderne 
              tehnologii si materiale de cea mai inalta calitate.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon] || Sparkles
              return (
                <Card key={service.id} className="hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col">
                  <CardHeader className="p-3 md:p-6">
                    <div className="flex items-start gap-2 md:gap-4">
                      <div className="w-9 h-9 md:w-14 md:h-14 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-4 w-4 md:h-7 md:w-7 text-secondary" />
                      </div>
                      <div>
                        <CardTitle className="text-sm md:text-lg text-primary leading-tight">{service.name}</CardTitle>
                        <div className="flex items-center gap-1 md:gap-2 mt-1 text-xs md:text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 md:h-4 md:w-4" />
                          {service.duration}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3 pt-0 md:p-6 md:pt-0 flex flex-col flex-1">
                    <p className="text-muted-foreground text-xs md:text-sm leading-relaxed flex-1">
                      {service.description}
                    </p>
                    <div className="mt-2 md:mt-4">
                      <Button asChild size="sm" variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-white w-full text-xs md:text-sm">
                        <Link href="/programare">
                          <span className="whitespace-nowrap">Programeaza</span>
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary">De ce sa alegi UnidentArt?</h2>
              <ul className="mt-6 space-y-4">
                {[
                  'Echipamente si tehnologii de ultima generatie',
                  'Materiale dentare premium importate din Germania si SUA',
                  'Personal medical cu experienta internationala',
                  'Sterilizare si igiena la cele mai inalte standarde',
                  'Garantie extinsa pentru toate tratamentele',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-secondary text-sm font-bold">{index + 1}</span>
                    </div>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold">Prima consultatie</h3>
              <p className="mt-2 text-white/80">
                Include examinare completa, radiografie digitala si plan de tratament personalizat.
              </p>
              <p className="mt-4 text-white/90">
                Contacteaza-ne pentru mai multe detalii despre serviciile noastre.
              </p>
              <Button asChild className="mt-6 bg-white text-primary hover:bg-white/90">
                <Link href="/programare">
                  Programeaza Acum
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ai intrebari despre serviciile noastre?</h2>
          <p className="mt-4 text-white/80 max-w-xl mx-auto">
            Contacteaza-ne pentru mai multe informatii sau programeaza o consultatie gratuita.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white">
              <Link href="/programare">Programeaza o Consultatie</Link>
            </Button>
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white">
              <a href="tel:022508080">Suna-ne: 022 50 80 80</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
