import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  imgParent = '';
  showImg = true;
  token = '';

  constructor( 
    private authService: AuthService,
    private tokenService: TokenService){

  }

  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if(token){
      this.authService.getProfile()
      .subscribe()
    }
  }

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

}
