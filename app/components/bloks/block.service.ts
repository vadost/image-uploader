import { Injectable } from "@angular/core";
import { EventEmitter } from "@angular/core";


@Injectable()
export class BlockService {
    updateBlocks = new EventEmitter();
    files:any = [];
    constructor () {}

    getFiles(){
        let files = localStorage.getItem('up-files');
        if(files){
            this.files = JSON.parse(files);
            return this.files;
        }
        return [];
    }

    removeItemFile(data: any) :void{
          this.files.splice(this.files.indexOf(data), 1);
          this.updateBlocks.emit(this.files);
          localStorage.setItem('up-files', JSON.stringify(this.files));
    }
}
