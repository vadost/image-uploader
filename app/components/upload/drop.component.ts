import { Component } from '@angular/core';
import {DropService} from "./drop.service";


@Component({
    selector: 'up-drop',
    template: `
       <div class="panel panel-default">
        <div class="panel-body">

          <!-- Drop Zone -->
          <h4>DropZone</h4>
          <div class="upload-drop-zone" id="drop-zone"
            (drop)="onDrop($event)"
            (dragleave)="onDragleave()"
            (dragover)="onDragover()">
              Click or Drop image
              <input type="file" style="opacity: 0.0; position: absolute; cursor: pointer; top: 0; left: 0; bottom: 0; right: 0; width: 100%; height:100%;" 
                (change)="onChange($event)"/>
          </div>


        </div>
      </div>
    `,
    styles: [`
        .upload-drop-zone {
          height: 200px;
          border-width: 2px;
          margin-bottom: 20px;
        }
        .upload-drop-zone {
          color: #ccc;
          border-style: dashed;
          border-color: #ccc;
          line-height: 200px;
          text-align: center;
          position: relative;
        }
        .upload-drop-zone.drop {
          color: #222;
          border-color: #222;
        }
    `]
})

export class DropComponent{
    constructor(private dropService: DropService){
    }

    onDragover() {
        console.log('onDragover');
        return false;
    }

    onDragleave() {
        console.log('onDragleave');
        return false;
    }

    onDrop(event: any) :void{
        event.preventDefault();
        event.stopPropagation();
        this.dropService.uploadFiles(event.dataTransfer.files);
    }

    onChange(event: any):void{
      this.dropService.uploadFiles(event.target.files);
    }
}
