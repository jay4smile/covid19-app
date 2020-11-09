import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class CovidinformationService {

  constructor(private httpClient: HttpClient) { }

  fetchStateWiseDetails(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.httpClient.get(environment.systemUrl + '/api/covidinformation/bystate').subscribe(data => {

        observer.next(data);
        observer.complete();
      });
    });
  }

  prepareTotalChartData(data: any): any {
    let chartData: any = {};
    let dataset: any = {};
    chartData.labels = ['Confirmed', 'Recovered', 'Deaths', 'Active'];
    const displayData = [data.total.confirmed, data.total.recovered, data.total.deaths, data.total.active];
    dataset.data = displayData;
    dataset.backgroundColor = [
      '#FF6384',
      '#36A2EB',
      '#FFCE56', '#733F3F'
    ];
    dataset.hoverBackgroundColor = [
      '#FF6384',
      '#36A2EB',
      '#FFCE56', '#733F3F'
    ];
    chartData.datasets = [];
    chartData.datasets.push(dataset);
    chartData.options = {
      title: {
        display: true,
        text: 'Total Cases',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }

    };
    return chartData;
  }


  prepareBarChart(data: any, heading: string): any {
    let chartData: any = {};
    let dataset: any = {};
    chartData.labels = [];
    dataset.data = [];
    if (data.statewise) {
      data.statewise.forEach(element => {
        chartData.labels.push(element.state);
        dataset.data.push(element[heading.toLowerCase()]);
      });
    }
    // chartData.labels = ['Confirmed', 'Recovored', 'Death', 'Active'];
    // const displayData = [data.total.confirmed, data.total.recovered, data.total.deaths, data.total.active];
    // dataset.data = displayData;
    dataset.backgroundColor = '#FF6384';
    dataset.borderColor = '#FF6384';
    dataset.label = heading;
    chartData.datasets = [];
    chartData.datasets.push(dataset);
    chartData.options = {
      title: {
        display: true,
        text: heading,
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }

    };
    return chartData;
  }

}
