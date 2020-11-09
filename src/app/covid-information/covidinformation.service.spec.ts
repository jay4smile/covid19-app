import { TestBed, inject } from '@angular/core/testing';

import { CovidinformationService } from './covidinformation.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CovidinformationService', () => {
  let service: CovidinformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [CovidinformationService], imports: [HttpClientTestingModule]});
    service = TestBed.inject(CovidinformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('should fetch state wise details',
   inject([CovidinformationService, HttpTestingController], (covidinformationService, mockBackend) =>  {
    const responseObject = {message: 'User registered Successfully'};
    const uri = 'http://localhost:8085/api/covidinformation/bystate';

    let resp = null;

    covidinformationService.fetchStateWiseDetails().subscribe( response => {
      resp = response;
      expect(resp.message).toBe( 'User registered Successfully');
    });

    const requestWrapper = mockBackend.expectOne(uri);
    requestWrapper.flush(responseObject);
    expect(requestWrapper.request.method).toEqual('GET');
    mockBackend.verify();

  }));

});
