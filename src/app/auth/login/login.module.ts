import { NgModule } from '@angular/core';
import { LoginPageRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';
@NgModule({
  imports: [
    LoginPageRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}
