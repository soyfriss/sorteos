import React from "react";
import Contribuyente from "./Contribuyente";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const Contribuyentes = (props) => {

    const getTotalContribuyentesConChance = (chanches) => {
        if (props.contribuyentes) return props.contribuyentes.filter(c => c.chances === chanches).length;
        return 0;
    }; 

    const getTotalContribuyentesConMasDeDosChances = () => {
        if (props.contribuyentes) return props.contribuyentes.filter(c => c.chances > 2).length;
        return 0;
    };

    let button = '';
    if(props.contribuyentes.length) {
        button = <Button onClick={() => props.sortear()}>Sortear</Button>;
    }

    return (
        <>
            <div>
                <Alert variant={props.contribuyentes.length ? 'success' : 'danger'}>Contribuyentes: {props.contribuyentes.length}</Alert>
                <Alert variant="secondary">Con doble chance: {getTotalContribuyentesConChance(2)}</Alert>
                <Alert variant="secondary">Con más de dos chances: {getTotalContribuyentesConMasDeDosChances()}</Alert>
                {button}
            </div>
            <div className="lista-contribuyentes">
                {props.contribuyentes && props.contribuyentes.map(c => <Contribuyente key={c.partida} partida={c.partida} propietario={c.propietario} direccion={c.direccion} isWinner={c.isWinner} chances={c.chances} />)}
            </div>
        </>
    );
}

export default Contribuyentes;