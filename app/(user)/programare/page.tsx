"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { useStore } from '@/lib/store'
import { Calendar, Clock, CheckCircle, Phone, User, Stethoscope, FileText } from 'lucide-react'

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30'
]

const parseDurationMinutes = (duration: string): number => {
  const match = duration.match(/(\d+)/)
  return match ? parseInt(match[1]) : 30
}

const getSlotsToBlock = (minutes: number): number => {
  if (minutes <= 30) return 1
  if (minutes < 60) return 2  // round up to 1h
  return 4                    // 2h for anything >= 60 min
}

export default function ProgramarePage() {
  const searchParams = useSearchParams()
  const { doctors, services, appointments, addAppointment } = useStore()
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    doctorId: '',
    serviceId: '',
    date: '',
    time: '',
    message: ''
  })
  
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [consent, setConsent] = useState(false)

  const now = new Date()
  const minDate = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('-')

  const bookedTimes = (() => {
    const blocked = new Set<string>()
    appointments
      .filter(
        (apt) =>
          apt.doctorId === formData.doctorId &&
          apt.date === formData.date &&
          apt.status !== 'cancelled'
      )
      .forEach((apt) => {
        const svc = services.find((s) => s.id === apt.serviceId)
        const mins = svc ? parseDurationMinutes(svc.duration) : 30
        const slots = getSlotsToBlock(mins)
        const startIdx = timeSlots.indexOf(apt.time)
        if (startIdx !== -1) {
          for (let i = 0; i < slots; i++) {
            if (startIdx + i < timeSlots.length) {
              blocked.add(timeSlots[startIdx + i])
            }
          }
        }
      })
    return blocked
  })()

  const selectedDayOfWeek = formData.date ? new Date(formData.date + 'T00:00:00').getDay() : null
  const isSaturday = selectedDayOfWeek === 6
  const isToday = formData.date === minDate

  const availableTimeSlots = (() => {
    let slots = isSaturday ? timeSlots.filter((t) => t <= '11:30') : timeSlots
    if (isToday) {
      const cutoff = new Date(now.getTime() + 60 * 60 * 1000)
      const cutoffStr = [
        String(cutoff.getHours()).padStart(2, '0'),
        String(cutoff.getMinutes()).padStart(2, '0'),
      ].join(':')
      slots = slots.filter((t) => t >= cutoffStr)
    }
    return slots
  })()

  useEffect(() => {
    const doctorId = searchParams.get('doctor')
    if (doctorId) {
      setFormData(prev => ({ ...prev, doctorId }))
    }
  }, [searchParams])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.firstName.trim()) newErrors.firstName = 'Prenumele este obligatoriu'
    if (!formData.lastName.trim()) newErrors.lastName = 'Numele este obligatoriu'
    if (!formData.phone.trim()) newErrors.phone = 'Numarul de telefon este obligatoriu'
    else if (!/^0[0-9]{8}$/.test(formData.phone)) newErrors.phone = 'Numarul de telefon nu este valid'
    if (!formData.doctorId) newErrors.doctorId = 'Selecteaza un medic'
    if (!formData.serviceId) newErrors.serviceId = 'Selecteaza o procedura'
    if (!formData.date) newErrors.date = 'Selecteaza o data'
    if (!formData.time) newErrors.time = 'Selecteaza o ora'
    if (!consent) newErrors.consent = 'Trebuie sa fii de acord cu prelucrarea datelor personale'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    addAppointment(formData)
    setIsSubmitted(true)
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'doctorId' || field === 'date' ? { time: '' } : {})
    }))
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-background py-16">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-primary">Programare Trimisa cu Succes!</h1>
          <p className="mt-4 text-muted-foreground">
            Multumim pentru programare! Vei fi contactat in curand de echipa noastra 
            pentru confirmarea programarii.
          </p>
          <Button 
            onClick={() => {
              setIsSubmitted(false)
              setConsent(false)
              setFormData({
                firstName: '',
                lastName: '',
                phone: '',
                doctorId: '',
                serviceId: '',
                date: '',
                time: '',
                message: ''
              })
            }}
            className="mt-6 bg-secondary hover:bg-secondary/90"
          >
            Fa o Alta Programare
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance">Programare Online</h1>
            <p className="mt-4 text-lg text-white/80">
              Completeaza formularul de mai jos pentru a programa o consultatie sau 
              un tratament la clinica noastra.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Formular de Programare</CardTitle>
              <CardDescription>
                Completeaza datele tale si te vom contacta pentru confirmare.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-secondary" />
                      Nume
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Popescu"
                      value={formData.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      className={errors.lastName ? 'border-destructive' : ''}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive">{errors.lastName}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-secondary" />
                      Prenume
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Ion"
                      value={formData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      className={errors.firstName ? 'border-destructive' : ''}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive">{errors.firstName}</p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-secondary" />
                    Numar de Telefon
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="022 50 80 80"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={errors.phone ? 'border-destructive' : ''}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                  )}
                </div>

                {/* Doctor & Procedura */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Stethoscope className="h-4 w-4 text-secondary" />
                      Medic
                    </Label>
                    <Select
                      value={formData.doctorId}
                      onValueChange={(value) => handleChange('doctorId', value)}
                    >
                      <SelectTrigger className={errors.doctorId ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Selecteaza medicul" />
                      </SelectTrigger>
                      <SelectContent>
                        {doctors.map((doctor) => (
                          <SelectItem key={doctor.id} value={doctor.id}>
                            {doctor.name} - {doctor.specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.doctorId && (
                      <p className="text-sm text-destructive">{errors.doctorId}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-secondary" />
                      Procedura
                    </Label>
                    <Select
                      value={formData.serviceId}
                      onValueChange={(value) => handleChange('serviceId', value)}
                    >
                      <SelectTrigger className={errors.serviceId ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Selecteaza procedura" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.serviceId && (
                      <p className="text-sm text-destructive">{errors.serviceId}</p>
                    )}
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-secondary" />
                      Data
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal ${!formData.date ? 'text-muted-foreground' : ''} ${errors.date ? 'border-destructive' : ''}`}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {formData.date ? new Date(formData.date + 'T00:00:00').toLocaleDateString('ro-RO', { day: '2-digit', month: 'long', year: 'numeric' }) : 'Selecteaza data'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          weekStartsOn={1}
                          selected={formData.date ? new Date(formData.date + 'T00:00:00') : undefined}
                          onSelect={(date) => {
                            if (date) {
                              const d = [
                                date.getFullYear(),
                                String(date.getMonth() + 1).padStart(2, '0'),
                                String(date.getDate()).padStart(2, '0'),
                              ].join('-')
                              handleChange('date', d)
                            }
                          }}
                          disabled={(date) => {
                            const d = [
                              date.getFullYear(),
                              String(date.getMonth() + 1).padStart(2, '0'),
                              String(date.getDate()).padStart(2, '0'),
                            ].join('-')
                            return d < minDate || date.getDay() === 0
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.date && (
                      <p className="text-sm text-destructive">{errors.date}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-secondary" />
                      Ora
                    </Label>
                    <Select
                      value={formData.time}
                      onValueChange={(value) => handleChange('time', value)}
                    >
                      <SelectTrigger className={errors.time ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Selecteaza ora" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTimeSlots.map((time) => {
                          const isBooked = bookedTimes.has(time)
                          return (
                            <SelectItem key={time} value={time} disabled={isBooked}>
                              {time}{isBooked ? ' — Ocupat' : ''}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                    {errors.time && (
                      <p className="text-sm text-destructive">{errors.time}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-secondary" />
                    Mesaj (optional)
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Descrie pe scurt motivul vizitei sau orice alte detalii relevante..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                  />
                </div>

                {/* Consent */}
                <div className="space-y-1">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked)
                        if (errors.consent) setErrors(prev => { const n = { ...prev }; delete n.consent; return n })
                      }}
                      className="mt-1 h-4 w-4 accent-secondary cursor-pointer"
                    />
                    <label htmlFor="consent" className="text-sm text-muted-foreground cursor-pointer">
                      Sunt de acord cu prelucrarea datelor cu caracter personal în conformitate cu politica de confidențialitate a clinicii UniDentArt.
                    </label>
                  </div>
                  {errors.consent && (
                    <p className="text-sm text-destructive">{errors.consent}</p>
                  )}
                </div>

                <Button type="submit" size="lg" className="w-full bg-secondary hover:bg-secondary/90 text-white">
                  Trimite Programarea
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="mt-8 text-center text-muted-foreground">
            <p>Pentru urgente sau intrebari, suna-ne la:</p>
            <a href="tel:022508080" className="text-xl font-semibold text-secondary hover:underline">
              022 50 80 80
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
