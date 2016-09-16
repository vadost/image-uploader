import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import { Router} from "@angular/router";

@Component({
    selector: 'up-header',
    template: `
        <nav class="navbar navbar-default">
          <div class="container-fluid">
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul class="nav navbar-nav">
                <li routerLinkActive="active"><a [routerLink]="['/table']">Table</a></li>
                <li routerLinkActive="active"><a [routerLink]="['/blocks']">Blocks</a></li>
                <li routerLinkActive="active"><a [routerLink]="['/upload']">Upload Image</a></li>
              </ul>
               <!--<ul class="nav navbar-nav navbar-right">-->
                <!--<li routerLinkActive="active"><a [routerLink]="['/auth']">Auth</a></li>-->
               <!--</ul>-->
              <ul class="nav navbar-nav navbar-right">
                <li class="dropdown" upDropdown>
                  <a
                    class="dropdown-toggle"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false">{{title}}<span class="caret"></span></a>
                  <ul class="dropdown-menu">
                    <li *ngIf="!isLoggedIn()"><a [routerLink]="['signin']">Sign in</a></li>
                    <li *ngIf="isLoggedIn()"><a (click)="onLogout()">Logout</a></li>
                  </ul>
                </li>
              </ul>
            </div><!-- /.navbar-collapse -->
          </div><!-- /.container-fluid -->
        </nav>
    `
})

export class HeaderComponent implements OnInit{
    title:string = 'Auth';
    constructor(private authService: AuthService, private router: Router){}

    ngOnInit(){
      this.title = this.authService.getName();
      this.authService.getUserName.subscribe(
        data => this.title = data
      );
    }

    onLogout() :void{
        this.title = 'Auth';
        this.authService.logout();
        this.router.navigate(['/signin']);
    }

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

}
