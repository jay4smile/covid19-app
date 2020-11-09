import { Component, OnInit } from '@angular/core';
import { CovidinformationService } from './covidinformation.service';
import { fromEventPattern } from 'rxjs';
import { FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-covid-information',
  templateUrl: './covid-information.component.html',
  styleUrls: ['./covid-information.component.css'],
  providers: [CovidinformationService]
})
export class CovidInformationComponent implements OnInit {
  chartData: any = null;
  stateForm = null;
  selectedState = null;
  pieData: any = null;
  barChartData: any = null;
  labels = ['Confirmed', 'Recovered', 'Deaths', 'Active'];
  constructor(private covidInformationService: CovidinformationService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
      this.selectedState = new FormControl('');
      this.fetchStateWiseData();
  }

  fetchStateWiseData(): void {
    this.covidInformationService.fetchStateWiseDetails().subscribe(data => {
      this.chartData = data.data;

      this.pieData = this.covidInformationService.prepareTotalChartData(this.chartData);
    });
  }

  selectData(event): void {
    console.log(event);
    const header = this.labels[event.element._index];
    this.barChartData = this.covidInformationService.prepareBarChart(this.chartData, header);
  }

}
