import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-simpson',
  templateUrl: './simpson.component.html',
  styleUrls: ['./simpson.component.scss'],
})
export class SimpsonComponent {
  debug_mode: boolean = true;
  isLoad_calc: boolean = false;

  calc_mode = [
    { label: 'Single', value: 'single' },
    { label: 'Composite', value: 'composite' },
  ];
  calc_form: any = {
    decimal_point: 6,
    formula: '',
    mode: 'single', // single or composite
    start: null,
    to: null,
    html_formula: '',
    convert_formula: '',
    n: null,
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

  // test case is x^(7)+2x^(3)-1
  // start at -1 to 2

  calculate() {
    // Integration Trapezoidal Rule
    const { mode, decimal_point, convert_formula, start, to, n } =
      this.calc_form;
    this.result_logs += `Init formula: ${convert_formula}\n`;
    this.result_logs += `lower = ${start} => upper = ${to}\n`;

    if (n % 2 != 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'n ต้องเป็นเลขคู่เท่านั้น',
      });
      return;
    }

    if (mode == 'single') {
      this.result_logs += `Mode: Single\n`;
      if (start == null || to == null) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'ข้อมูลไม่ครบกรุณาตรวจสอบ',
        });
        return;
      }

      // Calculate
      const h = (to - start) / 1000;
      let result = this.f_function(start) + this.f_function(to);
      for (let i = 1; i < 1000; i += 2) {
        result += 4 * this.f_function(start + i * h);
      }

      for (let i = 2; i < 1000 - 1; i += 2) {
        result += 2 * this.f_function(start + i * h);
      }

      result = (h / 3) * result;

      this.result_answer.answer = result.toFixed(decimal_point);
      this.result_logs += `answer = ${result.toFixed(decimal_point)}\n`;
      // Error
    } else if (mode == 'composite') {
      this.result_logs += `Mode: Composite\n`;
      this.result_logs += `n = ${n}\n`;
      if (start == null || to == null || n == null) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'ข้อมูลไม่ครบกรุณาตรวจสอบ',
        });
        return;
      }

      // Calculate
      const h = (to - start) / n;
      let result = this.f_function(start) + this.f_function(to);
      for (let i = 1; i < n; i += 2) {
        result += 4 * this.f_function(start + i * h);
      }
      // First for loop is 4 * f(x) for odd number

      for (let i = 2; i < n - 1; i += 2) {
        result += 2 * this.f_function(start + i * h);
      }
      // Second for loop is 2 * f(x) for even number

      result = (h / 3) * result;

      this.result_answer.answer = result.toFixed(decimal_point);
      this.result_logs += `answer = ${result.toFixed(decimal_point)}\n`;
      // Error
    }

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
      start: null,
      to: null,
      html_formula: '',
      convert_formula: '',
      n: null,
    };
    this.result_logs = '';
    this.result_answer = {
      answer: '',
      error: '',
    };
  }
}
