import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-spline',
  templateUrl: './spline.component.html',
  styleUrls: ['./spline.component.scss'],
})
export class SplineComponent {
  isLoad_calc: boolean = false;

  calc_form: any = {
    dataset: [
      { isSelect: false, x: 1, y: 3 },
      { isSelect: false, x: 3, y: 5 },
      { isSelect: false, x: 5, y: 7 },
      { isSelect: false, x: 7, y: 5 },
      { isSelect: false, x: 11, y: 9 },
    ], // {x: , y:}
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
    const { dataset, decimal_point, target, point_1, point_2, point_3 } =
      this.calc_form;
    this.chart1_data = {};

    // Check dataset isSelect
    let select_data = dataset.filter((item: any) => item.isSelect == true);
    if (select_data.length == 0) {
      select_data = dataset;
    } else if (select_data.length == 1) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please select at least 2 points.',
      });
      return;
    }

    this.isLoad_calc = true;

    // Calculate Spline Method
    if (this.calc_form.target != null) {
      let x: number = this.calc_form.target;
      let y: number = 0;

      for (let i = 0; i < select_data.length; i++) {
        if (i == 0) {
          if (x < select_data[i].x) {
            y = this.calcSpline(
              x,
              select_data[i].x,
              select_data[i].y,
              select_data[i + 1].x,
              select_data[i + 1].y
            );
            break;
          }
        } else if (i == select_data.length - 1) {
          if (x > select_data[i].x) {
            y = this.calcSpline(
              x,
              select_data[i - 1].x,
              select_data[i - 1].y,
              select_data[i].x,
              select_data[i].y
            );
            break;
          }
        } else {
          if (x >= select_data[i].x && x <= select_data[i + 1].x) {
            y = this.calcSpline(
              x,
              select_data[i].x,
              select_data[i].y,
              select_data[i + 1].x,
              select_data[i + 1].y
            );
            break;
          }
        }
      }

      this.calc_form.answer = y.toFixed(decimal_point);
    }

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
          label: 'Answer',
          borderWidth: 4,
          data: [
            {
              x: this.calc_form.target,
              y: this.calc_form.answer,
            },
          ],
        },
      ],
    };
  }

  calcSpline(x: number, x1: number, y1: number, x2: number, y2: number) {
    const { point_1, point_2, point_3 } = this.calc_form;
    let y: number = 0;

    if (point_1 != null && point_2 != null && point_3 != null) {
      // Calculate Polynomial Spline
      let a0: number = y1;
      let a1: number = point_1;
      let a2: number = point_2;
      let a3: number = point_3;

      y = a0 + a1 * (x - x1) + a2 * (x - x1) ** 2 + a3 * (x - x1) ** 3;
    } else if (point_1 != null && point_2 != null) {
      // Calculate Quadratic Spline
      let a0: number = y1;
      let a1: number = (y2 - y1) / (x2 - x1);
      let a2: number = (point_1 - a1) / (x2 - x1) ** 2;

      y = a0 + a1 * (x - x1) + a2 * (x - x1) ** 2;
    } else {
      // Calculate Linear Spline
      let a0: number = y1;
      let a1: number = (y2 - y1) / (x2 - x1);

      y = a0 + a1 * (x - x1);
    }

    return y;
  }

  reset() {
    this.calc_form.target = null;
  }
}
