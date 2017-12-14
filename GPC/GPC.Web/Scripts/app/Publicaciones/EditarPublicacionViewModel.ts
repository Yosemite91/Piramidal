/// <reference path='../../typings/jquery/jquery.d.ts' />
/// <reference path='../../typings/knockout/knockout.d.ts' />
/// <reference path='../../typings/devextreme/devextreme.d.ts' />
/// <reference path="ipublicacionmodel.d.ts" />


namespace Publicaciones {
    export class EditarPublicacionViewModel {
        public publicacion: KnockoutObservable<IPublicacionModel> = ko.observable<IPublicacionModel>({
            id: null, titulo: null, descripcion: null, fechaPublicacion: null, foto: null, esActivo: false
        });

        //PopUp
        private popUpCancelarModificar = ko.observable(false);
        private popUpModificarUsuario = ko.observable(false);

        public popUpModificar = {
            width: 'auto',
            height: 'auto',
            contentTemplate: '¿Modificar publicación actual?',
            showTitle: true,
            showCloseButton: true,
            title: 'Alerta',
            visible: this.popUpModificarUsuario,
            dragEnabled: false,
            closeOnOutsideClick: false,
            toolbarItems: [{
                toolbar: 'bottom',
                widget: 'button',
                options: { text: 'OK' },
                onClick: (e: any): void => {
                    this.loading(true);
                    if (this.FotoUsuario() === undefined) {
                        let foto: IFoto = {
                            cuerpo: this.fotoDX(),
                            usuarioID: null,
                            nombre: "foto",
                            id: null
                        }
                        this.FotoUsuario(foto);
                    }

                    var PublicacionDTO = {
                        id: this.publicacion().id,
                        titulo: this.publicacion().titulo,
                        descripcion: this.publicacion().descripcion,
                        foto: this.FotoUsuario().cuerpo
                    };
                    var info = JSON.stringify(PublicacionDTO);

                    $.ajax({
                        url: App.apiRoot + 'publicaciones/editar/',
                        cache: false,
                        type: 'PUT',
                        contentType: 'application/json; charset=utf-8',
                        data: info,
                        dataType: 'json'
                    }).then(
                        function (data) {
                            DevExpress.ui.notify('Publicación Modificado', 'success', 3000);
                            window.location.assign(App.appRoot + 'Publicacion/ListaPublicaciones');
                        },
                        function (xhr, textStatus, err) {
                            this.loading(false);
                            alert(err);
                        });
                }
            }]
        };

        public popUpCancelar = {
            width: 'auto',
            height: 'auto',
            contentTemplate: '¿Volver a la página principal?',
            showTitle: true,
            showCloseButton: true,
            title: 'Alerta',
            visible: this.popUpCancelarModificar,
            dragEnabled: false,
            closeOnOutsideClick: false,
            toolbarItems: [{
                toolbar: 'bottom',
                widget: 'button',
                options: { text: 'OK' },
                onClick: function (e: any) {
                    window.history.back();
                }
            }]
        };

        //Buttons
        public botonGuardar = {
            text: 'Guardar',
            type: 'success',
            icon: 'floppy',
            onClick: function (e: any) {
                var result = e.validationGroup.validate();

                var PublicacionValidacion = {
                    titulo: this.publicacion().titulo,
                    descripcion: this.publicacion().descripcion,
                };

                if (result.isValid) {
                    this.popUpModificarUsuario(true);
                }
                else {
                    App.alertaFormulario(PublicacionValidacion);
                }
            }
        };
        public botonCancelarEdicion = {
            text: 'Cancelar',
            icon: 'close',
            type: 'danger',
            onClick: (e: any): void => {
                this.popUpCancelarModificar(true);
            }
        };

        //Declaración de observables
        public tituloDX: KnockoutObservable<string> = ko.observable<string>();
        public descripcionDX: KnockoutObservable<string> = ko.observable<string>();
        public fotoDX: KnockoutObservable<string> = ko.observable<string>();

        public loadObject: (result: IPublicacionModel) => void = (result: IPublicacionModel): void => {
            this.tituloDX(result.titulo);
            this.descripcionDX(result.descripcion);
            this.fotoDX(result.foto);
        }

        // VALIDADOR DE DATOS
        public validatorOptions: DevExpress.ui.dxValidatorOptions = {
            validationRules: [{
                type: 'required',
                message: 'Campo requerido'
            }]
        };

        // FORMULARIO
        public dxTitulo = {
            value: this.tituloDX,
            width: 'auto',
            editorOptions: {
                mode: 'text'
            },
            validationRules: [{
                type: 'required',
                message: 'Campo requerido'
            }],
            showClearButton: true,
            onValueChanged: (e: any) => {
                this.publicacion().titulo = e.value;
            }
        }
        public dxDescripcion = {
            value: this.descripcionDX,
            width: 'auto',
            editorOptions: {
                mode: 'text'
            },
            maxLength: 500,
            height: 100,
            validationRules: [{
                type: 'required',
                message: 'Campo requerido'
            }],
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
        public loading: KnockoutObservable<boolean> = ko.observable(false);

        constructor() {
            this.loading(true);
            const id: string = window.location.search.replace('?id=', '');

            $.getJSON(App.apiRoot + 'publicaciones/get/' + id).then((result: IPublicacionModel): void => {
                this.loadObject(result);
                this.fotoDX(result.foto);
                this.publicacion().id = result.id;
                this.loading(false);
            });
        }

    }
}