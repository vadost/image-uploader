import { Injectable } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Injectable()
export class TableService {
    showModal = new EventEmitter();
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

    showModalWindow(data) :void{
        this.showModal.emit(data);
    }

    deleteItem(data) :void{
        this.files.splice(this.files.indexOf(data), 1);
        localStorage.setItem('up-files', JSON.stringify(this.files));
    }
}
