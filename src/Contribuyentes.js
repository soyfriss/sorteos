import React, { useEffect } from "react";
import Contribuyente from "./Contribuyente";

const Contribuyentes = (props) => {
    useEffect(() => {
        console.log('Renderizando Contribuyentes');
        console.log(props.contribuyentes.length);
    }, [props.contribuyentes]);

    const getTotalContribuyentesConChance = (chanches) => {
        return props.contribuyentes.filter(c => c.chances === chanches).length;
    }

    return (
        <>
            <div>
                <p>Contribuyentes: {props.contribuyentes.length}</p>
                <p>Con doble chance: {getTotalContribuyentesConChance(2)}</p>
            </div>
            <div>
                {props.contribuyentes && props.contribuyentes.map(c => <Contribuyente key={c.partida} partida={c.partida} propietario={c.propietario} direccion={c.direccion} chances={c.chances} />)}
            </div>
        </>
    );
}

export default Contribuyentes;