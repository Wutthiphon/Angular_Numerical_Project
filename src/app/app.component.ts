import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

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
        },
        {
          label: 'Gauss Elimination',
          icon: 'pi pi-circle',
        },
        {
          label: 'Gauss-Jordan',
          icon: 'pi pi-circle',
        },
        {
          label: 'Matrix Inversion',
          icon: 'pi pi-circle',
        },
        {
          label: 'LU Decomposition',
          icon: 'pi pi-circle',
        },
        {
          label: 'Cholesky Decomposition',
          icon: 'pi pi-circle',
        },
        {
          label: 'Jacobi Iteration',
          icon: 'pi pi-circle',
        },
        {
          label: 'Gauss-Seidel Iteration',
          icon: 'pi pi-circle',
        },
        {
          label: 'Conjugate Gradient',
          icon: 'pi pi-circle',
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
          routerLink: '/interpolation_and_extrapolation/newton_divide_difference',
        },
        {
          label: 'Lagrange',
          icon: 'pi pi-circle',
        },
        {
          label: 'Spline',
          icon: 'pi pi-circle',
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
        },
        {
          label: 'Polynomial',
          icon: 'pi pi-circle',
        },
        {
          label: 'Multiple Linear',
          icon: 'pi pi-circle',
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
