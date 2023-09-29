import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-graphical',
  templateUrl: './graphical.component.html',
  styleUrls: ['./graphical.component.scss'],
})
export class GraphicalComponent {
  debug_mode: boolean = false;
  isLoad_calc: boolean = false;

  calc_form: any = {
    decimal_point: 6,
    formula: '',
    html_formula: '',
    convert_formula: '',
    range: {
      x: { min: 0, max: 10 },
    },
  };

  result_logs: string = '';
  result_answer = {
    answer: '',
    bisection_table: Array<any>(),
    total_loop: 0,
  };

  constructor(private messageService: MessageService) {}

  reset() {
    this.calc_form = {
      decimal_point: 6,
      formula: '',
      html_formula: '',
      convert_formula: '',
      range: {
        x: { min: 0, max: 10 },
      },
    };
    this.result_logs = '';
    this.result_answer = {
      answer: '',
      bisection_table: Array<any>(),
      total_loop: 0,
    };
  }

  readFormula() {
    let html_formula = '';
    let convert_formula = '';
    const { formula } = this.calc_form;

    // // If formula have space remove space
    // if (formula.includes(' ')) {
    //   html_formula = formula.replace(/\s/g, '');
    //   convert_formula = formula.replace(/\s/g, '');
    // }

    // // // If formula have ^ replace to **
    // if (formula.includes('^(')) {
    //   html_formula = formula.replace(/\^/g, '<sup>');
    //   convert_formula = formula.replace(/\^/g, '**');

    //   // If formula have ) replace to </sup>
    //   if (formula.includes(')')) {
    //     html_formula = html_formula.replace(/\)/g, ')</sup>');
    //   }
    // }

    // // // If formula have sqrt replace to Math.sqrt
    // if (formula.includes('sqrt')) {
    //   html_formula = formula.replace(/sqrt/g, '√');
    //   convert_formula = formula.replace(/sqrt/g, 'Math.sqrt');
    // }

    // // // If formula have e replace to Math.E
    // if (formula.includes('e')) {
    //   html_formula = formula.replace(/e/g, 'e');
    //   convert_formula = formula.replace(/e/g, 'Math.E');
    // }

    formula.split('').forEach((element: any, index: number) => {
      // If found space remove space
      if (element == ' ') {
        html_formula += '';
        convert_formula += '';
      } else if (element == '^' && formula[index + 1] == '(') {
        // If formula have ^ replace to **
        html_formula += '<sup>';
        convert_formula += '**';

        // If formula have ) replace to </sup>
        if (formula.includes(')')) {
          html_formula += '</sup>';
        }
      } else if (element == 's' && formula[index + 1] == 'q') {
        // If found sqrt replace to Math.sqrt
        html_formula += '√';
        convert_formula += 'Math.sqrt';
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
    });

    this.calc_form.html_formula = html_formula;
    this.calc_form.convert_formula = convert_formula;
  }

  calculate() {
    let error: number = 0;
    this.isLoad_calc = true;
    const { convert_formula, range, decimal_point } = this.calc_form;
    this.result_answer.answer = '';
    this.result_answer.bisection_table = [];
    this.result_answer.total_loop = 0;

    setTimeout(() => {
      try {
        let near_x_lower: number = 0; //ใกล้ X ทางซ้าย
        let near_x_upper: number = 0; //ใกล้ X ทางขวา
        let near_x_upper_get: boolean = false;

        // Check convert_formula have = ? if not show error
        if (!convert_formula.includes('=')) {
          error++;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'สมการไม่ถูกต้อง ไม่พบ = (เท่ากับ)',
          });
        }
        // Check range of x have min and max
        if (range.x.min == null || range.x.max == null) {
          error++;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'กรุณาใส่ช่วงของ X',
          });
        }
        // Check Have Other Alphabet in formula Except x
        if (convert_formula.match(/[a-wyz]/i)) {
          error++;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'สมการไม่ถูกต้อง พบตัวอักษรอื่นๆที่ไม่ใช่ x',
          });
        }

        // if error == 0 do fomula
        if (error == 0) {
          for (let x = range.x.min; x <= range.x.max; x++) {
            // Replace x to value
            let replace_x = convert_formula.replace(/x/g, x.toString());

            // Split Formula and Answer
            let split_formula = replace_x.split('=');
            let x_formula = split_formula[0];
            let x_answer = split_formula[1];

            // Calculate Formula
            let answer = eval(x_formula);
            this.result_logs +=
              x_formula + '=' + x_answer + '; ans= ' + answer + '\n';

            if (x == range.x.min) {
              near_x_lower = answer;
              near_x_upper = x_answer;
            }
            if (answer < x_answer) {
              if (x > near_x_lower) near_x_lower = x;
            }
            if (answer > x_answer) {
              if (!near_x_upper_get) {
                near_x_upper = x;
                near_x_upper_get = true;
              }
            }
            this.result_answer.total_loop++;
          }
          near_x_upper_get = false;

          this.result_logs +=
            'Loop 1 Result: ' +
            near_x_lower.toFixed(decimal_point) +
            ' , ' +
            near_x_upper.toFixed(decimal_point) +
            '\n';

          for (let x = near_x_lower; x < near_x_upper; x = x + 0.000001) {
            let replace_x = convert_formula.replace(
              /x/g,
              x.toFixed(decimal_point).toString()
            );
            let split_formula = replace_x.split('=');
            let x_formula = split_formula[0];
            let x_answer = split_formula[1];

            // Calculate Formula
            let answer = eval(x_formula);
            this.result_logs +=
              x_formula +
              '=' +
              x_answer +
              '; ans= ' +
              answer.toFixed(decimal_point) +
              '\n';

            if (answer == x_answer || answer > x_answer) {
              this.result_logs += 'Answer X = : ' + x.toFixed(decimal_point);
              this.result_answer.answer = x.toFixed(decimal_point);
              break;
            }
            this.result_answer.total_loop++;
          }
        }
        this.isLoad_calc = false;
      } catch (error) {
        // Error
        this.isLoad_calc = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'ข้อผิดพลาด',
        });
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          html: 'สมการไม่ถูกต้อง <br>' + error,
        });
      }
    }, 30);
  }

  clear_logs() {
    this.result_logs = '';
  }
}
