import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bisection',
  templateUrl: './bisection.component.html',
  styleUrls: ['./bisection.component.scss'],
})
export class BisectionComponent {
  debug_mode: boolean = false;
  isLoad_calc: boolean = false;

  calc_mode = [
    { label: 'แทนค่าสมการ', value: 'sample_var' },
    { label: 'Bisection Iteration', value: 'bisection' },
  ];
  calc_form: any = {
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

  constructor(
    private messageService: MessageService,
    private apiService: ApiService
  ) {}

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
    this.result_answer.bisection_table = [];
    this.result_answer.total_loop = 0;

    this.apiService
      .findFormula(convert_formula_replace, range.root, 'bisection')
      .subscribe((res: any) => {
        if (res.status == true) {
          // If Found Previous Calculate
          this.result_logs += 'Found Previous Calculate In Database\n';
          this.result_answer.answer = Number(
            res.find_previous_formula.formula_result.find((type: any) => {
              return type.result_type == 'answer';
            })?.value
          ).toFixed(decimal_point);
          this.result_answer.total_loop =
            res.find_previous_formula.formula_result.find((type: any) => {
              return type.result_type == 'loop_count';
            })?.value;
          this.result_answer.bisection_table = JSON.parse(
            res.find_previous_formula.formula_result.find((type: any) => {
              return type.result_type == 'bisection_table';
            })?.value
          );
          this.chart1_data = JSON.parse(
            res.find_previous_formula.formula_result.find((type: any) => {
              return type.result_type == 'chart1';
            })?.value
          );
          this.isLoad_calc = false;
        } else {
          let result_mid: number = 0;

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
                    'answer: ' +
                    answer.toFixed(decimal_point).toString() +
                    '\n';

                  this.result_answer.answer = answer
                    .toFixed(decimal_point)
                    .toString();
                } else if (sample_var_mode == 'bisection') {
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
                    this.result_logs +=
                      `---------------------------------` + '\n';

                    let a: number = range.root.min;
                    let b: number = range.root.max;

                    let i = 0;
                    while (true) {
                      let mid = (a + b) / 2;

                      this.result_logs +=
                        `Iteration Loop ${i}: mid = ${a.toFixed(
                          decimal_point
                        )} + ${b.toFixed(decimal_point)} / 2` + '\n';
                      this.result_logs +=
                        `Iteration Result: ${mid.toFixed(decimal_point)}` +
                        '\n';

                      let f_x_test = convert_formula_replace.replace(
                        /x/g,
                        mid.toFixed(decimal_point).toString()
                      );
                      this.result_logs +=
                        'f(x) = ' +
                        Number(eval(f_x_test))
                          .toFixed(decimal_point)
                          .toString() +
                        '\n';
                      this.result_logs +=
                        `---------------------------------` + '\n';

                      let change = '';
                      if (this.f_function(mid, convert_formula_replace) == 0) {
                        this.result_answer.answer = mid.toFixed(decimal_point);
                        this.result_answer.bisection_table.push({
                          loop_count: ++i,
                          xl: a.toFixed(decimal_point),
                          xr: b.toFixed(decimal_point),
                          xm: mid.toFixed(decimal_point),
                          change: '-',
                        });
                        result_mid = mid;
                        break;
                      } else if (
                        this.f_function(a, convert_formula_replace) *
                          this.f_function(mid, convert_formula_replace) <
                        0
                      ) {
                        b = mid;
                        change = 'R ';
                      } else {
                        a = mid;
                        change = 'L ';
                      }

                      this.result_answer.bisection_table.push({
                        loop_count: ++i,
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

              if (mode == 'bisection') {
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
                  this.result_logs +=
                    `---------------------------------` + '\n';

                  let a: number = range.root.min;
                  let b: number = range.root.max;

                  let i = 0;
                  while (true) {
                    let mid = (a + b) / 2;

                    this.result_logs +=
                      `Iteration Loop ${i}: mid = ${a.toFixed(
                        decimal_point
                      )} + ${b.toFixed(decimal_point)} / 2` + '\n';
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
                    this.result_logs +=
                      `---------------------------------` + '\n';

                    let change = '';

                    if (this.f_function(mid, convert_formula) == 0) {
                      this.result_answer.answer = mid.toFixed(decimal_point);
                      this.result_answer.bisection_table.push({
                        loop_count: ++i,
                        xl: a.toFixed(decimal_point),
                        xr: b.toFixed(decimal_point),
                        xm: mid.toFixed(decimal_point),
                        change: '-',
                      });
                      result_mid = mid;
                      break;
                    } else if (
                      this.f_function(a, convert_formula) *
                        this.f_function(mid, convert_formula) <
                      0
                    ) {
                      b = mid;
                      change = 'R ';
                    } else {
                      a = mid;
                      change = 'L ';
                    }

                    this.result_answer.bisection_table.push({
                      loop_count: ++i,
                      xl: a.toFixed(decimal_point),
                      xr: b.toFixed(decimal_point),
                      xm: mid.toFixed(decimal_point),
                      change: change,
                    });
                    this.result_answer.total_loop++;
                  }
                }
              }

              this.chart1_data = {
                labels: this.result_answer.bisection_table.map(
                  (item: any) => item.loop_count
                ),
                datasets: [
                  {
                    label: 'Xm',
                    data: this.result_answer.bisection_table.map(
                      (item: any) => item.xm
                    ),
                    borderColor: '#42A5F5',
                    fill: false,
                    tension: 0.1,
                  },
                ],
              };

              // Save To Database
              this.apiService
                .saveFormula(convert_formula_replace, range.root, 'bisection', {
                  answer: result_mid,
                  loop_count: this.result_answer.total_loop,
                  bisection_table: this.result_answer.bisection_table,
                  chart1: this.chart1_data,
                })
                .subscribe((res: any) => {
                  if (res.status == true) {
                    this.messageService.add({
                      severity: 'success',
                      summary: 'Success',
                      detail: 'บันทึกการคำนวนสำเร็จ',
                    });
                  }
                });

              this.isLoad_calc = false;
            } catch (error) {
              // Error
              this.result_answer = {
                answer: '',
                bisection_table: Array<any>(),
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
      });
  }

  f_function(x: number, convert_formula: any) {
    return eval(convert_formula) - x;
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
      sample_var_mode: 'bisection',
    };
    this.result_logs = '';
    this.result_answer = {
      answer: '',
      bisection_table: Array<any>(),
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
