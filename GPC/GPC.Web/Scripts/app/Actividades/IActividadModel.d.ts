declare namespace Actividades {

    interface IActividadModel {
        id: number,
        nombre: string,
        descripcion: string,
        fechaInicio: Date,
        fechaTermino: Date,
        ubicacion: number,
        ubicacionStr: string
    }
}
