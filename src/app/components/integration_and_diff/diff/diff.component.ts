import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-diff',
  templateUrl: './diff.component.html',
  styleUrls: ['./diff.component.scss'],
})
export class DiffComponent {
  debug_mode: boolean = true;
  isLoad_calc: boolean = false;

  derivative_mode = [
    { label: 'First Diviede-Differences', value: 'first' },
    { label: 'Second Diviede-Differences', value: 'second' },
  ];
  calc_mode = [
    { label: 'Forward Divided-Difference', value: 'forward' },
    { label: 'Backward Divided-Difference', value: 'backward' },
    { label: 'Central Divided-Difference', value: 'central' },
  ];
  calc_form: any = {
    decimal_point: 6,
    formula: '',
    derivative_mode: 'first', // first, second
    mode: 'forward', // forward, backward, central
    h: null,
    x: null,
    html_formula: '',
    convert_formula: '',
  };
  result_answer = {
    answer: '',
    error: '',
  };

  result_logs: string = '';

  constructor(private messageService: MessageService) {}

  async readFormula() {
    let html_formula = '';
    let convert_formula = '';
    const { formula } = this.calc_form;
    let use_alphabet: any[] = [];
    this.calc_form.input_array = [];

    await formula.split('').forEach((element: any, index: number) => {
      // If found space remove space
      if (element == ' ') {
        html_formula += '';
        convert_formula += '';
      } else if (element == 'e') {
        // If found e replace to Math.E
        html_formula += 'e';
        convert_formula += 'Math.E';
      } else if (
        // If formula have x and index - 1 before x is number replace to *x
        element == 'x' &&
        index != 0 &&
        formula[index - 1].match(/[0-9]/i)
      ) {
        html_formula += '*x';
        convert_formula += '*x';
      } else if (
        // If formula have x and index + 1 after x is number replace to x*
        element == 'x' &&
        index != formula.length - 1 &&
        formula[index + 1].match(/[0-9]/i)
      ) {
        html_formula += 'x*';
        convert_formula += 'x*';
      } else {
        // Else add element
        html_formula += element;
        convert_formula += element;
      }
    });

    // If formula have sqrt replace to Math.sqrt
    if (formula.includes('sqrt') && !formula.includes('Math.sqrt')) {
      html_formula = formula.replace(/sqrt/g, '√');
      convert_formula = formula.replace(/sqrt/g, 'Math.sqrt');
    }

    // If formula have ^( replace to ** and add <sup> to html_formula then check ) add </sup>
    for (let i = 0; i < html_formula.length; i++) {
      if (html_formula[i] == '^') {
        html_formula = html_formula.replace(/\^/g, '<sup>');
        html_formula = html_formula.replace(/\(/g, '');
        html_formula = html_formula.replace(/\)/g, '</sup>');

        convert_formula = convert_formula.replace(/\^/g, '**');
      }
    }

    // remove space
    html_formula = html_formula.replace(/ /g, '');

    this.calc_form.html_formula = html_formula;
    this.calc_form.convert_formula = convert_formula;
  }

  calculate() {
    const { derivative_mode, mode, h, x } = this.calc_form;
    this.result_logs = '';

    if (x == null || h == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please input all required field',
      });
      return;
    }

    if (derivative_mode == 'first') {
      this.result_logs += `Derivative Mode: First Diviede-Differences\n`;
      if (mode == 'forward') {
        this.result_logs += `Mode: Forward Divided-Difference\n`;
        this.result_answer.answer = (
          (this.f_function(x + h) - this.f_function(x)) /
          h
        ).toFixed(this.calc_form.decimal_point);
      } else if (mode == 'backward') {
        this.result_logs += `Mode: Backward Divided-Difference\n`;
        this.result_answer.answer = (
          (this.f_function(x) - this.f_function(x - h)) /
          h
        ).toFixed(this.calc_form.decimal_point);
      } else if (mode == 'central') {
        this.result_logs += `Mode: Central Divided-Difference\n`;
        this.result_answer.answer = (
          (this.f_function(x + h) - this.f_function(x - h)) /
          (2 * h)
        ).toFixed(this.calc_form.decimal_point);
      }
    } else if (derivative_mode == 'second') {
      this.result_logs += `Derivative Mode: Second Diviede-Differences\n`;
      if (mode == 'forward') {
        this.result_logs += `Mode: Forward Divided-Difference\n`;
        this.result_answer.answer = (
          (this.f_function(x + 2 * h) -
            2 * this.f_function(x + h) +
            this.f_function(x)) /
          h ** 2
        ).toFixed(this.calc_form.decimal_point);
      } else if (mode == 'backward') {
        this.result_logs += `Mode: Backward Divided-Difference\n`;
        this.result_answer.answer = (
          (this.f_function(x) -
            2 * this.f_function(x - h) +
            this.f_function(x - 2 * h)) /
          h ** 2
        ).toFixed(this.calc_form.decimal_point);
      } else if (mode == 'central') {
        this.result_logs += `Mode: Central Divided-Difference\n`;
        this.result_answer.answer = (
          (this.f_function(x - h) -
            8 * this.f_function(x - h / 2) +
            8 * this.f_function(x + h / 2) -
            this.f_function(x + h)) /
          (12 * h ** 2)
        ).toFixed(this.calc_form.decimal_point);
      }
    }
    this.result_logs += `Ans: ${this.result_answer.answer}\n`;
    this.result_logs += `---------------------------------\n`;
  }

  f_function(x: number) {
    const { convert_formula } = this.calc_form;
    // If x < 0 add () to formula
    this.result_logs += `X: ${x}\n`;
    if (x < 0) {
      let fx: number = eval(convert_formula.replace(/x/g, `(${x})`));
      this.result_logs += `f(${x}) = ${convert_formula.replace(
        /x/g,
        x
      )} => ${fx}\n`;
      this.result_logs += `---------------------------------\n`;
      return fx;
    } else {
      let fx: number = eval(convert_formula.replace(/x/g, x));
      this.result_logs += `f(${x}) = ${convert_formula.replace(
        /x/g,
        x
      )} => ${fx}\n`;
      this.result_logs += `---------------------------------\n`;
      return fx;
    }
  }

  clear_logs() {
    this.result_logs = '';
  }

  reset() {
    this.calc_form = {
      decimal_point: 6,
      formula: '',
      x: null,
      h: null,
      html_formula: '',
      convert_formula: '',
    };
    this.result_logs = '';
    this.result_answer = {
      answer: '',
      error: '',
    };
  }
}
