declare namespace Usuarios {

    interface IUsuarioModel {
        id: number,
        nombre: string,
        apellido: string,
        email: string,
        telefono: string,
        run: string,
        password: string,
        fechaNacimiento: Date,
        foto: string,
        ubicacion: number,
        ubicacionStr: string,
        esActivo: boolean,
        esAdministrador: boolean,
        esColaborador: boolean,
        asociado: number,
        asociadoStr: string,
        anioIngreso: Date
//        puntaje: number      
    }
}
