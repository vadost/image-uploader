import { Component } from '@angular/core';
import {AuthService} from "./components/auth/auth.service";

@Component({
    selector: 'my-app',
    template: `
        <up-header></up-header>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
        <my-modal></my-modal>
    `
})
export class AppComponent {
    constructor(private auth: AuthService){
        this.auth.getUsers();
    }
}
