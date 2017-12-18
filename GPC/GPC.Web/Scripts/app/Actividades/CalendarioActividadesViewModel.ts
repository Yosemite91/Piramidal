/// <reference path='../../typings/jquery/jquery.d.ts' />
/// <reference path='../../typings/knockout/knockout.d.ts' />
/// <reference path='../../typings/devextreme/devextreme.d.ts' />
/// <reference path='IActividadModel.d.ts' />

namespace Actividades {

    export class CalendarioActividadesViewModel {
        public actividad: KnockoutObservable<any> = ko.observable<any>();
        public actividad2: KnockoutObservableArray<IActividadModel> = ko.observableArray<IActividadModel>();

        public goBack = {
            icon: 'back',
            type: 'normal',
            onClick: (e: any): void => {
                window.history.back();
            }
        };

        public calendario = <any>{
            dataSource: this.actividad2,
            views: [
                { name: "Día", type: "day" },
                { name: "Semana", type: "week" },
                { name: "Mes", type: "month" }
            ],
            currentView: "month",
            currentDate: new Date(),
            crossScrollingEnabled: false,
            endDayHour: 24,
            startDayHour: 1,
            firstDayOfWeek: 1,
            showAllDayPanel: false,
            editing: {
                allowAdding: false,
                allowDeleting: false,
                allowUpdating: false,
                allowDragging: false,
                allowResizing: false
            }
        }

        public loading: KnockoutObservable<boolean> = ko.observable(false);
        public editar: KnockoutObservable<any> = ko.observable(true);

        constructor() {

            this.loading(true);
            $.getJSON(App.apiRoot + 'actividades/calendario/').then((result: IActividadModel[]): void => {
                this.actividad2(result);
                this.calendario.dataSource = result;
                //$('#scheduler-demo').dxScheduler('instance').repaint;
                this.loading(false);
            });
        }
    }
}