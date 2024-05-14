import { startGame } from "../../../network/endpoints/game";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RouterName } from "../../../core/AppRoutes/RouterNames";

function Home() {
  const navigate = useNavigate(); 

  const [message, setMessage] = useState<string | null>(null);
  const beginGame= ():void=>{
    startGame()
    .then(()=>{
      navigate(RouterName.GAME.path)
    })
    .catch((error) => {
      const message = error.message?.message || error.message || 'Erreur serveur';
      if (message.toLowerCase()==='game already started'){
        navigate(RouterName.GAME.path);
        return
      }
      setMessage(message);
    });
  }
    return (
      <div style={{textAlign:'center'}}>
        {message && <p style={{color:'red'}}>{message}</p>}
        <h2>
          <button onClick={beginGame}>Démarrer le jeu</button>
        </h2>
      </div>
    );
  }
  
  export default Home;