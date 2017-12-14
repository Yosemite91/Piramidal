/// <reference path='../../typings/jquery/jquery.d.ts' />
/// <reference path='../../typings/knockout/knockout.d.ts' />
/// <reference path='../../typings/devextreme/devextreme.d.ts' />
/// <reference path="ipublicacionmodel.d.ts" />
namespace Publicaciones {
    export class DetallePublicacionViewModel {

        public publicacion: KnockoutObservable<IPublicacionModel> = ko.observable<IPublicacionModel>({
            id: null, titulo: null, descripcion: null, fechaPublicacion: null, foto: null, esActivo: false
        });
        //Buttons
        public botonEditar = {
            text: 'Modificar',
            type: 'default',
            icon: 'edit',
            onClick: function (e: any) {
                var id = this.publicacion().id;
                window.location.assign(App.appRoot + 'Publicacion/EditarPublicacion?id=' + id);
            }
        };
        public botonEliminar = {
            text: 'Eliminar',
            type: 'danger',
            icon: 'close',
            onClick: function (e: any) {
                var PublicacionDTO = {
                    id: this.publicacion().id,
                };
                var info = JSON.stringify(PublicacionDTO);
                $.ajax({
                    url: App.apiRoot + 'publicaciones/eliminar/',
                    cache: false,
                    type: 'PUT',
                    contentType: 'application/json; charset=utf-8',
                    data: info,
                    dataType: 'json'
                }).then(
                    function (data) {
                        DevExpress.ui.notify('Publicacion Eliminado', 'success', 3000);
                        window.location.assign(App.appRoot + 'Publicacion/ListaPublicaciones');
                    },function (xhr, textStatus, err) {
                        alert(err)
                    }
                );
            }
        };
        public goBack = {
            icon: 'back',
            type: 'normal',
            onClick: (e: any): void => {
                window.history.back();
            }
        };

        //Formulario
        public form: DevExpress.ui.dxFormOptions = {
            formData: this.publicacion,
            readOnly: true,
            colCount: 'auto',
            colCountByScreen: {
                lg: 1,
                md: 1,
                sm: 1,
                xs: 1
            },
            items: [
                <DevExpress.ui.dxFormGroupItem>{
                    itemType: 'group',
                    caption: 'Información Publicacion',
                    items: ['titulo',
                        <DevExpress.ui.dxFormSimpleItem>{
                            dataField: 'descripcion',
                            editorType: 'dxTextArea',
                        },
                        <DevExpress.ui.dxDateBoxOptions>{
                            dataField: 'fechaPublicacion',
                            type: 'datetime',
                            editorOptions: {
                                format: 'dd/MM/yyyy',
                                width: 'auto'
                            }
                        }
                    ]
                }
            ]
        };

        //Foto
        public fotoPerfil: KnockoutObservable<IFoto> = ko.observable<IFoto>();
        public MakePhoto: (cuerpo: string) => void = (cuerpo: string): void => {
            let foto: IFoto = {
                id: null,
                cuerpo: cuerpo,
                nombre: null,
                usuarioID: null
            }
            this.fotoPerfil(foto);
        }

        public loading: KnockoutObservable<boolean> = ko.observable(false);
        constructor() {
            this.loading(true);
            const id: string = window.location.search.replace('?id=', '');

            $.getJSON(App.apiRoot + 'publicaciones/get/' + id).then((result: IPublicacionModel): void => {
                this.publicacion(result);
                this.MakePhoto(result.foto);
                $('#publicacion-form').dxForm('instance').repaint();
                this.loading(false);
            });
        }

    }
}