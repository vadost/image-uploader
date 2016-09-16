import {Component, OnInit} from '@angular/core';
import {BlockService} from "./block.service";

@Component({
    selector: 'up-blocks',
    template: `
        <div class="row">
          <up-block-item *ngFor="let file of files" [file]="file"></up-block-item>
        </div>
    `
})

export class BlocksComponent implements OnInit{
    files: any = [];

    constructor(private blockService: BlockService){
        this.files = this.blockService.getFiles();
    }

    ngOnInit() {
        this.blockService.updateBlocks.subscribe(
            data => {
                console.log('DATA', data);
                this.files = data;
            }
        );
    }
}
