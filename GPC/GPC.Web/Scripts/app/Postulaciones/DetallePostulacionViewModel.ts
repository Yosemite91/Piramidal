/// <reference path='../../typings/jquery/jquery.d.ts' />
/// <reference path='../../typings/knockout/knockout.d.ts' />
/// <reference path='../../typings/devextreme/devextreme.d.ts' />
/// <reference path="ipostulantemodel.d.ts" />

namespace Postulaciones {

    export class DetallePostulacionViewModel {
        public usuario: KnockoutObservable<IPostulanteModel> = ko.observable<IPostulanteModel>({
            id: null,
            email: null,
            run: null,
            curriculum: null,
            ubicacion: null,
            asociado: null,
            esActivo: false,
            fechaPostulacion: null
        });

        //Buttons
        public botonBloquear = {
            text: 'Rechazar',
            type: 'danger',
            icon: 'close',
            onClick: function (e: any) {
                var run = this.usuario().run;

                $.ajax({
                    url: App.apiRoot + 'postulaciones/' + run,
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                }).then(
                    function (data) {
                        DevExpress.ui.notify('Postulación Rechazada', 'success', 3000);
                    },
                    function (xhr, textStatus, err) {
                        alert(err);
                    }
                    ).done(function () {
                        window.location.assign(App.appRoot + 'Postulacion/ListaPostulaciones');
                    });
            }
        };
        public botonDesbloquear = {
            text: 'Aceptar',
            icon: 'check',
            type: 'success',
            onClick: (e: any): void => {
                DevExpress.ui.notify('Postulante Aceptado', 'success', 3000);
                window.location.assign(App.appRoot + 'Usuario/CrearUsuario');
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
                lg: 1,
                md: 1,
                sm: 1,
                xs: 1
            },
            items: [
                <DevExpress.ui.dxFormGroupItem>{
                    itemType: 'group',
                    caption: 'Información Postulante',
                    items: ['run', 'email', 'ubicacion', 'asociado', 'fechaPostulacion', 'esActivo']
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
            $.getJSON(App.apiRoot + 'postulaciones/get/' + run).then((result: IPostulanteModel): void => {
                this.usuario(result);
                this.MakePhoto(result.curriculum);

                $('#usuario-form').dxForm('instance').repaint();
                this.loading(false);
            });

        }
    }


}