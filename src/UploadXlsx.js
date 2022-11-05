import React, { useState } from "react";
import * as xlsx from "xlsx";
import Form from "react-bootstrap/Form";

const UploadXlsx = (props) => {

    const [archivo, setArchivo] = useState('');

    const readUploadFile = (e) => {
        e.preventDefault();

        // const nuevos = [...contribuyentes];

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
            reader.readAsArrayBuffer(e.target.files[0]);


        }
        setArchivo('');
    };

    return (
        <Form>
            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="uploadFile">
                <Form.Label>Importar archivo XLSX</Form.Label>
                <Form.Control type="file" name="uploadFile" onChange={readUploadFile} value={archivo}></Form.Control>
            </Form.Group>
            {/* <label htmlFor="upload">Subir archivos</label>
            <input
                type="file"
                name="upload"
                id="upload"
                onChange={readUploadFile}
                value={archivo}
            /> */}
        </Form>
    );
}

export default UploadXlsx;