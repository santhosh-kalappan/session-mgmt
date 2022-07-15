import { Component } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { Player, Court, Game } from './model/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loginSuccess: boolean = false;

  constructor(private formBuilder: FormBuilder) { 
  }

  ngOnInit(): void {
    window.addEventListener("keyup", disableF5);
    window.addEventListener("keydown", disableF5);
   
    function disableF5(e:any) {
       if ((e.which || e.keyCode) == 116) e.preventDefault(); 
    };
  }

}