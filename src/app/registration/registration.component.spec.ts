import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from '../services/authentication.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class MockLoginComponent {}

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let authService: AuthenticationService;
  let router: Router;
  let snakeBar: MatSnackBar;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
      imports: [HttpClientTestingModule, MatSnackBarModule, FormsModule, ReactiveFormsModule,
         RouterTestingModule.withRoutes([{path: 'login', component: MockLoginComponent}])],
      providers: [FormBuilder, MatSnackBar]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthenticationService);
    router =  TestBed.get(Router);
    snakeBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call registration', () => {
    expect(component).toBeTruthy();
    component.registrationForm.controls['username'].setValue('test');
    component.registrationForm.controls['password'].setValue('test');
    component.registrationForm.controls['retypePassword'].setValue('test');
    expect(component.registrationForm.value).toBeTruthy();
    spyOn(authService, 'registration').and.callFake(() => {
      return of(['Success']);
    });
    spyOn(router, 'navigate');
    spyOn(snakeBar, 'open').and.callThrough();
    component.submit();
    expect(authService.registration).toHaveBeenCalled();
  });

});
