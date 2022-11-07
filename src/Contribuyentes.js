import React from "react";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";

const Contribuyentes = (props) => {

    const getListaContribuyentes = () => {

        const rows = [];
        for (let i = 0; i < props.contribuyentes.length; i++) {
            rows.push(
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{props.contribuyentes[i].partida}</td>
                    <td>{props.contribuyentes[i].propietario}</td>
                    <td>{props.contribuyentes[i].direccion}</td>
                    <td className="text-center"><Badge bg="secondary">{props.contribuyentes[i].chances}</Badge></td>
                </tr>
            );
        }

        return (<Table striped bordered>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Partida</th>
                    <th>Propietario</th>
                    <th>Dirección</th>
                    <th>Chances</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>);

    };

    const getListaContribuyentesConDobleChance = () => {

        let index = 1;
        const rows = props.contribuyentes.filter(c => c.chances === 2).map(c => {
            return <tr key={index}>
                <td>{index++}</td>
                <td>{c.partida}</td>
                <td>{c.propietario}</td>
                <td>{c.direccion}</td>
            </tr>
        });

        if (rows.length) {
            return (<Table striped bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Partida</th>
                        <th>Propietario</th>
                        <th>Dirección</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>);
        } else {
            return (
                <p>No hay contribuyentes con doble chance</p>
            );
        }
    };

    const getListaContribuyentesConMasDeDosChances = () => {

        let index = 1;
        const rows = props.contribuyentes.filter(c => c.chances > 2).map(c => {
            return <tr key={index}>
                <td>{index++}</td>
                <td>{c.partida}</td>
                <td>{c.propietario}</td>
                <td>{c.direccion}</td>
            </tr>
        });

        if (rows.length) {
            return (<Table striped bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Partida</th>
                        <th>Propietario</th>
                        <th>Dirección</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>);
        } else {
            return (
                <p>No hay contribuyentes con más de dos chances</p>
            );
        }
    };

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

    const winners = props.contribuyentes.filter(c => c.isWinner);

    let button = '';
    if (props.name && props.contribuyentes.length && !winners.length) {
        button = <Button size="lg" className="mt-3 mx-3" onClick={() => props.sortear()}>Sortear</Button>;
    }

    let resetButton = <Button size="lg" className="mt-3" onClick={() => window.location.reload()}>Reiniciar</Button>;

    if (props.contribuyentes.length) {
        return (
            <>
                <div>
                    <Accordion alwaysOpen>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header><h5>Contribuyentes: {getTotalContribuyentes()}</h5></Accordion.Header>
                            <Accordion.Body>{getListaContribuyentes()}</Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header><h5>Con doble chance: {getTotalContribuyentesConChance(2)}</h5></Accordion.Header>
                            <Accordion.Body>{getListaContribuyentesConDobleChance()}</Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header><h5>Con más de dos chances: {getTotalContribuyentesConMasDeDosChances()}</h5></Accordion.Header>
                            <Accordion.Body>{getListaContribuyentesConMasDeDosChances()}</Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    {/* <h5>
                        <Alert variant={props.contribuyentes.length ? 'success' : 'danger'}>Contribuyentes: {getTotalContribuyentes()}</Alert>
                    </h5>
                    <h5>
                        <Alert variant="secondary">Con doble chance: {getTotalContribuyentesConChance(2)}</Alert>
                    </h5>
                    <h5>
                        <Alert variant="secondary">Con más de dos chances: {getTotalContribuyentesConMasDeDosChances()}</Alert>
                    </h5> */}
                    {resetButton}
                    {button}
                </div>

                {/* <div className="lista-contribuyentes">
                    {props.contribuyentes && props.contribuyentes.map(c => <Contribuyente key={c.partida} partida={c.partida} propietario={c.propietario} direccion={c.direccion} isWinner={c.isWinner} chances={c.chances} />)}
                </div> */}
            </>
        );
    }

    return <></>;
}

export default Contribuyentes;