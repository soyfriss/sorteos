import React, { useState } from 'react';
// import './App.css';
import UploadXlsx from './UploadXlsx';
import Contribuyentes from './Contribuyentes';
import Menu from "./Menu";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Winners from './Winners';

function App() {
  const [contribuyentes, setContribuyentes] = useState([]);
  const [winnersList, setWinnersList] = useState([]);
  const [name, setName] = useState('');
  const [numberOfWinners, setNumberOfWinners] = useState(3);

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


    const winnersList = [];
    for (let i = 0; i < numberOfWinners; i++) {
      winnersList.push(getWinner(lista, winnersList));        
    }

    const newContribuyentes = [...contribuyentes];
    winnersList.forEach(partida => setWinner(newContribuyentes, partida))

    setContribuyentes(newContribuyentes);
    setWinnersList(winnersList);

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

  if (winnersList.length) {

    const winners = [];
    winnersList.forEach(partida => winners.push(contribuyentes.find(c => c.partida === partida)));
    // console.log(winnersList);
    // console.log(winners);

    return (
      <div className="App">
        <Menu />
        <Container>
          <Row className="mt-3">
            <Col><Winners winners={winners} name={name} /></Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="App">
      <Menu />
      <Container>
        <Row className="mt-3">
          <Col><UploadXlsx actualizarLista={actualizarLista} name={name} setName={(name) => setName(name)} numberOfWinners={numberOfWinners} setNumberOfWinners={(value) => setNumberOfWinners(value)} /></Col>
        </Row>
        <Row className="mt-1">
          <Col><Contribuyentes contribuyentes={contribuyentes} sortear={sortear} name={name} numberOfWinners={numberOfWinners} /></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
