"use client"

import { useState } from 'react'
import { useStore, Appointment } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Calendar, Phone, User, Trash2, Eye, Search } from 'lucide-react'

export default function AdminProgramariPage() {
  const { appointments, doctors, services, updateAppointmentStatus, deleteAppointment } = useStore()
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const filteredAppointments = appointments
    .filter(apt => statusFilter === 'all' || apt.status === statusFilter)
    .filter(apt => {
      if (!searchQuery) return true
      const searchLower = searchQuery.toLowerCase()
      return (
        apt.firstName.toLowerCase().includes(searchLower) ||
        apt.lastName.toLowerCase().includes(searchLower) ||
        apt.phone.includes(searchQuery)
      )
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'In asteptare'
      case 'confirmed': return 'Confirmata'
      case 'completed': return 'Finalizata'
      case 'cancelled': return 'Anulata'
      default: return status
    }
  }

  const handleStatusChange = (appointmentId: string, newStatus: Appointment['status']) => {
    updateAppointmentStatus(appointmentId, newStatus)
  }

  const handleDelete = (appointmentId: string) => {
    if (confirm('Esti sigur ca vrei sa stergi aceasta programare?')) {
      deleteAppointment(appointmentId)
    }
  }

  const viewDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Programari</h1>
        <p className="text-muted-foreground mt-1">Gestioneaza toate programarile clinicii</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cauta dupa nume sau telefon..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtreaza dupa status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate</SelectItem>
                <SelectItem value="pending">In asteptare</SelectItem>
                <SelectItem value="confirmed">Confirmate</SelectItem>
                <SelectItem value="completed">Finalizate</SelectItem>
                <SelectItem value="cancelled">Anulate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Appointments Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {filteredAppointments.length} programari
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nu exista programari care sa corespunda criteriilor.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pacient</TableHead>
                    <TableHead>Telefon</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Serviciu</TableHead>
                    <TableHead>Data/Ora</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actiuni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => {
                    const doctor = doctors.find(d => d.id === appointment.doctorId)
                    const service = services.find(s => s.id === appointment.serviceId)
                    return (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">
                          {appointment.lastName} {appointment.firstName}
                        </TableCell>
                        <TableCell>{appointment.phone}</TableCell>
                        <TableCell>{doctor?.name || '-'}</TableCell>
                        <TableCell>{service?.name || '-'}</TableCell>
                        <TableCell>
                          {appointment.date} la {appointment.time}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={appointment.status}
                            onValueChange={(value) => handleStatusChange(appointment.id, value as Appointment['status'])}
                          >
                            <SelectTrigger className={`w-32 h-8 text-xs ${getStatusColor(appointment.status)}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">In asteptare</SelectItem>
                              <SelectItem value="confirmed">Confirmata</SelectItem>
                              <SelectItem value="completed">Finalizata</SelectItem>
                              <SelectItem value="cancelled">Anulata</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => viewDetails(appointment)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDelete(appointment.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detalii Programare</DialogTitle>
            <DialogDescription>
              Informatii complete despre programare
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <User className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-sm text-muted-foreground">Pacient</p>
                  <p className="font-medium">{selectedAppointment.lastName} {selectedAppointment.firstName}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Phone className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-sm text-muted-foreground">Telefon</p>
                  <p className="font-medium">{selectedAppointment.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Calendar className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-sm text-muted-foreground">Data si Ora</p>
                  <p className="font-medium">{selectedAppointment.date} la {selectedAppointment.time}</p>
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Doctor</p>
                <p className="font-medium">
                  {doctors.find(d => d.id === selectedAppointment.doctorId)?.name || '-'}
                </p>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Serviciu</p>
                <p className="font-medium">
                  {services.find(s => s.id === selectedAppointment.serviceId)?.name || '-'}
                </p>
              </div>

              {selectedAppointment.message && (
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Mesaj</p>
                  <p className="font-medium">{selectedAppointment.message}</p>
                </div>
              )}

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Status</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(selectedAppointment.status)}`}>
                  {getStatusText(selectedAppointment.status)}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
