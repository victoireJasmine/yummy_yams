import { apis } from '../axios';
import { AxiosResponse } from 'axios';
import { PlayGameFactory, PlayGame } from '../../normalizr/game/play';
import { WinnerFactory, Winner } from '../../normalizr/game/winner';
import { GameFactory, Game } from '../../normalizr/game/game';



export const startGame = (): Promise<void> => {
  return apis.yummy
    .post(`/game/start`)
};

export const playGame = (gameId:string): Promise<PlayGame> => {
  return apis.yummy
    .post(`/game/play/${gameId}`)
    .then((response: AxiosResponse): Promise<PlayGame> => {
      return Promise.resolve(PlayGameFactory.createPlayGame(response.data));
    });
}

export const getWinners = (): Promise<Winner[]> => {
    return apis.yummy
      .get(`/game/winners`)
      .then((response: AxiosResponse): Promise<Winner[]> => {
        return Promise.resolve((response.data as  Winner[]).map(res=>WinnerFactory.createWinner(res)));
      });
  }


  export const getCurrentGame = (): Promise<Game> => {
    return apis.yummy
      .get(`/game/current`)
      .then((response: AxiosResponse): Promise<Game> => {
        return Promise.resolve(GameFactory.createGame(response.data));
      });
  }
