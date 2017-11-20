/// <reference path='../../typings/jquery/jquery.d.ts' />
/// <reference path='../../typings/knockout/knockout.d.ts' />
/// <reference path='../../typings/devextreme/devextreme.d.ts' />
/// <reference path='IUsuarioModel.d.ts' />
var Usuarios;
(function (Usuarios) {
    var DetalleUsuarioViewModel = (function () {
        function DetalleUsuarioViewModel() {
            var _this = this;
            this.usuario = ko.observable({
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
                esActivo: false,
                esAdministrador: false,
                esColaborador: false,
                asociado: null,
                anioIngreso: null
            });
            //PopUp
            //Buttons
            this.applyButtonOptionsModificar = {
                text: 'Modificar',
                icon: 'edit',
                type: 'default',
                onClick: function (e) {
                    var run = this.usuario().run;
                    window.location.assign(App.appRoot + 'Usuarios/EditarUsuario?run=' + run);
                }
            };
            this.botonBloquear = {
                text: 'Bloquear',
                type: 'danger',
                icon: 'close',
                onClick: function (e) {
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
                    }).then(function (data) {
                        DevExpress.ui.notify('Usuario Bloqueado', 'success', 3000);
                        window.location.assign(App.appRoot + 'Usuarios/ListaUsuarios');
                    }, function (xhr, textStatus, err) {
                        alert(err);
                    });
                }
            };
            this.botonDesbloquear = {
                text: 'Desbloquear',
                icon: 'check',
                type: 'success',
                onClick: function (e) {
                    var UsuarioDTO = {
                        run: _this.usuario().run,
                    };
                    var info = JSON.stringify(UsuarioDTO);
                    $.ajax({
                        url: App.apiRoot + 'usuarios/desbloquear/',
                        cache: false,
                        type: 'PUT',
                        contentType: 'application/json; charset=utf-8',
                        data: info,
                        dataType: 'json'
                    }).then(function (data) {
                        DevExpress.ui.notify('Usuario Desbloqueado', 'success', 3000);
                        window.location.assign(App.appRoot + 'Usuarios/ListaUsuarios');
                    }, function (xhr, textStatus, err) {
                        alert(err);
                    });
                }
            };
            //Notificaciones
            this.applyButtonOptionsRestaurarPass = {
                text: 'Restablecer Contraseña',
                icon: 'refresh',
                type: 'success',
                onClick: function (e) {
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
                    }).then(function (data) {
                        DevExpress.ui.notify('Contraseña Restablecida', 'success', 3000);
                        window.location.assign(App.appRoot + 'Usuarios/ListaUsuarios');
                    }, function (xhr, textStatus, err) {
                        alert(err);
                    });
                }
            };
            this.goBack = {
                icon: 'back',
                type: 'normal',
                onClick: function (e) {
                    window.history.back();
                }
            };
            //Formulario
            this.form = {
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
                    {
                        itemType: 'group',
                        caption: 'Información Personal',
                        items: ['nombre', 'apellido', 'run', 'telefono',
                            {
                                dataField: 'fechaNacimiento',
                                editorType: 'dxDateBox',
                                editorOptions: {
                                    displayFormat: 'dd/MM/yyyy',
                                    width: 'auto'
                                }
                            }, 'email'
                        ]
                    },
                    {
                        itemType: 'group',
                        caption: 'Información de Sistema',
                        items: [
                            {
                                dataField: 'esActivo',
                                editorType: 'dxSwitch',
                                editorOptions: {
                                    onText: 'SI',
                                    offText: 'NO'
                                }
                            },
                            {
                                dataField: 'esAdministrador',
                                editorType: 'dxSwitch',
                                editorOptions: {
                                    onText: 'SI',
                                    offText: 'NO'
                                }
                            },
                            {
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
            this.fotoPerfil = ko.observable();
            this.MakePhoto = function (cuerpo) {
                var foto = {
                    id: null,
                    cuerpo: cuerpo,
                    nombre: null,
                    usuarioID: null
                };
                _this.fotoPerfil(foto);
            };
            this.loading = ko.observable(false);
            var run = window.location.search.replace('?run=', '');
            this.loading(true);
            $.getJSON(App.apiRoot + 'usuarios/get/' + run).then(function (result) {
                _this.usuario(result);
                _this.MakePhoto(result.foto);
                if (result.esActivo) {
                    $('#bloquear-button').dxButton({ disabled: false });
                    $('#desbloquear-button').dxButton({ disabled: true });
                }
                else {
                    $('#bloquear-button').dxButton({ disabled: true });
                    $('#desbloquear-button').dxButton({ disabled: false });
                }
                $('#usuario-form').dxForm('instance').repaint();
                _this.loading(false);
            });
        }
        return DetalleUsuarioViewModel;
    }());
    Usuarios.DetalleUsuarioViewModel = DetalleUsuarioViewModel;
})(Usuarios || (Usuarios = {}));
//# sourceMappingURL=DetalleUsuarioViewModel.js.map