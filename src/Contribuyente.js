import React, { useEffect } from "react";
import './Contribuyente.css'

const Contribuyente = (props) => {
    useEffect(() => {
        console.log('Renderizando Contribuyente');
    }, []);

    return (
        <div className="contribuyente">
            <p>{props.partida}</p>
            <p>{props.propietario}</p>
            <p>{props.direccion}</p>
            <p>{props.chances}</p>
            <p>{props.isWinner ? 'GANADOR' : 'NO'}</p>
        </div>
    );
};

export default Contribuyente;


