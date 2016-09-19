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

    getSHA256(file){
        return new Promise(function(resolve, reject) {
          let readerForSHA256 = new FileReader();
          readerForSHA256.onload = function(e) {
            let rawData = readerForSHA256.result;
            let sum = sha256(rawData);
            resolve(sum);
          };
          readerForSHA256.readAsArrayBuffer(file);
      });
    }

    getBASE64(file){
      return new Promise(function(resolve, reject) {
        let readerBASE64 = new FileReader();
        readerBASE64.onload = function(e) {
          let base64 = readerBASE64.result;
          resolve(base64);
        };
        readerBASE64.readAsDataURL(file);
      });
    }

    readFile(file){
      let promises = [this.getBASE64(file), this.getSHA256(file)];
      return new Promise(function(resolve, reject) {
        Promise.all(promises).then(
          result => resolve([file, result[0], result[1]]),
          error => console.error("Error...")
        );
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
