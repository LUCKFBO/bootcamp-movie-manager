import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ValidateFieldService } from '../validate-field.service';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.css']
})
export class InputNumberComponent{

  @Input() title: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  @Input() min: 0;
  @Input() max: 10;
  @Input() step: 1;

  constructor(public validate: ValidateFieldService) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
