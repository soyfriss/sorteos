import React, { useState, useEffect } from "react";
import * as xlsx from "xlsx";

const UploadXlsx = (props) => {

    const [contribuyentes, setContribuyentes] = useState([]);
    const [archivo, setArchivo] = useState('');

    useEffect(() => {
        console.log(contribuyentes);
        props.actualizarLista(contribuyentes);
    }, [contribuyentes]);


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

                // console.log(typeof json);
                // console.log(json);
                // json.forEach(j => console.log(j))
                const nuevos = [];

                json.forEach(c => {

                    // Doble chance
                    const dobleChance = contribuyentes.find(contribuyente => c.Partida === contribuyente.partida);
                    if (dobleChance) {
                        dobleChance.chances++;
                    } else {
                        nuevos.push({
                            partida: c.Partida,
                            propietario: c.Propietario,
                            direccion: c.Dirección,
                            chances: 1
                        });
                    }

                    return nuevos;
                });

                setContribuyentes([
                    ...contribuyentes,
                    ...nuevos
                ]);
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