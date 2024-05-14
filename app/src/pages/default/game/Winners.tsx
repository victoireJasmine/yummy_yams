import { getWinners } from "../../../network/endpoints/game";
import { useEffect, useState } from "react";
import { Winner } from "../../../normalizr/game/winner";
import { Pastry } from "../../../normalizr/pastry/pastry";



function Winners() {


  const [winners, setWinners] = useState<Winner[] | null>(null);
  useEffect(() => {
    getWinners()
    .then((data) => {
      setWinners(data);
    })

  }, []);

  const DisplayPastry = (pastry: Pastry) => {
    return (
      <div key={pastry._id}>
        <img style={{width:'50px', height:'50px'}} src={pastry.getImage()} alt={pastry.name} />
        <div>{pastry.name}</div>
      </div>
    )
  }
  
    return (
      <div>
        <h2>Gagnants</h2>
        {!winners && <p>Loading...</p>}
        {winners && winners.length === 0 && <p>Pas de gagnants pour le moment</p>}
        {winners && winners.length > 0 && 
        <>
            <p>Les autres gagnants sont:</p>
            <table>
                <thead>
                    <tr>
                    <th>Nom</th>
                    <th>Combinaison</th>
                    <th>Date</th>
                    <th>Recompense</th>
                    </tr>
                </thead>
                <tbody>
                    {winners?.map((winner, index) => (
                    <tr key={index}>
                        <td>{winner.user.name}</td>
                        <td>{winner.dices} - {winner.nameGame()}</td>
                        <td>{winner.updatedAt}</td>
                        <td style={{display:'flex', flex:'1', gap:'8px'}}>{winner.pastries.map(pastry =>{
                            return DisplayPastry(pastry)
                        })}</td>
                        
                    </tr>
                    ))}
                </tbody>
                
            </table>
        </>
        }

      </div>
    );
  }
  
  export default Winners;