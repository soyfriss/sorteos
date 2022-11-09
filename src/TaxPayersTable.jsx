import React, { useState } from 'react';
import Badge from "react-bootstrap/Badge";
import Table from "react-bootstrap/Table";
import Pagination from 'react-bootstrap/Pagination';
import pagination from "./simple-pagination";


const TaxPayersTable = (props) => {
    const itemsPage = 20;
    const [activePage, setActivePage] = useState(1);

    const onActivePageChange = (page) => {
        console.log('onActivePageChange()');
        setActivePage(page)
    }

    // Pagination
    const countContribuyentes = props.contribuyentes.length;

    let paginationBasic = '';
    if (countContribuyentes > itemsPage) {
        let totalPages = Math.ceil(countContribuyentes / itemsPage)
        let pages = pagination(activePage, totalPages);
        let items = pages.map((p, i) => {
            if (activePage === '...') {
                return (
                    <Pagination.Item key={i} active={p === activePage} >
                        {p}
                    </Pagination.Item>);
            }

            return (
                <Pagination.Item key={i} active={p === activePage} onClick={e => onActivePageChange(parseInt(e.target.text))}>
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

    // (activePage * itemsPage) - itemsPage ___ (activePage * itemsPage) - 1 o totalContribuyentes
    // 0 - 19, 20 - 39, 40 - 59...
    const rows = [];
    const start = (activePage * itemsPage) - itemsPage;
    let end = (activePage * itemsPage);
    if (end > props.contribuyentes.length) end = countContribuyentes;
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
}

export default TaxPayersTable;