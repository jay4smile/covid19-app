import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CovidInformationComponent } from './covid-information.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CovidinformationService } from './covidinformation.service';
import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';

class ServiceStub {
 fetchStateWiseDetails() { return of({data: { total: {confirmed: 100, recovered: 100, active: 100, deaths: 100}}}); }
}

describe('CovidInformationComponent', () => {
  let component: CovidInformationComponent;
  let fixture: ComponentFixture<CovidInformationComponent>;
  let covidInformation: CovidinformationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidInformationComponent ],
      imports: [HttpClientTestingModule],
      providers: [{provide: CovidinformationService, useClass: ServiceStub}, FormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    covidInformation = fixture.debugElement.injector.get(CovidinformationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch bystate', fakeAsync(() => {

    spyOn(covidInformation, 'fetchStateWiseDetails').and.callThrough();

    component.fetchStateWiseData();
    tick();
    expect(covidInformation.fetchStateWiseDetails).toHaveBeenCalled();
  }));
});
