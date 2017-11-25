/// <reference path='../../typings/jquery/jquery.d.ts' />
/// <reference path='../../typings/knockout/knockout.d.ts' />
/// <reference path='../../typings/devextreme/devextreme.d.ts' />
/// <reference path='IActividadModel.d.ts' />

namespace Actividades {

    export class ListaActividadesViewModel {

        public actividades: KnockoutObservable<any> = ko.observable<any>();

        //Buttons
        public applyButtonOptionsCrear = {
            text: 'Crear Actividad',
            icon: 'plus',
            type: 'success',
            onClick: function (e: any) {
                let url: string = App.appRoot + 'Usuario/CrearUsuario';
                window.location.assign(url);
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
        public grid: DevExpress.ui.dxDataGridOptions = {
            dataSource: this.actividades,
            onRowClick: (e: DevExpress.ui.dxDataGridRow) => {
                const data: IActividadModel = <IActividadModel>e.data;
                let url: string = App.appRoot + 'Actividad/DetalleActividad';
                if (data.id != undefined) {
                    url = url + '?id=' + data.id;
                }
                window.location.assign(url);
            },
            searchPanel: {
                visible: true,
                width: 240,
                placeholder: 'Buscar...'
            },
            showRowLines: true,
            rowAlternationEnabled: true,
            showBorders: true,
            columnHidingEnabled: false,
            paging: {
                pageSize: 9
            },
            loadPanel: true,
            columns: [
                'nombre',
                'descripcion'                
            ]
        };

        public loading: KnockoutObservable<boolean> = ko.observable(false);

        constructor() {
            this.loading(true);
            //Cargar Usuarios
            $.getJSON(App.apiRoot + 'actividades/lista/').then((result: IActividadModel[]): void => {
                this.actividades(result);
                this.loading(false);
            });
        }
    }
}
