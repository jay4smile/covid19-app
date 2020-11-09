import { TestBed, inject, fakeAsync, tick, discardPeriodicTasks, ComponentFixture} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let backend: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule], providers: [AuthenticationService]});
    service = TestBed.inject(AuthenticationService);
    backend = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('should call login method',
   () =>  {
    const responseObject = {token: 'abchadsgahsd'};
    const uri = 'http://localhost:8085/user/login';
    const req = {username: 'test', password: 'test'};
    let resp = null;


    service.login(req).subscribe( response => {
      resp = response;

      discardPeriodicTasks();
      expect(resp.status).toBe(200);
   });

    const requestWrapper = backend.expectOne(uri);
    requestWrapper.flush(responseObject);
    expect(requestWrapper.request.method).toEqual('POST');
    backend.verify();

  });

  it ('should call registration method',
   inject([AuthenticationService, HttpTestingController], (authenticationService, mockBackend) =>  {
    const responseObject = {message: 'User registered Successfully'};
    const uri = 'http://localhost:8085/user/registration';
    const req = {username: 'test', password: 'test'};
    let resp = null;

    authenticationService.registration(req).subscribe( response => {
      resp = response;
      expect(resp).toBe('User registered Successfully');
    });

    const requestWrapper = mockBackend.expectOne(uri);
    requestWrapper.flush(responseObject);
    expect(requestWrapper.request.method).toEqual('POST');
    backend.verify();

  }));

});
