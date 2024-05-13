import { create } from "domain";

export enum COMBO_TYPE {
    FULL = 'FULL',
    FOUR = 'FOUR',
    TWO = 'TWO',
    NOTHING = 'NOTHING',
    
}

export type Result = {
    type: COMBO_TYPE;
    dices: number[];
    isWin: boolean;
    nbGift: number;
};

export class YamsGame { 
    private static generateDice(exclued:number[]): number {
        let randomNumber: number;
        do {
            randomNumber = Math.floor(Math.random() * 6) + 1;
        } while (exclued.includes(randomNumber));
        return randomNumber;
    }
    private static generateDices(length:number , exclued:number[]): number[] {
        return Array.from({ length }, () => YamsGame.generateDice(exclued));
    }
    private static generateSameDices(length: number ): number[] {
        const dice = YamsGame.generateDice([]);
        return Array.from({ length }, () => dice);
    }

    static launch(): Result {
        const computer = Math.random();
        let result = COMBO_TYPE.NOTHING;
        let winGame = false;
        let dicesGame = YamsGame.generateDices(5 , []);
        let nbGift = 0;


        const createResult = (type: COMBO_TYPE , dices: number[] ,nbGift : number, isWin = false):Result => {
            return { type, dices , isWin , nbGift}
        };


        if (computer >= 0.05 && computer < 0.15) {
            result = COMBO_TYPE.FOUR;
            const firstCombo = YamsGame.generateSameDices(4);
            const secondCombo = YamsGame.generateDice([firstCombo[0]]);
            dicesGame = [...firstCombo, secondCombo];
            nbGift = 2;
        } else if (computer >= 0.2 && computer < 0.48) {
            result = COMBO_TYPE.TWO;
            const firstCombo = YamsGame.generateSameDices(2);
            const secondCombo = YamsGame.generateSameDices(2);
            const thirdCombo = YamsGame.generateDice([firstCombo[0], secondCombo[0]]);
            nbGift = 1;
            dicesGame = [...firstCombo, ...secondCombo, thirdCombo];
        } else if (computer >= 0.80 && computer < 0.85) {
            result = COMBO_TYPE.FULL;
            dicesGame = YamsGame.generateSameDices(5);
            nbGift = 3;
        }
        
        if (result !== COMBO_TYPE.NOTHING) {
            winGame = true;
        }
        return createResult(result, dicesGame, nbGift, winGame);
        
    }
}
