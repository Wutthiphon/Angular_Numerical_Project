import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-multiple-linear',
  templateUrl: './multiple-linear.component.html',
  styleUrls: ['./multiple-linear.component.scss'],
})
export class MultipleLinearComponent {
  isLoad_calc: boolean = false;

  calc_form: any = {
    dataset_size: {
      rows: 7,
      cols: 3,
    },
    dataset_x: [],
    dataset_y: [],
    dataset_target: [],
    decimal_point: 6,
    answer: 9,
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
  };
  chart1_data: any;

  constructor(private messageService: MessageService) {
    this.updateDatasetSize();
  }

  updateDatasetSize() {
    const { rows, cols } = this.calc_form.dataset_size;

    this.calc_form.dataset_x = [];
    for (let i = 0; i < rows; i++) {
      let col = [];
      for (let j = 0; j < cols; j++) {
        col.push({ value: null });
      }
      this.calc_form.dataset_x.push({ cols: col });
    }

    this.calc_form.dataset_y = [];
    for (let i = 0; i < rows; i++) {
      this.calc_form.dataset_y.push({ value: null });
    }

    this.calc_form.dataset_target = [];
    for (let i = 0; i < cols; i++) {
      this.calc_form.dataset_target.push({ value: null });
    }

    const X = [
      [1, 0, 1],
      [0, 1, 3],
      [2, 4, 1],
      [3, 2, 2],
      [4, 1, 5],
      [4, 3, 3],
      [1, 6, 4],
    ];
    const Y = [4, -5, -6, 0, -1, -7, -20];

    this.calc_form.dataset_x = [];
    for (let i = 0; i < X.length; i++) {
      let col = [];
      for (let j = 0; j < X[0].length; j++) {
        col.push({ value: X[i][j] });
      }
      this.calc_form.dataset_x.push({ cols: col });
    }

    this.calc_form.dataset_y = [];
    for (let i = 0; i < Y.length; i++) {
      this.calc_form.dataset_y.push({ value: Y[i] });
    }
  }

  calculate() {
    let point_data: any = []; // [{x: , y:}}]
    const { dataset_x, dataset_y, decimal_point, dataset_target } =
      this.calc_form;

    let matrixX = dataset_x.map((row: any) => {
      return row.cols.map((col: any) => {
        return col.value;
      });
    });
    let matrixY = dataset_y.map((row: any) => {
      return row.value;
    });
    let matrixTarget = dataset_target.map((row: any) => {
      return row.value;
    });

    this.isLoad_calc = true;
    // Calculate Multiple Linear
    console.log(matrixX, matrixY, matrixTarget);

    this.isLoad_calc = false;

    let all_data: any = [];
    for (let col = 0; col < matrixX[0].length; col++) {
      let data = [];
      for (let row = 0; row < matrixX.length; row++) {
        data.push({ x: matrixX[row][col], y: matrixY[row] });
      }
      all_data.push({
        type: 'scatter',
        label: 'X' + (col + 1),
        borderWidth: 4,
        data: data,
      });
    }

    this.chart1_data = {
      datasets: [
        ...all_data,
        // {
        //   type: 'scatter',
        //   label: 'Answer',
        //   borderWidth: 4,
        //   data: point_data.map((item: any) => {
        //     return { x: item.x, y: item.y };
        //   }),
        // },
      ],
    };
  }

  reset() {
    this.calc_form.target = null;
  }
}
