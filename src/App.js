import React, { useState } from "react";
// import './App.css';
import UploadXlsx from './UploadXlsx';
import Contribuyentes from './Contribuyentes';
import NavbarTop from "./NavbarTop";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const [contribuyentes, setContribuyentes] = useState([]);

  const actualizarLista = (json) => {
    console.log('actualizarLista llamado', json);
    const nuevos = [...contribuyentes];

    json.forEach(c => {

      // Doble chance
      const dobleChance = nuevos.find(contribuyente => c.Partida === contribuyente.partida);
      if (dobleChance) {
        dobleChance.chances++;
      } else {
        nuevos.push({
          partida: c.Partida,
          propietario: c.Propietario,
          direccion: c.Dirección,
          isWinner: false,
          chances: 1
        });
      }
    });

    setContribuyentes(nuevos);
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
    const partidaGanador1 = getWinner(lista, []);

    // Ganador 2
    const partidaGanador2 = getWinner(lista, [partidaGanador1]);

    // Ganador 3
    const partidaGanador3 = getWinner(lista, [partidaGanador1, partidaGanador2]);

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

  const getWinner = (lista, exceptuados) => {
    // console.log(lista);
    const totalContribuyentes = lista.length;
    const index = Math.floor(Math.random() * totalContribuyentes);
    // console.log(`index random: ${index}`);
    const partida = lista[index];
    // console.log(`partida: ${partida}`);

    if (exceptuados.indexOf(partida) === -1) {
      return partida;
    } else {
      console.log('Partida repetida', partida);
      return getWinner(lista, exceptuados);
    }

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
      <NavbarTop />
      <Container>
        <Row>
          <Col><UploadXlsx actualizarLista={actualizarLista} /></Col>
        </Row>
        <Row>
          <Col><Contribuyentes contribuyentes={contribuyentes} sortear={sortear} /></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
