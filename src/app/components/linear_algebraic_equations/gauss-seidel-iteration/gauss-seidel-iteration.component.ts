import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gauss-seidel-iteration',
  templateUrl: './gauss-seidel-iteration.component.html',
  styleUrls: ['./gauss-seidel-iteration.component.scss'],
})
export class GaussSeidelIterationComponent {
  isLoad_calc: boolean = false;

  calc_form: any = {
    range: {
      initial: { x0: null, x1: null },
    },
    input_length: {
      rows: 0,
      cols: 0,
    },
    input_array_Ax: [],
    input_array_B: [],
  };

  result_answer: any = {
    answer: [],
  };

  constructor(private messageService: MessageService) {}

  updateInputSize() {
    // update calc_form.input_array_Ax
    const { rows, cols } = this.calc_form.input_length;
    this.calc_form.input_array_Ax = [];
    for (let i = 0; i < rows; i++) {
      let col = [];
      for (let j = 0; j < cols; j++) {
        col.push({ value: null });
      }
      this.calc_form.input_array_Ax.push({ cols: col });
    }
    // update calc_form.input_array_B
    this.calc_form.input_array_B = [];
    for (let i = 0; i < rows; i++) {
      this.calc_form.input_array_B.push({ value: null });
    }
    // update calc_form.input_array_Init
    this.calc_form.input_array_Init = [];
    for (let i = 0; i < rows; i++) {
      this.calc_form.input_array_Init.push({ value: null });
    }
  }

  calculate() {
    this.isLoad_calc = true;
    let matrixA = this.calc_form.input_array_Ax.map((row: any) => {
      return row.cols.map((col: any) => {
        return col.value;
      });
    });
    let matrixB = this.calc_form.input_array_B.map((row: any) => {
      return row.value;
    });
    let initialValue = this.calc_form.input_array_Init.map((row: any) => {
      return row.value;
    });

    // Gauss Seidel Iteration
    const n = matrixA.length;
    const x = initialValue.slice();
    const tolerance = 0.00001;
    let iteration = 0;

    while (true) {
      let max_diff = 0;

      for (let i = 0; i < n; i++) {
        let sum = 0;

        for (let j = 0; j < n; j++) {
          if (j !== i) {
            sum += matrixA[i][j] * x[j];
          }
        }

        const newX = (matrixB[i] - sum) / matrixA[i][i];
        max_diff = Math.max(max_diff, Math.abs(x[i] - newX));
        x[i] = newX;
      }

      iteration++;

      if (max_diff < tolerance || iteration > 1000) {
        break;
      }
    }

    this.result_answer.answer = x.map((value: any, index: any) => {
      return value;
    });
    this.isLoad_calc = false;
  }

  reset() {
    this.calc_form.input_array_Ax.forEach((row: any) => {
      row.cols.forEach((col: any) => {
        col.value = null;
      });
    });
    this.calc_form.input_array_B.forEach((row: any) => {
      row.value = null;
    });
    this.result_answer = {
      answer: [],
    };
  }
}
