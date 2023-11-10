import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  doc,
  deleteDoc,
  where,
  getDocs,
  query
} from "@angular/fire/firestore";
import {Appointment} from "../interfaces/appointment";
import {Exam} from "../interfaces/appointment";
import {map, Observable, Observer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private firestore: Firestore) { }

  addAppointment (appointment: Appointment, uid: any) {
    appointment.uuidUser = uid;
    const appointmentRef = collection(this.firestore, 'appointment');
    return addDoc(appointmentRef, appointment);
  }

  addExam (exam: Exam) {
    const examRef = collection(this.firestore, 'exams');
    return addDoc(examRef, exam);
  }

  getAppointments (uid: any): Observable<Appointment[]> {
    const appointmentRef = collection(this.firestore, 'appointment');
    const q = query(appointmentRef, where('uuidUser', '==', uid));
    return collectionData(q) as Observable<Appointment[]>;
  }

  deleteAppointment(appointment: Appointment) {
    const appointmentRef = doc(this.firestore, `appointment/${appointment.id}`);
    return deleteDoc(appointmentRef);
  }

}
