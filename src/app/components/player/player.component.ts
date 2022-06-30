import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Player } from 'src/app/model/model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  @Input() players!: Player[];
  @Input() restingPlayers!: Player[];
  @Input() displayArea!: string;
  playersCount: number = 0;

  playerForm = this.formBuilder.group({
    name: ''
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

  }

  add(): void {
    //Create Player
    if (this.playerForm.value.name) {
      this.playersCount++;
      this.players.push({id: this.playersCount, name: this.playerForm.value.name.toUpperCase(), previousPairs:[], playing: false});
      this.players.sort((a, b) => { return a.previousPairs.length - b.previousPairs.length });
    }
    this.playerForm.reset();
  }  

  remove(id: number): void {
    var index = this.restingPlayers.findIndex(player => player.id == id);
    this.restingPlayers.splice(index, 1);
  }

  rest(id: number): void {
    var index = this.players.findIndex(player => player.id == id);
    this.restingPlayers.push(this.players[index]);
    this.players.splice(index, 1);
  }

  play(id: number): void {
    var index = this.restingPlayers.findIndex(player => player.id == id);
    this.players.push(this.restingPlayers[index]);
    this.restingPlayers.splice(index, 1);
  }

}
