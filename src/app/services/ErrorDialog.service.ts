import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Injectable()
export class ErrorDialogService {
    public isDialogOpen = false;
    constructor(public dialog: MatDialog) { }
    openDialog(details): any {
        if (this.isDialogOpen) {
            return false;
        }
        this.isDialogOpen = true;
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
            width: '300px',
            data: details
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.isDialogOpen = false;
            let animal;
            animal = result;
        });
    }
}
