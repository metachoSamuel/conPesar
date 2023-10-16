import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  personalArea() {
    this.router.navigate(['/personal']).then(r => {
      Swal.fire(
        'Area personas',
        '',
        'success'
      )
    })
  }

  onClick() {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/login']).then(r => {
        })
      })
      .catch(error => console.log(error))
  }

}
