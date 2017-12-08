/// <reference path='../../typings/jquery/jquery.d.ts' />
/// <reference path='../../typings/knockout/knockout.d.ts' />
/// <reference path='../../typings/devextreme/devextreme.d.ts' />
/// <reference path="ipublicacionmodel.d.ts" />
namespace Publicaciones {
    export class CrearPublicacionViewModel {

        public publicacion: KnockoutObservable<IPublicacionModel> = ko.observable<IPublicacionModel>({
            id: null, titulo: null, descripcion: null, fechaPublicacion: null, foto: null, esActivo: false
        });


        //PopUp
        private popUpCancelarCreacionPublicacion = ko.observable(false);
        private popUpCrearPublicacion = ko.observable(false);

        // POP-UP CANCELAR
        public popUpCancelar = {
            width: 'auto',
            height: 'auto',
            contentTemplate: '¿Volver a la página anterior?',
            showTitle: true,
            showCloseButton: true,
            title: 'Alerta',
            visible: this.popUpCancelarCreacionPublicacion,
            dragEnabled: false,
            closeOnOutsideClick: false,
            toolbarItems: [{
                toolbar: 'bottom',
                widget: 'button',
                options: { text: 'OK' },
                onClick: function (e: any) {
                    window.location.assign(App.appRoot + 'Publicacion/ListaPublicaciones');
                }
            }
            ]
        };
        // POP-UP CREAR
        public popUpCrear = {
            width: 'auto',
            height: 'auto',
            contentTemplate: '¿Quiere crear esta nueva publicación?',
            showTitle: true,
            showCloseButton: true,
            title: 'Alerta',
            visible: this.popUpCrearPublicacion,
            dragEnabled: false,
            closeOnOutsideClick: false,
            toolbarItems: [{
                toolbar: 'bottom',
                widget: 'dxButton',
                options: { text: 'OK' },
                onClick: (e: any): void => {
                    this.loading(true);
                    if (this.FotoUsuario() === undefined) {
                        let foto: IFoto = {
                            cuerpo: "data:image/png;base64,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",
                            usuarioID: null,
                            nombre: "nombre",
                            id: null
                        }
                        this.FotoUsuario(foto);
                    }

                    //Volcando información de formulario
                    var PublicacionDTO = {
                        titulo: this.publicacion().titulo,
                        descripcion: this.publicacion().descripcion,
                        foto: this.FotoUsuario().cuerpo
                    };

                    var info = JSON.stringify(PublicacionDTO);
                    $.ajax({
                        url: App.apiRoot + 'publicaciones/crear',
                        cache: false,
                        type: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        data: info,
                        dataType: 'json'
                    }).then(
                        function (data) {
                            DevExpress.ui.notify('PUBLICACION CREADO', 'success', 3000);
                            window.location.assign(App.appRoot + 'Publicacion/ListaPublicaciones');
                        },
                        function (xhr, textStatus, err) {
                            this.loading(false);
                            alert(err);
                        }
                        );
                }
            }]
        };
        // BOTONES GUARDAR
        public botonGuardar = {
            text: 'Guardar',
            icon: 'floppy',
            type: 'success',
            onClick: (e: any): void => {
                var result = e.validationGroup.validate();

                var PublicacionValidacion = {
                    Titulo: this.publicacion().titulo,
                    Descripcion: this.publicacion().descripcion
                };

                if (result.isValid) {
                    this.popUpCrearPublicacion(true);
                }
                else {
                    App.alertaFormulario(PublicacionValidacion);
                }
            }
        };

        // BOTONES CANCELAR
        public botonCancelar = {
            text: 'Cancelar',
            icon: 'close',
            type: 'danger',
            onClick: (e: any): void => {
                this.popUpCancelarCreacionPublicacion(true);
            }
        };

        // VALIDADOR DE DATOS
        public validatorOptions: DevExpress.ui.dxValidatorOptions = {
            validationRules: [{
                type: 'required',
                message: 'Campo requerido'
            }]
        };

        // FORMULARIO
        public dxTitulo = {
            width: 'auto',
            editorOptions: {
                mode: 'text'
            },            
            showClearButton: true,
            onValueChanged: (e: any) => {
                this.publicacion().titulo = e.value;
            }
        }
        public dxDescripcion = {
            width: 'auto',
            editorOptions: {
                mode: 'text'
            },
            maxLength: 500,
            height: 100,
            showClearButton: true,
            onValueChanged: (e: any) => {
                this.publicacion().descripcion = e.value;
            }
        }
        public dxSubirImagen = {
            allowCanceling: true,
            multiple: false,
            readyToUploadMessage: 'Listo para cargar achivo',
            selectButtonText: 'Seleccionar imagen',
            uploadButtonText: 'Subir',
            uploadedMessage: 'Archivo cargado',
            uploadedFailMessage: 'Error al cargar archivo',
            uploadMethod: 'POST',
            uploadMode: 'useForm',
            focusStateEnabled: true,
            uploadUrl: '/',
            showFileList: true,
            labelText: '',
            accept: 'image/*',
            onValueChanged: (e) => {
                let createLoadHandler = (nombre: string) => {
                    return (event) => {
                        let foto: IFoto = {
                            cuerpo: event.target.result,
                            usuarioID: null,
                            nombre: nombre,
                            id: null
                        }
                        this.FotoUsuario(foto);
                    }
                }
                let frb = new FileReader();
                frb.onload = createLoadHandler(e.value[0].name);
                frb.readAsDataURL(e.value[0]);
            }
        }

        public FotoUsuario: KnockoutObservable<IFoto> = ko.observable<IFoto>();
        public loading: KnockoutObservable<boolean> = ko.observable(true);
        constructor() {
            this.loading(false);
        }

    }
}