import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Http, RequestOptions } from '@angular/http';
import { NgModule } from '@angular/core';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';

import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { LogoutService } from './logout.service';
import { SegurancaRoutingModule } from './seguranca-routing.module';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  const config = new AuthConfig({
    globalHeaders: [
      { 'Content-Type': 'application/json' }
    ]
  });
  return new AuthHttp(config, http, options);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    ButtonModule,
    InputTextModule,

    SegurancaRoutingModule
  ],
  declarations: [LoginComponent],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    AuthGuard,
    LogoutService
  ]
})
export class SegurancaModule { }
