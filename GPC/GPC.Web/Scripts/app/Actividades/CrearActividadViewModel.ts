/// <reference path='../../typings/jquery/jquery.d.ts' />
/// <reference path='../../typings/knockout/knockout.d.ts' />
/// <reference path='../../typings/devextreme/devextreme.d.ts' />
/// <reference path='IActividadModel.d.ts' />

namespace Actividades {
    export class CrearActividadViewModel {
        public actividad: KnockoutObservable<IActividadModel> = ko.observable<IActividadModel>({
            id: null,
            nombre: null,
            descripcion: null,
            fechaInicio: null,
            fechaTermino: null,
            ubicacion: null,
            ubicacionStr: null
        });

        //PopUp
        private popUpCancelarCreacionUsuario = ko.observable(false);
        private popUpCrearUsuario = ko.observable(false);

        // POP-UP CANCELAR
        public popUpCancelar = {
            width: 'auto',
            height: 'auto',
            contentTemplate: '¿Volver a la página anterior?',
            showTitle: true,
            showCloseButton: true,
            title: 'Alerta',
            visible: this.popUpCancelarCreacionUsuario,
            dragEnabled: false,
            closeOnOutsideClick: false,
            toolbarItems: [{
                toolbar: 'bottom',
                widget: 'button',
                options: { text: 'OK' },
                onClick: function (e: any) {
                    window.history.back();
                }
            }
            ]
        };

        // POP-UP CREAR
        public popUpCrear = {
            width: 'auto',
            height: 'auto',
            contentTemplate: '¿Quiere crear esta actividad?',
            showTitle: true,
            showCloseButton: true,
            title: 'Alerta',
            visible: this.popUpCrearUsuario,
            dragEnabled: false,
            closeOnOutsideClick: false,
            toolbarItems: [{
                toolbar: 'bottom',
                widget: 'dxButton',
                options: { text: 'OK' },
                onClick: (e: any): void => {
                    this.loading(true);

                    //Volcando información de formulario
                    var ActividadDTO = {
                        nombre: this.actividad().nombre,
                        descripcion: this.actividad().descripcion,
                        fechaInicio: this.actividad().fechaInicio,
                        fechaTermino: this.actividad().fechaTermino,
                        ubicacion: this.actividad().ubicacion
                    };

                    var info = JSON.stringify(ActividadDTO);
                    $.ajax({
                        url: App.apiRoot + 'actividades/crear',
                        cache: false,
                        type: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        data: info,
                        dataType: 'json'
                    }).then(
                        function (data) {
                            DevExpress.ui.notify('ACTIVIDAD CREADA', 'success', 3000);
                            window.location.assign(App.appRoot + 'Actividad/ListaActividades');
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

                var ActividadValidacion = {
                    nombre: this.actividad().nombre,
                    descripcion: this.actividad().descripcion,
                    fechaInicio: this.actividad().fechaInicio,
                    fechaTermino: this.actividad().fechaTermino,
                    ubicacion: this.actividad().ubicacion
                };

                if (result.isValid) {
                    this.popUpCrearUsuario(true);
                }
                else {
                    App.alertaFormulario(ActividadValidacion);
                }
            }
        };

        // BOTONES CANCELAR
        public botonCancelar = {
            text: 'Cancelar',
            icon: 'close',
            type: 'danger',
            onClick: (e: any): void => {
                this.popUpCancelarCreacionUsuario(true);
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
        public dxNombre = {
            width: 'auto',
            editorOptions: {
                mode: 'text'
            },
            showClearButton: true,
            onValueChanged: (e: any) => {
                this.actividad().nombre = e.value;
            }
        }
        public dxDescripcion = {
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
            min: new Date(1900, 1, 1),
            width: 'auto',
            type: "datetime",
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
            min: new Date(1900, 1, 1),
            width: 'auto',
            type: "datetime",
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
            value: null,
            validationRules: [{
                type: 'required',
                message: 'Seleccione región'
            }],
            onValueChanged: (e: any) => {
                this.actividad().ubicacion = e.value;
            }
        }        
        
        public loading: KnockoutObservable<boolean> = ko.observable(false);
        constructor() {

        }
    }
}
