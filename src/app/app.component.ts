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
      icon: 'fas fa-square-root-alt',
      items: [
        {
          label: 'Graphical Method',
          icon: 'pi pi-calculator',
          routerLink: '/root_of_quations/graphical',
        },
        {
          label: 'Bisection Method',
          icon: 'pi pi-calculator',
          routerLink: '/root_of_quations/bisection',
        },
        {
          label: 'False Position Method',
          icon: 'pi pi-calculator',
          routerLink: '/root_of_quations/false_position',
        },
        {
          label: 'One Point Iteration Method',
          icon: 'pi pi-calculator',
          routerLink: '/root_of_quations/one_point_iteration',
        },
        {
          label: 'Newton Raphson Method',
          icon: 'pi pi-calculator',
          routerLink: '/root_of_quations/newton_raphson',
        },
        {
          label: 'Secant Method',
          icon: 'pi pi-calculator',
          routerLink: '/root_of_quations/secant',
        },
      ],
    },
    {
      label: 'Linear Algebraic Equations',
      icon: 'fas fa-chart-line',
      items: [
        {
          label: "Cramer's Rule",
          icon: 'pi pi-circle',
          routerLink: '/linear_algebraic_equations/cramer',
        },
        {
          label: 'Gauss Elimination',
          icon: 'pi pi-circle',
          routerLink: '/linear_algebraic_equations/gauss_elimination',
        },
        {
          label: 'Gauss-Jordan',
          icon: 'pi pi-circle',
          routerLink: '/linear_algebraic_equations/gauss_jordan',
        },
        {
          label: 'Matrix Inversion',
          icon: 'pi pi-circle',
          routerLink: '/linear_algebraic_equations/matrix_inversion',
        },
        {
          label: 'LU Decomposition',
          icon: 'pi pi-circle',
          routerLink: '/linear_algebraic_equations/lu_decomposition',
        },
        {
          label: 'Cholesky Decomposition',
          icon: 'pi pi-circle',
          routerLink: '/linear_algebraic_equations/cholesky_decomposition',
        },
        {
          label: 'Jacobi Iteration',
          icon: 'pi pi-circle',
          routerLink: '/linear_algebraic_equations/jacobi_iteration',
        },
        {
          label: 'Gauss-Seidel Iteration',
          icon: 'pi pi-circle',
          routerLink: '/linear_algebraic_equations/gauss_seidel_iteration',
        },
        {
          label: 'Conjugate Gradient',
          icon: 'pi pi-circle',
          routerLink: '/linear_algebraic_equations/conjugate_gradient',
        },
      ],
    },
    {
      label: 'Interpolation & Extrapolation',
      icon: 'fas fa-chart-line',
      items: [
        {
          label: 'Newton Divide Difference',
          icon: 'pi pi-circle',
          routerLink:
            '/interpolation_and_extrapolation/newton_divide_difference',
        },
        {
          label: 'Lagrange',
          icon: 'pi pi-circle',
          routerLink: '/interpolation_and_extrapolation/lagrange',
        },
        {
          label: 'Spline',
          icon: 'pi pi-circle',
          routerLink: '/interpolation_and_extrapolation/spline',
        },
      ],
    },
    {
      label: 'Least Squares Regression',
      icon: 'fas fa-chart-line',
      items: [
        {
          label: 'Linear',
          icon: 'pi pi-circle',
          routerLink: '/least_squares_regression/linear',
        },
        {
          label: 'Polynomial',
          icon: 'pi pi-circle',
          routerLink: '/least_squares_regression/polynomial',
        },
        {
          label: 'Multiple Linear',
          icon: 'pi pi-circle',
          routerLink: '/least_squares_regression/multiple_linear',
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
