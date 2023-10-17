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
      x_near: { min: 0, max: 0 },
    },
  };

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
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            zeroLineWidth: 3,
            zeroLineColor: '#2C292E',
          },
        },
      ],
    },
  };
  chart1_data: any;
  chart2_data: any;

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
          let chart1_label = [];
          let chart1_data = [];
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

            // Push to chart1
            chart1_label.push(x);
            chart1_data.push(answer);

            // Find near x min / max
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

          // Chart 1
          this.chart1_data = {
            labels: chart1_label,
            datasets: [
              {
                label: 'X',
                data: chart1_data.map((x: number) => x.toFixed(decimal_point)),
              },
              {
                label: '0',
                data: chart1_data.map((x: number) => 0),
              },
            ],
          };

          this.result_logs +=
            'Loop 1 Result: ' +
            near_x_lower.toFixed(decimal_point) +
            ' , ' +
            near_x_upper.toFixed(decimal_point) +
            '\n';

          this.calc_form.range.x_near.min = near_x_lower.toFixed(decimal_point);
          this.calc_form.range.x_near.max = near_x_upper.toFixed(decimal_point);
          let near_x_data = [];
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
            near_x_data.push(answer);

            if (answer >= x_answer) {
              // End Loop
              this.result_logs += 'Answer X = : ' + x.toFixed(decimal_point);
              this.result_answer.answer = x.toFixed(decimal_point);

              // Chart 2
              let near_x_data_loop_count = near_x_data.length;
              let chart2_label = [];
              let chart2_data = [];
              if (near_x_data_loop_count > 20) {
                for (let x = 0; x < 20; x++) {
                  let index = Math.floor(near_x_data_loop_count / 20) * x;
                  chart2_label.push(index);
                  chart2_data.push(near_x_data[index]);
                }
                chart2_label.push(near_x_data_loop_count);
                chart2_data.push(answer);
              } else {
                for (let x = 0; x < near_x_data_loop_count; x++) {
                  chart2_label.push(x);
                  chart2_data.push(near_x_data[x]);
                }
              }
              this.chart2_data = {
                labels: chart2_label,
                datasets: [
                  {
                    label: 'X',
                    data: chart2_data.map((x: number) =>
                      x.toFixed(decimal_point)
                    ),
                  },
                  {
                    label: '0',
                    data: chart2_data.map((x: number) => 0),
                  },
                ],
              };

              break;
            }
            this.result_answer.total_loop++;
          }
        }
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

  clear_logs() {
    this.result_logs = '';
  }
}
