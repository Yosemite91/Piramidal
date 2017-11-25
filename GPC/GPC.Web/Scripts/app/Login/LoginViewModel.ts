/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../app.ts" />
/// <reference path="LoginModel.d.ts" />

namespace Login {

    export class LoginViewModel {
        public login: KnockoutObservable<ILoginModel> = ko.observable<ILoginModel>({
            run: null, contrasena: null, id: null
        });

        public loading: KnockoutObservable<boolean> = ko.observable(false);

        //ACEPTAR
        public aceptar: () => void = (): void => {
            this.loading(true);
            let formData: any = this.getFormData();
            this.aceptarLogin(formData);
        };

        //OBTENIENDO DATOS FORMULARIO
        public getFormData: () => ILoginModel = (): ILoginModel => {
            return $('#formularioLogin').dxForm('option', 'formData');
        };

        //ACEPTAR LOGIN
        public aceptarLogin: (fda: any) => void = (formData: any): void => {
            $.ajax({
                url: App.apiRoot + 'login',
                type: 'POST',
                data: {
                    Run: formData.run,
                    Contrasena: formData.contrasena
                },
                success: (result: any): void => {
                    if (result) {
                        localStorage.setItem(App.appPrefix + 'login.token', result.token);
                        localStorage.setItem(App.appPrefix + 'login.run', result.run);
                        localStorage.setItem(App.appPrefix + 'login.esAdministrador', result.esAdministrador);
                        localStorage.setItem(App.appPrefix + 'login.esColaborador', result.esColaborador);

                        if (result) {
                            let url: string = App.appRoot + 'Usuario/MiPerfil';                            
                            window.location.href = url;
                        }
                    }
                },
                error: (jqXHR: any, textStatus: any, errorThrown: any): void => {
                    this.loading(false);
                    Utils.getErrores(jqXHR, textStatus, errorThrown, "errorLogin");
                }
            });
        };

        // Información y estructura de formulario
        public form: DevExpress.ui.dxFormOptions = {
            formData: this.login,
            items: [<DevExpress.ui.dxFormGroupItem>{
                itemType: "group",
                items: [
                    <DevExpress.ui.dxFormSimpleItem>{
                        dataField: 'run',
                        editorType: 'dxTextBox',
                        helpText: 'ej: 12345678-9',
                        validationRules: [{
                            type: 'required',
                            message: 'Campo requerido.'
                        },
                            {
                                type: "pattern",
                                pattern: /(\d{2}\d{3}\d{3}-)([kK]{1}$|\d{1})$/,
                                message: 'Formato inválido'
                            }]
                    },
                    <DevExpress.ui.dxFormSimpleItem>{
                        dataField: 'contrasena',
                        label: { text: 'Contraseña' },
                        editorType: 'dxTextBox',
                        editorOptions: {
                            mode: 'password',
                            value: ko.observable("")
                        },
                        validationRules: [{
                            type: 'required',
                            message: 'Campo requerido.'
                        }],
                        onValueChanged: (e: any) => {
                            this.login().contrasena = e.value;
                        }
                    },
                    <DevExpress.ui.dxButtonOptions>{
                        editorType: 'dxButton',
                        editorOptions: {
                            text: 'Ingresar',
                            icon: 'key',
                            type: 'default',
                            width: '100%',
                            onClick: (e: any): void => {
                                var UsuarioValidacion = {
                                    Run: this.login().run,
                                    Password: this.login().contrasena
                                };

                                if (App.alertaFormulario(UsuarioValidacion) !== false) {
                                    this.aceptar();
                                }
                            }
                        }
                    }
                ]
            }]
        };
    }
}
