import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../services/user.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import Sweet from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate('300ms')),
    ]),
  ]
})
export class RegisterComponent implements OnInit {

  formReg: FormGroup;
  constructor(
    private router: Router,
    private userService: UserService
    ) {
    this.formReg = new FormGroup({
      name: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
    Sweet.fire({
      title: 'Gracias por elegirnos, pirmero debes aceptar terminos y condiciones',
      showDenyButton: true,
      confirmButtonText: 'OK',
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        Sweet.fire(
          'Gracias por confiar en nosotros',
          '',
          'success'
        )
      } else {
        Sweet.fire(
          'Deber aceptar los terminos y condiciones para poder registrarse',
          '',
          'error'
        ).then(r => {
          this.navigateToLogin();
        })
      }
    })
  }
  navigateToLogin() {
    this.router.navigate(['/login']); // Navegar al componente LoginComponent
  }

  onSubmit() {
    console.log(this.formReg.value);
    this.userService.register(this.formReg.value)
      .then(response => {
        Sweet.fire(
          'User register successfully',
          '',
          'success'
        )
        const { password, ...formValues } = this.formReg.value
        this.userService.addUser(formValues).then(r => {})
        this.router.navigate(['/home']).then(r => {});
      })
      .catch(error => {
        console.log(error)
          Sweet.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email/Password no cumple el formato'
          })
      });
  }
}
