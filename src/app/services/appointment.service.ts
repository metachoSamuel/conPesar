import { Injectable } from '@angular/core';
import {addDoc, collection, collectionData, Firestore} from "@angular/fire/firestore";
import {Appointment} from "../interfaces/appointment";
import {Exam} from "../interfaces/appointment";
import {Observable, Observer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private firestore: Firestore) { }

  addAppointment (appointment: Appointment) {
    const appointmentRef = collection(this.firestore, 'appointment ');
    return addDoc(appointmentRef, appointment);
  }

  addExam (exam: Exam) {
    const examRef = collection(this.firestore, 'Exams ');
    return addDoc(examRef, exam);
  }

  getAppointments (): Observable<Appointment[]> {
    const appointmentRef = collection(this.firestore, 'appointment ');
    return collectionData(appointmentRef, {idField: 'id'}) as Observable<Appointment[]>;
  }
}
