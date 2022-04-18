import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { compileNgModuleDeclarationExpression } from '@angular/compiler/src/render3/r3_module_compiler';
import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { Player, Court, Game } from './model/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  courtNos: number[] = [];
  players: Player[] = [];
  scores: string[] = [];

  constructor(private formBuilder: FormBuilder) { 
  }

  ngOnInit(): void {
    
  }

  addCourt(courtId: number, el: HTMLButtonElement): void {
      this.courtNos.push(courtId);
      el.disabled = true;
  }

  removeCourt(courtId: string): void {
    if (this.courtNos.length > 0) {
      var btn = document.getElementById('court' + courtId)!;
      btn.removeAttribute("disabled");
      for (var i = 0; i < this.courtNos.length; i++) {
        if (this.courtNos[i] == parseInt(courtId)) {
          this.courtNos.splice(i, 1);
          return;
        }
      }
    }
  }
}