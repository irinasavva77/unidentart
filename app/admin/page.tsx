"use client"

import { useStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Users, Stethoscope, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react'

export default function AdminDashboardPage() {
  const { appointments, doctors, services } = useStore()

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
  }

  const recentAppointments = [...appointments]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Bine ai venit in panoul de administrare</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Programari</p>
                <p className="text-2xl font-bold text-primary">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Asteptare</p>
                <p className="text-2xl font-bold text-primary">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Finalizate</p>
                <p className="text-2xl font-bold text-primary">{stats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Doctori</p>
                <p className="text-2xl font-bold text-primary">{doctors.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Programari Recente</CardTitle>
          </CardHeader>
          <CardContent>
            {recentAppointments.length === 0 ? (
              <p className="text-muted-foreground text-sm">Nu exista programari</p>
            ) : (
              <div className="space-y-4">
                {recentAppointments.map((appointment) => {
                  const doctor = doctors.find(d => d.id === appointment.doctorId)
                  const service = services.find(s => s.id === appointment.serviceId)
                  return (
                    <div key={appointment.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-primary">
                          {appointment.lastName} {appointment.firstName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {doctor?.name} - {service?.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {appointment.date} la {appointment.time}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {getStatusText(appointment.status)}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Services Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Servicii Populare</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {services.slice(0, 5).map((service) => {
                const appointmentCount = appointments.filter(a => a.serviceId === service.id).length
                return (
                  <div key={service.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <Stethoscope className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium text-primary text-sm">{service.name}</p>
                        <p className="text-xs text-muted-foreground">{service.price}</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {appointmentCount} programari
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Statusul Programarilor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-yellow-800">{stats.pending}</p>
                <p className="text-sm text-yellow-600">In asteptare</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-800">{stats.confirmed}</p>
                <p className="text-sm text-blue-600">Confirmate</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-800">{stats.completed}</p>
                <p className="text-sm text-green-600">Finalizate</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
              <XCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-red-800">{stats.cancelled}</p>
                <p className="text-sm text-red-600">Anulate</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
