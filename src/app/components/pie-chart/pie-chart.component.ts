import { Component, ElementRef, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import * as echarts from 'echarts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    CommonModule
  ]
})
export class PieChartComponent implements AfterViewInit {
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
    this.renderChart();
  }

  private initChart(): void {
    const chartDom = document.getElementById('chart')!;
    this.chartInstance = echarts.init(chartDom);
    this.renderChart();
  }

  private renderChart(): void {
    const chartData = this.data.map(item => ({
      name: item.key, 
      value: item.value
    }));    
    const option = {
      title: {
        text: 'Marvel Heroe Pie Graph',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10, 
            borderColor: 'rgba(0, 0, 0, 0.1)', 
            borderWidth: 1 
          },
          label: {
            show: false, 
            position: 'center' 
          },
          emphasis: {
            label: {
              show: true, 
              fontSize: '40', 
              fontWeight: 'bold' 
            }
          },
          data: chartData
        }
      ]
    };

    this.chartInstance.setOption(option);
  }

  onOptionChange(selected: string): void {
    this.optionSelected.emit(selected);  }
}
