/// <reference path='../../typings/jquery/jquery.d.ts' />
/// <reference path='../../typings/knockout/knockout.d.ts' />
/// <reference path='../../typings/devextreme/devextreme.d.ts' />
/// <reference path='IActividadModel.d.ts' />

namespace Actividades {

    export class EditarActividadViewModel {
        public actividad: KnockoutObservable<IActividadModel> = ko.observable<IActividadModel>({
            id: null,
            nombre: null,
            descripcion: null,
            fechaInicio: null,
            fechaTermino: null,
            ubicacion: null
        });

        //PopUp
        private popUpCancelarModificar = ko.observable(false);
        private popUpModificarUsuario = ko.observable(false);

        public popUpModificar = {
            width: 'auto',
            height: 'auto',
            contentTemplate: '¿Modificar actividad actual?',
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
                    var ActividadDTO = {
                        id: this.actividad().id,
                        nombre: this.actividad().nombre,
                        descripcion: this.actividad().descripcion,
                        fechaInicio: this.actividad().fechaInicio,
                        fechaTermino: this.actividad().fechaTermino
                    };
                    var info = JSON.stringify(ActividadDTO);

                    $.ajax({
                        url: App.apiRoot + 'actividades/editar/',
                        cache: false,
                        type: 'PUT',
                        contentType: 'application/json; charset=utf-8',
                        data: info,
                        dataType: 'json'
                    }).then(
                        function (data) {
                            DevExpress.ui.notify('Actividad Modificado', 'success', 3000);
                            window.location.assign(App.appRoot + 'Actividad/ListaActividades');
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
                    Nombre: this.actividad().nombre,
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
        public descripcionDX: KnockoutObservable<string> = ko.observable<string>();
        public fechaInicioDX: KnockoutObservable<Date> = ko.observable<Date>();
        public fechaTerminoDX: KnockoutObservable<Date> = ko.observable<Date>();
       

        //Estableciendo el enlace
        public loadObject: (result: IActividadModel) => void = (result: IActividadModel): void => {
            this.nombreDX(result.nombre);
            this.descripcionDX(result.descripcion);
            this.fechaInicioDX(result.fechaInicio);
            this.fechaTerminoDX(result.fechaTermino);
        }

        // VALIDADOR DE DATOS
        public validatorOptions: DevExpress.ui.dxValidatorOptions = {
            validationRules: [{
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
                this.actividad().nombre = e.value;
            }
        }
        public dxDescripcion = {
            value: this.descripcionDX,
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
                this.actividad().descripcion = e.value;
            }
        }
       
        public dxFechaInicio = {
            value: this.fechaInicioDX,
            width: 'auto',
            editorOptions: {
                format: 'dd/MM/yyyy',
                width: 'auto',
                adaptivityEnabled: true,
                dateOutOfRangeMessage: 'Valor fuera de rango'
            },
            showClearButton: true,
            onValueChanged: (e: any) => {
                this.actividad().fechaInicio = new Date(e.value);
            }
        }

        public dxFechaTermino = {
            value: this.fechaTerminoDX,
            width: 'auto',
            editorOptions: {
                format: 'dd/MM/yyyy',
                width: 'auto',
                adaptivityEnabled: true,
                dateOutOfRangeMessage: 'Valor fuera de rango'
            },
            showClearButton: true,
            onValueChanged: (e: any) => {
                this.actividad().fechaTermino = new Date(e.value);
            }
        }      

        public loading: KnockoutObservable<boolean> = ko.observable(false);
        public esNuevo: KnockoutObservable<boolean> = ko.observable(false);

        constructor() {
            this.loading(true);
            this.actividad().id = parseInt(window.location.search.replace('?id=', ''));
            $.getJSON(App.apiRoot + 'actividades/detalle/' + this.actividad().id).then((result: IActividadModel): void => {
                this.loadObject(result);
                this.loading(false);
            });
        }

    }
}