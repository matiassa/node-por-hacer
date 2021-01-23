const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    //convierte un objeto a un json.
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('./db/data.json', data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

const cargarDB = () => {

    try {
        // se puede hacer mediante http pero como es un archivo
        //que se encuentra en el mismo servidor lo serializa a un objeto normal.
        listadoPorHacer = require('../db/data.json');

    } catch (error) {

        listadoPorHacer = [];
    }

}

const getListado = () => {

    cargarDB();

    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    //findIndex hace un ciclo interno por cada objeto.
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);


    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => {
    cargarDB();

    //CREA UN NUEVO ARREGLO CON AQUELLOS QUE TENGAN DIFERENTE DESCRIPCION
    let nuevoListado = listadoPorHacer.filter(lista => lista.descripcion !== descripcion);


    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }


}

const verificaElemento = (descripcion) => {

    return listadoPorHacer.some(tarea => tarea.descripcion === descripcion);
}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };


    if (verificaElemento(descripcion)) {
        return false;
    } else {
        listadoPorHacer.push(porHacer)
        guardarDB();

        return porHacer;
    }

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}