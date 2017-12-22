/// <reference path='Utils.ts' />
var App;
(function (App) {
    'use strict';
    //MODIFICAR PARA LOGIN
    App.appPrefix = 'GPC';
    App.esAdministrador = localStorage.getItem(App.appPrefix + 'login.esAdministrador');
    App.esColaborador = localStorage.getItem(App.appPrefix + 'login.esColaborador');
    App.run = localStorage.getItem(App.appPrefix + 'login.run');
    App.ubicacion = localStorage.getItem(App.appPrefix + 'login.ubicacion');
    $.ajaxSetup({
        headers: GetAutorizationHeaders(),
        error: function (jqXHR, textStatus, errorThrown) {
            Utils.getErrores('', jqXHR, textStatus, errorThrown);
        }
    });
    function GetAutorizationHeaders() {
        var token = localStorage.getItem(App.appPrefix + 'login.token');
        if (token) {
            return { 'Authorization': 'Basic ' + token };
        }
        else {
            return { 'Authorization': 'Anonymous' };
        }
    }
    function goToLogin() {
        localStorage.removeItem(App.appPrefix + 'login.esAdministrador');
        localStorage.removeItem(App.appPrefix + 'login.esColaborador');
        localStorage.removeItem(App.appPrefix + 'login.token');
        localStorage.removeItem(App.appPrefix + 'login.run');
        localStorage.removeItem(App.appPrefix + 'login.ubicacion');
        var urlLogin = 'http://' + window.location.host + App.apiRoot.replace('/api/', '/');
        window.location.href = urlLogin;
        return false;
    }
    App.goToLogin = goToLogin;
    ;
    function anioMinimo() {
        var actual = new Date();
        var anioMinimo = actual.getFullYear() - 18;
        return anioMinimo;
    }
    App.anioMinimo = anioMinimo;
    ;
    function alertaFormulario(anyObj) {
        var i;
        var error = true;
        for (i = 0; i < Object.keys(anyObj).length; i++) {
            if (anyObj[Object.keys(anyObj)[i]] === null || anyObj[Object.keys(anyObj)[i]] === '' || anyObj[Object.keys(anyObj)[i]] === 0) {
                var name_1 = Object.keys(anyObj)[i];
                DevExpress.ui.notify('Ingrese : ' + name_1, 'error', 3000);
                error = false;
                return error;
            }
        }
        return true;
    }
    App.alertaFormulario = alertaFormulario;
})(App || (App = {}));
