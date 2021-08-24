import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ValidateFieldService } from 'src/app/shared/components/field/validate-field.service';

@Component({
  selector: 'app-movie-registration',
  templateUrl: './movie-registration.component.html',
  styleUrls: ['./movie-registration.component.scss']
})
export class MovieRegistrationComponent implements OnInit {

  options: FormGroup;

  constructor(public validate: ValidateFieldService, private fb: FormBuilder) { }

  get f() {
    return this.options.controls;
  }

  ngOnInit() {

    this.options = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: ['', [Validators.minLength(10)]],
      dtLancamento: ['', [Validators.required]],
      descricao: [''],
      nota: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDB: ['', [Validators.minLength(10)]],
      genero: ['', [Validators.required]]
    });

  }

  save(): void {
    this.options.markAllAsTouched();
    if(this.options.invalid){
      return;
    }
    alert('Sucesso\n\n' + JSON.stringify(this.options.value, null, 4));
  }

  reset(): void {
    this.options.reset();
  }

}
