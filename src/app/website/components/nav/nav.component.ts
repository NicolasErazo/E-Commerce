import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { CategoriesService } from 'src/app/services/categories.service';

import { StoreService } from '../../../services/store.service'
import { Category } from 'src/app/models/product.model';

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
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategories();
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login(){
    this.authService.loginAndGet('nico.lacho@outlook.com','Nicolas1').subscribe(user =>{
      this.profile = user;
    })
  }

  createUser(){
    this.userService.createUser({
      name: 'Nicolas Erazo',
      email: 'nico.lacho@outlook.com',
      password: 'Nicolas1'
    }).subscribe(rta =>{
      console.log(rta);
    })
  }

  getAllCategories(){
    this.categoriesService.getAll()
    .subscribe(data =>{
      this.categories = data;
    });
  }

}
