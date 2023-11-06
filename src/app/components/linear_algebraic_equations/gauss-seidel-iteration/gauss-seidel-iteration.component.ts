import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gauss-seidel-iteration',
  templateUrl: './gauss-seidel-iteration.component.html',
  styleUrls: ['./gauss-seidel-iteration.component.scss'],
})
export class GaussSeidelIterationComponent {
  debug_mode: boolean = false;
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

  result_logs: string = '';
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
    console.log(this.calc_form.input_array_Ax);
    console.log(this.calc_form.input_array_B);
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
    this.calc_form.range = {
      initial: { x0: null, x1: null },
    };
    this.result_logs = '';
    this.result_answer = {
      answer: [],
    };
  }

  clear_logs() {
    this.result_logs = '';
  }
}
