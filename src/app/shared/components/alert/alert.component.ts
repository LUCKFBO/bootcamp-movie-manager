import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alert } from '../../models/alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alert = {
    title: 'Sucesso!',
    description: 'Seu registro foi cadastrado com sucesso.',
    btnSuccess: 'OK',
    btnCancel: 'Cancelar',
    colorBtnSuccess: 'accent',
    colorBtnCancel: 'warn',
    hasCloseBtn: false,
  } as Alert;


  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    if(this.data){
      this.alert.title = this.data.title || this.alert.title;
      this.alert.description = this.data.description || this.alert.description;
      this.alert.btnSuccess = this.data.btnSuccess || this.alert.btnSuccess;
      this.alert.btnCancel = this.data.btnCancel || this.alert.btnCancel;
      this.alert.colorBtnSuccess = this.data.colorBtnSuccess || this.alert.colorBtnSuccess;
      this.alert.colorBtnCancel = this.data.colorBtnCancel || this.alert.colorBtnCancel;
      this.alert.hasCloseBtn = this.data.hasCloseBtn || this.alert.hasCloseBtn;
    }
  }

}
