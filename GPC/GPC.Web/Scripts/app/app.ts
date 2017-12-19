﻿/// <reference path='Utils.ts' />

namespace App {
    'use strict'; 
    export var appRoot: string;
    export var apiRoot: string;
    //MODIFICAR PARA LOGIN
    export var appPrefix: string = 'GPC';        
    export var esAdministrador: boolean = localStorage.getItem(App.appPrefix + 'login.esAdministrador');
    export var esColaborador: boolean = localStorage.getItem(App.appPrefix + 'login.esColaborador');
    export var run: string = localStorage.getItem(App.appPrefix + 'login.run');
    export var ubicacion: number = localStorage.getItem(App.appPrefix + 'login.ubicacion');
    
    $.ajaxSetup({
        headers: GetAutorizationHeaders(),
        error: (jqXHR: any, textStatus: any, errorThrown: any): void => {
            Utils.getErrores('', jqXHR, textStatus, errorThrown);
        }
    });

    function GetAutorizationHeaders(): { [key: string]: any; } {
        let token: string = localStorage.getItem(appPrefix + 'login.token');
        if (token) {
            return { 'Authorization': 'Basic ' + token };
        } else {
            return { 'Authorization': 'Anonymous' };
        }
    }

    export function goToLogin(): any {                      
        localStorage.removeItem(appPrefix + 'login.esAdministrador');
        localStorage.removeItem(appPrefix + 'login.esColaborador');
        localStorage.removeItem(appPrefix + 'login.token');
        localStorage.removeItem(appPrefix + 'login.run');
        localStorage.removeItem(appPrefix + 'login.ubicacion');
        let urlLogin: string = 'http://' + window.location.host + App.apiRoot.replace('/api/', '/');
        window.location.href = urlLogin;
        return false;
    };
      
    export function anioMinimo(): any {
        var actual = new Date(); 
        var anioMinimo = actual.getFullYear() - 18;        
        return anioMinimo;
    };
   
    export function alertaFormulario(anyObj: any): boolean {
        var i: number;        
        var error: boolean = true;
      
        for (i = 0; i < Object.keys(anyObj).length; i++) {                
            if (anyObj[Object.keys(anyObj)[i]] === null || anyObj[Object.keys(anyObj)[i]] === '' || anyObj[Object.keys(anyObj)[i]] === 0 ) {
                let name:any = Object.keys(anyObj)[i];
                DevExpress.ui.notify('Ingrese : ' + name, 'error', 3000);
                error = false;
                return error;
            }
        }               

        return true;
    }
}
