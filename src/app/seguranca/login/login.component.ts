import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { Usuario } from './../../core/model';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new Usuario();

  constructor(
    private authService: AuthService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.usuario)
      .then(() => {
        this.router.navigate(['/lancamentos']);
      })
      .catch(error => {
        this.errorHandlerService.handle(error);
      });
  }

}
