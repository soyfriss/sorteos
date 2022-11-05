import React from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";

const Winners = (props) => {

    if (props.winners.length) {

        const rows = [];
        for (let i = 0; i < props.winners.length; i++) {
            rows.push(
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{props.winners[i].partida}</td>
                    <td>{props.winners[i].propietario}</td>
                    <td>{props.winners[i].direccion}</td>
                </tr>
            );
        }

        return (
            <>
                <Alert variant="success" className="text-center"><h2>
                    🎊 Felicitaciones a los ganadores del sorteo 🎊
                </h2></Alert>
                <Table striped bordered>
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
                </Table>
            </>
        );
    }

    return <></>;
};

export default Winners;
