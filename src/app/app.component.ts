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
    // {
    //   label: 'Linear Algebraic Equations',
    //   icon: 'fas fa-chart-line',
    //   items: [
    //     {
    //       label: 'Gauss Elimination',
    //       icon: 'pi pi-circle',
    //       expanded: true,
    //     },
    //     {
    //       label: 'LU Decomposition & Matrix Inversion',
    //       icon: 'pi pi-circle',
    //       expanded: true,
    //     },
    //     {
    //       label: 'Gauss Seidel',
    //       icon: 'pi pi-calculator',
    //       routerLink: '/linear_algebraic_equations/gradient/gauss_seidel',
    //     },
    //     {
    //       label: 'Conjugate',
    //       icon: 'pi pi-calculator',
    //       routerLink: '/linear_algebraic_equations/gradient/conjugate',
    //     },
    //     // {
    //     //   label: 'Newton Divide Difference',
    //     //   icon: 'pi pi-calculator',
    //     //   routerLink:
    //     //     '/linear_algebraic_equations/interpolation/newton_divide_difference',
    //     // },
    //     // {
    //     //   label: 'Lagrange',
    //     //   icon: 'pi pi-calculator',
    //     //   routerLink: '/linear_algebraic_equations/interpolation//lagrange',
    //     // },
    //     // {
    //     //   label: 'Spline',
    //     //   icon: 'pi pi-calculator',
    //     //   routerLink: '/linear_algebraic_equations/interpolation//spline',
    //     // },
    //   ],
    // },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      //  if route != '' set showHome to true
      this.showHome = this.router.url != '/' ? true : false;
    });
  }
}
