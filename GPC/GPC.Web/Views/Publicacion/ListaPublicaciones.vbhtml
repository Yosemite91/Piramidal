@Code
    ViewData("Title") = "Lista Publicaciones"
End Code
<!-- ko if: esAdministrador === 'true' -->
<div id="titulo" class="long-title"><h3>Publicaciones</h3></div>
<div class="container">
    <div data-bind="dxLoadPanel: { visible: loading }"></div>
    <div id="customPadding">
        <div id="botonesDetalle">
            <div id="volver" data-bind="dxButton: goBack"> </div>            
            <div id="botonCrear" data-bind="dxButton: applyButtonOptionsCrear"> </div>            
        </div>
        <div id="grid" data-bind="dxDataGrid: grid"></div>
    </div>
</div>
<!-- /ko -->
@Section Scripts
    <script src="~/Scripts/app/Publicaciones/ListarPublicacionesViewModel.js"></script>
    <script>
        ko.applyBindings(new Publicaciones.ListarPublicacionesViewModel());
    </script>
End Section
