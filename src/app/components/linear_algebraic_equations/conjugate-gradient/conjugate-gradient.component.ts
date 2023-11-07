import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conjugate-gradient',
  templateUrl: './conjugate-gradient.component.html',
  styleUrls: ['./conjugate-gradient.component.scss'],
})
export class ConjugateGradientComponent {
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
        return Number(col.value);
      });
    });
    let matrixB = this.calc_form.input_array_B.map((row: any) => {
      return Number(row.value);
    });
    let initialValue = this.calc_form.input_array_Init.map((row: any) => {
      return Number(row.value);
    });

    // Conjugate Gradient
    const n = matrixB.length;
    let x = [...initialValue];
    let r = this.vectorSubtract(matrixB, this.matrixVectorMultiply(matrixA, x));
    let p = [...r];
    let rsold = this.vectorDotProduct(r, r);

    for (let i = 0; i < n; i++) {
      let Ap = this.matrixVectorMultiply(matrixA, p);
      let alpha = rsold / this.vectorDotProduct(p, Ap);
      x = this.vectorAdd(x, this.vectorScalarMultiply(p, alpha));
      r = this.vectorSubtract(r, this.vectorScalarMultiply(Ap, alpha));
      let rsnew = this.vectorDotProduct(r, r);
      if (Math.sqrt(rsnew) < 0.00001) {
        break;
      }
      p = this.vectorAdd(r, this.vectorScalarMultiply(p, rsnew / rsold));
      rsold = rsnew;
    }

    this.result_answer.answer = x;
    this.isLoad_calc = false;
  }

  matrixVectorMultiply(matrix: any, vector: any) {
    let n = vector.length;
    let result = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        result[i] += Number(matrix[i][j] * vector[j]);
      }
    }
    return result;
  }

  vectorAdd(vector1: any, vector2: any) {
    return vector1.map((a: number, i: number) => a + vector2[i]);
  }

  vectorSubtract(vector1: any, vector2: any) {
    return vector1.map((a: number, i: number) => a - vector2[i]);
  }

  vectorScalarMultiply(vector: any, scalar: number) {
    return vector.map((a: number) => a * scalar);
  }

  vectorDotProduct(vector1: any, vector2: any) {
    return vector1.reduce((total: number, num: number, i: number) => {
      return total + num * vector2[i];
    }, 0);
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
