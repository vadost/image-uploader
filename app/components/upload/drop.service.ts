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

    readFile(file){
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        reader.onload = function(e) {
          let base64 = reader.result;
          let sum = sha256(base64);
          resolve([file, base64, sum]);
        };
        reader.readAsDataURL(file);
      });
    }

    saveFiles(files: any){
      let dataSave = [];
      let promises = [];
      for(let file of files){
        promises.push(this.readFile(file));
      }

      Promise.all(promises).then(
        result => {
          for(let file of result){
            let objSave = {
              img: {
                url: file[1],
                name: file[0].name,
                size: file[0].size,
                checksum: file[2]
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
        },
        error => console.error("Error...")
      );
    }

    removeItemFile(file: any):void{
        this.files.splice(this.files.indexOf(file), 1);
        this.updateFiles.emit(this.files);
    }
}
