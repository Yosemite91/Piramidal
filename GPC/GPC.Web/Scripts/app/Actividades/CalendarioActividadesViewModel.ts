/// <reference path='../../typings/jquery/jquery.d.ts' />
/// <reference path='../../typings/knockout/knockout.d.ts' />
/// <reference path='../../typings/devextreme/devextreme.d.ts' />
/// <reference path='IActividadModel.d.ts' />

namespace Actividades {

    export class CalendarioActividadesViewModel {
        public actividad: KnockoutObservable<IActividadModel> = ko.observable<IActividadModel>({
            id: null,
            nombre: null,
            descripcion: null,
            fechaInicio: null,
            fechaTermino: null,
            ubicacion: null
        });

        //Buttons
        public goBack = {
            icon: 'back',
            type: 'normal',
            onClick: (e: any): void => {
                window.history.back();
            }
        };

        public calendario = <DevExpress.ui.dxSchedulerOptions>{
            dataSource: this.actividad(),
            currentView: "month",
            currentDate: new Date(),
            crossScrollingEnabled: false,
            endDayHour: 24,
            startDayHour: 7,
            firstDayOfWeek: 1,
            editing: {
                allowAdding: false,
                allowDeleting: false,
                allowUpdating: false,
                allowDragging: false,
                allowResizing: false
            }
        }

        public loading: KnockoutObservable<boolean> = ko.observable(false);
        constructor() {
            this.actividad().id = parseInt(window.location.search.replace('?id=', ''));

            this.loading(true);
            $.getJSON(App.apiRoot + 'actividades/lista/' + this.actividad().id).then((result: IActividadModel): void => {
                this.actividad(result);
                $('#scheduler-demo').dxForm('instance').repaint();
                this.loading(false);
            });

        }
    }
}