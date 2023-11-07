import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gauss-elimination',
  templateUrl: './gauss-elimination.component.html',
  styleUrls: ['./gauss-elimination.component.scss'],
})
export class GaussEliminationComponent {
  isLoad_calc: boolean = false;

  calc_form: any = {
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

    // Gaussian Elimination
    const n = matrixA.length;

    // Forward Elimination
    for (let k = 0; k < n - 1; k++) {
      for (let i = k + 1; i < n; i++) {
        let factor = matrixA[i][k] / matrixA[k][k];
        for (let j = k; j < n; j++) {
          matrixA[i][j] = matrixA[i][j] - factor * matrixA[k][j];
        }
        matrixB[i] = matrixB[i] - factor * matrixB[k];
      }
    }

    // Backward Substitution
    let x = new Array(n);
    x[n - 1] = matrixB[n - 1] / matrixA[n - 1][n - 1];
    for (let i = n - 2; i >= 0; i--) {
      let sum = matrixB[i];
      for (let j = i + 1; j < n; j++) {
        sum = sum - matrixA[i][j] * x[j];
      }
      x[i] = sum / matrixA[i][i];
    }

    // Display Answer
    this.isLoad_calc = false;
    this.result_answer.answer = x;
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
