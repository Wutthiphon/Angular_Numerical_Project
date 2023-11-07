import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-linear',
  templateUrl: './linear.component.html',
  styleUrls: ['./linear.component.scss'],
})
export class LinearComponent {
  isLoad_calc: boolean = false;

  calc_form: any = {
    dataset: [], // {x: , y:}
    decimal_point: 6,
    target: null,
    point_1: null,
    point_2: null,
    point_3: null,
    answer: null,
  };

  chart_options = {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          family: 'Kanit',
        },
      },
    },
  };
  chart1_data: any;

  constructor(private messageService: MessageService) {}

  addPoint() {
    this.calc_form.dataset.push({ isSelect: false, x: null, y: null });
  }

  removePoint(index: number) {
    this.calc_form.dataset.splice(index, 1);
  }

  calculate() {
    let point_data: any = []; // [{x: , y:}}]
    const { dataset, decimal_point, target } = this.calc_form;
    this.chart1_data = {};

    this.isLoad_calc = true;

    // Calculate Linear
    const n = dataset.length;
    const xMean = dataset.reduce((sum: any, item: any) => sum + item.x, 0) / n;
    const yMean = dataset.reduce((sum: any, item: any) => sum + item.y, 0) / n;

    let sumNumerator = 0;
    let sumDenominator = 0;

    for (let i = 0; i < n; i++) {
      const { x, y } = dataset[i];
      sumNumerator += (x - xMean) * (y - yMean);
      sumDenominator += Math.pow(x - xMean, 2);
    }

    const slope = sumNumerator / sumDenominator;
    const intercept = yMean - slope * xMean;

    for (let i = 0; i < n; i++) {
      const { x } = dataset[i];
      point_data.push({ x: x, y: slope * x + intercept });
    }

    const target_y = slope * target + intercept;

    let test = {
      slope: slope.toFixed(decimal_point),
      intercept: intercept.toFixed(decimal_point),
      target_y: target_y.toFixed(decimal_point),
    };
    this.calc_form.answer = target_y.toFixed(decimal_point);

    this.isLoad_calc = false;

    this.chart1_data = {
      datasets: [
        {
          type: 'scatter',
          label: 'Dataset',
          showLine: true,
          data: this.calc_form.dataset.map((item: any) => {
            return { x: item.x, y: item.y };
          }),
        },
        {
          type: 'scatter',
          label: 'Linear Regression',
          borderWidth: 5,
          showLine: true,
          data: point_data.map((item: any) => {
            return { x: item.x, y: item.y };
          }),
        },
      ],
    };
  }

  reset() {
    this.calc_form.target = null;
  }
}
