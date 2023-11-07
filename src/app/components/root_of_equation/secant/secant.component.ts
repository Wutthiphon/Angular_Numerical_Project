import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-secant',
  templateUrl: './secant.component.html',
  styleUrls: ['./secant.component.scss'],
})
export class SecantComponent {
  debug_mode: boolean = false;
  isLoad_calc: boolean = false;

  calc_form: any = {
    decimal_point: 6,
    tolerance: 0.000001,
    formula: '',
    x0: null,
    x1: null,
    html_formula: '',
    convert_formula: '',
  };
  result_answer = {
    answer: '',
    table: Array<any>(),
    total_loop: 0,
  };

  result_logs: string = '';

  chart_options = {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          family: 'Kanit',
        },
      },
      tooltip: {
        enabled: true,
        position: 'nearest',
        callbacks: {
          title: (tooltipItems: any, data: any) => {
            return 'Loop ครั้งที่: ' + tooltipItems[0].label;
          },
        },
      },
    },
  };
  chart1_data: any;

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
    this.isLoad_calc = true;
    this.result_answer.answer = '';
    this.result_answer.total_loop = 0;
    this.result_answer.table = Array<any>();
    const { convert_formula, x0, x1, tolerance, decimal_point } =
      this.calc_form;

    // Secant
    let x0_ = x0;
    let x1_ = x1;
    let i = 0;
    while (true) {
      let fx_0 = this.f_function(x0_, convert_formula);
      let fx_1 = this.f_function(x1_, convert_formula);

      if (Math.abs(fx_1) < tolerance) {
        this.result_answer.answer = x1_.toFixed(decimal_point);
        break;
      }

      let x2 = x1_ - (fx_1 * (x1_ - x0_)) / (fx_1 - fx_0);

      if (Math.abs(x2 - x1_) < tolerance) {
        this.result_answer.table.push({
          loop_count: i + 1,
          x0: x0_.toFixed(decimal_point),
          x1: x1_.toFixed(decimal_point),
          x2: x2.toFixed(decimal_point),
          fx0: fx_0.toFixed(decimal_point),
          fx1: fx_1.toFixed(decimal_point),
          fx2: this.f_function(x2, convert_formula).toFixed(decimal_point),
        });
        this.result_answer.answer = x2.toFixed(decimal_point);
        break;
      }

      this.result_answer.table.push({
        loop_count: i + 1,
        x0: x0_.toFixed(decimal_point),
        x1: x1_.toFixed(decimal_point),
        x2: x2.toFixed(decimal_point),
        fx0: fx_0.toFixed(decimal_point),
        fx1: fx_1.toFixed(decimal_point),
        fx2: this.f_function(x2, convert_formula).toFixed(decimal_point),
      });

      x0_ = x1_;
      x1_ = x2;

      i++;
    }
    this.isLoad_calc = false;
    this.chart1_data = {
      labels: this.result_answer.table.map((item: any) => item.loop_count),
      datasets: [
        {
          label: 'x2',
          data: this.result_answer.table.map((item: any) => item.x2),
          borderColor: '#42A5F5',
          fill: false,
          tension: 0.1,
        },
      ],
    };
  }

  f_function(x: number, convert_formula: string) {
    // cheak have x in formula
    if (convert_formula.includes('x')) {
      if (x < 0) {
        // replace x to (x)
        convert_formula = convert_formula.replace(/x/g, `(${x.toString()})`);
      } else {
        // replace x to value
        convert_formula = convert_formula.replace(/x/g, x.toString());
      }
    }

    return eval(convert_formula);
  }

  clear_logs() {
    this.result_logs = '';
  }

  reset() {
    this.calc_form = {
      decimal_point: 6,
      tolerance: 0.000001,
      formula: '',
      x0: null,
      x1: null,
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
