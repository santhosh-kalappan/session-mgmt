import { Component, Input, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { Player, Court, Game } from 'src/app/model/model';

@Component({
  selector: 'app-court',
  templateUrl: './court.component.html',
  styleUrls: ['./court.component.css']
})
export class CourtComponent implements OnInit {

  @Input() players!: Player[];
  @Input() id!: number;
  @Input() games: Game[] = [];
  @Output() newItemEvent = new EventEmitter<string>();
  court!: Court;
  pair1Player1Id !: number;
  pair1Player2Id !: number;
  pair2Player1Id !: number;
  pair2Player2Id !: number;
  setPlayers: boolean = false;

  removeCourt() {
    this.newItemEvent.emit(this.court.id + "");
    if (this.court.gameOn) {
      this.players.push(this.court.pair1[0], this.court.pair1[1], this.court.pair2[0], this.court.pair2[1]);
    }
  }

  constructor() {

  }

  ngOnInit(): void {
    this.setPlayers = false;
    this.court = ({
      id: this.id, pair1: [{ id: 1, name: "Player1", previousPairs: [], playing: false }, { id: 2, name: "Player2", previousPairs: [], playing: false }],
      pair2: [{ id: 1, name: "Player3", previousPairs: [], playing: false }, { id: 2, name: "Player4", previousPairs: [], playing: false }], gameOn: false, p1Score: 0, p2Score: 0
    });
  }

  end(): void {
    let game: Game = {
      courtId: this.court.id,
      pair1: this.court.pair1[0].name + "/" + this.court.pair1[1].name,
      pair2: this.court.pair2[0].name + "/" + this.court.pair2[1].name,
      p1Score: this.court.p1Score,
      p2Score: this.court.p2Score
    };
    this.games.push(game);
    this.resetCourt(this.court);
    this.resetManualPairingIds();
  }

  resetCourt(court: Court): void {
    this.players.push(court.pair1[0], court.pair1[1], court.pair2[0], court.pair2[1]);
    this.players.sort((a, b) => { return a.previousPairs.length - b.previousPairs.length });
    court.gameOn = false;
    court.pair1 = [{ id: 1, name: "Player1", previousPairs: [], playing: false}, { id: 2, name: "Player2", previousPairs: [], playing: false}];
    court.pair2 = [{ id: 3, name: "Player3", previousPairs: [], playing: false}, { id: 4, name: "Player4", previousPairs: [], playing: false}];
    court.p1Score = 0;
    court.p2Score = 0;
  }

  suggest(): void {
    if (this.players.length >= 4) {
      this.court.gameOn = true;
      this.court.pair1 = this.createPair();
      this.court.pair2 = this.createPair();
    }
  }

  createPair(): Player[] {
    var pair: Player[] = [];
    var player1: Player = this.players.splice(this.getRandomPlayer(this.players.length), 1)[0];
    var player2: Player = this.findPartner(player1);
    player1.playing = true;
    player2.playing = true;
    player1.previousPairs.push(player2.id);
    player2.previousPairs.push(player1.id);
    pair.push(player1);
    pair.push(player2);
    return pair;
  }

  getRandomPlayer(max: number): number {
    return Math.floor(Math.random() * max);
  }

  findPartner(player: Player): Player {
    for (var i = 0; i < this.players.length; i++) {
      var partnerId;
      partnerId = player.previousPairs.find(playerId => playerId == this.players[i].id);
      if (!partnerId)
        return this.players.splice(i, 1)[0];
    }
    return this.players.splice(0, 1)[0];
  }

  updateP2Score(score: number) {
    this.court.p1Score = score;
    if (score < 20)
      this.court.p2Score = 21;
    else
      this.court.p2Score = score + 2;
    this.closeP1ScoreModal();
  }

  updateP1Score(score: number) {
    this.court.p2Score = score;
    if (score < 20)
      this.court.p1Score = 21;
    else
      this.court.p1Score = score + 2;
    this.closeP2ScoreModal();
  }

  openP1ScoreModal() {
    if (this.court.gameOn) {
      var p1ScoreModal = document.getElementById("p1ScoreModal" + this.court.id)!;
      p1ScoreModal.style.display = "block";
    }
  }

  openP2ScoreModal() {
    if (this.court.gameOn) {
      var p2ScoreModal = document.getElementById("p2ScoreModal" + this.court.id)!;
      p2ScoreModal.style.display = "block";
    }
  }

  closeP1ScoreModal() {
    var p1ScoreModal = document.getElementById("p1ScoreModal" + this.court.id)!;
    p1ScoreModal.style.display = "none";
  }

  closeP2ScoreModal() {
    var p2ScoreModal = document.getElementById("p2ScoreModal" + this.court.id)!;
    p2ScoreModal.style.display = "none";
  }

  cancelGame() {
    this.court.pair1[0].previousPairs.pop();
    this.court.pair1[1].previousPairs.pop();
    this.court.pair2[0].previousPairs.pop();
    this.court.pair2[1].previousPairs.pop();
    this.resetCourt(this.court);
  }

  manualPairing() {
    this.setPlayers = true;
  }

  cancelPairing() {
    this.setPlayers = false;
    this.resetManualPairingIds();
  }

  setPair1Player1(target:any) {
    this.pair1Player1Id = this.players.find((player) => player.name === target.value)!.id;
  }

  setPair1Player2(target:any) {
    this.pair1Player2Id = this.players.find((player) => player.name === target.value)!.id;
  }

  setPair2Player1(target:any) {
    this.pair2Player1Id = this.players.find((player) => player.name === target.value)!.id;
  }

  setPair2Player2(target:any) {
    this.pair2Player2Id = this.players.find((player) => player.name === target.value)!.id;
  }

  beginGame() {
    this.setPlayers = false;
    this.court.gameOn = true;
    this.court.pair1 = this.formPair(1);
    this.court.pair2 = this.formPair(2);
  }

  formPair(pairId: number): Player[] {
    var pair: Player[] = [];
    var player1Id = pairId == 1 ? this.pair1Player1Id : this.pair2Player1Id;
    var player2Id = pairId == 1 ? this.pair1Player2Id : this.pair2Player2Id;
    var player1: Player = this.players.splice(this.players.findIndex((player, index) => player1Id === player.id), 1)[0];
    var player2: Player = this.players.splice(this.players.findIndex((player, index) => player2Id === player.id), 1)[0];
    player1.playing = true;
    player2.playing = true;
    player1.previousPairs.push(player2.id);
    player2.previousPairs.push(player1.id);
    pair.push(player1);
    pair.push(player2);
    return pair;
  }

  resetManualPairingIds() {
    this.pair1Player1Id = 0;
    this.pair1Player2Id = 0;
    this.pair2Player1Id = 0;
    this.pair2Player2Id = 0;
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    const ESCAPE_KEYCODE = 27;
    if (event.keyCode === ESCAPE_KEYCODE) {
      this.closeP1ScoreModal();
      this.closeP2ScoreModal();
    }
  }

}
