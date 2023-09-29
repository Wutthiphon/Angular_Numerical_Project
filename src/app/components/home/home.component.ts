import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  menu_items: any[] = [];
  menu_items_filter: any[] = [];
  input_search: string = '';

  constructor(public app: AppComponent) {
    this.menu_items = app.menu_items;
    this.onSearch();
  }

  onSearch() {
    let menu_items_filter: any[] = [];

    if (this.input_search != '') {
      this.menu_items.forEach((item) => {
        if (
          item.label.toLowerCase().includes(this.input_search.toLowerCase())
        ) {
          menu_items_filter.push(item);
        } else {
          let items_filter: any[] = [];
          item.items.forEach((sub_item: any) => {
            if (
              sub_item.label
                .toLowerCase()
                .includes(this.input_search.toLowerCase())
            ) {
              items_filter.push(sub_item);
            }
          });

          if (items_filter.length > 0) {
            menu_items_filter.push({
              label: item.label,
              icon: item.icon,
              items: items_filter,
            });
          }
        }
      });
    } else {
      menu_items_filter = this.menu_items;
    }

    this.menu_items_filter = menu_items_filter;
  }
}
