import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group( {
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      retypePassword: new FormControl('', [Validators.required]),
    }, {validator: this.confirmPassword('password', 'retypePassword')});
  }

  confirmPassword(control: string, matchingControl: string): any {
    return (formGroup: FormGroup) => {
      const password = formGroup.controls[control];
      const retypePassword = formGroup.controls[matchingControl];

      if (password.errors || retypePassword.errors) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (password.value !== retypePassword.value) {
        retypePassword.setErrors({ mustMatch: true });
      } else {
        retypePassword.setErrors(null);
      }
    };
  }

  submit(): void {
    this.authenticationService.registration(this.registrationForm.value).subscribe( response => {
      this.openSnackBar(response, 'Success');
      this.router.navigate(['login']);
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
