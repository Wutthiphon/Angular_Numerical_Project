import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-matrix-inversion',
  templateUrl: './matrix-inversion.component.html',
  styleUrls: ['./matrix-inversion.component.scss'],
})
export class MatrixInversionComponent {
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

    // Matrix Inversion
    const n = matrixA.length;

    // Create Augmented Matrix [A|I]
    let augmentedMatrix = [];
    for (let i = 0; i < n; i++) {
      let row = [];
      for (let j = 0; j < n; j++) {
        row.push(matrixA[i][j]);
      }
      for (let j = 0; j < n; j++) {
        row.push(i == j ? 1 : 0);
      }
      augmentedMatrix.push(row);
    }

    // Perform row operations
    // Note ith is row and jth is column
    for (let i = 0; i < n; i++) {
      // Use augmentedMatrix[i][i] to divide ith row
      let divisor = augmentedMatrix[i][i];
      for (let j = 0; j < 2 * n; j++) {
        augmentedMatrix[i][j] /= divisor;
      }

      // Use augmentedMatrix[i][i] to subtract from other rows
      for (let j = 0; j < n; j++) {
        if (i != j) {
          let multiplier = augmentedMatrix[j][i];
          for (let k = 0; k < 2 * n; k++) {
            augmentedMatrix[j][k] -= multiplier * augmentedMatrix[i][k];
          }
        }
      }
    }

    // Get inverse matrix
    let inverseMatrix = [];
    for (let i = 0; i < n; i++) {
      let row = [];
      for (let j = n; j < 2 * n; j++) {
        row.push(augmentedMatrix[i][j]);
      }
      inverseMatrix.push(row);
    }

    // Get solution
    let solution = [];
    for (let i = 0; i < n; i++) {
      solution.push(inverseMatrix[i][0]);
    }

    // Display answer
    this.result_answer.answer = solution;
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
