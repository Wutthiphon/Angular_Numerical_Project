import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lu-decomposition',
  templateUrl: './lu-decomposition.component.html',
  styleUrls: ['./lu-decomposition.component.scss'],
})
export class LuDecompositionComponent {
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

    // LU Decomposition
    let matrixL = [];
    let matrixU = [];

    // Create matrix L
    for (let i = 0; i < matrixA.length; i++) {
      let row = [];
      for (let j = 0; j < matrixA.length; j++) {
        if (i == j) {
          row.push(1);
        } else {
          row.push(0);
        }
      }
      matrixL.push(row);
    }

    // Create matrix U
    for (let i = 0; i < matrixA.length; i++) {
      let row = [];
      for (let j = 0; j < matrixA.length; j++) {
        row.push(0);
      }
      matrixU.push(row);
    }

    // LU Decomposition
    for (let i = 0; i < matrixA.length; i++) {
      for (let j = i; j < matrixA.length; j++) {
        let sum = 0;
        for (let k = 0; k < i; k++) {
          sum += matrixL[i][k] * matrixU[k][j];
        }
        matrixU[i][j] = matrixA[i][j] - sum;
      }
      for (let j = i + 1; j < matrixA.length; j++) {
        let sum = 0;
        for (let k = 0; k < i; k++) {
          sum += matrixL[j][k] * matrixU[k][i];
        }
        matrixL[j][i] = (matrixA[j][i] - sum) / matrixU[i][i];
      }
    }

    // Solve LY = B
    let matrixY = [];
    for (let i = 0; i < matrixA.length; i++) {
      matrixY.push([matrixB[i]]);
    }

    for (let i = 0; i < matrixA.length; i++) {
      for (let j = 0; j < i; j++) {
        matrixY[i][0] -= matrixL[i][j] * matrixY[j][0];
      }
    }

    // Solve UX = Y
    let matrixX = [];
    for (let i = 0; i < matrixA.length; i++) {
      matrixX.push([0]);
    }

    for (let i = matrixA.length - 1; i >= 0; i--) {
      matrixX[i][0] = matrixY[i][0] / matrixU[i][i];
      for (let j = i - 1; j >= 0; j--) {
        matrixY[j][0] -= matrixU[j][i] * matrixX[i][0];
      }
    }

    // Get solution
    let solution = [];
    for (let i = 0; i < matrixA.length; i++) {
      solution.push(matrixX[i][0]);
    }

    // Set result
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
