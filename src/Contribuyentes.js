import React, { useState, useEffect } from "react";
import Contribuyente from "./Contribuyente";

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
    });

    useEffect(() => {
        console.log('Renderizando Contribuyentes');
        console.log(props.contribuyentes.length);
    }, [props.contribuyentes]);

    return (
        <>
            <div>
                <p>Contribuyentes: {props.contribuyentes.length}</p>
                <p>Con doble chance: {conDobleChance}</p>
                {conMasDeDosChances ? <p>Con más de dos chances: {conMasDeDosChances}</p> : ''}
            </div>
            <div>
                {props.contribuyentes && props.contribuyentes.map(c => <Contribuyente key={c.partida} partida={c.partida} propietario={c.propietario} direccion={c.direccion} chances={c.chances} />)}
            </div>
        </>
    );
}

export default Contribuyentes;