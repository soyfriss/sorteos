import React, { useState } from "react";
import * as xlsx from "xlsx";

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
        <form>
            <label htmlFor="upload">Subir archivos</label>
            <input
                type="file"
                name="upload"
                id="upload"
                onChange={readUploadFile}
                value={archivo}
            />
        </form>
    );
}

export default UploadXlsx;