import { Component, OnInit } from "@angular/core";
import {TableService} from "./table.service";
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'my-modal',
    template: `
        <div class="backdrop" [ngStyle]="{'display': display}"></div>
        <div class="modal" tabindex="-1" role="dialog" [ngStyle]="{'display': display}">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-label="Close" (click)="onClose()"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Image preview modal</h4>
                    </div>
                    <div class="modal-body">
                     <!--<img src="{{data?.img.url}}">-->
                      <img [src]='photoURL(data)'>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" (click)="onClose()">Close</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->  
    `,
    styles: [`
        .backdrop {
            background-color: rgba(0,0,0,0.6);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
        }
        img{
           max-width: 400px;
           max-height: 300px;
        }
    `]
})
export class ModalWindowComponent implements OnInit {
    display: string = 'none';
    data: any = {};

    constructor (private tableService: TableService, private sanitizer: DomSanitizer) {
    }

    onClose() :void{
        this.display = 'none';
    }

    ngOnInit() :void{
        this.tableService.showModal.subscribe(
            data => {
                this.data = data;
                this.display = 'block';
            }
        );
    }

    photoURL(file: any) {
        if(file.img) {
            return this.sanitizer.bypassSecurityTrustUrl(file.img.url);
        }else{
          return '#';
        }
    }
}
