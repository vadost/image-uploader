import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from "./components/table/table.component";
import { BlocksComponent } from "./components/bloks/blocks.component";
import { UploadComponent } from "./components/upload/upload.component";
import {SigninComponent} from "./components/auth/signin.component";
import {AuthGuard} from "./components/auth/auth-guard.service";
import {AuthService} from "./components/auth/auth.service";

export const authProviders = [
  AuthGuard,
  AuthService
];

const APP_ROUTES: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'upload'},
    { path: 'table', component: TableComponent, canActivate: [AuthGuard] },
    { path: 'blocks', component: BlocksComponent, canActivate: [AuthGuard] },
    { path: 'upload', component: UploadComponent, canActivate: [AuthGuard] },
    { path: 'signin', component: SigninComponent },
    { path: '**', redirectTo: '/upload' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
