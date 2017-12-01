/// <reference path='../../typings/jquery/jquery.d.ts' />
/// <reference path='../../typings/knockout/knockout.d.ts' />
/// <reference path='../../typings/devextreme/devextreme.d.ts' />
/// <reference path="ipostulantemodel.d.ts" />

namespace Postulaciones {
    export class ListaPostulacionesViewModel {

        public usuarios: KnockoutObservable<any> = ko.observable<any>();

        //Buttons
        public goBack = {
            icon: 'back',
            type: 'normal',
            onClick: (e: any): void => {
                window.history.back();
            }
        };

        //Formulario
        public grid: DevExpress.ui.dxDataGridOptions = {
            dataSource: this.usuarios,
            onRowClick: (e: DevExpress.ui.dxDataGridRow) => {
                const data: IPostulanteModel = <IPostulanteModel>e.data;
                let url: string = App.appRoot + 'Postulacion/DetallePostulacion';
                if (data.run != undefined) {
                    url = url + '?run=' + data.run;
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
                'email',
                'fechaPostulacion',
                { dataField: 'esActivo', caption: '¿Activo?', width: 80 }
            ]
        };

        public loading: KnockoutObservable<boolean> = ko.observable(false);

        constructor() {
            this.loading(true);
            //Cargar Postulaciones
            $.getJSON(App.apiRoot + 'postulaciones/get-postulaciones/').then((result: IPostulanteModel[]): void => {
                this.usuarios(result);
                this.loading(false);
            });
        }
    }
}
