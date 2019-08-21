import { Injectable } from '@angular/core';


@Injectable()
export class DashboardService {
  getSeries(chart, endereco) {
    const req = new XMLHttpRequest();
    req.open('GET', endereco);
    req.onload = () => {
      const x = JSON.parse(req.response);
      if (x.length > 0) {
        for (let z = 1; z < x.length; z++) {}
      } else {
        chart.ref.addSeries(x);
      }
    };
    req.send();
  }

  getStockPrice(chart) {
    this.getSeries(chart, `../assets/data/chart.json`);
  }

  getBrowser(chart) {
    this.getSeries(chart, `../assets/data/browsers.json`);
  }

  getCities(chart) {
    this.getSeries(chart, `../assets/data/cities.json`);
  }
}
