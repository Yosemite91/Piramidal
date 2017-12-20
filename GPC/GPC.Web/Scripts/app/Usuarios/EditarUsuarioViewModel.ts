/// <reference path='../../typings/jquery/jquery.d.ts' />
/// <reference path='../../typings/knockout/knockout.d.ts' />
/// <reference path='../../typings/devextreme/devextreme.d.ts' />
/// <reference path='IUsuarioModel.d.ts' />

namespace Usuarios {

    export class EditarUsuarioViewModel {
        public usuario: KnockoutObservable<IUsuarioModel> = ko.observable<IUsuarioModel>({
            id: null,
            nombre: null,
            apellido: null,
            email: null,
            telefono: null,
            run: null,
            password: null,
            fechaNacimiento: null,
            foto: null,
            ubicacion: null,
            ubicacionStr: null,
            esActivo: false,
            esAdministrador: false,
            esColaborador: false,
            asociado: null,
            asociadoStr: null,
            anioIngreso: null
//          puntaje: null
        });

        //PopUp
        private popUpCancelarModificar = ko.observable(false);
        private popUpModificarUsuario = ko.observable(false);

        public popUpModificar = {
            width: 'auto',
            height: 'auto',
            contentTemplate: '¿Modificar usuario actual?',
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

                    var UsuarioDTO = {
                        nombre: this.usuario().nombre,
                        apellido: this.usuario().apellido,
                        email: this.usuario().email,
                        telefono: this.usuario().telefono,
                        run: this.usuario().run,
                        password: this.usuario().password,
                        fechaNacimiento: this.usuario().fechaNacimiento,
                        ubicacion: this.usuario().ubicacion,
                        esAdministrador: this.usuario().esAdministrador,
                        esColaborador: this.usuario().esColaborador,
                        esActivo: this.usuario().esActivo,
                        asociado: this.usuario().asociado,
                        foto: this.FotoUsuario().cuerpo
                    };
                    var info = JSON.stringify(UsuarioDTO);

                    $.ajax({
                        url: App.apiRoot + 'usuarios/editar/',
                        cache: false,
                        type: 'PUT',
                        contentType: 'application/json; charset=utf-8',
                        data: info,
                        dataType: 'json'
                    }).then(
                        function (data) {
                            DevExpress.ui.notify('Usuario Modificado', 'success', 3000);
                            window.history.back();
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

                var UsuarioValidacion = {
                    Nombre: this.usuario().nombre,
                    Apellido: this.usuario().apellido,
                    Email: this.usuario().email,
                    Telefono: this.usuario().telefono,
                    Ubicacion: this.usuario().ubicacion,
                    Asociado: this.usuario().asociado
                };

                if (result.isValid) {
                    this.popUpModificarUsuario(true);
                }
                else {
                    App.alertaFormulario(UsuarioValidacion);
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
        public nombreDX: KnockoutObservable<string> = ko.observable<string>();
        public apellidoDX: KnockoutObservable<string> = ko.observable<string>();
        public emailDX: KnockoutObservable<string> = ko.observable<string>();
        public telefonoDX: KnockoutObservable<string> = ko.observable<string>();
        public fechaNacimientoDX: KnockoutObservable<Date> = ko.observable<Date>();        
        public esActivoDX: KnockoutObservable<boolean> = ko.observable<boolean>();
        public esAdministradorDX: KnockoutObservable<boolean> = ko.observable<boolean>();
        public esColaboradorDX: KnockoutObservable<boolean> = ko.observable<boolean>();
        public ubicacionDX: KnockoutObservable<number> = ko.observable<number>();
        public asociadoDX: KnockoutObservable<number> = ko.observable<number>();
        public runDX: KnockoutObservable<string> = ko.observable<string>();
        public passwordDX: KnockoutObservable<string> = ko.observable<string>();
        public fotoDX: KnockoutObservable<string> = ko.observable<string>();

        //Estableciendo el enlace
        public loadObject: (result: IUsuarioModel) => void = (result: IUsuarioModel): void => {
            this.nombreDX(result.nombre);
            this.apellidoDX(result.apellido);            
            this.emailDX(result.email);
            this.telefonoDX(result.telefono);
            this.fechaNacimientoDX(result.fechaNacimiento);
            this.esActivoDX(result.esActivo);
            this.esAdministradorDX(result.esAdministrador);
            this.esColaboradorDX(result.esColaborador);
            this.ubicacionDX(result.ubicacion);
            this.asociadoDX(result.asociado);
            this.runDX(result.run);
            this.passwordDX(result.password);
            this.fotoDX(result.foto);
        }

        // VALIDADOR DE DATOS
        public validatorOptions: DevExpress.ui.dxValidatorOptions = {
            validationRules: [{
                type: 'required',
                message: 'Campo requerido'
            }]
        };
        public emailValidatorOptions: DevExpress.ui.dxValidatorOptions = {
            validationRules: [{
                type: "pattern",
                pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                message: 'Formato inválido'
            }, {
                    type: 'required',
                    message: 'Campo requerido'
                }]
        };
        public telefonoValidatorOptions: DevExpress.ui.dxValidatorOptions = {
            validationRules: [{
                type: "pattern",
                pattern: /^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/,
                message: 'Formato inválido'
            }, {
                    type: 'required',
                    message: 'Campo requerido'
                }]
        };

        // FORMULARIO
        public dxNombre = {
            value: this.nombreDX,
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
                this.usuario().nombre = e.value;
            }
        }
        public dxApellido = {
            value: this.apellidoDX,
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
                this.usuario().apellido = e.value;
            }
        }        
        public dxEmail = {
            value: this.emailDX,
            width: 'auto',
            placeholder: 'ejemplo@tpa.cl',
            editorOptions: {
                mode: 'email',
            },
            validationRules: [{
                type: 'required',
                message: 'Campo requerido'
            }],
            showClearButton: true,
            onValueChanged: (e: any) => {
                this.usuario().email = e.value;
            }
        }
        public dxTelefono = {
            value: this.telefonoDX,
            width: 'auto',
            placeholder: '+56 9 1234 5678',
            editorOptions: {
                mode: 'tel'
            },
            showClearButton: true,
            onValueChanged: (e: any) => {
                this.usuario().telefono = e.value;
            }
        }
        public dxRun = {
            value: this.runDX,
            width: 'auto',
            mask: 'ZZ.ZZZ.ZZZYK',
            maskRules: {
                'Z': /\d/,
                'K': /[0-9kK]/,
                'Y': /-/
            },
            validationRules: [{
                type: 'required',
                message: 'Campo requerido'
            }],
            showClearButton: true,
            onValueChanged: (e: any) => {
                this.usuario().run = e.value
            }
        }
        public dxFechaNacimiento = {
            max: new Date(App.anioMinimo(), 0),
            min: new Date((App.anioMinimo() - 70), 0),
            value: this.fechaNacimientoDX,
            width: 'auto',
            editorOptions: {
                format: 'dd/MM/yyyy',
                width: 'auto',
                adaptivityEnabled: true,
                dateOutOfRangeMessage: 'Valor fuera de rango'
            },
            showClearButton: true,
            onValueChanged: (e: any) => {
                this.usuario().fechaNacimiento = new Date(e.value);
            }
        }
        public dxUbicacion = <DevExpress.ui.dxSelectBoxOptions>{
            dataSource: [
                { region: "Metropolitana", numero: 0 },
                { region: "Tarapacá", numero: 1 },
                { region: "Antofagasta", numero: 2 },
                { region: "Atacama", numero: 3 },
                { region: "Coquimbo", numero: 4 },
                { region: "Valparaíso", numero: 5 },
                { region: "O'Higgins", numero: 6 },
                { region: "Maule", numero: 7 },
                { region: "Bío Bío", numero: 8 },
                { region: "La Araucanía", numero: 9 },
                { region: "Los Ríos", numero: 10 },
                { region: "Los Lagos", numero: 11 },
                { region: "Aysen", numero: 12 },
                { region: "Magallanes Antártica", numero: 13 },
                { region: "Arica y Parinacota", numero: 14 }
            ],
            valueExpr: "numero",
            displayExpr: "region",
            placeholder: "Seleccione región",
            value: this.ubicacionDX,
            validationRules: [{
                type: 'required',
                message: 'Seleccione región'
            }],
            onValueChanged: (e: any) => {
                this.usuario().ubicacion = e.value;
            }
            //onSelectionChanged: (e: any) => {
            //    this.usuario().ubicacion = e.selectedItem;
            //}
        }
        public dxAsociado = <DevExpress.ui.dxSelectBoxOptions>{
            dataSource: [
                { empresa: "ParfumdeParfum", numero: 0 },
                { empresa: "JMOceanAvenue", numero: 1 }
            ],
            valueExpr: "numero",
            displayExpr: "empresa",
            placeholder: "Seleccione empresa",
            value: this.asociadoDX,
            validationRules: [{
                type: 'required',
                message: 'Seleccione empresa'
            }],
            onValueChanged: (e: any) => {
                this.usuario().asociado = e.value;
            }
            //onSelectionChanged: (e: any) => {
            //    this.usuario().asociado = e.selectedItem;
            //}
        }
        public dxEsAdministrador = {
            value: this.esAdministradorDX,
            onText: 'SI',
            offText: 'NO',
            onValueChanged: (e: any) => {
                this.usuario().esAdministrador = e.value;
            }
        }
        public dxEsColaborador = {
            value: this.esColaboradorDX,
            onText: 'SI',
            offText: 'NO',
            onValueChanged: (e: any) => {
                this.usuario().esColaborador = e.value;
            }
        }
        public dxActivo = {
            value: this.esActivoDX,
            onText: 'SI',
            offText: 'NO',
            onValueChanged: (e: any) => {
                this.usuario().esActivo = e.value;
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
        public esNuevo: KnockoutObservable<boolean> = ko.observable(false);

        constructor() {
            this.loading(true);
            const run: string = window.location.search.replace('?run=', '');

            $.getJSON(App.apiRoot + 'usuarios/get/' + run).then((result: IUsuarioModel): void => {
                this.loadObject(result);
                this.fotoDX(result.foto);
                this.loading(false);

            });
        }

    }

}