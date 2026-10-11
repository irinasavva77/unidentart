"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useStore } from '@/lib/store'
import { CheckCircle, Calendar, Users, Award, ArrowRight } from 'lucide-react'

export default function HomePage() {
  const { services, doctors } = useStore()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/90 text-white py-10 lg:py-14">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
              Clinica UniDentArt<br />Îngrijire Dentară Cuprinzătoare
            </h1>
            <p className="mt-3 text-sm text-white/80 leading-relaxed">
              La UnidentArt, combinam expertiza medicala cu cele mai moderne tehnologii
              pentru a-ti oferi servicii stomatologice de exceptie.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild size="sm" className="bg-secondary hover:bg-secondary/90 text-white">
                <Link href="/programare">
                  Programeaza-te Acum
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="sm" className="bg-secondary hover:bg-secondary/90 text-white">
                <Link href="/servicii">Vezi Serviciile</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: CheckCircle, title: 'Calitate Premium', desc: 'Materiale si echipamente de ultima generatie' },
              { icon: Calendar, title: 'Programare Rapida', desc: 'Sistem online simplu si eficient' },
              { icon: Users, title: 'Echipa Dedicata', desc: 'Specialisti cu experienta vasta' },
              { icon: Award, title: 'Garantie Extinsa', desc: 'Garantie pentru toate tratamentele' },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center">
                  <feature.icon className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-primary">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">Serviciile Noastre</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Oferim o gama completa de servicii stomatologice pentru a raspunde tuturor nevoilor tale
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 4).map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                    <span className="text-2xl">
                      {service.icon === 'stethoscope' && '🔬'}
                      {service.icon === 'sparkles' && '🦷'}
                      {service.icon === 'tooth' && '🪥'}
                      {service.icon === 'sun' && '🦷'}
                      {service.icon === 'scissors' && '✂️'}
                      {service.icon === 'wrench' && '🦿'}
                      {service.icon === 'grid' && '😁'}
                      {service.icon === 'smile' && '😊'}
                    </span>
                  </div>
                  <h3 className="font-semibold text-primary">{service.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              <Link href="/servicii">
                Vezi Toate Serviciile
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">Echipa Noastra</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Cunoaste specialistii care vor avea grija de zambetul tau
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {doctors.map((doctor) => (
              <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center overflow-hidden">
                  {doctor.image && !doctor.image.startsWith('/doctors') ? (
                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-10 h-10 md:w-24 md:h-24 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-lg md:text-4xl text-primary font-bold">
                        {doctor.name.split(' ')[1]?.[0] || doctor.name[0]}
                      </span>
                    </div>
                  )}
                </div>
                <CardContent className="p-2 md:p-4 text-center">
                  <h3 className="font-semibold text-primary text-xs md:text-base">{doctor.name}</h3>
                  <p className="text-xs text-secondary">{doctor.specialty}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              <Link href="/echipa">
                Afla Mai Multe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Pregatit pentru un zambet nou?</h2>
          <p className="mt-4 text-white/80 max-w-xl mx-auto">
            Programeaza-te online in mai putin de un minut si lasa-ne pe noi sa avem grija de zambetul tau.
          </p>
          <Button asChild size="lg" className="mt-8 bg-white text-secondary hover:bg-white/90">
            <Link href="/programare">
              Programeaza o Consultatie
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
