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
  @ViewChild('courtno')courtno!: ElementRef;

  constructor(private formBuilder: FormBuilder) { 
  }

  ngOnInit(): void {
    
  }

  addCourt(courtId: string): void {
    if (this.courtno.nativeElement.value != "") {
      this.courtNos.push(parseInt(courtId));
      this.courtno.nativeElement.value = "";
    }
  }

  removeCourt(courtId: string): void {
    if (this.courtNos.length > 0) {
      for (var i = 0; i < this.courtNos.length; i++) {
        if (this.courtNos[i] == parseInt(courtId)) {
          this.courtNos.splice(i, 1);
          this.courtno.nativeElement.value = "";
          return;
        }
      }
    }
  }

}