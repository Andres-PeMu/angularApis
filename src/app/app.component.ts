import { Component } from '@angular/core';

import { AuthService } from './services/auth.service'
import { UsersService } from './services/users.service'
import { FilesService } from './services/files.service'
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token = '';

  constructor (
    private authService:AuthService,
    private usersService:UsersService,
    private filesService:FilesService
  ){}

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser(){
    this.usersService.create({
      name:'andres',
      email: 'andres@mail.com',
      password: '1212'
    }).subscribe(rta => {
      console.log(rta);
    })
  }

  login(){
    this.authService.login('john@mail.com','changeme')
    .subscribe(rta => {
      this.token = rta.access_token;
    })
  }

  getProfile(){
    this.authService.profile()
    .subscribe(profile => {
      console.log(profile)
    })
  }

  downloadPdf(){
    this.filesService.getFile('my_pdf', 'https://campusinteligencialimite.org/fichas/VENTILACI%C3%93N_DE_ESPACIOS', 'aplication/pdf')
    .subscribe()
  }

}
