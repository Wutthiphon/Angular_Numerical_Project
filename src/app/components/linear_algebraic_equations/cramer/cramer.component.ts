import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cramer',
  templateUrl: './cramer.component.html',
  styleUrls: ['./cramer.component.scss'],
})
export class CramerComponent {
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

    // Calculate
    let detA = this.determinant(matrixA);
    if (detA == 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Determinant of A is zero.',
      });
      this.isLoad_calc = false;
      return;
    }
    let answer = [];
    for (let i = 0; i < matrixA.length; i++) {
      let temp = JSON.parse(JSON.stringify(matrixA));
      for (let j = 0; j < matrixA.length; j++) {
        temp[j][i] = matrixB[j];
      }
      answer.push(this.determinant(temp) / detA);
    }

    this.result_answer.answer = answer;
    this.isLoad_calc = false;
  }

  determinant(matrix: any) {
    // Determinant matrix
    if (matrix.length == 1) {
      return matrix[0][0];
    } else if (matrix.length == 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    } else {
      let det = 0;
      for (let i = 0; i < matrix.length; i++) {
        let m = [];
        for (let j = 1; j < matrix.length; j++) {
          let temp = [];
          for (let k = 0; k < matrix.length; k++) {
            if (k != i) {
              temp.push(matrix[j][k]);
            }
          }
          m.push(temp);
        }
        det += Math.pow(-1, i) * matrix[0][i] * this.determinant(m);
      }
      return det;
    }
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
