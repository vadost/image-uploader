import { Injectable } from "@angular/core";
import { EventEmitter } from "@angular/core";
import 'rxjs/Rx';

import { User } from "./user";

@Injectable()
export class AuthService {
    jsonUsers : string = '{"users":[{"id":1,"name":"user1","email":"test1@gmail.com","password":"1234"},{"id":2,"name":"user2","email":"test2@gmail.com","password":"1234"},{"id":3,"name":"user3","email":"test3@gmail.com","password":"1234"},{"id":4,"name":"user4","email":"test4@gmail.com","password":"1234"},{"id":5,"name":"user5","email":"test5@gmail.com","password":"1234"},{"id":6,"name":"user6","email":"test6@gmail.com","password":"1234"},{"id":7,"name":"user7","email":"test7@gmail.com","password":"1234"},{"id":8,"name":"user8","email":"test8@gmail.com","password":"1234"},{"id":9,"name":"user9","email":"test9@gmail.com","password":"1234"},{"id":10,"name":"user10","email":"test10@gmail.com","password":"1234"}]}';
    users:any;
    username: string = 'Auth';

    constructor () {}
    getUserName = new EventEmitter();

    getUsers() :void{
        this.users =  JSON.parse(this.jsonUsers).users;
    }

    checkUser(user: User){
        for(let u of this.users){
            if(u.email == user.email && u.password == user.password){
                return u;
            }
        }
        console.error('Invalid email or password');
        return null;
    }

    getName() {
      if(localStorage.getItem('user')){
        this.username = JSON.parse(localStorage.getItem('user')).name;
      }else{
        this.username = 'Auth';
      }
        return this.username ;
    }

    logout() :void{
        localStorage.removeItem('user');
    }

    isLoggedIn() {
        if(localStorage.getItem('user')){
          this.getUserName.emit(JSON.parse(localStorage.getItem('user')).name);
        }else{
          this.getUserName.emit('Auth');
        }

        return localStorage.getItem('user') !== null;
    }
}
