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

  constructor() { }

  ngOnInit(): void {
  }

  getFormattedScore(game: Game) {
    var formattedScore = "Court " + game.courtId + ": " + (game.p1Score > game.p2Score ? game.pair1 : game.pair2) + ": ";
    formattedScore += game.p1Score > game.p2Score ? game.p1Score + " - " + game.p2Score : game.p1Score + " - " + game.p2Score;
    formattedScore += " :" + (game.p1Score > game.p2Score ? game.pair2 : game.pair1);
    return formattedScore;
  }

}