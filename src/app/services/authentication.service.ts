import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loginUrl = '/user/login';
  registrationUrl = '/user/registration';
  message = 'message';
  token = 'token';
  constructor(private httpClient: HttpClient) { }

  login(data: any): Observable<any> {
    return new Observable((observer: Observer<string>) => {
      this.httpClient.post(environment.systemUrl + this.loginUrl, data).subscribe(response => {
        localStorage.setItem('token', response[this.token]);
        observer.next(response[this.message]);
        observer.complete();
      });
    });
  }

  registration(data: any): Observable<any> {
    return new Observable((observer: Observer<string>) => {
      this.httpClient.post(environment.systemUrl + this.registrationUrl, data).subscribe(response => {
        observer.next(response[this.message]);
        observer.complete();
      });
    });
  }
}
