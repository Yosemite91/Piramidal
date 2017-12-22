/// <reference path='../../typings/jquery/jquery.d.ts' />
/// <reference path='../../typings/knockout/knockout.d.ts' />
/// <reference path='../../typings/devextreme/devextreme.d.ts' />
/// <reference path='IUsuarioModel.d.ts' />
var Usuarios;
(function (Usuarios) {
    var CrearUsuarioViewModel = (function () {
        function CrearUsuarioViewModel() {
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
                ubicacionStr: null,
                esActivo: false,
                esAdministrador: false,
                esColaborador: false,
                asociado: null,
                asociadoStr: null,
                anioIngreso: null
            });
            //PopUp
            this.popUpCancelarCreacionUsuario = ko.observable(false);
            this.popUpCrearUsuario = ko.observable(false);
            // POP-UP CANCELAR
            this.popUpCancelar = {
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
                        onClick: function (e) {
                            window.history.back();
                        }
                    }
                ]
            };
            // POP-UP CREAR
            this.popUpCrear = {
                width: 'auto',
                height: 'auto',
                contentTemplate: '¿Quiere crear este nuevo usuario?',
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
                        onClick: function (e) {
                            _this.loading(true);
                            if (_this.FotoUsuario() === undefined) {
                                var foto = {
                                    cuerpo: "data:image/jpeg;base64,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",
                                    usuarioID: null,
                                    nombre: "nombre",
                                    id: null
                                };
                                _this.FotoUsuario(foto);
                            }
                            //Volcando información de formulario
                            var UsuarioDTO = {
                                nombre: _this.usuario().nombre,
                                apellido: _this.usuario().apellido,
                                email: _this.usuario().email,
                                telefono: _this.usuario().telefono,
                                run: _this.usuario().run,
                                password: _this.usuario().password,
                                fechaNacimiento: _this.usuario().fechaNacimiento,
                                ubicacion: _this.usuario().ubicacion,
                                esAdministrador: _this.usuario().esAdministrador,
                                esColaborador: _this.usuario().esColaborador,
                                asociado: _this.usuario().asociado,
                                foto: _this.FotoUsuario().cuerpo
                            };
                            var info = JSON.stringify(UsuarioDTO);
                            $.ajax({
                                url: App.apiRoot + 'usuarios/crear',
                                cache: false,
                                type: 'POST',
                                contentType: 'application/json; charset=utf-8',
                                data: info,
                                dataType: 'json'
                            }).then(function (data) {
                                DevExpress.ui.notify('USUARIO CREADO', 'success', 3000);
                                window.location.assign(App.appRoot + 'Usuario/ListaUsuarios');
                            }, function (xhr, textStatus, err) {
                                this.loading(false);
                                alert(err);
                            });
                        }
                    }]
            };
            // BOTONES GUARDAR
            this.botonGuardar = {
                text: 'Guardar',
                icon: 'floppy',
                type: 'success',
                onClick: function (e) {
                    var result = e.validationGroup.validate();
                    var UsuarioValidacion = {
                        Nombre: _this.usuario().nombre,
                        Apellido: _this.usuario().apellido,
                        Run: _this.usuario().run,
                        Email: _this.usuario().email,
                        Telefono: _this.usuario().telefono,
                        Ubicacion: _this.usuario().ubicacion,
                        Asociado: _this.usuario().asociado
                    };
                    if (result.isValid) {
                        _this.popUpCrearUsuario(true);
                    }
                    else {
                        App.alertaFormulario(UsuarioValidacion);
                    }
                }
            };
            // BOTONES CANCELAR
            this.botonCancelar = {
                text: 'Cancelar',
                icon: 'close',
                type: 'danger',
                onClick: function (e) {
                    _this.popUpCancelarCreacionUsuario(true);
                }
            };
            // VALIDADOR DE DATOS
            this.validatorOptions = {
                validationRules: [{
                        type: 'required',
                        message: 'Campo requerido'
                    }]
            };
            this.emailValidatorOptions = {
                validationRules: [{
                        type: "pattern",
                        pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                        message: 'Formato inválido'
                    }, {
                        type: 'required',
                        message: 'Campo requerido'
                    }]
            };
            this.telefonoValidatorOptions = {
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
            this.dxNombre = {
                width: 'auto',
                editorOptions: {
                    mode: 'text'
                },
                showClearButton: true,
                onValueChanged: function (e) {
                    _this.usuario().nombre = e.value;
                }
            };
            this.dxApellido = {
                width: 'auto',
                editorOptions: {
                    mode: 'text'
                },
                validationRules: [{
                        type: 'required',
                        message: 'Campo requerido'
                    }],
                showClearButton: true,
                onValueChanged: function (e) {
                    _this.usuario().apellido = e.value;
                }
            };
            this.dxEmail = {
                width: 'auto',
                placeholder: 'ejemplo@uta.cl',
                showClearButton: true,
                onValueChanged: function (e) {
                    _this.usuario().email = e.value;
                }
            };
            this.dxTelefono = {
                width: 'auto',
                placeholder: '+56 9 1234 5678',
                editorOptions: {
                    mode: 'tel'
                },
                showClearButton: true,
                onValueChanged: function (e) {
                    _this.usuario().telefono = e.value;
                }
            };
            this.dxRun = {
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
                onValueChanged: function (e) {
                    _this.usuario().run = e.value;
                }
            };
            this.dxFechaNacimiento = {
                max: new Date(App.anioMinimo(), 0),
                min: new Date((App.anioMinimo() - 70), 0),
                width: 'auto',
                editorOptions: {
                    format: 'dd/MM/yyyy',
                    width: 'auto',
                    adaptivityEnabled: true,
                    dateOutOfRangeMessage: 'Valor fuera de rango'
                },
                showClearButton: true,
                onValueChanged: function (e) {
                    _this.usuario().fechaNacimiento = new Date(e.value);
                }
            };
            this.dxUbicacion = {
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
                onValueChanged: function (e) {
                    _this.usuario().ubicacion = e.value;
                }
            };
            this.dxAsociado = {
                dataSource: [
                    { empresa: "ParfumdeParfum", numero: 0 },
                    { empresa: "JMOceanAvenue", numero: 1 }
                ],
                valueExpr: "numero",
                displayExpr: "empresa",
                placeholder: "Seleccione empresa",
                value: null,
                validationRules: [{
                        type: 'required',
                        message: 'Seleccione empresa'
                    }],
                onValueChanged: function (e) {
                    _this.usuario().asociado = e.value;
                }
            };
            this.dxEsAdministrador = {
                value: false,
                onText: 'SI',
                offText: 'NO',
                onValueChanged: function (e) {
                    _this.usuario().esAdministrador = e.value;
                }
            };
            this.dxEsColaborador = {
                value: false,
                onText: 'SI',
                offText: 'NO',
                onValueChanged: function (e) {
                    _this.usuario().esColaborador = e.value;
                }
            };
            this.dxSubirImagen = {
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
                onValueChanged: function (e) {
                    var createLoadHandler = function (nombre) {
                        return function (event) {
                            var foto = {
                                cuerpo: event.target.result,
                                usuarioID: null,
                                nombre: nombre,
                                id: null
                            };
                            _this.FotoUsuario(foto);
                        };
                    };
                    var frb = new FileReader();
                    frb.onload = createLoadHandler(e.value[0].name);
                    frb.readAsDataURL(e.value[0]);
                }
            };
            this.FotoUsuario = ko.observable();
            this.loading = ko.observable(false);
        }
        return CrearUsuarioViewModel;
    }());
    Usuarios.CrearUsuarioViewModel = CrearUsuarioViewModel;
})(Usuarios || (Usuarios = {}));
