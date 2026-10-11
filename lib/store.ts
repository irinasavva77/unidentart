import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Doctor {
  id: string
  name: string
  specialty: string
  description: string
  image: string
}

export interface Service {
  id: string
  name: string
  description: string
  price: string
  duration: string
  icon: string
}

export interface Appointment {
  id: string
  firstName: string
  lastName: string
  phone: string
  doctorId: string
  serviceId: string
  date: string
  time: string
  message: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
}

interface StoreState {
  doctors: Doctor[]
  services: Service[]
  appointments: Appointment[]
  isAdminAuthenticated: boolean
  
  // Actions
  addAppointment: (appointment: Omit<Appointment, 'id' | 'status' | 'createdAt'>) => void
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void
  deleteAppointment: (id: string) => void
  
  addDoctor: (doctor: Omit<Doctor, 'id'>) => void
  updateDoctor: (id: string, doctor: Partial<Doctor>) => void
  deleteDoctor: (id: string) => void
  
  addService: (service: Omit<Service, 'id'>) => void
  updateService: (id: string, service: Partial<Service>) => void
  deleteService: (id: string) => void
  
  loginAdmin: (password: string) => boolean
  logoutAdmin: () => void
}

const ADMIN_PASSWORD = 'test'

const initialDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Dorin Istrati',
    specialty: 'Endodontie',
    description: 'Specialist in tratamente de canal si proceduri endodontice complexe, Dr. Dorin Istrati utilizeaza tehnici moderne de instrumentare mecanica pentru rezultate precise si confortabile.',
    image: '/dorin_istrati.png'
  },
  {
    id: '2',
    name: 'Dr. Nicolae Melnic',
    specialty: 'Parodontologie',
    description: 'Expert in diagnosticul si tratamentul bolilor parodontale, Dr. Nicolae Melnic ofera terapii complete pentru sanatatea gingiilor si a tesuturilor de sustinere ale dintilor.',
    image: '/melnic_nicolae.png'
  },
  {
    id: '3',
    name: 'Dr. Lilian Calaras',
    specialty: 'Chirurgie',
    description: 'Specialist in chirurgie oro-maxilo-faciala, Dr. Lilian Calaras efectueaza extractii complexe, implanturi dentare si interventii chirurgicale cu un nivel inalt de siguranta si precizie.',
    image: '/lilian_calaras.png'
  },
  {
    id: '4',
    name: 'Dr. Doina Calaras',
    specialty: 'Stomatologie Pediatrica',
    description: 'Dedicata ingrijirii dentare a copiilor, Dr. Doina Calaras creeaza un mediu prietenos si relaxant, asigurand sanatatea orala a celor mici inca de la primii dinti.',
    image: '/doina_calaras.png'
  },
  {
    id: '5',
    name: 'Dr. Lidia Oprea',
    specialty: 'Protetica Dentara',
    description: 'Specializata in reconstructia estetica si functionala a dentitiei, Dr. Lidia Oprea confectioneaza coroane, punti si proteze dentare de inalta calitate, adaptate nevoilor fiecarui pacient.',
    image: '/lidia_oprea.png'
  },
  {
    id: '6',
    name: 'Dr. Alina Cucerescu',
    specialty: 'Tratament Terapeutic',
    description: 'Orientata spre prevenire si tratament conservator, Dr. Alina Cucerescu ofera consultatii complete, obturatii estetice si terapii de mentinere a sanatatii orale pe termen lung.',
    image: '/alina_cucerescu.png'
  },
  {
    id: '7',
    name: 'Dr. Valeria Turcan',
    specialty: 'Endodontie',
    description: 'Cu o rata de succes de peste 98%, Dr. Valeria Turcan este experta in tratamente de canal si proceduri endodontice avansate, eliminand durerea si salvand dintii naturali ai pacientilor.',
    image: '/doctors/doctor-7.jpg'
  }
]

const initialServices: Service[] = [
  {
    id: '1',
    name: 'Consultatie si Diagnostic',
    description: 'Evaluare completa a sanatatii orale, inclusiv examinare clinica si radiografii dentare digitale.',
    price: '',
    duration: '30 min',
    icon: 'stethoscope'
  },
  {
    id: '2',
    name: 'Igienizare Profesionala',
    description: 'Curatare profesionala a dintilor, indepartarea tartrului si a petelor, periaj profesional.',
    price: '',
    duration: '45 min',
    icon: 'sparkles'
  },
  {
    id: '3',
    name: 'Restaurare Estetica',
    description: 'Restaurari dentare cu materiale compozite de ultima generatie, in nuante naturale.',
    price: '',
    duration: '60 min',
    icon: 'tooth'
  },
  {
    id: '4',
    name: 'Albire Dentara',
    description: 'Tratament de albire profesionala pentru un zambet mai stralucitor cu pana la 8 nuante.',
    price: '',
    duration: '120 min',
    icon: 'sun'
  },
  {
    id: '5',
    name: 'Extractie Dentara',
    description: 'Extractii simple si chirurgicale, inclusiv dinti de minte, cu anestezie locala.',
    price: '',
    duration: '30-60 min',
    icon: 'scissors'
  },
  {
    id: '6',
    name: 'Implant Dentar',
    description: 'Implanturi dentare premium cu garantie pe viata. Include consultatie si planificare 3D.',
    price: '',
    duration: '30 min',
    icon: 'wrench'
  },
  {
    id: '7',
    name: 'Tratament Ortodontic',
    description: 'Tratamente ortodontice cu aparate fixe sau mobile pentru corectarea pozitiei dintilor.',
    price: '',
    duration: 'Variabil',
    icon: 'grid'
  },
  {
    id: '9',
    name: 'Tratament Parodontologic',
    description: 'Diagnostic si tratament al bolilor gingivale si parodontale pentru sanatatea pe termen lung a gingiilor.',
    price: '',
    duration: '60 min',
    icon: 'wrench'
  },
  {
    id: '8',
    name: 'Fateta Dentara',
    description: 'Fatete ceramice sau compozite pentru un zambet perfect. Transformare estetica completa.',
    price: '',
    duration: '2 sedinte',
    icon: 'smile'
  }
]

const initialAppointments: Appointment[] = [
  {
    id: '1',
    firstName: 'Ion',
    lastName: 'Vasilescu',
    phone: '065365465',
    doctorId: '1',
    serviceId: '1',
    date: '2024-01-15',
    time: '10:00',
    message: 'As dori o consultatie pentru durere de masea.',
    status: 'confirmed',
    createdAt: '2024-01-10T08:30:00Z'
  },
  {
    id: '2',
    firstName: 'Ana',
    lastName: 'Georgescu',
    phone: '065365465',
    doctorId: '2',
    serviceId: '7',
    date: '2024-01-16',
    time: '14:00',
    message: 'Consultatie pentru aparat dentar pentru copilul meu.',
    status: 'pending',
    createdAt: '2024-01-11T14:20:00Z'
  },
  {
    id: '3',
    firstName: 'Mihai',
    lastName: 'Stanescu',
    phone: '065365465',
    doctorId: '3',
    serviceId: '6',
    date: '2024-01-17',
    time: '09:00',
    message: 'Doresc informatii despre implant dentar.',
    status: 'completed',
    createdAt: '2024-01-08T10:15:00Z'
  }
] 

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      doctors: initialDoctors,
      services: initialServices,
      appointments: initialAppointments,
      isAdminAuthenticated: false,
      
      addAppointment: (appointment) => {
        const newAppointment: Appointment = {
          ...appointment,
          id: Date.now().toString(),
          status: 'pending',
          createdAt: new Date().toISOString()
        }
        set((state) => ({
          appointments: [...state.appointments, newAppointment]
        }))
      },
      
      updateAppointmentStatus: (id, status) => {
        set((state) => ({
          appointments: state.appointments.map((apt) =>
            apt.id === id ? { ...apt, status } : apt
          )
        }))
      },
      
      deleteAppointment: (id) => {
        set((state) => ({
          appointments: state.appointments.filter((apt) => apt.id !== id)
        }))
      },
      
      addDoctor: (doctor) => {
        const newDoctor: Doctor = {
          ...doctor,
          id: Date.now().toString()
        }
        set((state) => ({
          doctors: [...state.doctors, newDoctor]
        }))
      },
      
      updateDoctor: (id, doctor) => {
        set((state) => ({
          doctors: state.doctors.map((d) =>
            d.id === id ? { ...d, ...doctor } : d
          )
        }))
      },
      
      deleteDoctor: (id) => {
        set((state) => ({
          doctors: state.doctors.filter((d) => d.id !== id)
        }))
      },
      
      addService: (service) => {
        const newService: Service = {
          ...service,
          id: Date.now().toString()
        }
        set((state) => ({
          services: [...state.services, newService]
        }))
      },
      
      updateService: (id, service) => {
        set((state) => ({
          services: state.services.map((s) =>
            s.id === id ? { ...s, ...service } : s
          )
        }))
      },
      
      deleteService: (id) => {
        set((state) => ({
          services: state.services.filter((s) => s.id !== id)
        }))
      },
      
      loginAdmin: (password) => {
        if (password === ADMIN_PASSWORD) {
          set({ isAdminAuthenticated: true })
          return true
        }
        return false
      },
      
      logoutAdmin: () => {
        set({ isAdminAuthenticated: false })
      }
    }),
    {
      name: 'unidentart-storage-v3',
      partialize: (state) => ({
        doctors: state.doctors,
        services: state.services,
        appointments: state.appointments,
      })
    }
  )
)
