import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AppointmentService} from "../../services/appointment.service";
import {Appointment} from "../../interfaces/appointment";
import Sweet from "sweetalert2";
import {SharedService} from "../../services/shared.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit, OnDestroy {

  uid: string | null = null;
  mostrarFormulario: number | null = null;
  formCita: FormGroup;
  appointments: Appointment[];
  private ngUnsubscribe = new Subject<void>();
  constructor(
      private router: Router,
      private appointmentService: AppointmentService,
      private sharedService: SharedService,
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

  ngOnInit() {
      this.sharedService.getLoggedInUid()
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(uid => {
              this.uid = uid;
              this.loadAppointments();
          });
  }
  ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
  }

  private loadAppointments() {
      this.appointmentService.getAppointments(this.uid).subscribe(appointments => {
          this.appointments = appointments;
      });
  }

  toggleFormulario(numberForm: number): void {
    this.mostrarFormulario = numberForm;
  }

  agendarCita() {
    this.appointmentService.addAppointment(this.formCita.value, this.uid)
        .then(response => {
          Swal.fire(
            'Cita agendada con exito',
            '',
            'success'
          ).then(r => window.location.reload());
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
    this.appointmentService.addExam(this.formCita.value)
        .then(response => {
          Swal.fire(
            'Examen agendado con exito',
            '',
            'success'
          ).then(r =>  window.location.reload());
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

  onClickDelete(appointments: Appointment) {
    Sweet.fire({
      title: 'Quieres eliminar esta cita?',
      showDenyButton: true,
      confirmButtonText: 'OK',
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        Sweet.fire('Eliminada', '', 'success')
        this.appointmentService.deleteAppointment(appointments).then(r => {});
      }
    })
  }

}
