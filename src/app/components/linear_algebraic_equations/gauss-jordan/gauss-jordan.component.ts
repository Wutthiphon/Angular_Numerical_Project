import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gauss-jordan',
  templateUrl: './gauss-jordan.component.html',
  styleUrls: ['./gauss-jordan.component.scss'],
})
export class GaussJordanComponent {
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

    // Gauss Jordan
    const n = matrixA.length;

    // Augmented Matrix [A|B]
    let augmentedMatrix = [];
    for (let i = 0; i < n; i++) {
      augmentedMatrix.push([...matrixA[i], matrixB[i]]);
    }

    // Perform elementary row operations
    // Note ith is row and jth is column
    for (let i = 0; i < n; i++) {
      // get the value of the diagonal element
      let divider = augmentedMatrix[i][i];

      // divide every element in the ith row by the diagonal element
      for (let j = 0; j < n + 1; j++) {
        augmentedMatrix[i][j] = augmentedMatrix[i][j] / divider;
      }

      // subtract A[j][i] * A[i][k] from A[j][k] for every element in the ith column and rows except ith row
      for (let j = 0; j < n; j++) {
        if (j !== i) {
          let multiplier = augmentedMatrix[j][i];
          for (let k = 0; k < n + 1; k++) {
            augmentedMatrix[j][k] =
              augmentedMatrix[j][k] - multiplier * augmentedMatrix[i][k];
          }
        }
      }
    }

    // Get the solution
    let x = [];
    for (let i = 0; i < n; i++) {
      x.push(augmentedMatrix[i][n]);
    }

    // Display answer
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
