import React, { useState } from "react";
import * as xlsx from "xlsx";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

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

                props.actualizarLista(json);
            };
            setArchivos([...archivos, " " + e.target.files[0].name + " 🆗"]);
            reader.readAsArrayBuffer(e.target.files[0]);
        }
        setArchivo('');
    };

    const onChangeName = (e) => {
        e.preventDefault();

        props.setName(e.target.value);
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
                    <Form.Control type="text" name="name" onChange={onChangeName} value={props.name} />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group> */}
                <Form.Group className="mb-3" controlId="uploadFile">
                    <Form.Label>Importar archivo de Excel</Form.Label>
                    <Form.Control type="file" name="uploadFile" onChange={readUploadFile} value={archivo}></Form.Control>
                </Form.Group>
            </Form>
            {<Alert variant={archivos.length ? 'light' : 'danger'}>{mostrarArchivosImportados()}</Alert>}
        </>
    );
}

export default UploadXlsx;