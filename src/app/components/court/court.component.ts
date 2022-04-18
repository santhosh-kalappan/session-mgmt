import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Player, Court, Game } from 'src/app/model/model';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-court',
  templateUrl: './court.component.html',
  styleUrls: ['./court.component.css']
})
export class CourtComponent implements OnInit {

  @Input() players!: Player[];
  @Input() id!: number;
  @Input() scores!: string[];
  @Output() newItemEvent = new EventEmitter<string>();
  court!: Court;
  p1Score: number = 0;
  p2Score: number = 0;

  removeCourt() {
    this.newItemEvent.emit(this.court.id + "");
  }

  constructor(private formBuilder: FormBuilder) { 

  }

  ngOnInit(): void {
    this.court = ({id: this.id, pair1: [{id: 1, name: "Player1", previousPairs:[], playing: false}, {id: 2, name: "Player2", previousPairs:[], playing: false}],
                      pair2: [{id: 1, name: "Player3", previousPairs:[], playing: false}, {id: 2, name: "Player4", previousPairs:[], playing: false}], gameOn: false});
  }

  end(): void {
    let game:Game = {
      courtId: this.court.id, 
      pair1: this.court.pair1[0].name + "/" + this.court.pair1[1].name, 
      pair2: this.court.pair2[0].name + "/" + this.court.pair2[1].name, 
      p1Score: this.p1Score,
      p2Score: this.p2Score
    };
    this.scores.push(this.getFormattedScore(game));
    this.resetCourt(this.court);
    this.p1Score = 0;
    this.p2Score = 0;
  }

  resetCourt(court:Court): void {
    this.players.push(court.pair1[0], court.pair1[1], court.pair2[0], court.pair2[1]);
    court.gameOn = false;
    court.pair1 = [{id: 1, name: "Player1", previousPairs:[], playing: false}, {id: 2, name: "Player2", previousPairs:[], playing: false}];
    court.pair2 = [{id: 1, name: "Player3", previousPairs:[], playing: false}, {id: 2, name: "Player4", previousPairs:[], playing: false}];
  }

  suggest(): void {
    if (this.players.length >= 4) {
      this.court.gameOn = true;
      this.court.pair1 = this.createPair();
      this.court.pair2 = this.createPair();
    }
  }

  createPair() : Player[] {
    var pair: Player[] = [];
    var player1: Player = this.players.splice(this.getRandomIndex(this.players.length - 1), 1)[0];
    var player2: Player = this.findPartner(player1);
    player1.playing = true;
    player2.playing = true;
    player1.previousPairs.push(player2.id);
    player2.previousPairs.push(player1.id);
    pair.push(player1);
    pair.push(player2);
    return pair;
  }

  getRandomIndex(max: number): number {
    return Math.floor(Math.random() * max);
  }

  findPartner(player: Player): Player {
    var partnerId;
    for (var i = 0; i < this.players.length; i++) {
      partnerId = player.previousPairs.find(playerId => playerId == this.players[i].id);
      if (!partnerId)
        return this.players.splice(i, 1)[0];
    }
    return this.players.splice(0, 1)[0];
  }

  getFormattedScore(game: Game) {
    var formattedScore = "Court " + this.court.id + ": " + (game.p1Score > game.p2Score ? game.pair1 : game.pair2) + " Vs ";
    formattedScore += (game.p1Score > game.p2Score ? game.pair2 : game.pair1) + " ";
    formattedScore += game.p1Score > game.p2Score ? game.p1Score + " - " + game.p2Score : game.p2Score + " - " + game.p1Score;
    return formattedScore;
  }

  updateP2Score() {
    if (this.p1Score < 21) 
      this.p2Score = 21;
    else 
      this.p2Score = this.p1Score + 2;
  }

  updateP1Score() {
    if (this.p2Score < 21) 
      this.p1Score = 21;
    else 
      this.p1Score = this.p2Score + 2;
  }

}
