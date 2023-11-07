import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-jacobi-iteration',
  templateUrl: './jacobi-iteration.component.html',
  styleUrls: ['./jacobi-iteration.component.scss'],
})
export class JacobiIterationComponent {
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
    input_array_Init: [],
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

    // Jacobi Iteration
    const n = matrixA.length;
    let x = initialValue;

    let tempX = [];

    while (true) {
      for (let i = 0; i < n; i++) {
        let sum = matrixB[i];
        for (let j = 0; j < n; j++) {
          if (i != j) {
            sum = sum - matrixA[i][j] * x[j];
          }
        }
        tempX[i] = sum / matrixA[i][i];
      }
      let error = 0;
      for (let i = 0; i < n; i++) {
        error = error + Math.abs((tempX[i] - x[i]) / tempX[i]);
      }
      if (error < 0.000001) {
        break;
      } else {
        x = tempX;
      }
    }

    this.result_answer.answer = x;
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
