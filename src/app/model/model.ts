export interface Player {
  id: number,
  name: String, 
  previousPairs: number[],
  playing: boolean
}

export interface Court {
  id: number,
  pair1: Player[],
  pair2: Player[],
  gameOn: boolean | false,
  p1Score: number,
  p2Score: number
}

export interface Game {
  courtId: number,
  pair1: string,
  pair2: string,
  p1Score: number,
  p2Score: number
}