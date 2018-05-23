import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LcproxyComponent } from '../lcproxy/lcproxy.component'
import { AuthGuard } from '../auth/auth.guard'
import { LoginComponent } from '../login/login.component'
import { UtilsComponent } from '../utils/utils.component'
import { DocComponent } from '../doc/doc.component'

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
   // { path: 'utils', component: UtilsComponent },
    { path: 'utils', component: UtilsComponent, canActivate: [AuthGuard] },
    { path: 'lcproxy', component: LcproxyComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'doc', component: DocComponent, canActivate: [AuthGuard]  }
];

@NgModule({
    imports: [
	RouterModule.forRoot(routes),
	CommonModule
    ],
    exports: [
	RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }
