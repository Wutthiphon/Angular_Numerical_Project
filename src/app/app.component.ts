import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showHome: boolean = false;
  menu_items: MenuItem[] = [
    {
      label: 'Root of Equation',
      items: [
        {
          label: 'Graphical Method',
          routerLink: '/root_of_quations/graphical',
        },
        {
          label: 'Bisection Method',
          routerLink: '/root_of_quations/bisection',
        },
        {
          label: 'False Position Method',
          routerLink: '/root_of_quations/false_position',
        },
        {
          label: 'One Point Iteration Method',
          routerLink: '/root_of_quations/one_point_iteration',
        },
        {
          label: 'Newton Raphson Method',
          routerLink: '/root_of_quations/newton_raphson',
        },
        {
          label: 'Secant Method',
          routerLink: '/root_of_quations/secant',
        },
      ],
    },
    {
      label: 'Linear Algebraic Equations',
      items: [
        {
          label: "Cramer's Rule",
          routerLink: '/linear_algebraic_equations/cramer',
        },
        {
          label: 'Gauss Elimination',
          routerLink: '/linear_algebraic_equations/gauss_elimination',
        },
        {
          label: 'Gauss-Jordan',
          routerLink: '/linear_algebraic_equations/gauss_jordan',
        },
        {
          label: 'Matrix Inversion',
          routerLink: '/linear_algebraic_equations/matrix_inversion',
        },
        {
          label: 'LU Decomposition',
          routerLink: '/linear_algebraic_equations/lu_decomposition',
        },
        {
          label: 'Cholesky Decomposition',
          routerLink: '/linear_algebraic_equations/cholesky_decomposition',
        },
        {
          label: 'Jacobi Iteration',
          routerLink: '/linear_algebraic_equations/jacobi_iteration',
        },
        {
          label: 'Gauss-Seidel Iteration',
          routerLink: '/linear_algebraic_equations/gauss_seidel_iteration',
        },
        {
          label: 'Conjugate Gradient',
          routerLink: '/linear_algebraic_equations/conjugate_gradient',
        },
      ],
    },
    {
      label: 'Interpolation & Extrapolation',
      items: [
        {
          label: 'Newton Divide Difference',
          routerLink:
            '/interpolation_and_extrapolation/newton_divide_difference',
        },
        {
          label: 'Lagrange',
          routerLink: '/interpolation_and_extrapolation/lagrange',
        },
        {
          label: 'Spline',
          routerLink: '/interpolation_and_extrapolation/spline',
        },
      ],
    },
    {
      label: 'Least Squares Regression',
      items: [
        {
          label: 'Linear',
          routerLink: '/least_squares_regression/linear',
        },
        {
          label: 'Polynomial',
          routerLink: '/least_squares_regression/polynomial',
        },
        {
          label: 'Multiple Linear',
          routerLink: '/least_squares_regression/multiple_linear',
        },
      ],
    },
    {
      label: 'Integration & Differentaition',
      items: [
        {
          label: 'Trapezoidal Rule',
          routerLink: '/integration_and_diff/trapezoidal',
        },
        {
          label: "Simpson's Rule",
          routerLink: '/integration_and_diff/simpson',
        },
        {
          label: 'Differentaition',
          routerLink: '/integration_and_diff/diff',
        },
      ],
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      //  if route != '' set showHome to true
      this.showHome = this.router.url != '/' ? true : false;
    });
  }
}
