import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-one-point-iteration',
  templateUrl: './one-point-iteration.component.html',
  styleUrls: ['./one-point-iteration.component.scss'],
})
export class OnePointIterationComponent {
  debug_mode: boolean = false;
  isLoad_calc: boolean = false;

  calc_form: any = {
    decimal_point: 6,
    tolerance: 0.000001,
    formula: '',
    start: null,
    html_formula: '',
    convert_formula: '',
  };
  result_answer = {
    answer: '',
    table: Array<any>(),
    total_loop: 0,
  };

  result_logs: string = '';

  constructor(private messageService: MessageService) {}

  readFormula() {
    let html_formula = '';
    let convert_formula = '';
    const { formula, mode } = this.calc_form;
    let use_alphabet: any[] = [];
    this.calc_form.input_array = [];

    formula.split('').forEach((element: any, index: number) => {
      // If found space remove space
      if (element == ' ') {
        html_formula += '';
        convert_formula += '';
      } else if (element == 'e') {
        // If found e replace to Math.E
        html_formula += 'e';
        convert_formula += 'Math.E';
      } else if (
        // If found x and index-1 != number add *x
        element == 'x' &&
        index != 0 &&
        formula[index - 1].match(/[0-9]/i)
      ) {
        html_formula += '*x';
        convert_formula += '*x';
      } else if (
        // If found x and index+1 != number add x*
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

      if (mode == 'sample_var') {
        // If found english alphabet in formula add this to input_array sample found 1+x = 0 { label: 'x', value: '' }
        if (element.match(/[a-z]/i)) {
          if (
            !use_alphabet.includes(element) &&
            element != 'e' &&
            mode == 'sample_var' &&
            element != 's' &&
            element != 'q' &&
            element != 'r' &&
            element != 't' &&
            element != 'M' &&
            element != 'a' &&
            element != 't' &&
            element != 'h'
          ) {
            use_alphabet.push(element);
            this.calc_form.input_array.push({ label: element, value: '' });
          }
        } else {
          this.calc_form.convert_formula_replace = '';
        }
      }
    });

    // If formula have sqrt replace to Math.sqrt
    if (formula.includes('sqrt') && !formula.includes('Math.sqrt')) {
      html_formula = formula.replace(/sqrt/g, '√');
      convert_formula = formula.replace(/sqrt/g, 'Math.sqrt');
    }

    // If formula have ^ replace to ** and add <sup> and </sup> to html_formula
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
    // Onepoint Iteration
  }

  f_function() {
    // Onepoint Iteration
  }

  clear_logs() {
    this.result_logs = '';
  }

  reset() {
    this.calc_form = {
      decimal_point: 6,
      tolerance: 0.000001,
      formula: '',
      start: null,
      html_formula: '',
      convert_formula: '',
    };
    this.result_logs = '';
    this.result_answer = {
      answer: '',
      table: Array<any>(),
      total_loop: 0,
    };
  }
}
