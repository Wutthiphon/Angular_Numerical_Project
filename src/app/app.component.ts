import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  sidebarVisible: boolean = false;
  aside_items: MenuItem[] = [];

  url_path: string[] = [];
  current_url_path: string[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(async () => {
      this.loadMenu();
    });
  }

  async loadMenu() {
    this.current_url_path = this.router.url.split('/');

    // Update Url Path
    this.url_path = this.router.url.split('/');

    // Reload Aside Menu
    this.aside_items = [
      {
        label: 'หน้าแรก',
        icon: 'pi pi-home',
        routerLink: '/',
        styleClass: 'select-menu' + (this.router.url == '/' ? ' active' : ''),
      },
      {
        label: 'Root Of Equations',
        icon: 'pi pi-circle-fill',
        expanded: true,
        items: [
          // {
          //   label: 'Graphical Method',
          //   icon: 'pi pi-calculator',
          //   styleClass:
          //     'select-menu' +
          //     (this.router.url == '/root_of_quations/graphical'
          //       ? ' active'
          //       : ''),
          //   routerLink: '/root_of_quations/graphical',
          //   command: () => {
          //     this.openPage();
          //   },
          // },
          {
            label: 'Bisection Method',
            icon: 'pi pi-calculator',
            styleClass:
              'select-menu' +
              (this.router.url == '/root_of_quations/bisection'
                ? ' active'
                : ''),
            routerLink: '/root_of_quations/bisection',
            command: () => {
              this.openPage();
            },
          },
          // {
          //   label: 'False Position',
          //   icon: 'pi pi-calculator',
          //   styleClass:
          //     'select-menu' +
          //     (this.router.url == '/root_of_quations/false_position'
          //       ? ' active'
          //       : ''),
          //   routerLink: '/root_of_quations/false_position',
          //   command: () => {
          //     this.openPage();
          //   },
          // },
          // {
          //   label: 'One Point Iteration',
          //   icon: 'pi pi-calculator',
          //   styleClass:
          //     'select-menu' +
          //     (this.router.url == '/root_of_quations/one_point_iteration'
          //       ? ' active'
          //       : ''),
          //   routerLink: '/root_of_quations/one_point_iteration',
          //   command: () => {
          //     this.openPage();
          //   },
          // },
          // {
          //   label: 'Newton Raphson',
          //   icon: 'pi pi-calculator',
          //   styleClass:
          //     'select-menu' +
          //     (this.router.url == '/root_of_quations/newton_raphson'
          //       ? ' active'
          //       : ''),
          //   routerLink: '/root_of_quations/newton_raphson',
          //   command: () => {
          //     this.openPage();
          //   },
          // },
          // {
          //   label: 'Secant',
          //   icon: 'pi pi-calculator',
          //   styleClass:
          //     'select-menu' +
          //     (this.router.url == '/root_of_quations/secant' ? ' active' : ''),
          //   routerLink: '/root_of_quations/secant',
          //   command: () => {
          //     this.openPage();
          //   },
          // },
        ],
      },
      {
        label: 'Linear Algebraic Equations',
        icon: 'pi pi-circle-fill',
        expanded: true,
        items: [
          // {
          //   label: 'Gauss Elimination',
          //   icon: 'pi pi-circle',
          //   expanded: true,
          //   items: [],
          // },
          // {
          //   label: 'LU Decomposition & Matrix Inversion',
          //   icon: 'pi pi-circle',
          //   expanded: true,
          //   items: [],
          // },
          // {
          //   label: 'Gradient Method',
          //   icon: 'pi pi-circle',
          //   expanded: true,
          //   items: [
          //     {
          //       label: 'Gauss Seidel',
          //       icon: 'pi pi-calculator',
          //       styleClass:
          //         'select-menu' +
          //         (this.router.url == '/linear_algebraic_equations/gradient/gauss_seidel' ? ' active' : ''),
          //       routerLink: '/linear_algebraic_equations/gradient/gauss_seidel',
          //     },
          //     {
          //       label: 'Conjugate',
          //       icon: 'pi pi-calculator',
          //       styleClass:
          //         'select-menu' +
          //         (this.router.url == '/linear_algebraic_equations/gradient/conjugate' ? ' active' : ''),
          //       routerLink: '/linear_algebraic_equations/gradient/conjugate',
          //     },
          //   ],
          // },
          {
            label: 'Interpolation',
            icon: 'pi pi-circle',
            expanded: true,
            items: [
              {
                label: 'Newton Divide Difference',
                icon: 'pi pi-calculator',
                styleClass:
                  'select-menu' +
                  (this.router.url ==
                  '/linear_algebraic_equations/interpolation/newton_divide_difference'
                    ? ' active'
                    : ''),
                routerLink:
                  '/linear_algebraic_equations/interpolation/newton_divide_difference',
              },
              // {
              //   label: 'Lagrange',
              //   icon: 'pi pi-calculator',
              //   styleClass:
              //     'select-menu' +
              //     (this.router.url == '/linear_algebraic_equations/interpolation//lagrange' ? ' active' : ''),
              //   routerLink: '/linear_algebraic_equations/interpolation//lagrange',
              // },
              // {
              //   label: 'Spline',
              //   icon: 'pi pi-calculator',
              //   styleClass:
              //     'select-menu' +
              //     (this.router.url == '/linear_algebraic_equations/interpolation//spline' ? ' active' : ''),
              //   routerLink: '/linear_algebraic_equations/interpolation//spline',
              // },
            ],
          },
          // {
          //   label: 'Extrapolation',
          //   icon: 'pi pi-circle',
          //   expanded: true,
          //   items: [],
          // },
        ],
      },
    ];
  }

  toggleAside() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  openPage() {
    this.sidebarVisible = false;
  }
}
