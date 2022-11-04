import React, { useState } from "react";
import './App.css';
import UploadXlsx from './UploadXlsx';
import Contribuyentes from './Contribuyentes';

function App() {
  const [contribuyentes, setContribuyentes] = useState([]);

  const actualizarLista = (lista) => {
    // console.log('actualizarLista llamado');
    // console.log(lista.length);
    setContribuyentes(lista);
  }

  const sortear = () => {
    const lista = [];
    contribuyentes.forEach(c => {
      for (let i = 1; i <= c.chances; i++) {
        lista.push(c.partida);
      }
    });

    // Mezclo los items
    // console.log(lista);
    shuffleArray(lista);

    

    // Ganador 1
    const partidaGanador1 = getWinner(lista);

    // Ganador 2
    const partidaGanador2 = getWinner(lista);

    // Ganador 3
    const partidaGanador3 = getWinner(lista);

    const newContribuyentes = [...contribuyentes];
    setWinner(newContribuyentes, partidaGanador1);
    setWinner(newContribuyentes, partidaGanador2);
    setWinner(newContribuyentes, partidaGanador3);

    setContribuyentes(newContribuyentes);

  }

  const setWinner = (lista, partida) => {
    let winner = lista.find(c => c.partida === partida);
    // console.log(winner);
    winner.isWinner = true;
  }

  const getWinner = (lista) => {
    // console.log(lista);
    const totalContribuyentes = lista.length;
    const index = Math.floor(Math.random() * totalContribuyentes);
    // console.log(`index random: ${index}`);
    const partida = lista[index];
    console.log(`partida: ${partida}`);

    return partida;
  }

  // The Fisher-Yates algorithm
  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  return (
      <div className="App">
        <UploadXlsx actualizarLista={actualizarLista} />
        <Contribuyentes contribuyentes={contribuyentes} sortear={sortear} />
      </div>
  );
}

export default App;
