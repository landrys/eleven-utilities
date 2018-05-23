import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';

import { AppComponent } from './app.component';
import { AppMaterialModule } from './app.material.module';
import { NavComponent } from './nav/nav.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LcproxyComponent } from './lcproxy/lcproxy.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { UtilsComponent } from './utils/utils.component';
import { DocComponent } from './doc/doc.component';
//import { AuthService } from './auth/auth.service';
/*
import { AmplifyService }  from 'aws-amplify-angular';
*/

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LcproxyComponent,
    LoginComponent,
    UtilsComponent,
    DocComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AmplifyAngularModule
  ],
  //providers: [AuthService,AuthGuard],
  providers: [AuthGuard, AmplifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
