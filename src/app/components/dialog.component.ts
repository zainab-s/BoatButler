import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-course-dialog-component',
  templateUrl: '../templates/dialog.component.html',
})
export class DialogComponent {

  title = 'Thank you for subscribing!';
  message = 'We have received your email.';

  constructor(public dialogRef: MatDialogRef<DialogComponent>) { }

  public close() {
    this.dialogRef.close();
  }
}
