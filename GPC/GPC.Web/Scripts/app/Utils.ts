namespace Utils {
    'use strict';
    export var formatDate: (d: string) => string = (dateStr: string): string => {
        let date: Date;
        if (dateStr === null || dateStr === '0001-01-01T00:00:00.000-03:00' || dateStr === '1900-01-01T00:00:00.000') {
            return null;
        }
        if (typeof dateStr === 'string') {
            date = new Date(dateStr);
        }
        let dd: number = date.getDate();
        let ddStr: string = dd.toString();
        let mm: number = date.getMonth() + 1; // January is 0!
        let mmStr: string = mm.toString();
        let yyyy: number = date.getFullYear();
        if (dd < 10) {
            ddStr = '0' + dd;
        }
        if (mm < 10) {
            mmStr = '0' + mm;
        }
        return ddStr + '-' + mmStr + '-' + yyyy;
    };

    export var formatDateTime: (da: string) => string = (dateStr: string): string => {
        let date: Date;
        if (dateStr === null || dateStr === '0001-01-01T00:00:00.000-03:00' || dateStr === '1900-01-01T00:00:00.000') {
            return null;
        }
        if (typeof dateStr === 'string') {
            date = new Date(dateStr);
        } else {
            date = new Date(dateStr);
        }
        let yyyy: string = date.getFullYear().toString();
        let mm: string = (date.getMonth() + 1).toString(); // getMonth() is zero-based
        let dd: string = date.getDate().toString();
        let HH: string = date.getHours().toString();
        let min: string = date.getMinutes().toString();
        let seg: string = date.getSeconds().toString();
        return yyyy + '-' + (mm[1] ? mm : '0' + mm[0]) + '-' +
            (dd[1] ? dd : '0' + dd[0]) + ' ' + (HH[1] ? HH : '0' + HH[0]) +
            ':' + (min[1] ? min : '0' + min[0]) +
            ':' + (seg[1] ? seg : '0' + seg[0]); // padding
    };

    export var getErrores: (m: string, j: JQueryXHR, ts: string, et: string) => any =
        (mensaje: string, jqXHR: JQueryXHR, textStatus: string, errorThrow: string): any => {
        let err: any,
            formatMensaje: string = (mensaje !== '' ? mensaje : null);
        if (formatMensaje === null) {
            err = jqXHR.responseText;
            try {
                /* tslint:disable */
                err = eval('(' + jqXHR.responseText + ')');
                /* tslint:enable */
                err = $.isPlainObject(err) ? err.message : err;
            }catch (ex) {
                err = jqXHR.responseText;
            }
            return DevExpress.ui.notify(err, 'error', 3000);
        } else {
            err = mensaje;
            return DevExpress.ui.notify(err, 'error', 3000);
        }
        };

}