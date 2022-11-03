import React, { useState } from "react";
import './App.css';
import UploadXlsx from './UploadXlsx';
import Contribuyentes from './Contribuyentes';

function App() {
  const [contribuyentes, setContribuyentes] = useState([]);

  const actualizarLista = (lista) => {
    console.log('actualizarLista llamado');
    console.log(lista.length);
    setContribuyentes(lista);

  }

  return (
      <div className="App">
        <UploadXlsx actualizarLista={actualizarLista}/>
        <Contribuyentes contribuyentes={contribuyentes} />
      </div>
  );
}

export default App;
