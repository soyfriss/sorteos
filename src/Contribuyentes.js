import React, { useState, useEffect } from "react";
import Contribuyente from "./Contribuyente";
import Button from "react-bootstrap/Button";

const Contribuyentes = (props) => {
    const [conDobleChance, setConDobleChance] = useState(0);
    const [conMasDeDosChances, setConMasDeDosChances] = useState(0);

    const getTotalContribuyentesConChance = (chanches) => {
        return props.contribuyentes.filter(c => c.chances === chanches).length;
    }

    const getTotalContribuyentesConMasDeDosChances = () => {
        return props.contribuyentes.filter(c => c.chances > 2).length;
    }

    useEffect(() => {
        setConDobleChance(getTotalContribuyentesConChance(2));
        setConMasDeDosChances(getTotalContribuyentesConMasDeDosChances());
    }, []);

    let button = '';
    if(props.contribuyentes.length) {
        button = <Button onClick={() => props.sortear()}>Sortear</Button>;
    }

    return (
        <>
            <div>
                <p>Contribuyentes: {props.contribuyentes.length}</p>
                <p>Con doble chance: {conDobleChance}</p>
                {conMasDeDosChances ? <p>Con más de dos chances: {() => conMasDeDosChances}</p> : ''}
                {button}
            </div>
            <div className="lista-contribuyentes">
                {props.contribuyentes && props.contribuyentes.map(c => <Contribuyente key={c.partida} partida={c.partida} propietario={c.propietario} direccion={c.direccion} isWinner={c.isWinner} chances={c.chances} />)}
            </div>
        </>
    );
}

export default Contribuyentes;