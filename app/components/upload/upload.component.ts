import {Component, OnInit} from '@angular/core';
import {DropService} from "./drop.service";

@Component({
    selector: 'up-upload',
    template: `
        <h1>Upload image</h1>
        <div class="row">
          <div class="col-md-6">
            <up-drop></up-drop>
          </div>
          <div class="col-md-6">
            <div class="row">
                <up-upload-item *ngFor="let file of files let i = index" [file]="file" [url]="urls[i]"></up-upload-item>
            </div>
          </div>
          <div class="row">
             <div class="col-md-4 col-md-offset-8">
             <div class="btn-group" role="group" aria-label="...">
                <button type="button" class="btn btn-info" (click)="onClear()">Clear all</button>
                <button type="button" class="btn btn-success" (click)="onSave()">Save</button>
             </div>
            </div>
          </div>
        </div>  
    `
})

export class UploadComponent implements OnInit{
    files:any = [];
    urls:any = [];
    constructor(private dropService: DropService){}

    ngOnInit() {
        this.dropService.uploadedFiles.subscribe(
            data => {
                this.files = data;
                for(let file of data){
                   this.urls.push(URL.createObjectURL(file));
                }
            }
        );

        this.dropService.updateFiles.subscribe(
            data => {
                this.files = data;
                for(let file of data){
                    this.urls.push(URL.createObjectURL(file));
                }
            }
        );

    }

    onClear() :void{
        this.files = [];
        this.urls = [];
        this.dropService.clearAllUploadFiles();
    }

    onSave() :void{
        this.dropService.saveFiles(this.files);
        this.files = [];
        this.urls = [];
    }
}
