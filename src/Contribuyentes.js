import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import RaffleYesNo from "./RaffleYesNo";
import Spinner from 'react-bootstrap/Spinner';
import Pagination from 'react-bootstrap/Pagination';
import pagination from "./simple-pagination";

const Contribuyentes = (props) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [procesando, setProcesando] = useState(false);
    const target = useRef(null);
    const itemsPage = 20;
    const [activePage, setActivePage] = useState(1);

    const onActivePageChange = (page) => {
        console.log('onActivePageChange()');
        setActivePage(page)
    }

    const getListaContribuyentes = (page) => {
        console.log('getListaContribuyentes()');
        // Pagination
        const countContribuyentes = props.contribuyentes.length;

        let paginationBasic = '';
        if (countContribuyentes > itemsPage) {
            let totalPages = Math.ceil(props.contribuyentes.length / itemsPage)
            let pages = pagination(activePage, totalPages);
            let items = pages.map((p, i) => {
                return (
                    <Pagination.Item key={i} active={p === page} onClick={e => onActivePageChange(parseInt(e.target.text))}>
                        {p}
                    </Pagination.Item>
                );
            })

            paginationBasic = (
                <div>
                    <Pagination>{items}</Pagination>
                </div>
            );
        }

        // (page * itemsPage) - itemsPage ___ (page * itemsPage) - 1 o totalContribuyentes
        // 0 - 19, 20 - 39, 40 - 59...
        const rows = [];
        const start = (page * itemsPage) - itemsPage;
        let end = (page * itemsPage);
        if (end > props.contribuyentes.length) end = props.contribuyentes.length;
        for (let i = start; i < end; i++) {
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

        return (
            <>
                <Table striped bordered>
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
                </Table>
                {paginationBasic}
            </>);
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
                <td className="text-center"><Badge bg="secondary">{c.chances}</Badge></td>
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
                        <th>Chances</th>
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

    const confirmarSorteo = () => {
        console.log('confirmarSorteo() llamado');
        setShowConfirmation(true);
    }

    const procesarSorteo = () => {
        console.log('procesarSorteo()');
        setShowConfirmation(false);
        setProcesando(true);

        setTimeout(() => props.sortear(), 3000);


    }

    const winners = props.contribuyentes.filter(c => c.isWinner);



    let raffleButton = '';
    if (props.name && props.contribuyentes.length && !winners.length) {
        raffleButton = <>
            <Button size="lg" className="mt-3 mx-3" ref={target} onClick={() => confirmarSorteo()}>{
                procesando
                    ?
                    <>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true" />
                        <span> Procesando...</span>
                    </>
                    :
                    'Sortear'
            }</Button>
            <RaffleYesNo name={props.name} show={showConfirmation} closeDialog={() => setShowConfirmation(false)} sortear={procesarSorteo} />
        </>
    }

    let resetButton = procesando ? '' : <Button size="lg" className="mt-3" onClick={() => window.location.reload()}>Reiniciar</Button>;

    if (props.contribuyentes.length) {
        return (
            <>
                <div>
                    <Accordion alwaysOpen>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header><h5>Contribuyentes: {getTotalContribuyentes(activePage)}</h5></Accordion.Header>
                            <Accordion.Body>{getListaContribuyentes(activePage)}</Accordion.Body>
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
                    {raffleButton}
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