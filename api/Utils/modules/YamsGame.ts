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
    private static generateDice(excluded:number[]): number {
        let randomNumber: number;
        do {
            randomNumber = Math.floor(Math.random() * 6) + 1;
        } while (excluded.includes(randomNumber));
        return randomNumber;
    }
    private static generateDices(length:number , excluded:number[],uniq = false): number[] {
        if (!uniq) {
            return Array.from({ length }, () => YamsGame.generateDice(excluded));
        }
        let dices: number[];

    do {
        dices = Array.from({ length }, () => YamsGame.generateDice(excluded));
    } while (YamsGame.containsInvalidCombinations(dices));

    return dices;
    }
    private static generateSameDices(length: number ): number[] {
        const dice = YamsGame.generateDice([]);
        return Array.from({ length }, () => dice);
    }
    private static containsInvalidCombinations(dices: number[]): boolean {
        // Compter les occurrences de chaque nombre
        const counts: { [key: number]: number } = {};
        for (const dice of dices) {
            counts[dice] = (counts[dice] || 0) + 1;
        }
    
        // Vérifier s'il y a des quadruples ou quintuplés
        for (const count of Object.values(counts)) {
            if (count === 4 || count === 5) {
                return true; // Quadruples ou quintuplés
            }
        }
    
        // Vérifier s'il y a des doubles doubles
        if (Object.values(counts).filter(count => count >= 2).length >= 3) {
            return true;
        }
    
        return false;
    }

    static launch(): Result {
        const computer = Math.random();
        let result = COMBO_TYPE.NOTHING;
        let winGame = false;
        let dicesGame = YamsGame.generateDices(5 , [], true);
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
