/// <reference path='../../typings/jquery/jquery.d.ts' />
/// <reference path='../../typings/knockout/knockout.d.ts' />
/// <reference path='../../typings/devextreme/devextreme.d.ts' />
/// <reference path='IUsuarioModel.d.ts' />
var Usuarios;
(function (Usuarios) {
    var ListaUsuariosViewModel = (function () {
        function ListaUsuariosViewModel() {
            var _this = this;
            this.usuarios = ko.observable();
            //Buttons
            this.applyButtonOptionsCrear = {
                text: 'Crear Usuario',
                icon: 'plus',
                type: 'success',
                onClick: function (e) {
                    var url = App.appRoot + 'Usuarios/CrearUsuario';
                    window.location.assign(url);
                }
            };
            this.goBack = {
                icon: 'back',
                type: 'normal',
                onClick: function (e) {
                    window.history.back();
                }
            };
            //Formulario
            this.grid = {
                dataSource: this.usuarios,
                onRowClick: function (e) {
                    var data = e.data;
                    var url = App.appRoot + 'Usuario/DetalleUsuario';
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
                    {
                        dataField: 'foto',
                        width: 110,
                        allowFiltering: false,
                        allowSorting: false,
                        cellTemplate: "cellTemplate",
                    },
                    'nombre',
                    'apellido',
                    'telefono',
                    { dataField: 'esActivo', caption: '¿Activo?', width: 80 }
                ]
            };
            this.loading = ko.observable(false);
            this.loading(true);
            //Cargar Usuarios
            $.getJSON(App.apiRoot + 'usuarios/get-usuarios/').then(function (result) {
                _this.usuarios(result);
                _this.loading(false);
            });
        }
        return ListaUsuariosViewModel;
    }());
    Usuarios.ListaUsuariosViewModel = ListaUsuariosViewModel;
})(Usuarios || (Usuarios = {}));
//# sourceMappingURL=ListaUsuariosViewModel.js.map