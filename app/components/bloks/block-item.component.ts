import { Component, Input } from '@angular/core';
import {BlockService} from "./block.service";
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'up-block-item',
    template: `
        <div class="col-sm-6 col-md-4 upload-item">
            <div class="thumbnail">
              <!--<img src="{{file.img.url}}" alt="...">-->
              <img [src]='photoURL(file)'>
              <div class="caption">
                <p><strong>Image Name: </strong>{{file.img.name}}</p>
                <p><strong>Uploaded User: </strong>{{file.user.name}}</p>
                <p><strong>Image Size: </strong>{{file.img.size}} bytes</p>
                <p><strong>Checksum: </strong>{{file.img.checksum}}</p>
              </div>
            </div>
            <div class="icon-close" *ngIf="isHidden" (click)="onRemove(file)">
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
         p{
          word-break: break-all;
         }
    `],
    host: {
        '(mouseenter)': 'onOver()',
        '(mouseleave)': 'onLeave()'
    }
})

export class BlockItemComponent{
    @Input() file;
    isHidden: boolean = false;

    constructor(private blockService: BlockService, private sanitizer: DomSanitizer){
    }


    onRemove(file) :void{
        this.blockService.removeItemFile(file);
    }

    onOver() :void{
        this.isHidden = true;
    }

    onLeave() :void{
        this.isHidden = false;
    }

    photoURL(file) {

      if(file){
        return this.sanitizer.bypassSecurityTrustUrl(file.img.url);
      }else {
        return '#empty';
      }

    }
}
