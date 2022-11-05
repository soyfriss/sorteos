import React from "react";
import Contribuyente from "./Contribuyente";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";

const Contribuyentes = (props) => {

    const getTotalContribuyentes = () => {
        const totalContribuyentes = props.contribuyentes.length;

        return <Badge bg={totalContribuyentes ? 'primary' : 'danger'}>{totalContribuyentes}</Badge>;
    };

    const getTotalContribuyentesConChance = (chanches) => {
        const totalContribuyentes = props.contribuyentes.filter(c => c.chances === chanches).length;

        return <Badge bg={totalContribuyentes ? 'primary' : 'secondary'}>{totalContribuyentes}</Badge>;
    };

    const getTotalContribuyentesConMasDeDosChances = () => {
        const totalContribuyentes = props.contribuyentes.filter(c => c.chances > 2).length;

        return <Badge bg={totalContribuyentes ? 'primary' : 'secondary'}>{totalContribuyentes}</Badge>;
    };

    let button = '';
    if (props.contribuyentes.length) {
        button = <Button onClick={() => props.sortear()}>Sortear</Button>;
    }

    return (
        <>
            <div>
                <h5>
                    <Alert variant={props.contribuyentes.length ? 'success' : 'danger'}>Contribuyentes: {getTotalContribuyentes()}</Alert>
                </h5>
                <h5>
                    <Alert variant="secondary">Con doble chance: {getTotalContribuyentesConChance(2)}</Alert>
                </h5>
                <h5>
                    <Alert variant="secondary">Con más de dos chances: {getTotalContribuyentesConMasDeDosChances()}</Alert>
                </h5>
                {button}
            </div>
            <div className="lista-contribuyentes">
                {props.contribuyentes && props.contribuyentes.map(c => <Contribuyente key={c.partida} partida={c.partida} propietario={c.propietario} direccion={c.direccion} isWinner={c.isWinner} chances={c.chances} />)}
            </div>
        </>
    );
}

export default Contribuyentes;