@Code
    ViewData("Title") = "Lista Usuarios"
End Code
<!-- ko if: esAdministrador === 'true' -->
<div id="titulo" class="long-title"><h3>Usuarios</h3></div>

<div class="container">
    <div data-bind="dxLoadPanel: { visible: loading }"></div>
    <div id="customPadding">
        <div id="botonesDetalle">
            <div id="volver" data-bind="dxButton: goBack"> </div>

            <div id="botonCrear" data-bind="dxButton: applyButtonOptionsCrear"> </div>

        </div>

        <div id="grid" data-bind="dxDataGrid: grid">
            <div data-options="dxTemplate:{ name:'cellTemplate' }">
                <img id="userPic" data-bind="attr:{src: $data.value}" />
            </div>
        </div>
    </div>
</div>
<!-- /ko -->
@Section Scripts
    <script src="~/Scripts/app/Usuarios/ListaUsuariosViewModel.js"></script>
    <script>
        ko.applyBindings(new Usuarios.ListaUsuariosViewModel());
    </script>
End Section
