import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  debug_mode: boolean = false;
  isLoad_calc: boolean = false;

  calc_mode = [
    { label: 'หาค่า X', value: 'find_x' },
    { label: 'ทดสอบแทนค่าสมการ', value: 'sample_var' },
    { label: 'Bisection Iteration', value: 'bisection' },
  ];
  calc_form: any = {
    mode: 'find_x',
    decimal_point: 6,
    formula: '',
    html_formula: '',
    convert_formula: '',
    html_formula_replace: '',
    convert_formula_replace: '',
    known: { x: true },
    range: {
      x: { min: 0, max: 10 },
      root: { min: 0.02, max: 0.03 },
    },
    input_array: [],
    sample_var_mode: 'bisection',
  };
  sample_var_mode = [
    { label: 'ปกติ (แทนค่าทั้งหมดเพื่อหาคำตอบ)', value: 'normal' },
    { label: 'Bisection Iteration', value: 'bisection' },
  ];

  result_logs: string = '';
  result_answer = {
    answer: '',
    bisection_table: Array<any>(),
    total_loop: 0,
  };

  constructor(private messageService: MessageService) {}

  readFormula() {
    this.calc_form.input_array = [];
    let html_formula = '';
    let convert_formula = '';
    let use_alphabet: any = [];
    const { formula, mode } = this.calc_form;

    convert_formula = formula;
    html_formula = formula;

    // If formula have space remove space
    if (formula.includes(' ')) {
      html_formula = formula.replace(/\s/g, '');
      convert_formula = formula.replace(/\s/g, '');
    }

    // If formula have ^ replace to **
    if (formula.includes('^(')) {
      html_formula = formula.replace(/\^/g, '<sup>');
      convert_formula = formula.replace(/\^/g, '**');

      // If formula have ) replace to </sup>
      if (formula.includes(')')) {
        html_formula = html_formula.replace(/\)/g, ')</sup>');
      }
    }

    // If formula have sqrt replace to Math.sqrt
    if (formula.includes('sqrt')) {
      html_formula = formula.replace(/sqrt/g, '√');
      convert_formula = formula.replace(/sqrt/g, 'Math.sqrt');
    }

    formula.split('').forEach((element: any, index: number) => {
      //  If Mode == "ทดลองแทนค่า"
      if (mode == 'sample_var') {
        // If found english alphabet in formula add this to input_array sample found 1+x = 0 { label: 'x', value: '' }
        if (element.match(/[a-z]/i)) {
          if (!use_alphabet.includes(element)) {
            use_alphabet.push(element);
            this.calc_form.input_array.push({ label: element, value: '' });
          }
        } else {
          this.calc_form.convert_formula_replace = '';
        }
      }

      // If Mode == "หา X"
      if (mode == 'find_x') {
        // If found x and index-1 == number add *x
        if (element == 'x' && formula[index - 1].match(/[0-9]/i)) {
          html_formula = html_formula.replace(/x/g, '*x');
          convert_formula = convert_formula.replace(/x/g, '*x');
        }
      }
    });

    this.calc_form.html_formula = html_formula;
    this.calc_form.convert_formula = convert_formula;
  }

  replacefomula() {
    let html_formula_replace = this.calc_form.html_formula;
    let convert_formula_replace = this.calc_form.convert_formula;

    this.calc_form.input_array.forEach((element: any) => {
      const regex = new RegExp('\\b' + element.label + '\\b', 'g'); //replace only word
      html_formula_replace = html_formula_replace.replace(regex, element.value);
      convert_formula_replace = convert_formula_replace.replace(
        regex,
        element.value
      );
    });

    this.calc_form.html_formula_replace = html_formula_replace;
    this.calc_form.convert_formula_replace = convert_formula_replace;
  }

  calculate() {
    let error: number = 0;
    this.isLoad_calc = true;
    const {
      convert_formula,
      convert_formula_replace,
      mode,
      range,
      sample_var_mode,
      decimal_point,
    } = this.calc_form;
    this.result_answer.answer = '';
    this.result_answer.bisection_table = [];
    this.result_answer.total_loop = 0;

    setTimeout(() => {
      if (mode == 'sample_var') {
        if (sample_var_mode == 'normal') {
          let answer = 0;
          if (convert_formula_replace) {
            answer = eval(convert_formula_replace);
          } else {
            answer = eval(convert_formula);
          }

          this.result_logs +=
            'formula : ' +
            convert_formula +
            ' | replace : ' +
            convert_formula_replace +
            '\n';
          this.result_logs +=
            'answer: ' + answer.toFixed(decimal_point).toString() + '\n';

          this.result_answer.answer = answer.toFixed(decimal_point).toString();
        } else if (sample_var_mode == 'bisection') {
          let last_answer: number = 0;

          // Check range of x have min and max
          if (range.root.min == null || range.root.max == null) {
            error++;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'กรุณาใส่ช่วงของ X',
            });
          }

          // if error == 0 do fomula
          if (error == 0) {
            this.result_logs +=
              'f(x) = ' + convert_formula_replace + '=0' + '\n';
            this.result_logs += `---------------------------------` + '\n';

            let a: number = range.root.min;
            let b: number = range.root.max;

            let i = 0;
            while (true) {
              let mid = (a + b) / 2;

              if (
                Number(a.toFixed(decimal_point)) ==
                Number(b.toFixed(decimal_point))
              ) {
                this.result_answer.answer = mid.toFixed(decimal_point);
                break;
              } else {
                last_answer = Number(mid.toFixed(decimal_point));
                i++;
              }

              this.result_logs +=
                `Iteration Loop ${i}: mid = ${a.toFixed(
                  decimal_point
                )} + ${b.toFixed(6)} / 2` + '\n';
              this.result_logs +=
                `Iteration Result: ${mid.toFixed(decimal_point)}` + '\n';

              let f_x_test = convert_formula_replace.replace(
                /x/g,
                mid.toFixed(decimal_point).toString()
              );
              this.result_logs +=
                'f(x) = ' +
                Number(eval(f_x_test)).toFixed(decimal_point).toString() +
                '\n';
              this.result_logs += `---------------------------------` + '\n';

              let change = '';
              if (
                this.f_function(a, convert_formula_replace) *
                  this.f_function(mid, convert_formula_replace) <
                0
              ) {
                b = mid;
                change = 'L ';
              } else {
                a = mid;
                change = 'R ';
              }

              this.result_answer.bisection_table.push({
                loop_count: i,
                xl: a.toFixed(decimal_point),
                xr: b.toFixed(decimal_point),
                xm: mid.toFixed(decimal_point),
                change: change,
              });

              this.result_answer.total_loop++;
            }
          }
        }
      }

      if (mode == 'find_x') {
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
        // Check Have Other Alphabet in formula
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
            console.log(x_formula + '=' + x_answer + '; ans= ' + answer);
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
          console.log(
            near_x_lower.toFixed(decimal_point),
            near_x_upper.toFixed(decimal_point)
          );
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
            console.log(
              x_formula +
                '=' +
                x_answer +
                '; ans= ' +
                answer.toFixed(decimal_point)
            );
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
          console.log(
            near_x_lower.toFixed(decimal_point),
            near_x_upper.toFixed(decimal_point)
          );
        }
      }

      if (mode == 'bisection') {
        let last_answer: number = 0;

        // Check range of x have min and max
        if (range.root.min == null || range.root.max == null) {
          error++;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'กรุณาใส่ช่วงของ X',
          });
        }

        // if error == 0 do fomula
        if (error == 0) {
          this.result_logs += 'f(x) = ' + convert_formula + '=0' + '\n';
          this.result_logs += `---------------------------------` + '\n';

          let a: number = range.root.min;
          let b: number = range.root.max;

          let i = 0;
          while (true) {
            let mid = (a + b) / 2;

            if (
              Number(a.toFixed(decimal_point)) ==
              Number(b.toFixed(decimal_point))
            ) {
              this.result_answer.answer = mid.toFixed(decimal_point);
              break;
            } else {
              last_answer = Number(mid.toFixed(decimal_point));
              i++;
            }

            this.result_logs +=
              `Iteration Loop ${i}: mid = ${a.toFixed(
                decimal_point
              )} + ${b.toFixed(6)} / 2` + '\n';
            this.result_logs +=
              `Iteration Result: ${mid.toFixed(decimal_point)}` + '\n';

            let f_x_test = convert_formula.replace(
              /x/g,
              mid.toFixed(decimal_point).toString()
            );
            this.result_logs +=
              'f(x) = ' +
              Number(eval(f_x_test)).toFixed(decimal_point).toString() +
              '\n';
            this.result_logs += `---------------------------------` + '\n';

            let change = '';
            if (
              this.f_function(a, convert_formula) *
                this.f_function(mid, convert_formula) <
              0
            ) {
              b = mid;
              change = 'L ';
            } else {
              a = mid;
              change = 'R ';
            }

            this.result_answer.bisection_table.push({
              loop_count: i,
              xl: a.toFixed(decimal_point),
              xr: b.toFixed(decimal_point),
              xm: mid.toFixed(decimal_point),
              change: change,
            });

            this.result_answer.total_loop++;
          }
        }
      }

      this.isLoad_calc = false;
    }, 30);
  }

  f_function(x: number, convert_formula: any) {
    return eval(convert_formula) - x;
  }

  clear_logs() {
    this.result_logs = '';
  }

  addFunctionFormula(function_name: string) {
    if (function_name == 'root_x') {
      this.calc_form.formula += 'x^(1/2)';
    }
    if (function_name == 'n_root_x') {
      this.calc_form.formula += 'x^(1/n)';
    }
    this.readFormula();
  }
}
