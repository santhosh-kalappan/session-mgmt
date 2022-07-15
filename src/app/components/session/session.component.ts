import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Game, Player } from 'src/app/model/model';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  courtNos: number[] = [];
  players: Player[] = [];
  restingPlayers: Player[] = [];
  scores: string[] = [];
  games: Game[] = [];
  showAddCourtBtn: boolean = false;

  constructor(private formBuilder: FormBuilder) { 
  }

  ngOnInit(): void {
    window.addEventListener("keyup", disableF5);
    window.addEventListener("keydown", disableF5);
   
    function disableF5(e:any) {
       if ((e.which || e.keyCode) == 116) e.preventDefault(); 
    };
  }

  toggleShowAddCourtButton(tabName: string): void {
    if (tabName == 'court')
      this.showAddCourtBtn = true;
    else 
      this.showAddCourtBtn = false;
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

  closeCourtAddModal() {
    var addCourtModal = document.getElementById("courtNoModal")!;
    addCourtModal.style.display = "none";
  }

}
