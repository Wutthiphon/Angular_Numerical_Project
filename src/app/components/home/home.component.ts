import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  debug_mode: boolean = true;
  isLoad_calc: boolean = false;

  calc_mode = [
    { label: 'หา X', value: 'find_x' },
    { label: 'ทดลองแทนค่า', value: 'sample_var' },
    { label: 'Bisection', value: 'bisection' },
  ];
  calc_form: any = {
    mode: 'find_x',
    formula: '',
    html_formula: '',
    convert_formula: '',
    known: { x: true },
    range: {
      x: { min: 0, max: 10 },
      root: { min: 0.02, max: 0.03 },
    },
    input_array: [],
  };

  result_form: string = '';
  result_answer: number = 0;

  constructor(private messageService: MessageService) {}

  readFormula() {
    this.calc_form.input_array = [];
    let html_formula = '';
    let convert_formula = '';
    let use_alphabet: any = [];
    const { formula, mode } = this.calc_form;

    // If found english alphabet in formula add this to input_array sample found 1+x = 0 { label: 'x', value: '' }

    formula.split('').forEach((element: any, index: number) => {
      // remove space in formula
      if (element.match(/\s/g)) {
        html_formula = html_formula.replace(/\s/g, '');
        convert_formula = convert_formula.replace(/\s/g, '');
      }

      if (element.match(/[x]/i)) {
        // index of x - 1 == number add * to convert_formula
        if (index - 1 >= 0) {
          if (Number(formula[index - 1]) > -9999999999) {
            html_formula += '*';
            convert_formula += '*';
          }
        }
      }

      // If Mode == "ทดลองแทนค่า"
      if (mode == 'sample_var') {
        if (element.match(/[a-z]/i)) {
          if (!use_alphabet.includes(element)) {
            use_alphabet.push(element);
            this.calc_form.input_array.push({ label: element, value: '' });
          }
        }
        html_formula += element;
        convert_formula += element;
      }

      // If Mode == "หา X"
      if (mode == 'find_x') {
        html_formula += element;
        convert_formula += element;
      }

      if (mode == 'bisection') {
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
    const { convert_formula, mode, range } = this.calc_form;

    if (mode == 'sample_var') {
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
          this.result_form +=
            x_formula + '=' + x_answer + '; ans= ' + answer + '\n';

          if (x == range.x.min) {
            near_x_lower = answer;
            near_x_upper = x_answer;
          }
          if (answer < x_answer) {
            if (answer > near_x_lower) near_x_lower = answer;
          }
          if (answer > x_answer) {
            if (!near_x_upper_get) {
              near_x_upper = answer;
              near_x_upper_get = true;
            }
          }
        }
        near_x_upper_get = false;
        console.log(near_x_lower.toFixed(6), near_x_upper.toFixed(6));
        this.result_form +=
          'Loop 1 Result: ' +
          near_x_lower.toFixed(6) +
          ' , ' +
          near_x_upper.toFixed(6) +
          '\n';

        for (let x = near_x_lower; x < near_x_upper; x = x + 0.000001) {
          let replace_x = convert_formula.replace(
            /x/g,
            x.toFixed(6).toString()
          );
          let split_formula = replace_x.split('=');
          let x_formula = split_formula[0];
          let x_answer = split_formula[1];

          // Calculate Formula
          let answer = eval(x_formula);
          console.log(x_formula + '=' + x_answer + '; ans= ' + answer.toFixed(6));
          this.result_form +=
            x_formula + '=' + x_answer + '; ans= ' + answer.toFixed(6) + '\n';

          if (x == range.x.min) {
            near_x_lower = answer;
            near_x_upper = x_answer;
          }
          if (answer < x_answer) {
            if (answer > near_x_lower) near_x_lower = answer;
          }
          if (answer > x_answer) {
            if (!near_x_upper_get) {
              near_x_upper = answer;
              near_x_upper_get = true;
            }
          }

          if(answer == x_answer) {
            break;
          }
        }
        console.log(near_x_lower.toFixed(6), near_x_upper.toFixed(6));
        this.result_form +=
          'Loop 2 Result: ' +
          near_x_lower.toFixed(6) +
          ' , ' +
          near_x_upper.toFixed(6) +
          '\n';
      }
    }

    if (mode == 'bisection') {
      let bisection_x: number = 0;
      let bisection_y: number = 0;

      // Check range of x have min and max
      if (range.root.min == null || range.root.max == null) {
        error++;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'กรุณาใส่ช่วงของ X',
        });
      }
      // Check Have Alphabet in formula
      // if (convert_formula.match(/[a-z]/i)) {
      //   error++;
      //   this.messageService.add({
      //     severity: 'error',
      //     summary: 'Error',
      //     detail: 'สมการไม่ถูกต้อง พบตัวอักษร',
      //   });
      // }

      // if error == 0 do fomula
      if (error == 0) {
        console.log(convert_formula + '=0');
        this.result_form += convert_formula + '=0' + '\n';

        let a: number = range.root.min;
        let b: number = range.root.max;

        for (let i = 1; i <= 4; i++) {
          let mid = (a + b) / 2;
          console.log(`iteration ${i}: ${mid.toFixed(6)}`);
          this.result_form += `iteration ${i}: ${mid.toFixed(6)}` + '\n';

          if (this.formula_function(mid, convert_formula) === 0) {
            // Found root
            this.result_answer = mid;
            break;
          } else if (
            this.formula_function(a, convert_formula) *
              this.formula_function(mid, convert_formula) <
            0
          ) {
            b = mid;
          } else {
            a = mid;
          }
        }
      }
    }

    this.isLoad_calc = false;
  }

  formula_function(x: number, convert_formula: any) {
    return eval(convert_formula) - x;
  }
}
