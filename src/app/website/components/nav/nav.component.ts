import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { Router } from '@angular/router';

import { StoreService } from '../../../services/store.service'
import { Category } from 'src/app/models/product.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private userService: UsersService,
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

  login() {
    this.authService.loginAndGet('admin@mail.com', 'admin123')
      .subscribe(() => {
        this.router.navigate(['/profile']);
        Swal.fire(
          'Welcome!',
          'You are logged in!',
          'success'
        );
      });
  }

  createUser() {
    this.userService.createUser({
      name: 'Nicolas Erazo',
      email: 'nico.lacho@outlook.com',
      password: 'Nicolas1',
      role: 'admin',
      avatar: '',
    }).subscribe()
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
    Swal.fire(
      'See you later!',
      'You logged out!',
      'success'
    )
  }

}
