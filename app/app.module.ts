import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppComponent }  from './app.component';
import {HeaderComponent} from "./components/header/header.component";
import {BlocksComponent} from "./components/bloks/blocks.component";
import {TableComponent} from "./components/table/table.component";
import {UploadComponent} from "./components/upload/upload.component";
import {UploadItemComponent} from "./components/upload/upload-item.component";
import {SigninComponent} from "./components/auth/signin.component";
import {DropComponent} from "./components/upload/drop.component";
import {ModalWindowComponent} from "./components/table/modal-window.component";
import {BlockItemComponent} from "./components/bloks/block-item.component";

import {AuthService} from "./components/auth/auth.service";
import {DropdownDirective} from "./directives/dropdown.directive";
import {DropService} from "./components/upload/drop.service";
import {TableService} from "./components/table/table.service";
import {BlockService} from "./components/bloks/block.service";

import {routing, authProviders} from "./app.routing";

@NgModule({
  imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      routing
  ],
  declarations: [
      AppComponent,
      HeaderComponent,
      BlocksComponent,
      TableComponent,
      UploadComponent,
      SigninComponent,
      DropdownDirective,
      UploadItemComponent,
      DropComponent,
      ModalWindowComponent,
      BlockItemComponent
  ],
    providers: [ AuthService, DropService, TableService, BlockService, authProviders ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
