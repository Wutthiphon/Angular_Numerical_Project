import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-lagrange',
  templateUrl: './lagrange.component.html',
  styleUrls: ['./lagrange.component.scss'],
})
export class LagrangeComponent {
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

    // Calculate Lagrange Method
    if (this.calc_form.target != null) {
      let x: number = this.calc_form.target;
      let y: number = 0;

      for (let i = 0; i < select_data.length; i++) {
        let l: number = 1;

        for (let j = 0; j < select_data.length; j++) {
          if (i != j) {
            l *= (x - select_data[j].x) / (select_data[i].x - select_data[j].x);
          }
        }

        y += l * select_data[i].y;
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

  reset() {
    this.calc_form.target = null;
  }
}
