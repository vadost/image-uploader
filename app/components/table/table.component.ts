import { Component } from '@angular/core';
import {TableService} from "./table.service";

@Component({
    selector: 'up-table',
    template: `
        <table class="table">
            <tr>
                <th>ID</th>
                <th>Image Name</th>
                <th>Uploaded User</th>
                <th>Checksum</th>
                <th>Events</th>
            </tr>
            <tr *ngFor="let file of allFiles">
                  <td>{{file.user.id}}</td>
                  <td>{{file.img.name}}</td>
                  <td>{{file.user.name}}</td>
                  <td>{{file.img.checksum}}</td>
                  <td>
                     <div class="btn-group" role="group" aria-label="...">
                        <button type="button" class="btn btn-success" (click)="showModal(file)">View</button>
                        <button type="button" class="btn btn-danger" (click)="onDelete(file)">Delete</button>
                    </div>
                  </td>
            </tr>
        </table>
    `
})

export class TableComponent{
    allFiles: any;
    file: any;
    constructor(private tableService: TableService){
        this.allFiles = this.tableService.getFiles();
    }

    showModal(file: any) :void{
        this.tableService.showModalWindow(file);
    }

    onDelete(file: any) :void{
        this.tableService.deleteItem(file);
        // this.allFiles.splice(this.allFiles.indexOf(file), 1);
    }
}
