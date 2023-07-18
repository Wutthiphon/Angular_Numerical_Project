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
    this.aside_items.push({
      label: 'หน้าต่างคำนวน',
      items: [
        {
          label: 'หน้าต่างคำนวน',
          icon: 'pi pi-home',
          styleClass: 'select-menu' + (this.router.url == '/' ? ' active' : ''),
          routerLink: '/',
          command: () => {
            this.openPage();
          },
        },
      ],
    });
    // this.aside_items.push({
    //   label: 'Data Source',
    //   items: [
    //     {
    //       label: 'Data Source',
    //       icon: 'pi pi-file-excel',
    //       styleClass:
    //         'select-menu' + (this.router.url == '/datasource' ? ' active' : ''),
    //       routerLink: '/datasource',
    //       command: () => {
    //         this.openPage();
    //       },
    //     },
    //     {
    //       label: 'โปรไฟล์',
    //       icon: 'pi pi-user',
    //       styleClass:
    //         'select-menu' +
    //         (this.router.url == '/teacher/profile' ? ' active' : ''),
    //       routerLink: '/teacher/profile',
    //       command: () => {
    //         this.openPage();
    //       },
    //     },
    //   ],
    // });

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
