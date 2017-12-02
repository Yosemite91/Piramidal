/// <reference path='../../typings/jquery/jquery.d.ts' />
/// <reference path='../../typings/knockout/knockout.d.ts' />
/// <reference path='../../typings/devextreme/devextreme.d.ts' />
/// <reference path='IActividadModel.d.ts' />

namespace Actividades {

    export class DetalleActividadViewModel {
        public actividad: KnockoutObservable<IActividadModel> = ko.observable<IActividadModel>({
            id: null,
            nombre: null,
            descripcion: null,
            fechaInicio: null,
            fechaTermino: null,
            ubicacion: null
        });

        //Buttons
        public applyButtonOptionsModificar = {
            text: 'Modificar',
            icon: 'edit',
            type: 'default',
            onClick: function (e: any) {
                var id = this.actividad().id;
                window.location.assign(App.appRoot + 'Actividad/EditarActividad?id=' + id);
            }
        };

        public botonBloquear = {
            text: 'Bloquear',
            type: 'danger',
            icon: 'close',
            onClick: function (e: any) {
                var UsuarioDTO = {
                    //run: this.usuario().run
                };
                var info = JSON.stringify(UsuarioDTO);
                $.ajax({
                    url: App.apiRoot + 'usuarios/bloquear/',
                    cache: false,
                    type: 'PUT',
                    contentType: 'application/json; charset=utf-8',
                    data: info,
                    dataType: 'json'
                }).then(
                    function (data) {
                        DevExpress.ui.notify('Usuario Bloqueado', 'success', 3000);
                        window.location.assign(App.appRoot + 'Usuario/ListaUsuarios');
                    },
                    function (xhr, textStatus, err) {
                        alert(err);
                    });
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
            formData: this.actividad,
            readOnly: true,
            colCount: 'auto',
            colCountByScreen: {
                lg: 2,
                md: 2,
                sm: 1,
                xs: 1
            },
            items: [
                <DevExpress.ui.dxFormGroupItem>{
                    itemType: 'group',
                    caption: 'Información de Actividad',
                    items: ['nombre', 
                        <DevExpress.ui.dxFormSimpleItem>{
                            dataField: 'fechaInicio',
                            editorType: 'dxDateBox',
                            editorOptions: {
                                displayFormat: "dd/MM/yyyy",
                                width: 'auto'
                            }
                           
                        }, <DevExpress.ui.dxFormSimpleItem>{
                            dataField: 'fechaInicio',
                            label: { text: 'Hora Inicio' },
                            editorType: 'dxDateBox',
                            editorOptions: {
                                type: 'time',
                                width: 'auto'
                            }

                        }
                        , <DevExpress.ui.dxFormSimpleItem>{
                            dataField: 'fechaTermino',
                            editorType: 'dxDateBox',
                            editorOptions: {
                                displayFormat: "dd/MM/yyyy",
                                width: 'auto'
                            }
                        },
                        <DevExpress.ui.dxFormSimpleItem>{
                            dataField: 'fechaTermino',
                            label: { text: 'Hora Término' },
                            editorType: 'dxDateBox',
                            editorOptions: {
                                type: 'time',
                                width: 'auto'
                            }
                        },'descripcion'
                    ]
                }
            ]
        };

        public loading: KnockoutObservable<boolean> = ko.observable(false);
        constructor() {
            this.actividad().id = parseInt(window.location.search.replace('?id=', ''));

            this.loading(true);
            $.getJSON(App.apiRoot + 'actividades/detalle/' + this.actividad().id).then((result: IActividadModel): void => {
                this.actividad(result);
                $('#actividad-form').dxForm('instance').repaint();
                this.loading(false);
            });

        }
    }
}