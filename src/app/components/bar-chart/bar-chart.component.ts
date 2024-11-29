import { Component, ElementRef, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import * as echarts from 'echarts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
  styles: [],
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    CommonModule
  ]
})
export class BarChartComponent implements AfterViewInit {
  @Input() data: { key: string; value: number }[] = [];
  @Output() optionSelected = new EventEmitter<string>();
  options: string[] = [
    'Creator', 'Country', 
    'Gender', 'Member of', 'Occupation', 'Skills'
  ];
  selectedOption: string = this.options[0];
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

  onOptionChange(selected: string): void {
    this.optionSelected.emit(selected);  }
}
