import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { InformationUserService } from 'src/app/services/informationUser.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  avatar: string = 'http://lorempixel.com/300/300/cats/';
  perfilForm: FormGroup;

  constructor(private userService: InformationUserService) {
    this.perfilForm = new FormGroup({
      name: new FormControl(''),
      lastName: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      role: new FormControl(''),
    });
  }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.setUserInfo(user);
    } else {
      const user = this.userService.getUserInfo();
      if (user) {
        this.setUserInfo(user);
        localStorage.setItem('userInfo', JSON.stringify(user));
      }
    }
  }

  private setUserInfo(user: any) {
    this.perfilForm.patchValue({
      name: user.name,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      role: user.role,
    });
  }
}
