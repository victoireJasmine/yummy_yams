import { useState, useEffect } from "react";
import { getCurrentGame, playGame } from "../../../network/endpoints/game";
import { PlayGame } from "../../../normalizr/game/play";
import { COMBO_TYPE } from "../../../normalizr/common";


function Game() {
    const [gameId, setGameId]= useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [result, setResult] = useState<PlayGame | null>(null);

    useEffect(()=> {
        (async()=> {
            await getGame()
         
         })()
      }, [])

    const getGame=():void=>{
        getCurrentGame()
        .then(_game=>setGameId(_game._id))  
    }

    const launch =():void=>{
        if(!gameId){
            return
        }
        setResult(null)
        playGame(gameId)
        .then(_result=>{
            setResult(_result)
        })
        .catch((error) => {
            setMessage(error.message?.message || error.message || 'Erreur serveur');
          });
    }

    const DisplayResult=()=>{
        function nameGame():string {
            switch (result?.result.type) {
                case COMBO_TYPE.TWO:
                    return 'DOUBLE';
                
                case COMBO_TYPE.FOUR:
                    return 'CARRE';
                
                case COMBO_TYPE.FULL:
                    return 'YAMS';

            
                default:
                    return 'Pas gagnant'
            }
        }

        function dice():string{
            return (result as PlayGame).result.dices.join(' | ')
        }

        return(
            <div>
                <div>
                    combinaison de dés obtenus : {dice()}
                </div>
                <div>
                    COMBO : {nameGame()}
                </div>
                <div>
                    resultat : {result?.result.isWin ? `vous avez gagné ${result.result.nbGift} patissérie(s) ` : 'Vous avez perdu, veuillez relancer les dés'}
                </div>
                {
                    !result?.result.isWin && 
                    <div>
                        nombre de tentatives restant: {result?.remainingAttempt}
                    </div>
                }
            </div>
        )
    }

    return (
      <div style={{textAlign:'center'}}>
          {message && <p style={{color:'red'}}>{message}</p>}
          {result && <DisplayResult/>}
        <h2>
            {!result?.result?.isWin && <button onClick={launch}>Lancer les dés</button> }
        </h2>
      </div>
    );
  }
  
  export default Game;