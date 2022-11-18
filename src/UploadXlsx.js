import React, { useState } from "react";
import * as xlsx from "xlsx";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";
import { addEntrants, setRaffleName, setRaffleNumberOfWinners } from "./redux/actions";

const UploadXlsx = (props) => {

    const [archivo, setArchivo] = useState('');
    const [archivos, setArchivos] = useState([]);

    const readUploadFile = (e) => {
        e.preventDefault();

        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet);

                // props.actualizarLista(json);
                props.addEntrants(json);
            };
            setArchivos([...archivos, " " + e.target.files[0].name + " 🆗"]);
            reader.readAsArrayBuffer(e.target.files[0]);
        }
        setArchivo('');
    };

    const onChangeName = (e) => {
        e.preventDefault();

        props.setRaffleName(e.target.value);
    }

    const onChangeNumberOfWinners = (e) => {
        // console.log('onChangeNumberOfWinners()');
        e.preventDefault();

        props.setRaffleNumberOfWinners(e.target.value);
    }

    const mostrarArchivosImportados = () => {
        if (archivos.length) {
            // console.log(archivos.toString());
            return archivos.toString();
        }
        return 'Aún no has importado archivos!';
    }

    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Nombre del sorteo</Form.Label>
                    <Form.Control type="text" name="name" onChange={onChangeName} value={props.raffleName} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="numberOfWinners">
                    <Form.Label>Número de ganadores</Form.Label>
                    <Form.Control type="number" name="numberOfWinners" onChange={onChangeNumberOfWinners} value={props.numberOfWinners} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="uploadFile">
                    <Form.Label>Importar archivo de Excel</Form.Label>
                    <Form.Control type="file" name="uploadFile" onChange={readUploadFile} value={archivo}></Form.Control>
                </Form.Group>
            </Form>
            {<Alert variant={archivos.length ? 'light' : 'danger'}>{mostrarArchivosImportados()}</Alert>}
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        raffleName: state.name,
        numberOfWinners: state.numberOfWinners
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setRaffleName: raffleName => dispatch(setRaffleName(raffleName)),
        setRaffleNumberOfWinners: value => dispatch(setRaffleNumberOfWinners(value)),
        addEntrants: json => dispatch(addEntrants(json))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadXlsx);