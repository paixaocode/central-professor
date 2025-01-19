import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LoginComponentRoutingModule } from './login.routing';
import { PoPageLoginModule } from '@po-ui/ng-templates';
import { PoModule } from '@po-ui/ng-components';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { FormsModule } from '@angular/forms';

@NgModule({ declarations: [
        LoginComponent
    ], imports: [CommonModule,
        LoginComponentRoutingModule,
        PoPageLoginModule,
        PoModule,
        FormsModule], providers: [LoginService, provideHttpClient(withInterceptorsFromDi())] })
export class LoginModule { }
