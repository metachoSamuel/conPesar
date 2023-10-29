import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import Sweet from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  formlogin: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.formlogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }
  navigateToRegistro() {
    this.router.navigate(['/register']).then(r => {}); // Navegar al componente RegistroComponent
  }

  navigateToHome() {
    this.router.navigate(['/home']).then(r => {}); // Navegar al componente HomeComponent
  }

  navigateToLogin() {
    this.router.navigate(['/login']).then(r => {}); // Navegar al componente login
  }

  onSubmit() {
    console.log(this.formlogin.value);
    this.userService.loginUser(this.formlogin.value)
        .then((userCredential) => {
            console.log(userCredential);
            Sweet.fire(
                'User Login successfully',
                '',
                'success'
            )
            this.navigateToHome();
            return userCredential.user.getIdToken();
        })
        .then((idToken) => {
            const xhr = new XMLHttpRequest();
        })
        .catch((error) => {
            console.log(error),
                Sweet.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Datos erroneos'
                })
        });
  }

  onClick() {
    this.userService.loginWithGoogle()
      .then(response => {
        console.log(response);
        this.navigateToHome();
      })
      .catch(error => console.log(error))
  }
}
