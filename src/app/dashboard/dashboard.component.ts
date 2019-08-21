import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Chart, StockChart } from 'angular-highcharts';
import { dashboardAnimations } from '../shared/animations/dashboard.animations';
import { themeSD } from '../../themes/highcharts/serpro-design';
import { DashboardService } from '../shared/service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  animations: dashboardAnimations
})
export class DashboardComponent implements OnInit {

  dynamic: number;
  type: string;
  chartPie: Chart;
  chartBarra: Chart;
  stock: StockChart;
  dado: any;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.random();

    // Call types grafics
    this.graficoStock();
    this.graficoPieInit();
    this.graficoBarInit();

    // set the theme
    Highcharts.setOptions(themeSD);
  }

  graficoStock() {
    this.stock = new StockChart({
      rangeSelector: {
        selected: 1,
      },
      title: {
        text: 'AAPL Stock Price',
      },
      series: this.dado,
    });

    this.dashboardService.getStockPrice(this.stock);
  }

  graficoPieInit() {
    const chart = new Chart({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: 'Quotas de mercado do navegador, 2018',
        align: 'left',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          innerSize: 100,
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
        },
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: -20,
        y: 100,
        floating: false,
        itemMarginTop: 10,
        itemMarginBottom: 10,
      },
    });

    this.dashboardService.getBrowser(chart);

    this.chartPie = chart;
  }

  graficoBarInit() {
    const chart = new Chart({
      chart: {
        type: 'line',
      },
      title: {
        text: 'Monthly Average Temperature',
      },
      subtitle: {
        text: 'Source: WorldClimate.com',
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      yAxis: {
        title: {
          text: 'Temperature (°C)',
        },
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true,
          },
          enableMouseTracking: false,
        },
      },
      series: [
        {
          name: 'Tokyo',
          data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        },
        {
          name: 'London',
          data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8],
        },
      ],
      // responsive: [],
    });

    this.dashboardService.getCities(chart);

    this.chartBarra = chart;
  }

  random(): void {
    const value = Math.floor(Math.random() * 100 + 1);
    let type: string;

    if (value < 25) {
      type = 'success';
    } else if (value < 50) {
      type = 'info';
    } else if (value < 75) {
      type = 'warning';
    } else {
      type = 'danger';
    }

    this.dynamic = value;
    this.type = type;
  }

}
