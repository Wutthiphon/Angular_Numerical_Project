import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-newton-divide-difference',
  templateUrl: './newton-divide-difference.component.html',
  styleUrls: ['./newton-divide-difference.component.scss'],
})
export class NewtonDivideDifferenceComponent {
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

    // Calculate Newton Divide Difference Method
    if (this.calc_form.target != null) {
      const x = this.calc_form.dataset.map((item: any) => item.x);
      const y = this.calc_form.dataset.map((item: any) => item.y);

      let n = x.length;
      const table = new Array(n);

      for (let i = 0; i < n; i++) {
        table[i] = new Array(n).fill(0);
        table[i][0] = y[i];
      }

      for (let j = 1; j < n; j++) {
        for (let i = 0; i < n - j; i++) {
          table[i][j] =
            (table[i + 1][j - 1] - table[i][j - 1]) / (x[i + j] - x[i]);
        }
      }

      let answer = table[0][0];
      let temp = 1;
      for (let i = 1; i < n; i++) {
        temp *= target - x[i - 1];
        answer += table[0][i] * temp;
      }

      this.calc_form.answer = answer.toFixed(decimal_point);
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

  reset() {
    this.calc_form.target = null;
  }
}
