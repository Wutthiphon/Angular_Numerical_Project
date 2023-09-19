import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  isApiLoad: boolean = true;
  isLogin: boolean = false;
  username: string = '';
  sidebarVisible: boolean = false;
  profile_items: MenuItem[] = [];
  aside_items: any[] = [];

  url_path: string[] = [];
  current_url_path: string[] = [];

  force_refresh: boolean = false;

  have_profile_image: boolean = false;
  user_profile_image: string =
    './assets/image/not_found_image/profile_image_not_found.png';

  changepassword_dialog: boolean = false;
  changepassword_form: any = {
    old_password: '',
    new_password: '',
    confirm_password: '',
    input_error: '',
    input_class: '',
  };

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(async () => {
      this.loadMenu();
    });

    //Load Check Login
    this.profile_items = [
      {
        label: 'ข้อมูลพื้นฐาน',
        icon: 'pi pi-user',
        routerLink: '/',
        command: () => {
          // this.openPage();
        },
      },
      {
        label: 'เปลี่ยนรหัสผ่าน',
        icon: 'pi pi-key',
        command: () => {
          // this.ChangePassword();
        },
      },
      {
        separator: true,
      },
      {
        label: 'ออกจากระบบ',
        icon: 'pi pi-sign-out',
        command: () => {
          // this.logout();
        },
      },
    ];
  }

  async loadMenu() {
    this.current_url_path = this.router.url.split('/');
    let url_change = false;
    if (this.url_path[2] != this.current_url_path[2]) {
      this.current_url_path[2] = this.url_path[2];
      url_change = true;
    }
    // Update Url Path
    this.url_path = this.router.url.split('/');

    // Reload Aside Menu
    this.aside_items = [];
    this.aside_items.push(
      {
        label: 'Root Of Equations',
        icon: 'pi pi-circle-fill',
        expanded: true,
        items: [
          {
            label: 'Graphical Method',
            icon: 'pi pi-calculator',
            styleClass:
              'select-menu' +
              (this.router.url == '/graphical_method' ? ' active' : ''),
            routerLink: '/graphical_method',
            command: () => {
              this.openPage();
            },
          },
          {
            label: 'Bisection Method',
            icon: 'pi pi-calculator',
            styleClass:
              'select-menu' +
              (this.router.url == '/bisection_method' ? ' active' : ''),
            routerLink: '/bisection_method',
            command: () => {
              this.openPage();
            },
          },
          {
            label: 'False Position',
            icon: 'pi pi-calculator',
            styleClass:
              'select-menu' +
              (this.router.url == '/false_position' ? ' active' : ''),
            routerLink: '/false_position',
            command: () => {
              this.openPage();
            },
          },
          {
            label: 'One Point Iteration',
            icon: 'pi pi-calculator',
            styleClass:
              'select-menu' +
              (this.router.url == '/one_point_iteration' ? ' active' : ''),
            routerLink: '/one_point_iteration',
            command: () => {
              this.openPage();
            },
          },
          {
            label: 'Taylor Series',
            icon: 'pi pi-calculator',
            styleClass:
              'select-menu' + (this.router.url == '/taylor' ? ' active' : ''),
            routerLink: '/taylor',
            command: () => {
              this.openPage();
            },
          },
          {
            label: 'Newton Raphson',
            icon: 'pi pi-calculator',
            styleClass:
              'select-menu' +
              (this.router.url == '/newton_raphson' ? ' active' : ''),
            routerLink: '/newton_raphson',
            command: () => {
              this.openPage();
            },
          },
          {
            label: "Cramer's Rule",
            icon: 'pi pi-calculator',
            styleClass:
              'select-menu' +
              (this.router.url == '/cramer_rule' ? ' active' : ''),
            routerLink: '/cramer_rule',
            command: () => {
              this.openPage();
            },
          },
          {
            label: 'Gauss Elimination',
            icon: 'pi pi-calculator',
            styleClass:
              'select-menu' +
              (this.router.url == '/gauss_elimination' ? ' active' : ''),
            routerLink: '/gauss_elimination',
            command: () => {
              this.openPage();
            },
          },
          {
            label: 'Secant',
            icon: 'pi pi-calculator',
            styleClass:
              'select-menu' + (this.router.url == '/secant' ? ' active' : ''),
            routerLink: '/secant',
            command: () => {
              this.openPage();
            },
          },
          {
            label: 'Matrix Inversion',
            icon: 'pi pi-calculator',
            styleClass:
              'select-menu' +
              (this.router.url == 'matrix_inversion' ? ' active' : ''),
            routerLink: '/matrix_inversion',
            command: () => {
              this.openPage();
            },
          },
        ],
      },
      {
        label: 'Linear Algebric Equations',
        icon: 'pi pi-circle-fill',
        expanded: true,
        items: [
          {
            label: 'LU Decompos Method',
            icon: 'pi pi-calculator',
            styleClass:
              'select-menu' +
              (this.router.url == '/LU_decompos' ? ' active' : ''),
            routerLink: '/LU_decompos',
            command: () => {
              this.openPage();
            },
          },
          {
            label: 'Conjugate',
            icon: 'pi pi-calculator',
            styleClass:
              'select-menu' +
              (this.router.url == '/conjugate' ? ' active' : ''),
            routerLink: '/conjugate',
            command: () => {
              this.openPage();
            },
          },
          {
            label: 'Interpolation',
            icon: 'pi pi-calculator',
            styleClass:
              'select-menu' +
              (this.router.url == '/interpolation' ? ' active' : ''),
            routerLink: '/interpolation',
            command: () => {
              this.openPage();
            },
          },
          {
            label: 'Extrapolation',
            icon: 'pi pi-calculator',
            styleClass:
              'select-menu' +
              (this.router.url == '/extrapolation' ? ' active' : ''),
            routerLink: '/extrapolation',
            command: () => {
              this.openPage();
            },
          },
        ],
      }
    );

    // Disable Force Refresh
    this.force_refresh = false;

    this._changeDetectorRef.detectChanges();
  }

  toggleAside() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  openPage() {
    this.sidebarVisible = false;
  }
}
