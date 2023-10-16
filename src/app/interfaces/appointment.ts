export interface Appointment {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  numDoc: string;
  dateAppointment: Date;
  comments: string;
}
export interface Exam {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  numDoc: string;
  dateAppointment: Date;
  examType: string;
}
