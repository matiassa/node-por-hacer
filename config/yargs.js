const descripcion = {
    demand: true,
    alias: 'd'
};

const completado = {
    alias: 'c',
    default: true
};

const argv = require('yargs')
    .command('crear', 'Crea un lista de tareas por hacer', { descripcion })
    .command('borrar', 'Elimina una tarea de la lista', { descripcion })
    .command('listar', 'Lista tareas por hacer')
    .command('actualizar', 'Actualiza el estado de una tarea', { descripcion, completado })
    .help()
    .argv;

module.exports = {
    argv
}