import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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

  ngOnInit(): void {
  }

  navigateToRegistro() {
    this.router.navigate(['/register']); // Navegar al componente RegistroComponent
  }

  navigateToHome() {
    this.router.navigate(['/home']); // Navegar al componente HomeComponent
  }

  onSubmit() {
    console.log(this.formlogin.value);
    this.userService.loginUser(this.formlogin.value)
      .then(response => {
        console.log(response);
        this.navigateToHome();
      })
      .catch(error => console.log(error))
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
