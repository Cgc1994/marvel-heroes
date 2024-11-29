import { Component, ElementRef, OnInit, AfterViewInit, Input } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css',
  styles: []
})
export class BarChartComponent implements AfterViewInit {
  @Input() data: any = [];

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.initChart();
  }

  initChart() {
    const chartDom = this.el.nativeElement.querySelector('#chart');
    const myChart = echarts.init(chartDom);

    const categories = this.data.map((item: { key: any; }) => item.key);
    const values = this.data.map((item: { value: any; }) => item.value);
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          return `${params.name}: ${params.value}`;
        }
      },
      xAxis: {
        type: 'category',
        data: categories,
        axisLabel: {
          rotate: 30,
          formatter: (value: string) => value.length > 10 ? value.slice(0, 10) + '...' : value
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: values,
          type: 'bar',
          itemStyle: {
            color: '#3f51b5'
          }
        }
      ]
    };
    myChart.setOption(option);
    window.addEventListener('resize', () => {
      myChart.resize();
    });
  }
}
