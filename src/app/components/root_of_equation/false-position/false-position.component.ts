import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-false-position',
  templateUrl: './false-position.component.html',
  styleUrls: ['./false-position.component.scss'],
})
export class FalsePositionComponent {
  debug_mode: boolean = false;
  isLoad_calc: boolean = false;

  calc_mode = [
    { label: 'แทนค่าสมการ', value: 'sample_var' },
    { label: 'False Position Iteration', value: 'false_position' },
  ];
  calc_form: any = {
    mode: 'false_position',
    decimal_point: 6,
    formula: '',
    html_formula: '',
    convert_formula: '',
    html_formula_replace: '',
    convert_formula_replace: '',
    range: {
      root: { min: 1.5, max: 2.0 },
    },
    input_array: [],
    sample_var_mode: 'false_position',
  };
  sample_var_mode = [
    { label: 'ปกติ (แทนค่าทั้งหมดเพื่อหาคำตอบ)', value: 'normal' },
    { label: 'False Position Iteration', value: 'false_position' },
  ];

  result_logs: string = '';
  result_answer = {
    answer: '',
    false_position_table: Array<any>(),
    total_loop: 0,
  };

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
          label: (tooltipItems: any, data: any) => {
            return 'f(x): ' + tooltipItems.dataset.data[tooltipItems.dataIndex];
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
      } else if (element == '^' && formula[index + 1] == '(') {
        // If formula have ^ replace to **
        html_formula += '<sup>';
        convert_formula += '**';

        // If formula have ) replace to </sup>
        if (formula.includes(')')) {
          html_formula += '</sup>';
        }
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

    // // If formula have sqrt replace to Math.sqrt
    if (formula.includes('sqrt') && !formula.includes('Math.sqrt')) {
      html_formula = formula.replace(/sqrt/g, '√');
      convert_formula = formula.replace(/sqrt/g, 'Math.sqrt');
    }

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
    this.replacefomula();
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
    this.result_answer.false_position_table = [];
    this.result_answer.total_loop = 0;

    setTimeout(() => {
      try {
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

            this.result_answer.answer = answer
              .toFixed(decimal_point)
              .toString();
          } else if (sample_var_mode == 'false_position') {
            // Check range of x have min and max
            if (range.root.min == null || range.root.max == null) {
              error++;
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'กรุณาใส่ช่วงของ X',
              });
            }

            if (
              convert_formula_replace == null ||
              convert_formula_replace == ''
            ) {
              error++;
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'แทนค่าสมการ Error',
              });
            }

            // if error == 0 do fomula
            if (error == 0) {
              this.result_logs +=
                'f(x) = ' + convert_formula_replace + '=0' + '\n';
              this.result_logs += `---------------------------------` + '\n';

              // False Position
              let xl: number = range.root.min;
              let xr: number = range.root.max;
              // Init Result
              let xu: number = xl;

              let i = 0;
              while (true) {
                let change = '';

                let f_xl = this.f_function(xl, convert_formula_replace);
                let f_xr = this.f_function(xr, convert_formula_replace);

                xu = (xl * f_xr - xr * f_xl) / (f_xr - f_xl);
                let f_xu = this.f_function(xu, convert_formula_replace);

                this.result_logs +=
                  `Iteration Loop ${i}: ${xr} - (${xl} * (${xr} - ${xr}) / (${f_xr} - ${f_xl})` +
                  '\n';
                this.result_logs +=
                  `Iteration Result: xu: ${xu.toFixed(
                    decimal_point
                  )} f(xu): ${f_xu.toFixed(decimal_point)}` + '\n';

                if (f_xu == 0) {
                  this.result_answer.answer = xu.toFixed(decimal_point);
                  this.result_answer.false_position_table.push({
                    loop_count: ++i,
                    xl: xl.toFixed(decimal_point),
                    xr: xr.toFixed(decimal_point),
                    xm: xu.toFixed(decimal_point),
                    change: '-',
                  });
                  break;
                } else if (f_xu * f_xl < 0) {
                  xr = xu;
                  change = 'R ';
                } else {
                  xl = xu;
                  change = 'L ';
                }

                this.result_answer.false_position_table.push({
                  loop_count: ++i,
                  xl: xl.toFixed(decimal_point),
                  xr: xr.toFixed(decimal_point),
                  xm: xu.toFixed(decimal_point),
                  change: change,
                });
                this.result_answer.total_loop++;
              }
            }
          }
        }

        if (mode == 'false_position') {
          // Check range of x have min and max
          if (range.root.min == null || range.root.max == null) {
            error++;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'กรุณาใส่ช่วงของ X',
            });
          }

          if (
            this.f_function(range.root.min, convert_formula) *
              this.f_function(range.root.max, convert_formula) >=
            0
          ) {
            error++;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'สมการมากกว่า 0',
            });
          }

          // if error == 0 do fomula
          if (error == 0) {
            this.result_logs += 'f(x) = ' + convert_formula + '=0' + '\n';
            this.result_logs += `---------------------------------` + '\n';

            // False Position
            let xl: number = range.root.min;
            let xr: number = range.root.max;
            // Init Result
            let xu: number = xl;

            let i = 0;
            while (true) {
              let change = '';

              let f_xl = this.f_function(xl, convert_formula);
              let f_xr = this.f_function(xr, convert_formula);

              xu = (xl * f_xr - xr * f_xl) / (f_xr - f_xl);
              let f_xu = this.f_function(xu, convert_formula);

              this.result_logs +=
                `Iteration Loop ${i}: ${xr} - (${xl} * (${xr} - ${xr}) / (${f_xr} - ${f_xl})` +
                '\n';
              this.result_logs +=
                `Iteration Result: xu: ${xu.toFixed(
                  decimal_point
                )} f(xu): ${f_xu.toFixed(decimal_point)}` + '\n';

              if (f_xu == 0) {
                this.result_answer.answer = xu.toFixed(decimal_point);
                this.result_answer.false_position_table.push({
                  loop_count: ++i,
                  xl: xl.toFixed(decimal_point),
                  xr: xr.toFixed(decimal_point),
                  xm: xu.toFixed(decimal_point),
                  change: '-',
                });
                break;
              } else if (f_xu * f_xl < 0) {
                xr = xu;
                change = 'R ';
              } else {
                xl = xu;
                change = 'L ';
              }

              this.result_answer.false_position_table.push({
                loop_count: ++i,
                xl: xl.toFixed(decimal_point),
                xr: xr.toFixed(decimal_point),
                xm: xu.toFixed(decimal_point),
                change: change,
              });
              this.result_answer.total_loop++;
            }
          }
        }

        this.chart1_data = {
          labels: this.result_answer.false_position_table.map(
            (item: any) => item.loop_count
          ),
          datasets: [
            {
              label: 'Xm',
              data: this.result_answer.false_position_table.map(
                (item: any) => item.xm
              ),
              borderColor: '#42A5F5',
              fill: false,
              tension: 0.1,
            },
          ],
        };

        this.isLoad_calc = false;
      } catch (error) {
        // Error
        this.result_answer = {
          answer: '',
          false_position_table: Array<any>(),
          total_loop: 0,
        };
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

  f_function(x: number, convert_formula: any) {
    const { mode } = this.calc_form;
    if (mode == 'sample_var') {
      return eval(convert_formula) - x;
    } else if (mode == 'false_position') {
      return eval(convert_formula.replace(/x/g, x.toString()));
    }
  }

  clear_logs() {
    this.result_logs = '';
  }

  reset() {
    this.calc_form = {
      mode: 'sample_var',
      decimal_point: 6,
      formula: '',
      html_formula: '',
      convert_formula: '',
      html_formula_replace: '',
      convert_formula_replace: '',
      range: {
        root: { min: 0.02, max: 0.03 },
      },
      input_array: [],
      sample_var_mode: 'false_position',
    };
    this.result_logs = '';
    this.result_answer = {
      answer: '',
      false_position_table: Array<any>(),
      total_loop: 0,
    };
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
