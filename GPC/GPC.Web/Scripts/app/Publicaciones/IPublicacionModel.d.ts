declare namespace Publicaciones {

    interface IPublicacionModel {
        id: number,
        titulo: string,
        descripcion: string,
        fechaPublicacion: Date,
        esActivo: boolean,
        foto: string
    }
}