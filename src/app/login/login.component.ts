import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private authenticationService: AuthenticationService,
              private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup( {
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  submit(): void {

    this.authenticationService.login(this.loginForm.value).subscribe(response => {
      this.openSnackBar(response, 'Success');
      this.router.navigate(['covid-dashboard']);
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

}
