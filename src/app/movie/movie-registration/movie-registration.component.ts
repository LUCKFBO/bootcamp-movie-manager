import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-movie-registration',
  templateUrl: './movie-registration.component.html',
  styleUrls: ['./movie-registration.component.scss']
})
export class MovieRegistrationComponent implements OnInit {

  options: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.options = this.fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });

  }

}
