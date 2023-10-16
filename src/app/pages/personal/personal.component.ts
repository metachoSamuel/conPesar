import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AppointmentService} from "../../services/appointment.service";
import {Appointment} from "../../interfaces/appointment";

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit{

  mostrarFormulario: number | null = null;
  formCita: FormGroup;
  appointments: Appointment[];

  constructor(
      private router: Router,
      private appointmentService: AppointmentService
  ) {
    this.appointments = []
    this.formCita = new FormGroup({
      name: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      numDoc: new FormControl(),
      dateAppointment: new FormControl(),
      comments: new FormControl(),
    })
  }

  ngOnInit () {
    this.appointmentService.getAppointments().subscribe(appointments => {
      console.log(appointments)
      this.appointments = appointments;
    })
  }

  toggleFormulario(numberForm: number): void {
    this.mostrarFormulario = numberForm;
  }

  agendarCita() {
    console.log(this.formCita.value);
    this.appointmentService.addAppointment(this.formCita.value)
        .then(response => {
          Swal.fire(
              'Cita agendada con exito',
              '',
              'success'
          )
          this.router.navigate(['/personal']).then(r => {});
        })
        .catch(error => {
          console.log(error)
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudo agendar la cita'
              })
        });
  }

  agendarExam() {
    console.log(this.formCita.value);
    this.appointmentService.addExam(this.formCita.value)
        .then(response => {
          Swal.fire(
              'Examen agendado con exito',
              '',
              'success'
          )
          this.router.navigate(['/personal']).then(r => {});
        })
        .catch(error => {
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo agendar el Examen'
          })
        });
  }

}
