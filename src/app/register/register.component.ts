import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../services/user.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import Swal from 'sweetalert2';

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
  }
  navigateToLogin() {
    this.router.navigate(['/login']); // Navegar al componente LoginComponent
  }

  onSubmit() {
    console.log(this.formReg.value);
    this.userService.register(this.formReg.value)
      .then(response => {
        Swal.fire(
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
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email/Password no cumple el formato'
          })
      });
  }
}
