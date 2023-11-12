import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-matrix-inverse',
  templateUrl: './matrix-inverse.component.html',
  styleUrls: ['./matrix-inverse.component.scss'],
})
export class MatrixInverseComponent {
  matrix_size: number = 3;
  matrix_input_array: any = [];
  matrix_out_array: any = [];
  matrix_iden_array: any = [];

  constructor(
    private messageService: MessageService,
    private apiService: ApiService
  ) {
    this.createMatrixInput();
  }

  createMatrixInput() {
    this.matrix_input_array = [];
    if (this.matrix_size > 1) {
      if (this.matrix_size > 5) {
        this.matrix_size = 5;
      }
      for (let i = 0; i < this.matrix_size; i++) {
        let col = [];
        for (let j = 0; j < this.matrix_size; j++) {
          col.push({ value: null });
        }

        this.matrix_input_array.push({ col: col });

        // Init array
        // let sample: number[][] = [
        //   [2, 0, -1],
        //   [5, 1, 0],
        //   [0, 1, 3],
        // ];
        // this.matrix_input_array[i].col = sample[i].map((value: any) => {
        //   return { value: value };
        // });
      }
    } else {
      this.matrix_input_array = [];
    }
  }

  randMatrix() {
    this.apiService.randMatrix('matrix_inverse').subscribe((api_res: any) => {
      if (api_res.status == true) {
        console.log(api_res.find_previous_formula);

        for (let [i, data] of this.matrix_input_array.entries()) {
          data.col.map((col: any, j: number) => {
            // console.log(col.value, i, j);
            let key = 'x' + String(i) + String(j);
            col.value = Number(
              api_res.find_previous_formula.formula_input.find((value: any) => {
                return value.input_word == key;
              }).value
            );
          });
        }

        this.matrix_out_array = JSON.parse(
          api_res.find_previous_formula.formula_result.find((type: any) => {
            return type.result_type == 'result';
          }).value
        );
        this.matrix_iden_array = JSON.parse(
          api_res.find_previous_formula.formula_result.find((type: any) => {
            return type.result_type == 'matrix_iden_array';
          }).value
        );
      }
    });
  }

  calculateMatrix() {
    let matrix: any = this.matrix_input_array.map((value: any) => {
      return value.col.map((col_value: any) => {
        return col_value.value != null ? Number(col_value.value) : null;
      });
    });

    // Check All
    let check: boolean = true;
    for (let i = 0; i < this.matrix_size; i++) {
      for (let j = 0; j < this.matrix_size; j++) {
        if (matrix[i][j] == null) {
          check = false;
          break;
        }
      }
    }

    if (!check) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'ค่าไม่ครบ',
      });
      return;
    }

    // Calculate Logic
    let matrix_size = this.matrix_size;

    // Check In Database
    let find_matrix_array = [];
    for (let i = 0; i < matrix_size; i++) {
      for (let j = 0; j < matrix_size; j++) {
        find_matrix_array.push({
          key: 'x' + String(i) + String(j),
          value: matrix[i][j],
        });
      }
    }
    find_matrix_array.push({
      key: 'size',
      value: this.matrix_size,
    });

    this.apiService
      .findMatrix(find_matrix_array, 'matrix_inverse')
      .subscribe((api_res: any) => {
        if (api_res.status == true) {
          console.log(api_res.find_previous_formula);
          this.matrix_out_array = JSON.parse(
            api_res.find_previous_formula.formula_result.find((type: any) => {
              return type.result_type == 'result';
            }).value
          );
          this.matrix_iden_array = JSON.parse(
            api_res.find_previous_formula.formula_result.find((type: any) => {
              return type.result_type == 'matrix_iden_array';
            }).value
          );
        } else {
          // Convert to Augmented Matrix [A|I]
          let augmented_matrix: any = [];
          for (let i = 0; i < matrix_size; i++) {
            let col = [];
            for (let j = 0; j < matrix_size * 2; j++) {
              if (j < matrix_size) {
                col.push(matrix[i][j]);
              } else {
                col.push(i == j - matrix_size ? 1 : 0);
              }
            }
            augmented_matrix.push(col);
          }

          // // Gauss-Jordan Elimination
          for (let i = 0; i < matrix_size; i++) {
            // Init divider by (1xx x1x xx1)
            let divider = augmented_matrix[i][i];
            for (let j = 0; j < matrix_size * 2; j++) {
              augmented_matrix[i][j] /= divider; // Divide by divider
            }

            // Loop all row
            for (let j = 0; j < matrix_size; j++) {
              // Check is not (1xx x1x xx1)
              if (i != j) {
                // Init multiplier by (1xx x1x xx1)
                let multiplier = augmented_matrix[j][i];
                // Loop all column
                for (let k = 0; k < matrix_size * 2; k++) {
                  // Multiply by multiplier and subtract
                  augmented_matrix[j][k] -= augmented_matrix[i][k] * multiplier;
                }
              }
            }
          }

          // Output Result
          let first_matrix: any = [];
          let result_matrix: any = [];
          for (let i = 0; i < matrix_size; i++) {
            let f_col = [];
            for (let j = 0; j < matrix_size; j++) {
              f_col.push(augmented_matrix[i][j]);
            }
            first_matrix.push(f_col);

            let col = [];
            for (let j = matrix_size; j < matrix_size * 2; j++) {
              col.push(augmented_matrix[i][j]);
            }
            result_matrix.push(col);
          }

          this.matrix_out_array = result_matrix;
          console.log(first_matrix);
          console.log(result_matrix);

          let matrix_iden_array: any = [];
          for (let i = 0; i < matrix_size; i++) {
            let col = [];
            for (let j = 0; j < matrix_size; j++) {
              let sum = 0;
              for (let k = 0; k < matrix_size; k++) {
                sum += result_matrix[i][k] * matrix[k][j];
              }
              col.push(sum);
            }
            matrix_iden_array.push(col);
          }
          this.matrix_iden_array = matrix_iden_array;
          console.log(matrix_iden_array);

          let input_matrix_array = [];
          for (let i = 0; i < matrix_size; i++) {
            for (let j = 0; j < matrix_size; j++) {
              input_matrix_array.push({
                key: 'x' + String(i) + String(j),
                value: matrix[i][j],
              });
            }
          }

          console.log(input_matrix_array);
          input_matrix_array.push({
            key: 'size',
            value: this.matrix_size,
          });
          this.apiService
            .saveMatrix(input_matrix_array, 'matrix_inverse', {
              result: result_matrix,
              matrix_iden_array: matrix_iden_array,
            })
            .subscribe((api_res: any) => {
              if (api_res.status == true) {
                // Success
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'บันทึกลงฐานข้อมูลสำเร็จ',
                });
              }
            });
        }
      });
  }

  toFixed(value: number, decimal: number) {
    return value.toFixed(decimal);
  }
}
