declare namespace Postulaciones {

    interface IPostulanteModel {
        id: number,
        email: string,        
        run: string,        
        curriculum: string,
        ubicacion: number,
        esActivo: boolean,
        asociado: number,
        fechaPostulacion: Date
    }

    interface IFoto {
        usuarioID: number;
        id: number;
        nombre: string;
        cuerpo: string;
    }
}
