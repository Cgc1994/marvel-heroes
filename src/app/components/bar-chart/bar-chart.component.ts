import { Component, ElementRef, OnInit, AfterViewInit, Input } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css',
  styles: []
})
export class BarChartComponent implements AfterViewInit {
  @Input() data: { key: string; value: number }[] = [];
  private chartInstance!: echarts.ECharts;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.initChart();
  }

  ngOnChanges(): void {
    this.updateChart();
  }

  private initChart(): void {
    const chartDom = document.getElementById('chart')!;
    this.chartInstance = echarts.init(chartDom);
    this.renderChart();
  }

  private renderChart(): void {
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          return `${params.name}: ${params.value}`;
        }
      },
      xAxis: {
        type: 'category',
        data: this.data.map(item => item.key),
        axisLabel: {
          rotate: 30
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: this.data.map(item => item.value),
          type: 'bar',
          itemStyle: {
            color: '#3f51b5'
          }
        }
      ]
    };

    this.chartInstance.setOption(option);
  }

  private updateChart(): void {
    if (this.chartInstance) {
      this.chartInstance.setOption({
        xAxis: {
          data: this.data.map(item => item.key),
        },
        series: [
          {
            data: this.data.map(item => item.value)
          }
        ]
      });
    }
  }
}
