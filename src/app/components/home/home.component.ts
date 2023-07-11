import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  calc_form = {
    input: '',
    formula: '',
  };
  isLoad_calc: boolean = false;

  constructor() {}

  calculate() {
    this.isLoad_calc = true;
    const { input, formula } = this.calc_form;

    setTimeout(() => {
      this.isLoad_calc = false;
    }, 150);
  }
}
