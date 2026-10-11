// UnidentArt Dental Clinic - Data Store

const ADMIN_PASSWORD = 'unidentart2024';
const STORAGE_KEY = 'unidentart-storage';

// Initial Data
const initialDoctors = [
  {
    id: '1',
    name: 'Dr. Maria Popescu',
    specialty: 'Stomatologie Generala',
    description: 'Cu o experienta de peste 15 ani in stomatologie, Dr. Maria Popescu ofera servicii complete de ingrijire dentara pentru intreaga familie.',
    image: '/doctors/doctor-1.jpg'
  },
  {
    id: '2',
    name: 'Dr. Andrei Ionescu',
    specialty: 'Ortodontie',
    description: 'Specialist in corectarea pozitiei dintilor si a problemelor de ocluzie. Dr. Ionescu utilizeaza cele mai moderne tehnici de ortodontie.',
    image: '/doctors/doctor-2.jpg'
  },
  {
    id: '3',
    name: 'Dr. Elena Dumitrescu',
    specialty: 'Implantologie',
    description: 'Expert in implantologie dentara cu peste 500 de implanturi realizate cu succes. Tehnologii de ultima generatie.',
    image: '/doctors/doctor-3.jpg'
  },
  {
    id: '4',
    name: 'Dr. Alexandru Marin',
    specialty: 'Estetica Dentara',
    description: 'Pasionat de zambetul perfect, Dr. Marin este specializat in fatete dentare, albire si restaurari estetice.',
    image: '/doctors/doctor-4.jpg'
  },
  {
    id: '5',
    name: 'Dr. Cristina Vasile',
    specialty: 'Endodontie',
    description: 'Specialist in tratamente de canal si proceduri endodontice complexe. Dr. Vasile are o rata de succes de peste 98%.',
    image: '/doctors/doctor-5.jpg'
  },
  {
    id: '6',
    name: 'Dr. Mihai Stanescu',
    specialty: 'Parodontologie',
    description: 'Expert in tratamentul bolilor gingivale si parodontale. Dr. Stanescu ofera solutii complete pentru sanatatea gingiilor.',
    image: '/doctors/doctor-6.jpg'
  },
  {
    id: '7',
    name: 'Dr. Ana Radu',
    specialty: 'Pedodontie',
    description: 'Specializata in stomatologie pediatrica, Dr. Radu creeaza o experienta placuta si relaxanta pentru cei mici.',
    image: '/doctors/doctor-7.jpg'
  }
];

const initialServices = [
  {
    id: '1',
    name: 'Consultatie si Diagnostic',
    description: 'Evaluare completa a sanatatii orale, inclusiv examinare clinica si radiografii dentare digitale.',
    duration: '30 min',
    icon: 'stethoscope'
  },
  {
    id: '2',
    name: 'Igienizare Profesionala',
    description: 'Curatare profesionala a dintilor, indepartarea tartrului si a petelor, periaj profesional.',
    duration: '45 min',
    icon: 'sparkles'
  },
  {
    id: '3',
    name: 'Plomba Estetica',
    description: 'Restaurari dentare cu materiale compozite de ultima generatie, in nuante naturale.',
    duration: '45 min',
    icon: 'tooth'
  },
  {
    id: '4',
    name: 'Albire Dentara',
    description: 'Tratament de albire profesionala pentru un zambet mai stralucitor cu pana la 8 nuante.',
    duration: '60 min',
    icon: 'sun'
  },
  {
    id: '5',
    name: 'Extractie Dentara',
    description: 'Extractii simple si chirurgicale, inclusiv dinti de minte, cu anestezie locala.',
    duration: '30-60 min',
    icon: 'scissors'
  },
  {
    id: '6',
    name: 'Implant Dentar',
    description: 'Implanturi dentare premium cu garantie pe viata. Include consultatie si planificare 3D.',
    duration: '90 min',
    icon: 'wrench'
  },
  {
    id: '7',
    name: 'Aparat Dentar',
    description: 'Tratamente ortodontice cu aparate fixe sau mobile pentru corectarea pozitiei dintilor.',
    duration: 'Variabil',
    icon: 'grid'
  },
  {
    id: '8',
    name: 'Fateta Dentara',
    description: 'Fatete ceramice sau compozite pentru un zambet perfect. Transformare estetica completa.',
    duration: '2 sedinte',
    icon: 'smile'
  }
];

const initialAppointments = [
  {
    id: '1',
    firstName: 'Ion',
    lastName: 'Vasilescu',
    phone: '0721123456',
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
    phone: '0732234567',
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
    phone: '0743345678',
    doctorId: '3',
    serviceId: '6',
    date: '2024-01-17',
    time: '09:00',
    message: 'Doresc informatii despre implant dentar.',
    status: 'completed',
    createdAt: '2024-01-08T10:15:00Z'
  }
];

// Store Class
class Store {
  constructor() {
    this.loadFromStorage();
  }

  loadFromStorage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      this.doctors = data.doctors || initialDoctors;
      this.services = data.services || initialServices;
      this.appointments = data.appointments || initialAppointments;
      this.isAdminAuthenticated = data.isAdminAuthenticated || false;
    } else {
      this.doctors = [...initialDoctors];
      this.services = [...initialServices];
      this.appointments = [...initialAppointments];
      this.isAdminAuthenticated = false;
    }
  }

  saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      doctors: this.doctors,
      services: this.services,
      appointments: this.appointments,
      isAdminAuthenticated: this.isAdminAuthenticated
    }));
  }

  // Appointments
  addAppointment(appointment) {
    const newAppointment = {
      ...appointment,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    this.appointments.push(newAppointment);
    this.saveToStorage();
    return newAppointment;
  }

  updateAppointmentStatus(id, status) {
    const index = this.appointments.findIndex(a => a.id === id);
    if (index !== -1) {
      this.appointments[index].status = status;
      this.saveToStorage();
    }
  }

  deleteAppointment(id) {
    this.appointments = this.appointments.filter(a => a.id !== id);
    this.saveToStorage();
  }

  // Doctors
  addDoctor(doctor) {
    const newDoctor = {
      ...doctor,
      id: Date.now().toString()
    };
    this.doctors.push(newDoctor);
    this.saveToStorage();
    return newDoctor;
  }

  updateDoctor(id, updates) {
    const index = this.doctors.findIndex(d => d.id === id);
    if (index !== -1) {
      this.doctors[index] = { ...this.doctors[index], ...updates };
      this.saveToStorage();
    }
  }

  deleteDoctor(id) {
    this.doctors = this.doctors.filter(d => d.id !== id);
    this.saveToStorage();
  }

  // Services
  addService(service) {
    const newService = {
      ...service,
      id: Date.now().toString()
    };
    this.services.push(newService);
    this.saveToStorage();
    return newService;
  }

  updateService(id, updates) {
    const index = this.services.findIndex(s => s.id === id);
    if (index !== -1) {
      this.services[index] = { ...this.services[index], ...updates };
      this.saveToStorage();
    }
  }

  deleteService(id) {
    this.services = this.services.filter(s => s.id !== id);
    this.saveToStorage();
  }

  // Auth
  loginAdmin(password) {
    if (password === ADMIN_PASSWORD) {
      this.isAdminAuthenticated = true;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  logoutAdmin() {
    this.isAdminAuthenticated = false;
    this.saveToStorage();
  }

  // Helpers
  getDoctorById(id) {
    return this.doctors.find(d => d.id === id);
  }

  getServiceById(id) {
    return this.services.find(s => s.id === id);
  }

  getStats() {
    return {
      total: this.appointments.length,
      pending: this.appointments.filter(a => a.status === 'pending').length,
      confirmed: this.appointments.filter(a => a.status === 'confirmed').length,
      completed: this.appointments.filter(a => a.status === 'completed').length,
      cancelled: this.appointments.filter(a => a.status === 'cancelled').length
    };
  }
}

// Create global store instance
const store = new Store();
