import { ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthenticationService } from '../services/authentication.service';
import { Observable, Observer, of } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// class MockAuthService {
//   login(data: any): Observable<any> {
//     console.log('called');
//     const user = 'test login';
//     return of(user);
//   }

//   registration(data: any): Observable<any> {
//     return new Observable((observer: Observer<any>) => {
//       observer.next('User Registered Successfully');
//       observer.complete();
//     });
//   }
// }

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let mockAuthenticationService: AuthenticationService = null;
  beforeEach(() => {
     TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ FormsModule, ReactiveFormsModule, MatSnackBarModule, RouterTestingModule.withRoutes([]), HttpClientTestingModule],
      providers: [AuthenticationService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);
    mockAuthenticationService = fixture.debugElement.injector.get(AuthenticationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the data', () => {
    spyOn(router, 'navigate');
    spyOn(mockAuthenticationService, 'login').and.callThrough();

    component.loginForm.controls['username'].setValue('test');
    component.loginForm.controls['password'].setValue('test');
    fixture.detectChanges();
    expect(component.loginForm.valid).toBeTruthy();
    component.submit();
    fixture.detectChanges();
    expect(mockAuthenticationService.login).toHaveBeenCalled();
  });

});
