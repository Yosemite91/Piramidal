/// <reference path='../../typings/jquery/jquery.d.ts' />
/// <reference path='../../typings/knockout/knockout.d.ts' />
/// <reference path='../../typings/devextreme/devextreme.d.ts' />
/// <reference path='IUsuarioModel.d.ts' />

namespace Usuarios {

    export class DetalleUsuarioViewModel {
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

        //Buttons
        public applyButtonOptionsModificar = {
            text: 'Modificar',
            icon: 'edit',
            type: 'default',
            onClick: function (e: any) {
                var run = this.usuario().run;
                window.location.assign(App.appRoot + 'Usuario/EditarUsuario?run=' + run);
            }
        };
        public botonBloquear = {
            text: 'Bloquear',
            type: 'danger',
            icon: 'close',
            onClick: function (e: any) {
                var UsuarioDTO = {
                    run: this.usuario().run,
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
        public botonDesbloquear = {
            text: 'Desbloquear',
            icon: 'check',
            type: 'success',
            onClick: (e: any): void => {
                var UsuarioDTO = {
                    run: this.usuario().run,
                };
                var info = JSON.stringify(UsuarioDTO);
                $.ajax({
                    url: App.apiRoot + 'usuarios/desbloquear/',
                    cache: false,
                    type: 'PUT',
                    contentType: 'application/json; charset=utf-8',
                    data: info,
                    dataType: 'json'
                }).then(
                    function (data) {
                        DevExpress.ui.notify('Usuario Desbloqueado', 'success', 3000);
                        window.location.assign(App.appRoot + 'Usuario/ListaUsuarios');
                    },
                    function (xhr, textStatus, err) {
                        alert(err);
                    });
            }
        };

        //Notificaciones
        public applyButtonOptionsRestaurarPass = {
            text: 'Restablecer Contraseña',
            icon: 'refresh',
            type: 'success',
            onClick: function (e: any): void {
                var UsuarioDTO = {
                    run: this.usuario().run,
                };
                var info = JSON.stringify(UsuarioDTO);
                $.ajax({
                    url: App.apiRoot + 'usuarios/restablecer-contrasena/',
                    cache: false,
                    type: 'PUT',
                    contentType: 'application/json; charset=utf-8',
                    data: info,
                    dataType: 'json'
                }).then(
                    function (data) {
                        DevExpress.ui.notify('Contraseña Restablecida', 'success', 3000);
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
            formData: this.usuario,
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
                    caption: 'Información Personal',
                    items: ['nombre', 'apellido', 'run', 'telefono',
                        <DevExpress.ui.dxFormSimpleItem>{
                            dataField: 'fechaNacimiento',
                            editorType: 'dxDateBox',
                            editorOptions: {
                                displayFormat: 'dd/MM/yyyy',
                                width: 'auto'
                            }
                        }, 'email', <DevExpress.ui.dxFormSimpleItem>{
                            dataField: 'ubicacionStr',
                            label: { text: 'Ubicación' }
                        }, <DevExpress.ui.dxFormSimpleItem>{
                            dataField: 'asociadoStr',
                            label: { text: 'Asociado' }
                        }
                    ]
                },
                <DevExpress.ui.dxFormGroupItem>{
                    itemType: 'group',
                    caption: 'Información de Sistema',
                    items: [
                        <DevExpress.ui.dxFormSimpleItem>{
                            dataField: 'esActivo',
                            editorType: 'dxSwitch',
                            editorOptions: {
                                onText: 'SI',
                                offText: 'NO'
                            }
                        },
                        <DevExpress.ui.dxFormSimpleItem>{
                            dataField: 'esAdministrador',
                            editorType: 'dxSwitch',
                            editorOptions: {
                                onText: 'SI',
                                offText: 'NO'
                            }
                        },
                        <DevExpress.ui.dxFormSimpleItem>{
                            dataField: 'esColaborador',
                            editorType: 'dxSwitch',
                            editorOptions: {
                                onText: 'SI',
                                offText: 'NO'
                            }
                        }]
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
            const run: string = window.location.search.replace('?run=', '');

            this.loading(true);
            $.getJSON(App.apiRoot + 'usuarios/get/' + run).then((result: IUsuarioModel): void => {
                this.usuario(result);
                this.MakePhoto(result.foto);

                if (result.esActivo) {
                    $('#bloquear-button').dxButton({ disabled: false });
                    $('#desbloquear-button').dxButton({ disabled: true });
                }
                else {
                    $('#bloquear-button').dxButton({ disabled: true });
                    $('#desbloquear-button').dxButton({ disabled: false });
                }              
                $('#usuario-form').dxForm('instance').repaint();
                this.loading(false);
            });

        }
    }


}