var Utils;
(function (Utils) {
    'use strict';
    Utils.formatDate = function (dateStr) {
        var date;
        if (dateStr === null || dateStr === '0001-01-01T00:00:00.000-03:00' || dateStr === '1900-01-01T00:00:00.000') {
            return null;
        }
        if (typeof dateStr === 'string') {
            date = new Date(dateStr);
        }
        var dd = date.getDate();
        var ddStr = dd.toString();
        var mm = date.getMonth() + 1; // January is 0!
        var mmStr = mm.toString();
        var yyyy = date.getFullYear();
        if (dd < 10) {
            ddStr = '0' + dd;
        }
        if (mm < 10) {
            mmStr = '0' + mm;
        }
        return ddStr + '-' + mmStr + '-' + yyyy;
    };
    Utils.formatDateTime = function (dateStr) {
        var date;
        if (dateStr === null || dateStr === '0001-01-01T00:00:00.000-03:00' || dateStr === '1900-01-01T00:00:00.000') {
            return null;
        }
        if (typeof dateStr === 'string') {
            date = new Date(dateStr);
        }
        else {
            date = new Date(dateStr);
        }
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
        var dd = date.getDate().toString();
        var HH = date.getHours().toString();
        var min = date.getMinutes().toString();
        var seg = date.getSeconds().toString();
        return yyyy + '-' + (mm[1] ? mm : '0' + mm[0]) + '-' +
            (dd[1] ? dd : '0' + dd[0]) + ' ' + (HH[1] ? HH : '0' + HH[0]) +
            ':' + (min[1] ? min : '0' + min[0]) +
            ':' + (seg[1] ? seg : '0' + seg[0]); // padding
    };
    Utils.getErrores = function (mensaje, jqXHR, textStatus, errorThrow) {
        var err, formatMensaje = (mensaje !== '' ? mensaje : null);
        if (formatMensaje === null) {
            err = jqXHR.responseText;
            try {
                /* tslint:disable */
                err = eval('(' + jqXHR.responseText + ')');
                /* tslint:enable */
                err = $.isPlainObject(err) ? err.message : err;
            }
            catch (ex) {
                err = jqXHR.responseText;
            }
            return DevExpress.ui.notify(err, 'error', 3000);
        }
        else {
            err = mensaje;
            return DevExpress.ui.notify(err, 'error', 3000);
        }
    };
})(Utils || (Utils = {}));
//# sourceMappingURL=Utils.js.map