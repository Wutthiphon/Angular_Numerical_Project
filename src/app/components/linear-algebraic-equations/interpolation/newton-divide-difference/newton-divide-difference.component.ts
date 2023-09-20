import { Component } from '@angular/core';

@Component({
  selector: 'app-newton-divide-difference',
  templateUrl: './newton-divide-difference.component.html',
  styleUrls: ['./newton-divide-difference.component.scss'],
})
export class NewtonDivideDifferenceComponent {
  debug_mode: boolean = false;
  isLoad_calc: boolean = false;

  calc_mode = [
    { label: 'Linear', value: 'linear' },
    { label: 'Quadratic', value: 'quadratic' },
    { label: 'Polynomial', value: 'polynomial' },
  ];
  calc_form: any = {
    dataset: [], // {x: , y:}
    mode: '', // linear , quadratic , polynomial
    decimal_point: 6,
    target: null,
    point_1: null,
    point_2: null,
    point_3: null,
    answer: null,
  };

  result_logs: string = '';

  constructor() {}

  addPoint() {
    this.calc_form.dataset.push({ x: null, y: null });
  }

  removePoint(index: number) {
    this.calc_form.dataset.splice(index, 1);
  }

  calculate() {
    this.isLoad_calc = true;
    const { dataset, mode, decimal_point, target, point_1, point_2, point_3 } =
      this.calc_form;
    if (mode == 'linear') {
      if (point_1 != null && point_2 != null) {
        let find_point_1 = dataset[point_1 - 1];
        let find_point_2 = dataset[point_2 - 1];

        let x1 = find_point_1.x;
        let x2 = find_point_2.x;
        let y1 = find_point_1.y;
        let y2 = find_point_2.y;

        let answer = ((y2 - y1) / (x2 - x1)) * (target - x1) + y1;

        this.calc_form.answer = answer.toFixed(decimal_point);
        this.isLoad_calc = false;

        // Logs
        this.result_logs += `Point 1: (${find_point_1.x}, ${find_point_1.y})\nPoint 2: (${find_point_2.x}, ${find_point_2.y})\n`;
        this.result_logs += `f(${target}) = ((${y2} - ${y1}) / (${x2} - ${x1})) * (${target} - ${x1}) + ${y1}\n`;
        this.result_logs += `Ans: ${answer.toFixed(decimal_point)}\n`;
      }
    } else if (mode == 'quadratic') {
      if (point_1 != null && point_2 != null && point_3 != null) {
        let find_point_1 = dataset[point_1 - 1];
        let find_point_2 = dataset[point_2 - 1];
        let find_point_3 = dataset[point_3 - 1];

        let x1 = find_point_1.x;
        let x2 = find_point_2.x;
        let x3 = find_point_3.x;
        let y1 = find_point_1.y;
        let y2 = find_point_2.y;
        let y3 = find_point_3.y;

        let answer =
          (y1 * (target - x2) * (target - x3)) / ((x1 - x2) * (x1 - x3)) +
          (y2 * (target - x1) * (target - x3)) / ((x2 - x1) * (x2 - x3)) +
          (y3 * (target - x1) * (target - x2)) / ((x3 - x1) * (x3 - x2));

        this.calc_form.answer = answer.toFixed(decimal_point);
        this.isLoad_calc = false;

        // Logs
        this.result_logs += `Point 1: (${find_point_1.x}, ${find_point_1.y})\nPoint 2: (${find_point_2.x}, ${find_point_2.y})\nPoint 3: (${find_point_3.x}, ${find_point_3.y})\n`;
        this.result_logs += `f(${target}) = ((${y1} * (${target} - ${x2}) * (${target} - ${x3})) / ((${x1} - ${x2}) * (${x1} - ${x3}))) + ((${y2} * (${target} - ${x1}) * (${target} - ${x3})) / ((${x2} - ${x1}) * (${x2} - ${x3}))) + ((${y3} * (${target} - ${x1}) * (${target} - ${x2})) / ((${x3} - ${x1}) * (${x3} - ${x2})))\n`;
        this.result_logs += `Ans: ${answer.toFixed(decimal_point)}\n`;
      }
    } else if (mode == 'polynomial') {
      let answer = 0;
      let n = dataset.length;

      for (let i = 0; i < n; i++) {
        let temp = dataset[i].y;
        for (let j = 0; j < n; j++) {
          if (j != i) {
            temp =
              (temp * (target - dataset[j].x)) / (dataset[i].x - dataset[j].x);
          }
        }
        answer += temp;
      }

      this.calc_form.answer = answer.toFixed(decimal_point);
      this.isLoad_calc = false;

      // Logs
      this.result_logs += `f(${target}) = `;
      for (let i = 0; i < n; i++) {
        this.result_logs += `(${dataset[i].y})`;
        for (let j = 0; j < n; j++) {
          if (j != i) {
            this.result_logs += ` * (${target} - ${dataset[j].x}) / (${dataset[i].x} - ${dataset[j].x})`;
          }
        }
        if (i != n - 1) {
          this.result_logs += ' + ';
        }
      }
      this.result_logs += `\nAns: ${answer.toFixed(decimal_point)}\n`;
    }
  }

  reset() {
    this.calc_form.target = null;
    this.calc_form.point_1 = null;
    this.calc_form.point_2 = null;
    this.calc_form.point_3 = null;
  }

  clear_logs() {
    this.result_logs = '';
  }
}
