/// <reference path='../../typings/jquery/jquery.d.ts' />
/// <reference path='../../typings/knockout/knockout.d.ts' />
/// <reference path='../../typings/devextreme/devextreme.d.ts' />
/// <reference path='IPublicacionModel.d.ts' />

namespace Publicaciones {
    export class ListarPublicacionesViewModel {
        public noticias: KnockoutObservable<any> = ko.observable<any>();

        //Buttons
        public applyButtonOptionsCrear = {
            text: 'Crear Publicación',
            icon: 'plus',
            type: 'success',
            onClick: function (e: any) {
                let url: string = App.appRoot + 'Publicacion/CrearPublicacion';
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
            dataSource: this.noticias,
            onRowClick: (e: DevExpress.ui.dxDataGridRow) => {
                const data: IPublicacionModel = <IPublicacionModel>e.data;
                let url: string = App.appRoot + 'Publicacion/DetallePublicacion';
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
            columns: [
                { dataField: 'titulo', width: 120 },
                'descripcion'
            ]
        };

        public loading: KnockoutObservable<boolean> = ko.observable(false);

        constructor() {
            this.loading(true);
            //Cargar Eventos
            $.getJSON(App.apiRoot + 'publicaciones/get-publicaciones/').then((result: IPublicacionModel[]): void => {
                this.noticias(result);
                this.loading(false);
            });
        }
    }
}