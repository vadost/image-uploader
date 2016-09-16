import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { User } from "./user";

@Component({
    selector: 'my-signin',
    template: `
        <header class="row spacing">
            <nav class="col-md-8 col-md-offset-2">
                <ul class="nav nav-tabs">
                    <li><a>Signin</a></li>
                </ul>
            </nav>
        </header>
        <div class="row spacing">
            <section class="col-md-8 col-md-offset-2">
                <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
                    <div class="form-group">
                        <label for="email">Mail</label>
                        <input formControlName="email" type="email" id="email" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input formControlName="password" type="password" id="password" class="form-control">
                    </div>
                    <button type="submit" class="btn btn-primary" [disabled]="!myForm.valid">Sign Up</button>
                </form>
            </section>
        </div>
    `
})
export class SigninComponent implements OnInit {
    myForm: FormGroup;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

    onSubmit() :void{
        const user = new User(this.myForm.value.email, this.myForm.value.password);
        let data = this.authService.checkUser(user);
        if(data){
            localStorage.setItem('user', JSON.stringify(data));
            this.router.navigateByUrl('/table');
            this.authService.isLoggedIn();
        }else{
            console.error('No user');
        }
    }

    ngOnInit() {
        this.myForm = this.fb.group({
            email: ['', Validators.compose([
                Validators.required,
                this.isEmail
            ])],
            password: ['', Validators.required]
        });
    }

    private isEmail(control: FormControl): {[s: string]: boolean} {
        if (!control.value.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")) {
            return {invalidMail: true};
        }
    }
}
