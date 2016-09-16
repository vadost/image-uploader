import { Injectable } from "@angular/core";
import { EventEmitter } from "@angular/core";
import 'rxjs/Rx';

declare var sha256:any;

@Injectable()
export class DropService {
    files:any = [];
    uploadedFiles = new EventEmitter();
    updateFiles = new EventEmitter();
    fileStorage: any = [];

    constructor () {}

    uploadFiles(files: any) :void{
        for(let file of files){
            this.files.push(file);
        }
        this.uploadedFiles.emit(this.files);
    }

    clearAllUploadFiles() :void{
        this.files = [];
    }

    saveFiles(files: any) :void{
        let dataSave = [];
        for(let file of files){
            let objSave = {
                img: {
                    url: URL.createObjectURL(file),
                    name: file.name,
                    size: file.size,
                    checksum: sha256(URL.createObjectURL(file))
                },
                user: JSON.parse(localStorage.getItem('user'))
            };
            dataSave.push(objSave);
        }

        if(localStorage.getItem('up-files')){
            this.fileStorage = JSON.parse(localStorage.getItem('up-files'));
        }else{
            this.fileStorage = [];
        }

        let newarray = this.fileStorage.concat(dataSave);
        localStorage.setItem('up-files', JSON.stringify(newarray));
        this.files = [];
    }

    removeItemFile(file: any):void{
        this.files.splice(this.files.indexOf(file), 1);
        this.updateFiles.emit(this.files);
    }
}
