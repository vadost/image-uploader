import { Component, Input } from '@angular/core';
import {DropService} from "./drop.service";
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'up-upload-item',
    template: `
        <div class="col-md-4 upload-item" (mouseover)="onOver()" (mouseleave)="onLeave()">
            <div class="thumbnail">
               <img [src]='photoURL(file)'>
              <div class="caption">
                <p><strong>File name: </strong>{{ file.name }}</p>
                <p><strong>File Size: </strong>{{ file.size }} bytes</p>
              </div>
            </div>
            <div class="icon-close" *ngIf="isHidden" (click)="onClose()">
                <span class="glyphicon glyphicon glyphicon-remove" aria-hidden="false"></span>
            </div>
        </div>
    `,
    styles: [`
        .icon-close {
            position: absolute; 
            top: 5px;
            right: 25px;
            cursor: pointer;
         }
         .upload-item {
            position: relative; 
         }
    `]
})

export class UploadItemComponent{
    @Input() file: any;
    @Input() url: any;
    isHidden: boolean = false;

    constructor(private dropService: DropService, private sanitizer: DomSanitizer){}

    onOver() :void{
        this.isHidden = true;
    }

    onLeave() :void{
        this.isHidden = false;
    }

    onClose() :void{
        this.dropService.removeItemFile(this.file);
    }

    photoURL(file: any) {
        return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
    }
}
