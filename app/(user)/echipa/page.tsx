"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useStore } from '@/lib/store'
import { ArrowRight, GraduationCap, Award, Heart } from 'lucide-react'

export default function EchipaPage() {
  const { doctors } = useStore()

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance">Echipa Noastra</h1>
            <p className="mt-4 text-lg text-white/80">
              Cunoaste specialistii care vor avea grija de zambetul tau. Echipa noastra 
              combina experienta cu pasiunea pentru stomatologie.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid - Single Row */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {doctors.map((doctor) => (
              <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col border-0 shadow-sm">
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center overflow-hidden">
                  {doctor.image && !doctor.image.startsWith('/doctors') ? (
                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-2xl text-primary font-bold">
                        {doctor.name.split(' ')[1]?.[0] || doctor.name[0]}
                      </span>
                    </div>
                  )}
                </div>
                <CardContent className="px-3 py-3 flex flex-col flex-1">
                  <div className="text-center flex flex-col flex-1">
                    <h3 className="text-sm font-bold text-primary leading-tight">{doctor.name}</h3>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-xs font-medium">{doctor.specialty}</span>
                    <p className="mt-2 text-muted-foreground text-xs leading-relaxed flex-1 line-clamp-3">
                      {doctor.description}
                    </p>
                    <Button asChild className="mt-3 w-full bg-secondary hover:bg-secondary/90 text-white text-xs" size="sm">
                      <Link href={`/programare?doctor=${doctor.id}`}>
                        <span className="whitespace-nowrap">Programeaza-te</span>
                        <ArrowRight className="ml-1 h-3 w-3 flex-shrink-0" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">Valorile Noastre</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              La UnidentArt, suntem ghidati de principii care pun pacientul pe primul loc
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                <GraduationCap className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-primary">Excelenta Profesionala</h3>
              <p className="mt-3 text-muted-foreground">
                Echipa noastra participa constant la cursuri si conferinte internationale 
                pentru a fi la curent cu cele mai noi tehnici si tratamente.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-primary">Grija pentru Pacient</h3>
              <p className="mt-3 text-muted-foreground">
                Fiecare pacient este unic, de aceea oferim tratamente personalizate si 
                atentie la fiecare detaliu pentru confortul tau.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                <Award className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-primary">Echipamente Moderne</h3>
              <p className="mt-3 text-muted-foreground">
                Folosim doar materiale premium si oferim garantie pentru toate 
                lucrarile noastre, pentru siguranta ta pe termen lung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Pregatit sa ne cunosti?</h2>
          <p className="mt-4 text-white/80 max-w-xl mx-auto">
            Programeaza o consultatie si lasa echipa noastra sa te ajute sa obtii zambetul perfect.
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
