import { Component } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { Player, Court, Game } from './model/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  courtNos: number[] = [];
  courts: Court[] = [];
  players: Player[] = [];
  scores: string[] = [];
  games: Game[] = [];

  constructor(private formBuilder: FormBuilder) { 
  }

  ngOnInit(): void {
    window.addEventListener("keyup", disableF5);
    window.addEventListener("keydown", disableF5);
   
    function disableF5(e:any) {
       if ((e.which || e.keyCode) == 116) e.preventDefault(); 
    };
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