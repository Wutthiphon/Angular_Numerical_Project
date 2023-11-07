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

  result_answer = {
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
