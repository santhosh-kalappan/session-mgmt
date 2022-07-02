import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/model/model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  @Input() scores: string[] = [];
  @Input() games: Game[] = [];
  @Input() courtId !: number;

  constructor() { }

  ngOnInit(): void {
  }

  getFormattedScore(game: Game) {
    var formattedScore = "<b>" + (game.p1Score > game.p2Score ? game.pair1 : game.pair2) + "</b> VS ";
    formattedScore += (game.p1Score > game.p2Score ? game.pair2 : game.pair1) + " ";
    formattedScore += game.p1Score > game.p2Score ? game.p1Score + " - " + game.p2Score : game.p2Score + " - " + game.p1Score;
    return formattedScore;
  }

  getScore(game: Game) {
    var score = game.p1Score > game.p2Score ? ("<b>" + game.p1Score + "</b> - " + game.p2Score) : ("<b>" + game.p2Score + "</b> - " + game.p1Score);
    return score;
  }

  getPair(game: Game) {
    var pair = "<b>" + (game.p1Score > game.p2Score ? game.pair1 : game.pair2) + "</b> VS ";
    pair += (game.p1Score > game.p2Score ? game.pair2 : game.pair1) + " ";
    return pair;
  }

  getCourtGames() {
    var games = this.games.filter((game) => {
      return game.courtId == this.courtId;
    });
    return games;
  }

}
