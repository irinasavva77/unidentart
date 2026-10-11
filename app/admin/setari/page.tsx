"use client"

import { useState } from 'react'
import { useStore, Doctor, Service } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Plus, Pencil, Trash2, Users, Stethoscope } from 'lucide-react'

export default function AdminSetariPage() {
  const { doctors, services, addDoctor, updateDoctor, deleteDoctor, addService, updateService, deleteService } = useStore()
  
  const [doctorDialogOpen, setDoctorDialogOpen] = useState(false)
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false)
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null)
  const [editingService, setEditingService] = useState<Service | null>(null)
  
  const [doctorForm, setDoctorForm] = useState({
    name: '',
    specialty: '',
    description: '',
    image: ''
  })
  
  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    icon: 'stethoscope'
  })

  // Doctor handlers
  const openDoctorDialog = (doctor?: Doctor) => {
    if (doctor) {
      setEditingDoctor(doctor)
      setDoctorForm({
        name: doctor.name,
        specialty: doctor.specialty,
        description: doctor.description,
        image: doctor.image
      })
    } else {
      setEditingDoctor(null)
      setDoctorForm({ name: '', specialty: '', description: '', image: '' })
    }
    setDoctorDialogOpen(true)
  }

  const handleDoctorSubmit = () => {
    if (editingDoctor) {
      updateDoctor(editingDoctor.id, doctorForm)
    } else {
      addDoctor(doctorForm)
    }
    setDoctorDialogOpen(false)
    setDoctorForm({ name: '', specialty: '', description: '', image: '' })
  }

  const handleDeleteDoctor = (id: string) => {
    if (confirm('Esti sigur ca vrei sa stergi acest doctor?')) {
      deleteDoctor(id)
    }
  }

  // Service handlers
  const openServiceDialog = (service?: Service) => {
    if (service) {
      setEditingService(service)
      setServiceForm({
        name: service.name,
        description: service.description,
        price: service.price,
        duration: service.duration,
        icon: service.icon
      })
    } else {
      setEditingService(null)
      setServiceForm({ name: '', description: '', price: '', duration: '', icon: 'stethoscope' })
    }
    setServiceDialogOpen(true)
  }

  const handleServiceSubmit = () => {
    if (editingService) {
      updateService(editingService.id, serviceForm)
    } else {
      addService(serviceForm)
    }
    setServiceDialogOpen(false)
    setServiceForm({ name: '', description: '', price: '', duration: '', icon: 'stethoscope' })
  }

  const handleDeleteService = (id: string) => {
    if (confirm('Esti sigur ca vrei sa stergi acest serviciu?')) {
      deleteService(id)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Servicii & Echipa</h1>
        <p className="text-muted-foreground mt-1">Gestioneaza serviciile si echipa clinicii</p>
      </div>

      <Tabs defaultValue="doctors" className="space-y-6">
        <TabsList>
          <TabsTrigger value="doctors" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Echipa ({doctors.length})
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4" />
            Servicii ({services.length})
          </TabsTrigger>
        </TabsList>

        {/* Doctors Tab */}
        <TabsContent value="doctors" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-primary">Doctori</h2>
            <Button onClick={() => openDoctorDialog()} className="bg-secondary hover:bg-secondary/90">
              <Plus className="h-4 w-4 mr-2" />
              Adauga Doctor
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {doctors.map((doctor) => (
              <Card key={doctor.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-primary">
                        {doctor.name.split(' ')[1]?.[0] || doctor.name[0]}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-primary">{doctor.name}</h3>
                      <p className="text-sm text-secondary">{doctor.specialty}</p>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {doctor.description}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => openDoctorDialog(doctor)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteDoctor(doctor.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-primary">Servicii</h2>
            <Button onClick={() => openServiceDialog()} className="bg-secondary hover:bg-secondary/90">
              <Plus className="h-4 w-4 mr-2" />
              Adauga Serviciu
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <Card key={service.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-primary">{service.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {service.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="text-muted-foreground">{service.duration}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => openServiceDialog(service)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Doctor Dialog */}
      <Dialog open={doctorDialogOpen} onOpenChange={setDoctorDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingDoctor ? 'Editeaza Doctor' : 'Adauga Doctor'}</DialogTitle>
            <DialogDescription>
              {editingDoctor ? 'Modifica informatiile doctorului' : 'Completeaza datele pentru noul doctor'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="doctor-name">Nume Complet</Label>
              <Input
                id="doctor-name"
                value={doctorForm.name}
                onChange={(e) => setDoctorForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Dr. Ion Popescu"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doctor-specialty">Specializare</Label>
              <Input
                id="doctor-specialty"
                value={doctorForm.specialty}
                onChange={(e) => setDoctorForm(prev => ({ ...prev, specialty: e.target.value }))}
                placeholder="Stomatologie Generala"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doctor-description">Descriere</Label>
              <Textarea
                id="doctor-description"
                value={doctorForm.description}
                onChange={(e) => setDoctorForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descrierea experientei si specializarii..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDoctorDialogOpen(false)}>
              Anuleaza
            </Button>
            <Button onClick={handleDoctorSubmit} className="bg-secondary hover:bg-secondary/90">
              {editingDoctor ? 'Salveaza' : 'Adauga'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Service Dialog */}
      <Dialog open={serviceDialogOpen} onOpenChange={setServiceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingService ? 'Editeaza Serviciu' : 'Adauga Serviciu'}</DialogTitle>
            <DialogDescription>
              {editingService ? 'Modifica informatiile serviciului' : 'Completeaza datele pentru noul serviciu'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="service-name">Nume Serviciu</Label>
              <Input
                id="service-name"
                value={serviceForm.name}
                onChange={(e) => setServiceForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Consultatie"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service-description">Descriere</Label>
              <Textarea
                id="service-description"
                value={serviceForm.description}
                onChange={(e) => setServiceForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descrierea serviciului..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service-duration">Durata</Label>
              <Input
                id="service-duration"
                value={serviceForm.duration}
                onChange={(e) => setServiceForm(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="30 min"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setServiceDialogOpen(false)}>
              Anuleaza
            </Button>
            <Button onClick={handleServiceSubmit} className="bg-secondary hover:bg-secondary/90">
              {editingService ? 'Salveaza' : 'Adauga'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
