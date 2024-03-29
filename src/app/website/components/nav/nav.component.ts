import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { Router } from '@angular/router';

import { StoreService } from '../../../services/store.service'
import { Category } from 'src/app/models/product.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  activeCart = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = [];

  myCart$ = this.storeService.myCart$;

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategories();
    this.authService.user$
      .subscribe(data => {
        this.profile = data;
      })
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  toggleCart() {
    this.activeCart = !this.activeCart;
  }

  getAllCategories() {
    this.categoriesService.getAll()
      .subscribe(data => {
        this.categories = data;
      });
  }

  logout() {
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
    swal.fire(
      'See you later!',
      'You logged out!',
      'success'
    )
  }

}
